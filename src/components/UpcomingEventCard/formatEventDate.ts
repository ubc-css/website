/** Formats an ISO date ("2026-09-12") as a friendly display date
 * ("Saturday, September 12"). Kept in its own module (rather than exported
 * alongside the UpcomingEventCard component) so that file only exports a
 * component, per react-refresh/only-export-components — same reasoning as
 * PastEventCard's formatAcademicYear.
 *
 * No year: these are *upcoming* events, always within the next few months, so
 * the year is noise — the weekday is the part someone actually needs to plan
 * around. The `T00:00:00` matters more than it looks now that the weekday is
 * shown: it parses the date as local midnight, where a bare `new Date("2026-
 * 09-12")` would parse as UTC and render as the *previous* day for anyone
 * behind UTC (i.e. everyone in Vancouver) — which would show the wrong
 * weekday, not just a subtly wrong date. */
export function formatEventDate(isoDate: string): string {
    const date = new Date(`${isoDate}T00:00:00`)
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
}
