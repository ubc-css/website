import { preload } from 'react-dom'
import ExecCard from '../../components/ExecCard/ExecCard'
import LoungeCarousel, { type LoungeCarouselImage } from '../../components/LoungeCarousel/LoungeCarousel'
import SocialLinks from '../../components/SocialLinks/SocialLinks'
import loungePhoto from '../../assets/about/lounge.jpg'
import './About.css'

// Reuses the one real lounge photo already in the site (also used by the
// homepage's "About" folder preview) as one of the four sneak-peek slots —
// same "reuse the few real photos we have" approach as Merch/Past Events'
// placeholder cards — with the rest left as placeholders, since that's the
// only lounge-specific photo currently on hand.
const sneakPeekImages: LoungeCarouselImage[] = [
    { src: loungePhoto, alt: 'A cozy little corner in our beloved COGS Lounge' },
    { alt: 'Lounge sneak peek photo placeholder' },
    { alt: 'Lounge sneak peek photo placeholder' },
    { alt: 'Lounge sneak peek photo placeholder' },
]

// Same fix as Merch.tsx's carousel: LoungeCarousel starts scrolling the
// instant it mounts, so the one real photo in the strip needs its fetch (and
// decode) kicked off as early as possible, or the strip's second lap can
// visibly outrun it. See Merch.tsx / CLAUDE.md for the full explanation.
sneakPeekImages.forEach((image) => {
    if (!image.src) return
    preload(image.src, { as: 'image', fetchPriority: 'high' })
    const decoder = new Image()
    decoder.src = image.src
    void decoder.decode?.().catch(() => {})
})

// Placeholder roster — titles are real, names/photos are stand-ins until the
// club has a real one. `name` left undefined renders no sub-header at all
// (used below for the not-yet-filled coordinator roles instead of a fake
// name).
const president = { title: 'President', name: 'Firstname Lastname' }

const vpTeam = [
    { title: 'VP Admin', name: 'Firstname Lastname' },
    { title: 'VP Finance', name: 'Firstname Lastname' },
    { title: 'VP Events', name: 'Firstname Lastname' },
    { title: 'VP Media', name: 'Firstname Lastname' },
]

const directors = [
    { title: 'Social Director', name: 'Firstname Lastname' },
    { title: 'Academic Director', name: 'Firstname Lastname' },
    { title: 'Industry Director', name: 'Firstname Lastname' },
]

// Not individual people — 2 open seats each, grouped under one title with a
// shared "Coming Soon" stamp rather than ExecCard's per-person photo+name.
const coordinatorGroups = [
    { title: 'Event Coordinators' },
    { title: 'Media Coordinators' },
]

function About() {
    return (
        <section className="about">
            <div className="about-hero">
                {/* Title spans the full hero width on its own line, with the
                    mission statement and photo as a side-by-side row
                    underneath it — rather than the title sharing the left
                    column with just the mission text. */}
                <h1 className="about-hero-title">Meet the CSS</h1>

                <div className="about-hero-content">
                    <div className="about-hero-copy">
                        <p className="about-hero-mission">
                            “Placeholder mission statement — a short line about what the
                            Cognitive Systems Society exists to do, and who it's for.”
                        </p>
                    </div>

                    <div className="about-hero-image" aria-hidden="true">
                        <span>CSS exec team photo placeholder</span>
                    </div>
                </div>

                {/* Wraps the nav in the leftover vertical space below the
                    mission/photo row, down to the hero's own bottom edge
                    (the bottom of the initial viewport, since the hero fills
                    it) — .about-hero-nav-spacer grows to fill exactly that
                    space (flex: 1) and centers the nav inside it, so the nav
                    sits vertically centered between the mission statement and
                    the bottom of the screen, on any window size, rather than
                    at a fixed offset from either edge. */}
                <div className="about-hero-nav-spacer">
                    {/* Native #fragment anchors + the site-wide smooth-scroll
                        from index.css — same approach as the Merch page's own
                        .merch-section-nav. Ids match the placeholder hrefs
                        Header.tsx/Footer.tsx's "About" nav items already used
                        before this page existed (#team/#thelounge/#contact),
                        now pointed at /about instead of a bare fragment. */}
                    <nav className="about-section-nav" aria-label="Jump to about section">
                        <a href="#team">Our Team</a>
                        <span className="about-section-nav-divider" aria-hidden="true">|</span>
                        <a href="#thelounge">The Lounge</a>
                        <span className="about-section-nav-divider" aria-hidden="true">|</span>
                        <a href="#contact">Contact Us</a>
                    </nav>
                </div>
            </div>

            <div className="about-section" id="team">
                <h2>Our Team</h2>

                <div className="exec-tier exec-tier-president">
                    <ExecCard
                        title={president.title}
                        name={president.name}
                        photoAlt={`${president.title} headshot placeholder`}
                    />
                </div>

                <div className="exec-tier">
                    {vpTeam.map((exec) => (
                        <ExecCard
                            key={exec.title}
                            title={exec.title}
                            name={exec.name}
                            photoAlt={`${exec.title} headshot placeholder`}
                        />
                    ))}
                </div>

                <div className="exec-tier">
                    {directors.map((exec) => (
                        <ExecCard
                            key={exec.title}
                            title={exec.title}
                            name={exec.name}
                            photoAlt={`${exec.title} headshot placeholder`}
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
                    opens in September 2026! More info can be found on our{' '}
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

                <div className="lounge-map" aria-hidden="true">
                    <span>Map placeholder — embed a real map here</span>
                </div>

                <div className="lounge-details">
                    {/* Fake location/hours for now, per instruction — swap for
                        the club's real ones once confirmed. */}
                    <p>
                        <strong>Location:</strong> ICICS Building, Room X050 — UBC Point Grey
                        Campus
                    </p>
                    <p>
                        <strong>Hours:</strong> Monday–Friday, 10:00 AM – 4:00 PM
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
                    <a className="about-inline-link" href="#">
                        connect with our VP Finance
                    </a>
                    .
                </p>
            </div>
        </section>
    )
}

export default About
