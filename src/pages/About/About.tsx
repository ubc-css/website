import { preload } from 'react-dom'
import ExecCard from '../../components/ExecCard/ExecCard'
import LoungeCarousel, { type LoungeCarouselImage } from '../../components/LoungeCarousel/LoungeCarousel'
import SocialLinks from '../../components/SocialLinks/SocialLinks'
import execsAndFaculty from '../../assets/about/execsAndFaculty.jpg'
// Exec headshots. Each is a square 640px crop (~45–65KB) — the source files
// were 4000×4000 phone exports at ~2MB each, which is ~10x more pixels than
// the 210px circle they render in ever needs.
import austynHeadshot from '../../assets/about/exec headshots/austyn.jpg'
import bonnieHeadshot from '../../assets/about/exec headshots/bonnie.jpg'
import edithHeadshot from '../../assets/about/exec headshots/edith.jpg'
import giannaHeadshot from '../../assets/about/exec headshots/gianna.jpg'
import jeffreyHeadshot from '../../assets/about/exec headshots/jeffrey.jpg'
import oliviaHeadshot from '../../assets/about/exec headshots/olivia.jpg'
import wrenlyHeadshot from '../../assets/about/exec headshots/wrenly.jpg'
import yolandaHeadshot from '../../assets/about/exec headshots/yolanda.jpg'
import loungePhoto from '../../assets/about/lounge.jpg'
import loungePhoto2 from '../../assets/about/lounge2.jpg'
import loungePhoto3 from '../../assets/about/lounge3.jpg'
import loungePhoto4 from '../../assets/about/lounge4.jpg'
import loungePhoto5 from '../../assets/about/lounge5.jpg'
import loungePhoto6 from '../../assets/about/lounge6.jpg'
import loungePhoto7 from '../../assets/about/lounge7.jpg'
import loungePhoto8 from '../../assets/about/lounge8.jpg'
import loungePhoto9 from '../../assets/about/lounge9.jpg'
import mapToIona from '../../assets/about/mapToIona.jpg'
import loungeFloorMap from '../../assets/about/Lounge-map.webp'
import './About.css'

// Above-the-fold hero content, so it's worth a head start on the fetch —
// same reasoning as Merch.tsx's carousel photos, just for a single static
// image instead of an auto-scrolling strip.
preload(execsAndFaculty, { as: 'image', fetchPriority: 'high' })

// 9 real lounge photos now on hand (2–9 started as iPhone HEIC exports —
// converted to JPEG, downscaled to a 1400px long edge, and re-compressed to
// match the rest of the site's photos, same ~100–200KB range) — no more
// placeholder slots needed.
const sneakPeekImages: LoungeCarouselImage[] = [
    { src: loungePhoto, alt: 'A cozy little corner in our beloved COGS Lounge' },
    { src: loungePhoto2, alt: 'The COGS Lounge’s couches and round tables, strung with pennant flags' },
    { src: loungePhoto3, alt: 'A reading nook in the COGS Lounge with a round red pod chair and floor-to-ceiling bookshelves' },
    { src: loungePhoto4, alt: 'Plant-covered shelves, a card catalog, and framed cohort photos in the COGS Lounge hallway' },
    { src: loungePhoto5, alt: 'The skylight over the COGS Lounge hallway' },
    { src: loungePhoto6, alt: 'A plant-filled corner of the COGS Lounge hallway near the exit' },
    { src: loungePhoto7, alt: 'A mannequin dressed as CSS mascot Robbie in a club hoodie, in the COGS lab' },
    { src: loungePhoto8, alt: 'The COGS Lounge lit up with colourful lights for a party' },
    { src: loungePhoto9, alt: 'A whiteboard doodle of Robbie and the UBC CSS logo above a bookshelf and plants in the COGS Lounge' },
]

// Same fix as Merch.tsx's carousel: LoungeCarousel starts scrolling the
// instant it mounts, so every real photo in the strip needs its fetch (and
// decode) kicked off as early as possible, or the strip's second lap can
// visibly outrun them. See Merch.tsx / CLAUDE.md for the full explanation.
sneakPeekImages.forEach((image) => {
    if (!image.src) return
    preload(image.src, { as: 'image', fetchPriority: 'high' })
    const decoder = new Image()
    decoder.src = image.src
    void decoder.decode?.().catch(() => {})
})

// The real roster. `photo` is left unset for anyone who hasn't submitted a
// headshot yet — ExecCard falls back to its dashed placeholder circle for
// those, so the roster can fill in one person at a time without any other
// change here. `name` left undefined renders no sub-header at all (used below
// for the not-yet-filled coordinator roles instead of a fake name).
const president = { title: 'President', name: 'Bonnie Situ', photo: bonnieHeadshot }

