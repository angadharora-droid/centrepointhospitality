const DAY = new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" });
const MONTH = new Intl.DateTimeFormat("en-GB", { month: "short", year: "numeric", timeZone: "UTC" });

/**
 * Editorial date: "25 Oct 2024", or "Nov 2023" when only the month is known.
 * Accepts ISO "YYYY-MM-DD" or "YYYY-MM".
 */
export function formatEditorialDate(iso: string) {
  const monthOnly = /^\d{4}-\d{2}$/.test(iso);
  const date = new Date(monthOnly ? `${iso}-01T00:00:00Z` : `${iso}T00:00:00Z`);
  return (monthOnly ? MONTH : DAY).format(date).replace(/(\w{3})\w*\.?/, "$1");
}
