import { useEffect, useRef } from 'react'
import './LoungeCarousel.css'

export interface LoungeCarouselImage {
    alt: string
    /** Left unset until a real photo exists — renders a labeled dashed-border
     * placeholder instead of an <img>, same pattern as MerchCarousel's photo
     * slots. */
    src?: string
}

interface LoungeCarouselProps {
    images: LoungeCarouselImage[]
    /** Pixels per second while nothing is hovering/focusing the strip. */
    speed?: number
    /** Pixels per second while hovered/focused — slower, but still moving
     * (never a full stop). */
    hoverSpeed?: number
}

// The About page's "Sneak peek" strip — same continuously-auto-scrolling
// marquee behavior as MerchCarousel (rAF writing translateX directly onto the
// track each frame, since a CSS @keyframes version of this was found to
// silently stall in some browser contexts; see MerchCarousel for the same
// note). Reimplemented here under its own name/classnames rather than
// importing MerchCarousel directly — this codebase's convention is for each
// section to own its small hand-rolled carousel rather than share one
// generic component across unrelated pages (see MerchProductCard's carousel
// vs PastEventCard's own, documented in CLAUDE.md, for the same
// choice).
function LoungeCarousel({ images, speed = 70, hoverSpeed = 18 }: LoungeCarouselProps) {
    const trackRef = useRef<HTMLDivElement | null>(null)
    const offset = useRef(0)
    const isHovered = useRef(false)

    // The image list rendered twice back to back, so the strip can scroll a
    // full loop (0 to -halfWidth) and jump back to 0 seamlessly — the second
    // half is a copy of the first, so the reset is invisible.
    const loopedImages = [...images, ...images]

    useEffect(() => {
        const track = trackRef.current
        if (!track) return

        let rafId: number
        let lastTime: number | null = null

        const step = (time: number) => {
            if (lastTime === null) lastTime = time
            const deltaSeconds = (time - lastTime) / 1000
            lastTime = time

            const currentSpeed = isHovered.current ? hoverSpeed : speed
            const halfWidth = track.scrollWidth / 2
            offset.current += currentSpeed * deltaSeconds
            if (halfWidth > 0 && offset.current >= halfWidth) {
                offset.current -= halfWidth
            }
            track.style.transform = `translateX(${-offset.current}px)`

            rafId = requestAnimationFrame(step)
        }

        rafId = requestAnimationFrame(step)
        return () => cancelAnimationFrame(rafId)
    }, [speed, hoverSpeed])

    return (
        <div
            className="lounge-carousel"
            onMouseEnter={() => {
                isHovered.current = true
            }}
            onMouseLeave={() => {
                isHovered.current = false
            }}
            onFocus={() => {
                isHovered.current = true
            }}
            onBlur={() => {
                isHovered.current = false
            }}
        >
            <div
                ref={trackRef}
                className="lounge-carousel-track"
                // Decorative repeat — there's nothing else on the page that
                // needs these announced twice.
                aria-hidden="true"
            >
                {loopedImages.map((image, index) => (
                    <div className="lounge-carousel-item" key={`${image.alt}-${index}`}>
                        {image.src ? (
                            <img src={image.src} alt="" loading="eager" fetchPriority="high" decoding="sync" />
                        ) : (
                            <span>{image.alt}</span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default LoungeCarousel