const vpTeam = [
    { title: 'VP Admin', name: 'Olivia Kennell', photo: oliviaHeadshot },
    { title: 'VP Finance', name: 'Yolanda Peng', photo: yolandaHeadshot },
    { title: 'VP Events', name: 'Jeffrey Kim', photo: jeffreyHeadshot },
    { title: 'VP Media', name: 'Gianna Li', photo: giannaHeadshot },
]

const directors: { title: string; name: string; photo?: string }[] = [
    { title: 'Social Director', name: 'Austyn Jasper', photo: austynHeadshot },
    { title: 'Academic Director', name: 'Edith Liu', photo: edithHeadshot },
    { title: 'Industry Director', name: 'Wrenly Crampton', photo: wrenlyHeadshot },
]

/** A real headshot gets alt text naming the person; a missing one keeps the
 * "…headshot placeholder" wording, which is what the dashed placeholder box
 * actually renders as its visible label. */
const execPhotoAlt = (person: { title: string; name?: string; photo?: string }) =>
    person.photo ? `${person.name}, ${person.title}` : `${person.title} headshot placeholder`

// Not individual people — 2 open seats each, grouped under one title with a
// shared "Coming Soon" stamp rather than ExecCard's per-person photo+name.
const coordinatorGroups = [
    { title: 'Event Coordinators' },
    { title: 'Media Coordinators' },
]

