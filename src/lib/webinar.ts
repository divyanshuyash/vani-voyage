export const WEBINAR_TIME_ZONE = "Asia/Kolkata";

export type WebinarSchedule = {
  configured: boolean;
  startsAt: string | null;
  dateLabel: string;
  timeLabel: string;
};

function ordinal(day: number) {
  const lastTwoDigits = day % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 13) return `${day}th`;
  if (day % 10 === 1) return `${day}st`;
  if (day % 10 === 2) return `${day}nd`;
  if (day % 10 === 3) return `${day}rd`;
  return `${day}th`;
}

export function formatWebinarSchedule(startsAt: string | null): WebinarSchedule {
  if (!startsAt) {
    return {
      configured: false,
      startsAt: null,
      dateLabel: "Next date coming soon",
      timeLabel: "Time to be announced",
    };
  }

  const date = new Date(startsAt);

  if (Number.isNaN(date.getTime())) {
    return formatWebinarSchedule(null);
  }

  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: WEBINAR_TIME_ZONE,
    day: "numeric",
    month: "long",
    weekday: "long",
  }).formatToParts(date);
  const day = Number(parts.find((part) => part.type === "day")?.value);
  const month = parts.find((part) => part.type === "month")?.value;
  const weekday = parts.find((part) => part.type === "weekday")?.value;

  return {
    configured: true,
    startsAt: date.toISOString(),
    dateLabel: `${ordinal(day)} ${month}, ${weekday}`,
    timeLabel: new Intl.DateTimeFormat("en-US", {
      timeZone: WEBINAR_TIME_ZONE,
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(date),
  };
}

export function indiaDateTimeToIso(date: string, time: string) {
  const parsed = new Date(`${date}T${time}:00+05:30`);

  if (Number.isNaN(parsed.getTime())) {
    throw new Error("Invalid webinar date or time");
  }

  return parsed.toISOString();
}
