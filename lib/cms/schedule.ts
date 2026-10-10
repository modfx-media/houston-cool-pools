const HOUSTON = "America/Chicago";

const DATE_ONLY = /^(\d{4})-(\d{2})-(\d{2})$/;
const UTC_MIDNIGHT = /^(\d{4})-(\d{2})-(\d{2})T00:00:00(?:\.000)?Z$/;

type CalendarDay = { y: number; m: number; d: number };

function calendarDay(value: string): CalendarDay | null {
  const match = DATE_ONLY.exec(value) || UTC_MIDNIGHT.exec(value);
  if (!match) return null;
  return { y: Number(match[1]), m: Number(match[2]), d: Number(match[3]) };
}

function zonedParts(timeZone: string, ms: number) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hourCycle: "h23",
    })
      .formatToParts(new Date(ms))
      .map((part) => [part.type, part.value]),
  );
  const hour = Number(parts.hour);
  return {
    y: Number(parts.year),
    m: Number(parts.month),
    d: Number(parts.day),
    h: hour === 24 ? 0 : hour,
    min: Number(parts.minute),
    s: Number(parts.second),
  };
}

/** UTC instant of midnight in Houston for a calendar day, including the DST offset. */
export function houstonMidnight(day: CalendarDay): number {
  let utc = Date.UTC(day.y, day.m - 1, day.d, 0, 0, 0);
  const target = utc;
  for (let pass = 0; pass < 2; pass += 1) {
    const zoned = zonedParts(HOUSTON, utc);
    const zonedAsUtc = Date.UTC(zoned.y, zoned.m - 1, zoned.d, zoned.h, zoned.min, zoned.s);
    utc += target - zonedAsUtc;
  }
  return utc;
}

/**
 * When a post becomes public.
 * Date-only values and UTC-midnight timestamps are calendar days (Houston midnight),
 * so they do not shift a day earlier in US timezones.
 * Other timestamps are the exact scheduled instant.
 */
export function articleGoesLiveAt(value: string | null | undefined): number | null {
  const trimmed = value?.trim() ?? "";
  if (!trimmed) return null;
  const day = calendarDay(trimmed);
  if (day && (DATE_ONLY.test(trimmed) || UTC_MIDNIGHT.test(trimmed))) return houstonMidnight(day);
  const time = Date.parse(trimmed);
  return Number.isNaN(time) ? null : time;
}

/** A missing date is not a future schedule. A real date stays hidden until that instant. */
export function isArticleLive(value: string | null | undefined, now = Date.now()): boolean {
  const liveAt = articleGoesLiveAt(value);
  if (liveAt == null) return true;
  return liveAt <= now;
}

export function formatArticleDate(value: string | null | undefined): string {
  const trimmed = value?.trim() ?? "";
  if (!trimmed) return "";
  const format = (ms: number, timeZone: string) =>
    new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      timeZone,
    }).format(new Date(ms));

  const day = calendarDay(trimmed);
  if (day && (DATE_ONLY.test(trimmed) || UTC_MIDNIGHT.test(trimmed))) {
    return format(Date.UTC(day.y, day.m - 1, day.d, 12), "UTC");
  }
  const time = Date.parse(trimmed);
  if (Number.isNaN(time)) return "";
  return format(time, HOUSTON);
}
