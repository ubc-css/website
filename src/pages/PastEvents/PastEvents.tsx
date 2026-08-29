import { useMemo, useState } from 'react'
import EventCard, { type EventCardProps } from '../../components/EventCard/EventCard'
import welcomeBack from '../../assets/events/Welcome-back-bbq.jpg'
import alumniMixer from '../../assets/events/alumni-mixer.jpg'
import labPanel from '../../assets/events/lab-panel.jpg'
import './PastEvents.css'

// Placeholder content — names/descriptions/photo groupings are all stand-ins
// (the three real event photos already used elsewhere on the site are just
// cycled across cards) until the club has real past-event write-ups to swap
// in. Spans 3 fake years so the year filter has something real to filter.
const placeholderEvents: EventCardProps[] = [
    {
        name: 'Welcome Back BBQ',
        year: '2025/26',
        description:
            'Placeholder description: a kickoff social welcoming new and returning COGS students back for the year.',
        photos: [
            { src: welcomeBack, alt: 'Students at the Welcome Back BBQ' },
            { src: alumniMixer, alt: 'Placeholder photo 2' },
            { src: labPanel, alt: 'Placeholder photo 3' },
        ],
    },
    {
        name: 'Alumni Mixer Night',
        year: '2025/26',
        description:
            'Placeholder description: an evening connecting current students with COGS alumni working across industry and research.',
        photos: [
            { src: alumniMixer, alt: 'Alumni mixer attendees' },
            { src: welcomeBack, alt: 'Placeholder photo 2' },
        ],
    },
    {
        name: 'Cognitive Science Lab Tour & Panel',
        year: '2025/26',
        description:
            'Placeholder description: a behind-the-scenes tour of a campus research lab, followed by a Q&A panel with grad researchers.',
        photos: [
            { src: labPanel, alt: 'Lab tour and panel discussion' },
            { src: welcomeBack, alt: 'Placeholder photo 2' },
            { src: alumniMixer, alt: 'Placeholder photo 3' },
        ],
    },
    {
        name: 'Welcome Back BBQ',
        year: '2024/25',
        description: 'Placeholder description for last year’s welcome back BBQ.',
        photos: [
            { src: welcomeBack, alt: 'Placeholder photo 1' },
            { src: labPanel, alt: 'Placeholder photo 2' },
        ],
    },
    {
        name: 'Alumni Mixer Night',
        year: '2024/25',
        description: 'Placeholder description for last year’s alumni mixer.',
        photos: [
            { src: alumniMixer, alt: 'Placeholder photo 1' },
            { src: labPanel, alt: 'Placeholder photo 2' },
            { src: welcomeBack, alt: 'Placeholder photo 3' },
        ],
    },
    {
        name: 'Winter Social & Trivia Night',
        year: '2024/25',
        description:
            'Placeholder description: a casual end-of-term trivia night with prizes and hot chocolate.',
        photos: [
            { src: labPanel, alt: 'Placeholder photo 1' },
            { src: alumniMixer, alt: 'Placeholder photo 2' },
        ],
    },
    {
        name: 'Founding Members Kickoff',
        year: '2023/24',
        description:
            'Placeholder description: the club’s very first official event, introducing the founding executive team.',
        photos: [
            { src: welcomeBack, alt: 'Placeholder photo 1' },
            { src: alumniMixer, alt: 'Placeholder photo 2' },
        ],
    },
    {
        name: 'Career Panel: Life After COGS',
        year: '2023/24',
        description:
            'Placeholder description: recent grads share how their Cognitive Systems degree shaped their career paths.',
        photos: [
            { src: labPanel, alt: 'Placeholder photo 1' },
            { src: welcomeBack, alt: 'Placeholder photo 2' },
            { src: alumniMixer, alt: 'Placeholder photo 3' },
        ],
    },
]

const ALL_YEARS = 'All'

function PastEvents() {
    const [search, setSearch] = useState('')
    const [year, setYear] = useState(ALL_YEARS)

    const years = useMemo(
        () => [ALL_YEARS, ...Array.from(new Set(placeholderEvents.map((event) => event.year))).sort().reverse()],
        [],
    )

    const filteredEvents = useMemo(() => {
        const query = search.trim().toLowerCase()
        return placeholderEvents.filter((event) => {
            const matchesSearch = query === '' || event.name.toLowerCase().includes(query)
            const matchesYear = year === ALL_YEARS || event.year === year
            return matchesSearch && matchesYear
        })
    }, [search, year])

    return (
        <section className="past-events">
            <div className="past-events-title-row">
                <h1>Past Events</h1>

                <label className="year-filter">
                    <span className="year-filter-label">Year</span>
                    <select value={year} onChange={(event) => setYear(event.target.value)}>
                        {years.map((yearOption) => (
                            <option key={yearOption} value={yearOption}>
                                {yearOption}
                            </option>
                        ))}
                    </select>
                </label>
            </div>

            <div className="past-events-search">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <circle cx="10.5" cy="10.5" r="6.5" />
                    <path d="M20 20l-4.6-4.6" strokeLinecap="round" />
                </svg>
                <input
                    type="search"
                    placeholder="Search past events by name..."
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    aria-label="Search past events by name"
                />
            </div>

            <div className="past-events-list">
                {filteredEvents.length > 0 ? (
                    filteredEvents.map((event, index) => (
                        <EventCard key={`${event.name}-${event.year}-${index}`} {...event} />
                    ))
                ) : (
                    <p className="past-events-empty">No past events match your search.</p>
                )}
            </div>
        </section>
    )
}

export default PastEvents
