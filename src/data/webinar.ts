import "server-only";

import {
  formatWebinarSchedule,
  indiaDateTimeToIso,
  type WebinarSchedule,
} from "@/lib/webinar";

const WEBINAR_SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQD6fx-mrrpW0vwgCDutQePEEzMlTikSXvKNRn-MbHovIajk8MB-gUi2qbEs1M2MmBs3IivvjYPtd7v/pub?gid=0&single=true&output=csv";

function readCsvLine(line: string) {
  const cells: string[] = [];
  let cell = "";
  let quoted = false;

  for (let index = 0; index < line.length; index += 1) {
    const character = line[index];

    if (character === '"') {
      if (quoted && line[index + 1] === '"') {
        cell += '"';
        index += 1;
      } else {
        quoted = !quoted;
      }
    } else if (character === "," && !quoted) {
      cells.push(cell.trim());
      cell = "";
    } else {
      cell += character;
    }
  }

  cells.push(cell.trim());
  return cells;
}

function validCalendarDate(year: number, month: number, day: number) {
  const check = new Date(Date.UTC(year, month - 1, day));

  return (
    check.getUTCFullYear() === year &&
    check.getUTCMonth() === month - 1 &&
    check.getUTCDate() === day
  );
}

function normalizeDate(value: string) {
  const indiaDate = value.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/);
  const isoDate = value.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  let year: number;
  let month: number;
  let day: number;

  if (indiaDate) {
    day = Number(indiaDate[1]);
    month = Number(indiaDate[2]);
    year = Number(indiaDate[3]);
  } else if (isoDate) {
    year = Number(isoDate[1]);
    month = Number(isoDate[2]);
    day = Number(isoDate[3]);
  } else {
    throw new Error("The webinar date in Google Sheets is not valid");
  }

  if (!validCalendarDate(year, month, day)) {
    throw new Error("The webinar date in Google Sheets is not valid");
  }

  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function normalizeTime(value: string) {
  const match = value
    .trim()
    .match(/^(\d{1,2}):(\d{2})(?::\d{2})?\s*(AM|PM)?$/i);

  if (!match) {
    throw new Error("The webinar time in Google Sheets is not valid");
  }

  let hour = Number(match[1]);
  const minute = Number(match[2]);
  const period = match[3]?.toUpperCase();

  if (minute > 59 || (period ? hour < 1 || hour > 12 : hour > 23)) {
    throw new Error("The webinar time in Google Sheets is not valid");
  }

  if (period === "AM" && hour === 12) hour = 0;
  if (period === "PM" && hour !== 12) hour += 12;

  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}

function scheduleFromCsv(csv: string) {
  const rows = csv
    .replace(/^\uFEFF/, "")
    .split(/\r?\n/)
    .filter((line) => line.trim())
    .map(readCsvLine);
  const headers = rows[0]?.map((header) => header.toUpperCase()) ?? [];
  const dateIndex = headers.indexOf("DATE");
  const timeIndex = headers.indexOf("TIME");
  const values = rows[1];

  if (dateIndex === -1 || timeIndex === -1 || !values) {
    throw new Error("The Google Sheet must contain DATE and TIME columns");
  }

  const date = values[dateIndex]?.trim();
  const time = values[timeIndex]?.trim();

  if (!date || !time) {
    return formatWebinarSchedule(null);
  }

  return formatWebinarSchedule(
    indiaDateTimeToIso(normalizeDate(date), normalizeTime(time)),
  );
}

export async function getPublicWebinarSchedule(): Promise<WebinarSchedule> {
  try {
    const response = await fetch(WEBINAR_SHEET_CSV_URL, {
      headers: { Accept: "text/csv" },
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(`Google Sheets returned ${response.status}`);
    }

    return scheduleFromCsv(await response.text());
  } catch (error) {
    console.error(
      "Unable to load the webinar schedule:",
      error instanceof Error ? error.message : "Unknown error",
    );
    return formatWebinarSchedule(null);
  }
}
