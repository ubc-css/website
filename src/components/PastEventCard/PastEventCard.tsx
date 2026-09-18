import { useState } from 'react'
import { useInView } from '../../hooks/useInView'
import { formatAcademicYear } from './formatAcademicYear'
import './PastEventCard.css'

export interface EventPhoto {
    src: string
    alt: string
}

export interface PastEventCardProps {
    name: string
    description: string
    /** The academic year's starting calendar year (e.g. 2025 for "2025/26") —
     * a real number so it sorts/filters correctly, not a display string. */
    year: number
    photos: EventPhoto[]
}

function PastEventCard({ name, description, year, photos }: PastEventCardProps) {
    const [index, setIndex] = useState(0)
    const { ref, isInView } = useInView<HTMLDivElement>(0.15)

    const showPrev = () => setIndex((current) => (current - 1 + photos.length) % photos.length)
    const showNext = () => setIndex((current) => (current + 1) % photos.length)

    return (
        <div ref={ref} className={`event-card ${isInView ? 'is-visible' : ''}`}>
            <span className="event-card-tab" aria-hidden="true" />

            <div className="event-card-body">
                {/* Title + year grouped so the year sits tight under the name
                    instead of taking the body's full 12px gap. The year comes
                    from the numeric `year` field rather than the name, so it
                    shows on every card with the same formatting as the
                    year filter. */}
                <div className="event-card-heading">
                    <h3>{name}</h3>
                    <p className="event-card-year">{formatAcademicYear(year)}</p>
                </div>
                <p>{description}</p>
            </div>

            <div className="event-carousel">
                <div className="event-carousel-frame">
                    <img src={photos[index].src} alt={photos[index].alt} />

                    {photos.length > 1 && (
                        <>
                            <button
                                type="button"
                                className="event-carousel-arrow event-carousel-arrow-prev"
                                onClick={showPrev}
                                aria-label={`Previous photo of ${name}`}
                            >
                                ‹
                            </button>
                            <button
                                type="button"
                                className="event-carousel-arrow event-carousel-arrow-next"
                                onClick={showNext}
                                aria-label={`Next photo of ${name}`}
                            >
                                ›
                            </button>
                        </>
                    )}
                </div>

                {photos.length > 1 && (
                    <div className="event-carousel-dots">
                        {photos.map((photo, photoIndex) => (
                            <button
                                key={photo.src + photoIndex}
                                type="button"
                                className={`event-carousel-dot ${photoIndex === index ? 'is-active' : ''}`}
                                onClick={() => setIndex(photoIndex)}
                                aria-label={`Show photo ${photoIndex + 1} of ${photos.length}`}
                                aria-current={photoIndex === index}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default PastEventCard
