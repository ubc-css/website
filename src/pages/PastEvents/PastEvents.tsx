import { useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import PastEventCard, { type PastEventCardProps } from '../../components/PastEventCard/PastEventCard'
import { formatAcademicYear } from '../../components/PastEventCard/formatAcademicYear'

// PHOTO IMPORTS
import welcomeBack1 from '../../assets/events/Welcome-back-bbq-1.jpg'
import welcomeBack2 from '../../assets/events/Welcome-back-bbq-2.jpg'
import welcomeBack3 from '../../assets/events/Welcome-back-bbq-3.jpg'
import welcomeBack4 from '../../assets/events/Welcome-back-bbq-4.jpg'
import welcomeBack5 from '../../assets/events/Welcome-back-bbq-5.jpg'

import meetTheProfs1 from '../../assets/events/meettheprofs1.jpg'
import meetTheProfs2 from '../../assets/events/meettheprofs2.jpg'
import meetTheProfs3 from '../../assets/events/meettheprofs3.jpg'
import meetTheProfs4 from '../../assets/events/meettheprofs4.jpg'
import meetTheProfs5 from '../../assets/events/meettheprofs5.jpg'
import meetTheProfs6 from '../../assets/events/meettheprofs6.jpg'
import meetTheProfs7 from '../../assets/events/meettheprofs7.jpg'

import alumniMixer1 from '../../assets/events/alumni-mixer.jpg'
import alumniMixer2 from '../../assets/events/alumni-mixer2.jpg'
import alumniMixer3 from '../../assets/events/alumni-mixer3.jpg'
import alumniMixer4 from '../../assets/events/alumni-mixer4.jpg'

import labPanel1 from '../../assets/events/lab-panel.jpg'
import labPanel2 from '../../assets/events/lab-panel2.jpg'
import labPanel3 from '../../assets/events/lab-panel3.jpg'
import labPanel4 from '../../assets/events/lab-panel4.jpg'

import interYear1 from '../../assets/events/interyear1.jpg'
import interYear2 from '../../assets/events/interyear2.jpg'
import interYear3 from '../../assets/events/interyear3.jpg'
import interYear4 from '../../assets/events/interyear4.jpg'

import gearingUp1 from '../../assets/events/gearingup1.jpg'
import gearingUp2 from '../../assets/events/gearingup2.jpg'
import gearingUp3 from '../../assets/events/gearingup3.jpg'
import gearingUp4 from '../../assets/events/gearingup4.jpg'

import aiSafety1 from '../../assets/events/AIsafetycollab1.jpg'
import aiSafety2 from '../../assets/events/AIsafetycollab2.jpg'
import aiSafety3 from '../../assets/events/AIsafetycollab3.jpg'
import aiSafety4 from '../../assets/events/AIsafetycollab4.jpg'
import aiSafety5 from '../../assets/events/AIsafetycollab5.jpg'

import cogsquerade1 from '../../assets/events/cogsquerade1.jpg'
import cogsquerade2 from '../../assets/events/cogsquerade2.jpg'
import cogsquerade3 from '../../assets/events/cogsquerade3.jpg'
import cogsquerade4 from '../../assets/events/cogsquerade4.jpg'
import cogsquerade5 from '../../assets/events/cogsquerade5.jpg'
import cogsquerade6 from '../../assets/events/cogsquerade6.jpg'

import robotparty1 from '../../assets/events/robotparty1.jpg'
import robotparty2 from '../../assets/events/robotparty2.jpg'
import robotparty3 from '../../assets/events/robotparty3.jpg'
import robotparty4 from '../../assets/events/robotparty4.jpg'
import robotparty5 from '../../assets/events/robotparty5.jpg'
import robotparty6 from '../../assets/events/robotparty6.jpg'
import robotparty7 from '../../assets/events/robotparty7.jpg'
import robotparty8 from '../../assets/events/robotparty8.jpg'
import robotparty9 from '../../assets/events/robotparty9.jpg'
import robotparty10 from '../../assets/events/robotparty10.jpg'

import './PastEvents.css'


const pastEvents: PastEventCardProps[] = [
    {
        name: 'Welcome Back BBQ 2025/26',
        year: 2025,
        description:
            'The annual kickoff BBQ social welcoming new and returning COGS students back for the year.',
        photos: [
            { src: welcomeBack1, alt: 'Students picnicing at the Welcome Back BBQ' },
            { src: welcomeBack2, alt: 'Student balancing a cheeto on nose, other students laughing' },
            { src: welcomeBack3, alt: 'Mini group photo with cute puppy' },
            { src: welcomeBack4, alt: 'COGS students with the program director, Chris Mole' },
            { src: welcomeBack5, alt: 'An exec grilling it up' },
        ],
    },
    {
        name: 'Alumni Mixer Night 2025/26',
        year: 2025,
        description:
            'Our annual Alumni-Student Mixer. Whether you’re a new COG in the community or one of our COGS alumni, join us for a night of reconnection with friends new and old!',
        photos: [
            { src: alumniMixer1, alt: 'Alumni mixer attendees waving at the camera' },
            { src: alumniMixer2, alt: 'Cute mini group photo of attendees' },
            { src: alumniMixer3, alt: 'Alumni mixer attendees socializing' },
            { src: alumniMixer4, alt: 'Alumni mixer attendees socializing' },
        ],
    },
    {
        name: 'Cognitive Systems Lab Panel',
        year: 2025,
        description:
            'The CSS presented a unique opportunity to hear from undergrad panelists sharing their lab experience, projects, and how they got started in research. A night of curiosity, exploration, and networking, where students learned how to get involved with COGS-related labs at UBC, SFU, and beyond!',
        photos: [
            { src: labPanel1, alt: 'Lab panelists making the word "COGS" with their arms for a photo' },
            { src: labPanel2, alt: 'Lab panelist speaking to students' },
            { src: labPanel3, alt: 'Students gathering to learn about COGS-related research' },
            { src: labPanel4, alt: 'Lab panelist speaking to students' },
        ],
    },
    {
        name: 'Meet The Profs 2025/26',
        year: 2025,
        description: 'An annual evening of COGSy vibes, great convos, and even better company! Chat with professors and peers across the COGS disciplines in a casual setting and snag some free food!',
        photos: [
            { src: meetTheProfs6, alt: 'Students and professors socializing' },
            { src: meetTheProfs1, alt: 'Student posing for a photo with a fry in her mouth' },
            { src: meetTheProfs2, alt: 'Students and professors socializing' },
            { src: meetTheProfs3, alt: 'A mini group photo with some professors and students' },
            { src: meetTheProfs4, alt: 'Students and professors competing in a fun game of trivia' },
            { src: meetTheProfs5, alt: 'A beautiful interaction between two friends in the COGS community' },
            { src: meetTheProfs7, alt: 'A cute mini group photo of students' },
        ],
    },
    {
        name: 'Interyear Mingle 2025/26',
        year: 2025,
        description: 'This night gave upper year and lower year COGS students a chance to meet all across the COGS discipline! An evening of making friends, sharing laughs, and trading stories over food and games.',
        photos: [
            { src: interYear1, alt: 'An upper year COGS student teaching lower years how to use a circuit board' },
            { src: interYear2, alt: 'Two students bonding over a silly sign' },
            { src: interYear3, alt: 'Students working together on a poster to decorate the COGS lounge' },
            { src: interYear4, alt: 'Students participating in a fun icebreaker' },
        ],
    },
    {
        name: 'Gearing Up for 402 2025/26',
        year: 2025,
        description:
            'Professors and COGS alumni come together to help current COGS students prepare for COGS 402, the final boss of your Cognitive Systems degree. Whether you’re in need of project ideas, a project supervisor, or just want to get ahead of the curve, Gearing Up for 402 helps students get inspired by alumni who have been there, done that, and crushed it!',
        photos: [
            { src:gearingUp1, alt: 'Panelists at gearing up for 402' },
            { src:gearingUp2, alt: 'Students listening intentively to panelists sharing their experience' },
            { src:gearingUp3, alt: 'A Panelist speaking at gearing up for 402' },
            { src:gearingUp4, alt: 'A Panelist speaking at gearing up for 402' },
        ],
    },
    {
        name: 'CSS x AI Safety Club: Interdisciplinary Panel',
        year: 2025,
        description:
            'The CSS and UBC’s AI Safety Club hosted an interdisciplinary panel focused on all things AI Safety, ranging from industry experience to academic navigation and career considerations! It featurerd networking opportunities with working AI professionals, a Q&A session, and, of course, free food!',
        photos: [
            { src: aiSafety2, alt: 'Panelists at the interdisciplinary panel' },
            { src: aiSafety1, alt: 'Food at the interdisciplinary panel' },
            { src: aiSafety3, alt: 'Students at the interdisciplinary panel' },
            { src: aiSafety4, alt: 'Students getting to socialize' },
            { src: aiSafety5, alt: 'Students lining up for the amazing complementary food' },
        ],
    },
    {
        name: 'COGS-querade: The CSS Winter Formal 2025/26',
        year: 2025,
        description:
            'The Winter COGS-querade Formal was an end-of-term themed celebration, bringing together the entire COGS community for an unforgettable night of music and memories.',
        photos: [
            { src: cogsquerade1, alt: 'Students socializing with their masquerade masks on' },
            { src: cogsquerade2, alt: 'The COGSquerade photobooth' },
            { src: cogsquerade3, alt: 'Execs are having fun too!' },
            { src: cogsquerade4, alt: 'Two men holding each other in a lovers embrace' },
            { src: cogsquerade5, alt: 'Students playing limbo' },
            { src: cogsquerade6, alt: 'Students gather in a circle to play musical chairs' },
        ],
    },
    {
        name: 'Robot Party 2025/26',
        year: 2025,
        description:
            'The largest social event of the year! Our annual Robot Party consists of amazing free food, drinks, activities, a robot building contest, prizes, games, and much more! Each year’s Robot Party is always one for the memory books!',
        photos: [
            { src: robotparty1, alt: 'Students lined up for their free chicken and drinks' },
            { src: robotparty2, alt: 'Students posing with their free chicken and drinks' },
            { src: robotparty3, alt: 'Two students playing a game of beer pong (without the beer)' },
            { src: robotparty4, alt: 'Students gathered around the projector playing a game of Mario Cart' },
            { src: robotparty5, alt: 'Students posing with their free chicken and drinks' },
            { src: robotparty6, alt: 'Student gives her friend a piggy-back' },
            { src: robotparty7, alt: 'A participant of the robot costume contest being led down the runway' },
            { src: robotparty8, alt: 'Participant of the robot costume contest gather for a group photo' },
            { src: robotparty9, alt: 'The execs are cutting up ...a cake for dessert' },
            { src: robotparty10, alt: 'A group photo of almost all of the 2025/26 exec team wrapping up the party' },
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
