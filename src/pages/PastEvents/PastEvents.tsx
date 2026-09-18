import { useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import PastEventCard, { type PastEventCardProps } from '../../components/PastEventCard/PastEventCard'
import { formatAcademicYear } from '../../components/PastEventCard/formatAcademicYear'
import { img } from '../../utils/img'

import './PastEvents.css'


const pastEvents: PastEventCardProps[] = [
    {
        name: 'Post Orientation Social',
        year: 2026,
        description: 'A social to show incoming COGS students what our club is all about!',
        photos: [
            { src: img('events/2026.27/postOrientation1.JPG'), alt: 'Students spelling out "COGS" with their arms'},
            { src: img('events/2026.27/postOrientation2.JPG'), alt: 'Two students in an intense game of chess'},
            { src: img('events/2026.27/postOrientation3.JPG'), alt: 'Making custom Robbie Shrinky-dink keychains!'},
            { src: img('events/2026.27/postOrientation4.JPG'), alt: 'Arts and crafts!!!'},
            { src: img('events/2026.27/postOrientation5.JPG'), alt: 'So many students...!'},
            { src: img('events/2026.27/postOrientation6.JPG'), alt: 'Sushi for dinner :)'},
        ],
    },
    {
        name: 'Welcome Back BBQ',
        year: 2026,
        description:
            'The annual Welcome Back BBQ at Acadia Beach! A fun evening of free food, drinks, spikeball, sunsets, and a custom CSS photobooth + doodle booth to kickoff the school year.',
        photos: [
            { src: img('events/2026.27/welcomeBack1.JPG'), alt: 'The BBQ is getting started!' },
            { src: img('events/2026.27/welcomeBack2.JPG'), alt: 'Cute group of friends smiling' },
            { src: img('events/2026.27/welcomeBack3.JPG'), alt: 'Food is ready!' },
            { src: img('events/2026.27/welcomeBack4.JPG'), alt: 'The BIGGEST group photo' },
            { src: img('events/2026.27/welcomeBack5.JPG'), alt: 'Our lovely raffle prize winners!' },
            { src: img('events/2026.27/welcomeBack6.JPG'), alt: 'What a beautiful sunset...' },
        ],
    },
    {
        name: 'Interyear Mingle',
        year: 2026,
        description: 'The annual Interyear Mingle: A night of quality time, fun, and games with your COGS community. Come to reunite with old pals, stay for the activites, and leave with new friends!',
        photos: [
            { src: img('events/2026.27/interYear1.JPG'), alt: 'The game table!'},
            { src: img('events/2026.27/interYear2.JPG'), alt: 'Making a UBC CSS beaded tapestry'},
            { src: img('events/2026.27/interYear3.JPG'), alt: 'students laughing in a group'},
            { src: img('events/2026.27/interYear4.JPG'), alt: 'Say cheese!!'},
        ],
    },
    {
        name: 'Welcome Back BBQ',
        year: 2025,
        description:
            'The annual kickoff BBQ social welcoming new and returning COGS students back for the year.',
        photos: [
            { src: img('events/2025.26/Welcome-back-bbq-1.jpg'), alt: 'Students picnicing at the Welcome Back BBQ' },
            { src: img('events/2025.26/Welcome-back-bbq-2.jpg'), alt: 'Student balancing a cheeto on nose, other students laughing' },
            { src: img('events/2025.26/Welcome-back-bbq-3.jpg'), alt: 'Mini group photo with cute puppy' },
            { src: img('events/2025.26/Welcome-back-bbq-4.jpg'), alt: 'COGS students with the program director, Chris Mole' },
            { src: img('events/2025.26/Welcome-back-bbq-5.jpg'), alt: 'An exec grilling it up' },
        ],
    },
    {
        name: 'Alumni Mixer Night',
        year: 2025,
        description:
            'Our annual Alumni-Student Mixer. Whether you’re a new COG in the community or one of our COGS alumni, join us for a night of reconnection with friends new and old!',
        photos: [
            { src: img('events/2025.26/alumni-mixer.jpg'), alt: 'Alumni mixer attendees waving at the camera' },
            { src: img('events/2025.26/alumni-mixer2.jpg'), alt: 'Cute mini group photo of attendees' },
            { src: img('events/2025.26/alumni-mixer3.jpg'), alt: 'Alumni mixer attendees socializing' },
            { src: img('events/2025.26/alumni-mixer4.jpg'), alt: 'Alumni mixer attendees socializing' },
        ],
    },
    {
        name: 'Cognitive Systems Lab Panel',
        year: 2025,
        description:
            'The CSS presented a unique opportunity to hear from undergrad panelists sharing their lab experience, projects, and how they got started in research. A night of curiosity, exploration, and networking, where students learned how to get involved with COGS-related labs at UBC, SFU, and beyond!',
        photos: [
            { src: img('events/2025.26/lab-panel.jpg'), alt: 'Lab panelists making the word "COGS" with their arms for a photo' },
            { src: img('events/2025.26/lab-panel2.jpg'), alt: 'Lab panelist speaking to students' },
            { src: img('events/2025.26/lab-panel3.jpg'), alt: 'Students gathering to learn about COGS-related research' },
            { src: img('events/2025.26/lab-panel4.jpg'), alt: 'Lab panelist speaking to students' },
        ],
    },
    {
        name: 'Meet The Profs',
        year: 2025,
        description: 'An annual evening of COGSy vibes, great convos, and even better company! Chat with professors and peers across the COGS disciplines in a casual setting and snag some free food!',
        photos: [
            { src: img('events/2025.26/meettheprofs6.jpg'), alt: 'Students and professors socializing' },
            { src: img('events/2025.26/meettheprofs1.jpg'), alt: 'Student posing for a photo with a fry in her mouth' },
            { src: img('events/2025.26/meettheprofs2.jpg'), alt: 'Students and professors socializing' },
            { src: img('events/2025.26/meettheprofs3.jpg'), alt: 'A mini group photo with some professors and students' },
            { src: img('events/2025.26/meettheprofs4.jpg'), alt: 'Students and professors competing in a fun game of trivia' },
            { src: img('events/2025.26/meettheprofs5.jpg'), alt: 'A beautiful interaction between two friends in the COGS community' },
            { src: img('events/2025.26/meettheprofs7.jpg'), alt: 'A cute mini group photo of students' },
        ],
    },
    {
        name: 'Interyear Mingle',
        year: 2025,
        description: 'This night gave upper year and lower year COGS students a chance to meet all across the COGS discipline! An evening of making friends, sharing laughs, and trading stories over food and games.',
        photos: [
            { src: img('events/2025.26/interyear1.jpg'), alt: 'An upper year COGS student teaching lower years how to use a circuit board' },
            { src: img('events/2025.26/interyear2.jpg'), alt: 'Two students bonding over a silly sign' },
            { src: img('events/2025.26/interyear3.jpg'), alt: 'Students working together on a poster to decorate the COGS lounge' },
            { src: img('events/2025.26/interyear4.jpg'), alt: 'Students participating in a fun icebreaker' },
        ],
    },
    {
        name: 'Gearing Up for 402',
        year: 2025,
        description:
            'Professors and COGS alumni come together to help current COGS students prepare for COGS 402, the final boss of your Cognitive Systems degree. Whether you’re in need of project ideas, a project supervisor, or just want to get ahead of the curve, Gearing Up for 402 helps students get inspired by alumni who have been there, done that, and crushed it!',
        photos: [
            { src: img('events/2025.26/gearingup1.jpg'), alt: 'Panelists at gearing up for 402' },
            { src: img('events/2025.26/gearingup2.jpg'), alt: 'Students listening intentively to panelists sharing their experience' },
            { src: img('events/2025.26/gearingup3.jpg'), alt: 'A Panelist speaking at gearing up for 402' },
            { src: img('events/2025.26/gearingup4.jpg'), alt: 'A Panelist speaking at gearing up for 402' },
        ],
    },
    {
        name: 'CSS x AI Safety Club: Interdisciplinary Panel',
        year: 2025,
        description:
            'The CSS and UBC’s AI Safety Club hosted an interdisciplinary panel focused on all things AI Safety, ranging from industry experience to academic navigation and career considerations! It featurerd networking opportunities with working AI professionals, a Q&A session, and, of course, free food!',
        photos: [
            { src: img('events/2025.26/AIsafetycollab2.jpg'), alt: 'Panelists at the interdisciplinary panel' },
            { src: img('events/2025.26/AIsafetycollab1.jpg'), alt: 'Food at the interdisciplinary panel' },
            { src: img('events/2025.26/AIsafetycollab3.jpg'), alt: 'Students at the interdisciplinary panel' },
            { src: img('events/2025.26/AIsafetycollab4.jpg'), alt: 'Students getting to socialize' },
            { src: img('events/2025.26/AIsafetycollab5.jpg'), alt: 'Students lining up for the amazing complementary food' },
        ],
    },
    {
        name: 'COGS-querade: The CSS Winter Formal',
        year: 2025,
        description:
            'The Winter COGS-querade Formal was an end-of-term themed celebration, bringing together the entire COGS community for an unforgettable night of music and memories.',
        photos: [
            { src: img('events/2025.26/cogsquerade1.jpg'), alt: 'Students socializing with their masquerade masks on' },
            { src: img('events/2025.26/cogsquerade2.jpg'), alt: 'The COGSquerade photobooth' },
            { src: img('events/2025.26/cogsquerade3.jpg'), alt: 'Execs are having fun too!' },
            { src: img('events/2025.26/cogsquerade4.jpg'), alt: 'Two men holding each other in a lovers embrace' },
            { src: img('events/2025.26/cogsquerade5.jpg'), alt: 'Students playing limbo' },
            { src: img('events/2025.26/cogsquerade6.jpg'), alt: 'Students gather in a circle to play musical chairs' },
        ],
    },
    {
        name: 'Robot Party',
        year: 2025,
        description:
            'The largest social event of the year! Our annual Robot Party consists of amazing free food, drinks, activities, a robot building contest, prizes, games, and much more! Each year’s Robot Party is always one for the memory books!',
        photos: [
            { src: img('events/2025.26/robotparty1.jpg'), alt: 'Students lined up for their free chicken and drinks' },
            { src: img('events/2025.26/robotparty2.jpg'), alt: 'Students posing with their free chicken and drinks' },
            { src: img('events/2025.26/robotparty3.jpg'), alt: 'Two students playing a game of beer pong (without the beer)' },
            { src: img('events/2025.26/robotparty4.jpg'), alt: 'Students gathered around the projector playing a game of Mario Cart' },
            { src: img('events/2025.26/robotparty5.jpg'), alt: 'Students posing with their free chicken and drinks' },
            { src: img('events/2025.26/robotparty6.jpg'), alt: 'Student gives her friend a piggy-back' },
            { src: img('events/2025.26/robotparty7.jpg'), alt: 'A participant of the robot costume contest being led down the runway' },
            { src: img('events/2025.26/robotparty8.jpg'), alt: 'Participant of the robot costume contest gather for a group photo' },
            { src: img('events/2025.26/robotparty9.jpg'), alt: 'The execs are cutting up ...a cake for dessert' },
            { src: img('events/2025.26/robotparty10.jpg'), alt: 'A group photo of almost all of the 2025/26 exec team wrapping up the party' },
        ],
    },
]

const ALL_YEARS = 'All'
type YearFilter = number | typeof ALL_YEARS

function PastEvents() {
    const [search, setSearch] = useState('')
    const [year, setYear] = useState<YearFilter>(ALL_YEARS)
    const [isMobileYearMenuOpen, setIsMobileYearMenuOpen] = useState(false)

    // Numeric sort, not string sort — correct regardless of digit count or
    // century boundaries, unlike sorting the old "2025/26"-style strings.
    const years = useMemo((): YearFilter[] => {
        const uniqueYears = Array.from(new Set(pastEvents.map((event) => event.year)))
        uniqueYears.sort((a, b) => b - a)
        return [ALL_YEARS, ...uniqueYears]
    }, [])

    const filteredEvents = useMemo(() => {
        const query = search.trim().toLowerCase()
        return pastEvents.filter((event) => {
            const matchesSearch = query === '' || event.name.toLowerCase().includes(query)
            const matchesYear = year === ALL_YEARS || event.year === year
            return matchesSearch && matchesYear
        })
    }, [search, year])

    return (
        <section className="past-events">
            {/* Mobile-only: replaces the desktop .year-filter pill with a
                compact icon button fixed next to the hamburger menu, so the
                mobile header row stays uncluttered. Opens the same year
                options as a small floating menu rather than losing the
                filter functionality. Portaled to document.body — same
                reasoning as MobileNav's hamburger button/panel — so this
                fixed-position UI isn't trapped under the header by
                .past-events's own stacking context (position: relative;
                z-index: 1 here beats any z-index set on a descendant). */}
            {createPortal(
                <>
                    <button
                        type="button"
                        className="mobile-year-filter-button"
                        onClick={() => setIsMobileYearMenuOpen((prev) => !prev)}
                        aria-expanded={isMobileYearMenuOpen}
                        aria-label="Filter by year"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                            <line x1="3" y1="7" x2="21" y2="7" strokeLinecap="round" />
                            <circle cx="15" cy="7" r="2.2" />
                            <line x1="3" y1="17" x2="21" y2="17" strokeLinecap="round" />
                            <circle cx="9" cy="17" r="2.2" />
                        </svg>
                    </button>

                    {isMobileYearMenuOpen && (
                        <div className="mobile-year-filter-menu">
                            {years.map((yearOption) => (
                                <button
                                    key={yearOption}
                                    type="button"
                                    className={`mobile-year-filter-option ${year === yearOption ? 'is-active' : ''}`}
                                    onClick={() => {
                                        setYear(yearOption)
                                        setIsMobileYearMenuOpen(false)
                                    }}
                                >
                                    {yearOption === ALL_YEARS ? ALL_YEARS : formatAcademicYear(yearOption)}
                                </button>
                            ))}
                        </div>
                    )}
                </>,
                document.body,
            )}

            <div className="past-events-title-row">
                <div className="past-events-title-group">
                    <h1>Past Events</h1>
                    <a className="cross-events-link" href="/events/upcoming">
                        See Upcoming Events
                        <span className="cross-events-link-arrow" aria-hidden="true">→</span>
                    </a>
                </div>

                <label className="year-filter">
                    <select
                        aria-label="Filter by year"
                        value={year}
                        onChange={(event) => {
                            const { value } = event.target
                            setYear(value === ALL_YEARS ? ALL_YEARS : Number(value))
                        }}
                    >
                        {years.map((yearOption) => (
                            <option key={yearOption} value={yearOption}>
                                {yearOption === ALL_YEARS ? ALL_YEARS : formatAcademicYear(yearOption)}
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
                        <PastEventCard key={`${event.name}-${event.year}-${index}`} {...event} />
                    ))
                ) : (
                    <p className="past-events-empty">No past events match your search.</p>
                )}
            </div>
        </section>
    )
}

export default PastEvents
