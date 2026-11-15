// Keep confirmed publication dates in chronological order as YYYY-MM-DD.
const windows = [
  ["2026-11-23", "2026-12-19", "short"],
  ["2027-01-11", "2027-02-06"],
  ["2027-02-15", "2027-03-13"],
  ["2027-03-22", "2027-04-17"],
  ["2027-05-03", "2027-05-29"],
  ["2027-06-21", "2027-07-17"],
  ["2027-07-26", "2027-08-21"],
  ["2027-09-06", "2027-10-02"],
  ["2027-10-11", "2027-11-06"],
  ["2027-11-15", "2027-12-11"],
] as const;

const retreatWindows = windows.map(([startsOn, endsOn, month]) => {
  const date = new Intl.DateTimeFormat("en-US", { month: month ?? "long", day: "numeric", timeZone: "UTC" });
  const label = `${date.format(new Date(startsOn))} – ${date.format(new Date(endsOn))}, ${endsOn.slice(0, 4)}`;
  return { startsOn, endsOn, label };
});

export function getRetreatWindows(now = new Date()) {
  const today = now.toLocaleDateString("en-CA", { timeZone: "America/Lima" });
  return retreatWindows.filter(({ endsOn }) => endsOn >= today);
}
