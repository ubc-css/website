/** Formats an ISO date ("2026-09-12") as a friendly display date
 * ("September 12, 2026"). Kept in its own module (rather than exported
 * alongside the UpcomingEventCard component) so that file only exports a
 * component, per react-refresh/only-export-components — same reasoning as
 * EventCard's formatAcademicYear. */
export function formatEventDate(isoDate: string): string {
    const date = new Date(`${isoDate}T00:00:00`)
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}
