import { useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import UpcomingEventCard, {
    type UpcomingEventCardProps,
} from '../../components/UpcomingEventCard/UpcomingEventCard'
import { img } from '../../utils/img'
import './UpcomingEvents.css'


const upcomingEvents: UpcomingEventCardProps[] = [
    {
        name: 'Portfolio Workshop',
        date: '2026-10-23',
        time: '6:00 PM - 8:00 PM',
        location: 'Henry Angus Building, Room 235',
        description:
            <>
Interested in UX design as a career? Have projects you’re proud of but don’t know how to show them off? 🤔 <br /> <br />

The CSS is excited to present our Portfolio Workshop with <b>Designed Forward</b> hosted by founder <b>Matt Karakilic</b>, a UX design leader and Emily Carr instructor. Designed Forward is a UX coaching and career community for designers of all backgrounds. Learn what makes a portfolio stand out, how to show your process, and how to tell the story behind your work. Whether you’re starting from scratch or polishing what you have, this one’s for you! <br /> <br />

<i>Looking for professional feedback on your own portfolio? Submit a link to yours via the Luma by <b>October 20th 11:59PM</b>. Only a limited number of portfolios will be reviewed during the workshop so get yours in today!!</i>
             </>,
        images: [
            {src: img('events/Graphics/portfolioWorkshop1.png'), alt: 'Portfolio Workshop graphic'},
            {src: img('events/Graphics/portfolioWorkshop2.png'), alt: 'Portfolio Workshop graphic'}
        ],
        rsvpHref: "https://luma.com/rbs9wz1u?utm_source=cogsubc_linktree",
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
