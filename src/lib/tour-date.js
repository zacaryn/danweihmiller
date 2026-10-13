/** Optional "preferred tour" fields shared by the listing and contact forms. */

export const TOUR_TIMES = ['Any time', 'Morning', 'Afternoon', 'Evening'];

/** Today as yyyy-mm-dd in the visitor's time zone (for the date input's min). */
export function todayIso() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/** ("2026-10-16", "Afternoon") -> "Fri, Oct 16 · Afternoon". Null when nothing was picked. */
export function formatTour(date, time) {
  const anyTime = !time || time === TOUR_TIMES[0];
  if (!date) return anyTime ? null : `Flexible date · ${time}`;
  const [y, m, d] = date.split('-').map(Number);
  const day = new Date(y, m - 1, d).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  return anyTime ? day : `${day} · ${time}`;
}
