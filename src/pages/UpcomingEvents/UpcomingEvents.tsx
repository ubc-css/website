import { useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import UpcomingEventCard, {
    type UpcomingEventCardProps,
} from '../../components/UpcomingEventCard/UpcomingEventCard'
import './UpcomingEvents.css'

import resumeBuilding1 from '../../assets/events/Graphics/resumeBuilding1.jpg'
import resumeBuilding2 from '../../assets/events/Graphics/resumeBuilding2.jpg'


const upcomingEvents: UpcomingEventCardProps[] = [
    {
        name: 'Resume Building Workshop',
        date: '2026-09-21',
        time: '5:30 PM - 7:00 PM',
        location: 'LIFE 2202',
        description:
            'First internship? First resume? First idea of what you’re doing? We’ve got you. 🫡 Join us at our first industry event of the year for a hands-on session with Yulia Gracheva, Certified Resume Strategist at Flourish Career Consulting, covering what’s actually getting people interviews right now and how to tell your COGS story in one page. 💬 Bring your resume, we’ll do the rest. RSVP using the Luma in bio. Membership is required to attend, purchase yours now by clicking on the link below!!',
        images: [
            {src: resumeBuilding1, alt: 'Resume Building Workshop graphic'},
            {src: resumeBuilding2, alt: 'Resume Building Workshop details graphic'},
        ],
        rsvpHref: "https://luma.com/spotnckx",
    },
]

function UpcomingEvents() {
    const [search, setSearch] = useState('')

    // Soonest-first, sorted by the real ISO date rather than trusting the
    // placeholder array's declaration order.
    const sortedEvents = useMemo(
        () => [...upcomingEvents].sort((a, b) => a.date.localeCompare(b.date)),
        [],
    )

    const filteredEvents = useMemo(() => {
        const query = search.trim().toLowerCase()
        if (query === '') return sortedEvents
        return sortedEvents.filter((event) => event.name.toLowerCase().includes(query))
    }, [search, sortedEvents])

    return (
        <section className="upcoming-events">
            {/* Mobile-only: replaces the desktop .calendar-view-button pill
                with a compact icon link fixed next to the hamburger menu, so
                the mobile header row stays uncluttered. Same real calendar
                href as the desktop button. Portaled to document.body — same
                reasoning as MobileNav's hamburger button/panel — so this
                fixed-position
                icon isn't trapped under the header by .upcoming-events's own
                stacking context (position: relative; z-index: 1 here beats
                any z-index set on a descendant). */}
            {createPortal(
                <a
                    className="mobile-calendar-view-button"
                    href="https://calendar.google.com/calendar/u/0/embed?src=9dc50ef9a69b4502a344057732675ce11f7cebade23d99fe226e0f6718e3c3b4@group.calendar.google.com&src=cogsubc@gmail.com&ctz=America/Vancouver"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Calendar view"
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <rect x="3" y="5" width="18" height="16" rx="2.5" />
                        <path d="M3 10h18M8 3v4M16 3v4" strokeLinecap="round" />
                    </svg>
                </a>,
                document.body,
            )}

            <div className="upcoming-events-title-row">
                <div className="upcoming-events-title-group">
                    <h1>Upcoming Events</h1>
                    <a className="cross-events-link" href="/events/past">
                        See Past Events
                        <span className="cross-events-link-arrow" aria-hidden="true">→</span>
                    </a>
                </div>

                {/* The club's real Google Calendar (an embed URL, but it
                    renders fine as a standalone page too, not just in an
                    iframe). */}
                <a
                    className="calendar-view-button"
                    href="https://calendar.google.com/calendar/u/0/embed?src=9dc50ef9a69b4502a344057732675ce11f7cebade23d99fe226e0f6718e3c3b4@group.calendar.google.com&src=cogsubc@gmail.com&ctz=America/Vancouver"
                    target="_blank"
                    rel="noreferrer"
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <rect x="3" y="5" width="18" height="16" rx="2.5" />
                        <path d="M3 10h18M8 3v4M16 3v4" strokeLinecap="round" />
                    </svg>
                    Calendar View
                </a>
            </div>

            <div className="upcoming-events-search">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <circle cx="10.5" cy="10.5" r="6.5" />
                    <path d="M20 20l-4.6-4.6" strokeLinecap="round" />
                </svg>
                <input
                    type="search"
                    placeholder="Search upcoming events by name..."
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    aria-label="Search upcoming events by name"
                />
            </div>

            <div className="upcoming-events-list">
                {filteredEvents.length > 0 ? (
                    filteredEvents.map((event) => <UpcomingEventCard key={event.name} {...event} />)
                ) : (
                    <p className="upcoming-events-empty">No upcoming events match your search.</p>
                )}
            </div>
        </section>
    )
}

export default UpcomingEvents
