import { useState } from 'react'
import { useInView } from '../../hooks/useInView'
import './EventCard.css'

export interface EventPhoto {
    src: string
    alt: string
}

export interface EventCardProps {
    name: string
    description: string
    year: string
    photos: EventPhoto[]
}

function EventCard({ name, description, photos }: EventCardProps) {
    const [index, setIndex] = useState(0)
    const { ref, isInView } = useInView<HTMLDivElement>(0.15)

    const showPrev = () => setIndex((current) => (current - 1 + photos.length) % photos.length)
    const showNext = () => setIndex((current) => (current + 1) % photos.length)

    return (
        <div ref={ref} className={`event-card ${isInView ? 'is-visible' : ''}`}>
            <span className="event-card-tab" aria-hidden="true" />

            <div className="event-card-body">
                <h3>{name}</h3>
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

export default EventCard
