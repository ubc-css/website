import { useEffect, useRef } from 'react'
import './MerchCarousel.css'

export interface MerchCarouselImage {
    alt: string
    /** Left unset until a real product photo exists — renders a labeled
     * dashed-border placeholder instead of an <img>, same pattern as
     * FolderPreview's photo slots (transparent/borderless once a real photo
     * is set, via the .merch-carousel-item:has(img) rule in the stylesheet). */
    src?: string
}

interface MerchCarouselProps {
    images: MerchCarouselImage[]
    /** Pixels per second while nothing is hovering/focusing the strip. */
    speed?: number
    /** Pixels per second while hovered/focused — slower, but still moving
     * (never a full stop). */
    hoverSpeed?: number
}

// A continuously auto-scrolling horizontal strip (no arrows, no dots, no
// discrete "slides" to click through) — same idea as ubcuxhub.ca's "people
// behind the process" team-photo marquee. Driven by requestAnimationFrame
// writing translateX directly onto the track (same approach Cursor.tsx uses
// for its continuous motion) rather than a CSS @keyframes animation.
// Deliberately does NOT stop for prefers-reduced-motion like the rest of the
// site's automatic motion does (FolderPreview's reveal, the old click-through
// carousel this replaced) — explicitly requested to always keep moving.
function MerchCarousel({ images, speed = 90, hoverSpeed = 22 }: MerchCarouselProps) {
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
            className="merch-carousel"
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
                className="merch-carousel-track"
                // Decorative — the same photos already have real alt text on
                // the Clothing/Accessories product cards below, so a screen
                // reader doesn't need to hear this repeating strip twice.
                aria-hidden="true"
            >
                {loopedImages.map((image, index) => (
                    <div className="merch-carousel-item" key={`${image.alt}-${index}`}>
                        {image.src ? <img src={image.src} alt="" /> : <span>{image.alt}</span>}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MerchCarousel
