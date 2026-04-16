export type ProgramSheetRow = {
  course: string;
  startDate: string;
  endDate: string;
  mode: string;
  location: string;
  price: string;
  description: string;
  url: string;
  imageUrl: string;
};

function parseCsvLine(line: string): string[] {
  const cells: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];

    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === "," && !inQuotes) {
      cells.push(current.trim());
      current = "";
      continue;
    }

    current += char;
  }

  cells.push(current.trim());
  return cells;
}

function parseCsv(csvText: string): string[][] {
  const lines = csvText
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  return lines.map(parseCsvLine);
}

function indexHeaders(headerRow: string[]) {
  const map: Record<string, number> = {};
  headerRow.forEach((value, index) => {
    map[value.toLowerCase().replace(/\s+/g, "")] = index;
  });
  return map;
}

function getCell(row: string[], headerIndex: Record<string, number>, key: string): string {
  const index = headerIndex[key];
  if (typeof index !== "number") {
    return "";
  }
  return row[index] ?? "";
}

async function fetchProgramRowsFromCsvUrl(csvUrl: string): Promise<ProgramSheetRow[]> {
  const response = await fetch(csvUrl, { cache: "no-store" });

  if (!response.ok) {
    throw new Error(`Unable to fetch sheet data. Status: ${response.status}`);
  }

  const csvText = await response.text();
  const rows = parseCsv(csvText);

  if (rows.length < 2) {
    return [];
  }

  const headerIndex = indexHeaders(rows[0]);
  const dataRows = rows.slice(1);

  return dataRows
    .map((row) => ({
      course: getCell(row, headerIndex, "course"),
      startDate: getCell(row, headerIndex, "startdate"),
      endDate: getCell(row, headerIndex, "enddate"),
      mode: getCell(row, headerIndex, "mode"),
      location: getCell(row, headerIndex, "location"),
      price: getCell(row, headerIndex, "price"),
      description: getCell(row, headerIndex, "description"),
      url: getCell(row, headerIndex, "url"),
      imageUrl: getCell(row, headerIndex, "imageurl"),
    }))
    .filter((row) => row.course.length > 0);
}

export async function fetchProgramRowsFromGoogleSheet(
  spreadsheetId: string,
  gid: string
): Promise<ProgramSheetRow[]> {
  const csvUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/export?format=csv&gid=${gid}`;
  return fetchProgramRowsFromCsvUrl(csvUrl);
}

export async function fetchProgramRowsFromPublishedSheet(
  publishedKey: string,
  gid: string,
  cacheBust?: string
): Promise<ProgramSheetRow[]> {
  const cacheParam = cacheBust ? `&_=${encodeURIComponent(cacheBust)}` : "";
  const csvUrl = `https://docs.google.com/spreadsheets/d/e/${publishedKey}/pub?gid=${gid}&single=true&output=csv${cacheParam}`;
  return fetchProgramRowsFromCsvUrl(csvUrl);
}