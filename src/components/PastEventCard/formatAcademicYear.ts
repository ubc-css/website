/** Formats a starting year (2025) as the "2025/26" academic-year label used
 * in the year filter dropdown. Kept in its own module (rather than exported
 * alongside the EventCard component) so EventCard.tsx only exports a
 * component, per react-refresh/only-export-components. */
export function formatAcademicYear(startYear: number): string {
    const endYearShort = String((startYear + 1) % 100).padStart(2, '0')
    return `${startYear}/${endYearShort}`
}
