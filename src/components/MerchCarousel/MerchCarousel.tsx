import { useEffect, useState } from 'react'
import './MerchCarousel.css'

export interface MerchCarouselImage {
    alt: string
    /** Left unset until a real product photo exists — renders a labeled
     * dashed-border placeholder instead of an <img>, same pattern as
     * FolderPreview's photo slots (transparent/borderless once a real photo
     * is set, via the .merch-carousel-slot:has(img) rule in the stylesheet). */
    src?: string
}

interface MerchCarouselProps {
    images: MerchCarouselImage[]
    /** How long each photo stays on screen before auto-advancing. */
    intervalMs?: number
}

function MerchCarousel({ images, intervalMs = 3200 }: MerchCarouselProps) {
    const [index, setIndex] = useState(0)
    const [isPaused, setIsPaused] = useState(false)

    const showPrev = () => setIndex((current) => (current - 1 + images.length) % images.length)
    const showNext = () => setIndex((current) => (current + 1) % images.length)

    // Auto-cycles on a timer, but pauses on hover/focus (a deliberate user
    // interaction, so it's fine to keep moving) and stops entirely for
    // prefers-reduced-motion — same reduced-motion carve-out reasoning as
    // FolderPreview's hover-triggered reveal.
    useEffect(() => {
        if (isPaused || images.length <= 1) return
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

        const id = window.setInterval(() => {
            setIndex((current) => (current + 1) % images.length)
        }, intervalMs)
        return () => window.clearInterval(id)
    }, [isPaused, images.length, intervalMs])

    return (
        <div
            className="merch-carousel"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocus={() => setIsPaused(true)}
            onBlur={() => setIsPaused(false)}
        >
            <div className="merch-carousel-frame">
                {images.map((image, photoIndex) => (
                    <div
                        key={image.alt}
                        className={`merch-carousel-slot ${photoIndex === index ? 'is-active' : ''}`}
                        aria-hidden={photoIndex === index ? undefined : true}
                    >
                        {image.src ? <img src={image.src} alt={image.alt} /> : <span>{image.alt}</span>}
                    </div>
                ))}

                {images.length > 1 && (
                    <>
                        <button
                            type="button"
                            className="merch-carousel-arrow merch-carousel-arrow-prev"
                            onClick={showPrev}
                            aria-label="Previous merch photo"
                        >
                            ‹
                        </button>
                        <button
                            type="button"
                            className="merch-carousel-arrow merch-carousel-arrow-next"
                            onClick={showNext}
                            aria-label="Next merch photo"
                        >
                            ›
                        </button>
                    </>
                )}
            </div>

            {images.length > 1 && (
                <div className="merch-carousel-dots">
                    {images.map((image, photoIndex) => (
                        <button
                            key={image.alt}
                            type="button"
                            className={`merch-carousel-dot ${photoIndex === index ? 'is-active' : ''}`}
                            onClick={() => setIndex(photoIndex)}
                            aria-label={`Show photo ${photoIndex + 1} of ${images.length}`}
                            aria-current={photoIndex === index}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default MerchCarousel