function About() {
    return (
        <section className="about">
            {/* .about-hero itself is now just the full-bleed color-wash box
                (same recipe as Merch's .merch-hero) — the actual content
                sits inside .about-hero-inner, which puts it back at the
                site's normal 1180px content width instead of letting the
                mission/photo row and title stretch edge-to-edge with the
                background. */}
            <div className="about-hero">
                <div className="about-hero-inner">
                    {/* Same eyebrow-label pattern as Merch's .merch-hero-eyebrow
                        (small caps kicker + a short gradient line) — reimplemented
                        under its own class rather than shared, same reasoning as
                        Merch's own copy of it (Hero.css's h1 leak bug). Paired
                        with the title directly since it's the thing being
                        introduced here, even though About's title (unlike
                        Merch's) sits outside .about-hero-copy on its own line. */}
                    <p className="about-hero-eyebrow">Our Mission, Team, and Lounge</p>

                    {/* Title spans the full hero width on its own line, with the
                        mission statement and photo as a side-by-side row
                        underneath it — rather than the title sharing the left
                        column with just the mission text. */}
                    <h1 className="about-hero-title">Meet the CSS</h1>

                    <div className="about-hero-content">
                        <div className="about-hero-copy">
                            <p className="about-hero-mission">
                                The Cognitive Systems Society (CSS) is the student hub
                                 for students of the COGS program and those interested
                                 in cognitive systems. Our mission is to connect like-minded students with social, academic, and industry opportunities!
                            </p>
                        </div>

                        <div className="about-hero-image">
                            <img src={execsAndFaculty} alt="The CSS exec team and faculty on a beach in Vancouver" />
                        </div>
                    </div>

                    {/* Takes all the vertical space left in the hero after the
                        eyebrow/title/content row (i.e. everything down to the
                        bottom of the first screen, since .about-hero-inner
                        fills it) and centers the nav inside it — so the links
                        sit exactly halfway between the mission/photo row and
                        the bottom of the window at any size, rather than at a
                        fixed offset that only reads right on one screen. */}
                    <div className="about-hero-nav-spacer">
                        {/* Native #fragment anchors + the site-wide smooth-scroll
                            from index.css — same approach as the Merch page's own
                            .merch-section-nav. Ids match the placeholder hrefs
                            Header.tsx/Footer.tsx's "About" nav items already used
                            before this page existed (#team/#thelounge/#contact), now
                            pointed at /about instead of a bare fragment. */}
                        <nav className="about-section-nav" aria-label="Jump to about section">
                            <a href="#team">Our Team</a>
                            <span className="about-section-nav-divider" aria-hidden="true">|</span>
                            <a href="#thelounge">The Lounge</a>
                            <span className="about-section-nav-divider" aria-hidden="true">|</span>
                            <a href="#contact">Contact Us</a>
                        </nav>
                    </div>
                </div>
            </div>

            <div className="about-section" id="team">
                <h2>Our 2026/27 Exec Team</h2>
                {/* Deliberately quieter than .about-hero-eyebrow's small-caps
                    kicker — see .about-section-subtitle's own rule for why
                    these two "same idea, different volume" treatments aren't
                    shared. */}
                <p className="about-section-subtitle">The Cogs that power the club</p>

                <div className="exec-tier exec-tier-president">
                    <ExecCard
                        title={president.title}
                        name={president.name}
                        photoSrc={president.photo}
                        photoAlt={execPhotoAlt(president)}
                    />
                </div>

                <div className="exec-tier">
                    {vpTeam.map((exec) => (
                        <ExecCard
                            key={exec.title}
                            title={exec.title}
                            name={exec.name}
                            photoSrc={exec.photo}
                            photoAlt={execPhotoAlt(exec)}
                        />
                    ))}
                </div>

                <div className="exec-tier">
                    {directors.map((exec) => (
                        <ExecCard
                            key={exec.title}
                            title={exec.title}
                            name={exec.name}
                            photoSrc={exec.photo}
                            photoAlt={execPhotoAlt(exec)}
                        />
                    ))}
                </div>

                <div className="exec-tier exec-tier-coordinators">
                    {/* Spans the whole tier rather than being per-card — these
                        4 seats aren't filled yet, so one shared stamp reads
                        better than repeating "coming soon" 4 times. */}
                    <span className="coming-soon-stamp">Coming Soon</span>
                    {coordinatorGroups.map((group) => (
                        <div className="coordinator-group" key={group.title}>
                            <div className="coordinator-photos">
                                <div className="coordinator-photo" aria-hidden="true">
                                    <span>Position open</span>
                                </div>
                                <div className="coordinator-photo" aria-hidden="true">
                                    <span>Position open</span>
                                </div>
                            </div>
                            <span className="exec-title">{group.title}</span>
                        </div>
                    ))}
                </div>

                <p className="about-note">
                    Want to be more involved with the CSS? Event and Media Coordinator hiring
                    is now open! More info can be found on our{' '}
                    <a
                        className="about-inline-link"
                        href="https://www.instagram.com/cogsubc/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Instagram
                    </a>
                    .
                </p>
            </div>

            <div className="about-section" id="thelounge">
                <h2>The COGS Lounge</h2>
                <p className="about-section-subtitle">The perfect place to get your gears turning</p>

                {/* <figure>/<figcaption> rather than a plain <img> + separate
                    label — the caption is genuinely describing the image next
                    to it, which is exactly what figcaption is for, and it
                    keeps the visible label and the alt text (which stays as
                    the fuller, standalone description for screen readers)
                    from just duplicating each other. */}
                <figure className="lounge-map">
                    <img
                        src={mapToIona}
                        alt="Campus map showing the 120m walking route from Great Dane's Coffee to the COGS Lounge entrance in the Iona Building"
                    />
                    <figcaption>How to get to the Iona basement</figcaption>
                </figure>

                {/* Where exactly inside the building, now that the map above
                    gets you to the entrance — the Lounge's own floor plan,
                    alongside the lab, kitchen, and offices it shares a floor
                    with. */}
                <figure className="lounge-floor-map">
                    <img
                        src={loungeFloorMap}
                        alt="Floor plan of the COGS Lounge floor: the Lounge itself, the B151 lab, the B152 TA office, the kitchen, Colleen and Dr. Mole's offices, washrooms, and the stairwell/elevator"
                    />
                    <figcaption>Floor plan of the COGS Lounge</figcaption>
                </figure>

                <div className="lounge-details">
                    {/* Hours are still made up, per instruction — swap for the
                        real ones once confirmed. Location now matches the real
                        map above (Iona Building) rather than the earlier
                        placeholder guess; exact room number isn't labeled on
                        either map, so it's left out rather than invented. */}
                    <p>
                        <strong>Location:</strong> Iona Building — UBC Point Grey Campus <br></br> 6000 Iona Dr, Vancouver, BC, V6T 1L4, Room B150
                    </p>
                    <p>
                        <strong>Hours:</strong> Monday–Friday, 7:30 AM – 5:00 PM
                    </p>
                </div>

                <h3 className="lounge-sneak-peek-title">Sneak peek 👀</h3>
                <LoungeCarousel images={sneakPeekImages} />
            </div>

            <div className="about-section about-contact" id="contact">
                <h2>Contact Us!</h2>
                <SocialLinks />
                <p className="about-note">
                    Interested in sponsoring?{' '}
                    {/* Placeholder — swap for a real VP Finance contact
                        (mailto or a contact form) once one exists. */}
                    <a className="about-inline-link" href="mailto:cogsubcfinance@gmail.com">
                        connect with our VP Finance
                    </a>
                    .
                </p>
            </div>
        </section>
    )
}

export default About
