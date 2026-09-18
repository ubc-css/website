import { useState } from 'react'
import { useInView } from '../../hooks/useInView'
import { formatEventDate } from './formatEventDate'
import './UpcomingEventCard.css'

export interface UpcomingEventImage {
    alt: string
    /** Left unset until the club has a real graphic for this event — renders
     * a labeled placeholder box instead of an <img>, same pattern as
     * FolderPreview's photo slots. */
    src?: string
}

export interface UpcomingEventCardProps {
    name: string
    /** ISO date ("2026-09-12") — a real sortable value, not just a display
     * string, so the events list can be ordered soonest-first regardless of
     * how it's formatted for display. */
    date: string
    time: string
    location: string
    description: string
    /** One graphic renders exactly like before (plain static image, no
     * controls). More than one adds prev/next arrows + dot indicators — same
     * hand-rolled carousel as MerchProductCard and PastEventCard. */
    images: UpcomingEventImage[]
    /** The event's real external RSVP page (Luma, currently) — rendered as a
     * new-tab link, same as every other external link on the site. */
    rsvpHref: string
}

function UpcomingEventCard({ name, date, time, location, description, images, rsvpHref }: UpcomingEventCardProps) {
    const [index, setIndex] = useState(0)
    const { ref, isInView } = useInView<HTMLDivElement>(0.15)

    const showPrev = () => setIndex((current) => (current - 1 + images.length) % images.length)
    const showNext = () => setIndex((current) => (current + 1) % images.length)

    const currentImage = images[index]

    return (
        <div ref={ref} className={`upcoming-event-card ${isInView ? 'is-visible' : ''}`}>
            <span className="upcoming-event-tab" aria-hidden="true" />

            <div className="upcoming-event-carousel">
                <div className="upcoming-event-image">
                    {currentImage.src ? (
                        <img src={currentImage.src} alt={currentImage.alt} />
                    ) : (
                        <span>{currentImage.alt}</span>
                    )}

                    {images.length > 1 && (
                        <>
                            <button
                                type="button"
                                className="upcoming-event-carousel-arrow upcoming-event-carousel-arrow-prev"
                                onClick={showPrev}
                                aria-label={`Previous graphic for ${name}`}
                            >
                                ‹
                            </button>
                            <button
                                type="button"
                                className="upcoming-event-carousel-arrow upcoming-event-carousel-arrow-next"
                                onClick={showNext}
                                aria-label={`Next graphic for ${name}`}
                            >
                                ›
                            </button>
                        </>
                    )}
                </div>

                {images.length > 1 && (
                    <div className="upcoming-event-carousel-dots">
                        {images.map((image, imageIndex) => (
                            <button
                                key={image.alt + imageIndex}
                                type="button"
                                className={`upcoming-event-carousel-dot ${imageIndex === index ? 'is-active' : ''}`}
                                onClick={() => setIndex(imageIndex)}
                                aria-label={`Show graphic ${imageIndex + 1} of ${images.length}`}
                                aria-current={imageIndex === index}
                            />
                        ))}
                    </div>
                )}
            </div>

            <div className="upcoming-event-body">
                <h3>{name}</h3>

                {/* Date + time + location — each its own icon-labeled chip so
                    they read at a glance rather than blending into the
                    description's body text. */}
                <ul className="upcoming-event-meta">
                    <li>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                            <rect x="3" y="5" width="18" height="16" rx="2.5" />
                            <path d="M3 10h18M8 3v4M16 3v4" strokeLinecap="round" />
                        </svg>
                        {formatEventDate(date)}
                    </li>
                    <li>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                            <circle cx="12" cy="12" r="9" />
                            <path d="M12 7v5l3.5 2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {time}
                    </li>
                    <li>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                            <path d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21Z" strokeLinejoin="round" />
                            <circle cx="12" cy="9.5" r="2.5" />
                        </svg>
                        {location}
                    </li>
                </ul>
                <p className="upcoming-event-description">{description}</p>

                <div className="upcoming-event-actions">
                    {/* Opens in a new tab like every other external link on
                        the site (the "Become a member" link right below, the
                        header/footer CTAs, the social icons) — an RSVP goes
                        off to Luma, so keeping the event page itself open
                        behind it means nobody loses their place in the list
                        to come back and check the other events. */}
                    <a
                        className="rsvp-button"
                        href={rsvpHref}
                        target="_blank"
                        rel="noreferrer"
                    >
                        RSVP
                    </a>
                    <a
                        className="upcoming-member-link"
                        href="https://www.showpass.com/m/css-club-membership/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Become a member
                    </a>
                </div>
            </div>
        </div>
    )
}

export default UpcomingEventCard
