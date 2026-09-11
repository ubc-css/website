import { useState } from 'react'
import { useInView } from '../../hooks/useInView'
import './MerchProductCard.css'

export interface MerchProductImage {
    alt: string
    /** Left unset until a real product photo exists — renders a labeled
     * placeholder box instead of an <img>, same pattern as FolderPreview's
     * photo slots. */
    src?: string
    /** Overrides the crop anchor for Clothing's `object-fit: cover` (see
     * MerchProductCard.css) — a CSS `object-position` value. Left unset to
     * use the default center crop, right for most photos; a portrait photo
     * like the zip-up hoodie's crops top and bottom evenly by default,
     * which can cut into the hood/collar near the top of frame, so those
     * use `'top'` to crop the (less important) hem instead. */
    objectPosition?: string
}

export interface MerchProductCardProps {
    name: string
    description: string
    price: string
    /** The year this product was added to the catalog — used only for the
     * section's oldest/newest sort in Merch.tsx, never rendered on the card
     * itself (there's no "year" shown anywhere in the UI). */
    year: number
    /** A product category (e.g. "Hoodie", "Sticker") — like `year`, this
     * exists purely for `Merch.tsx`'s "Group by Type" filter dropdown and is
     * never rendered on the card itself. Free-form rather than a fixed union
     * of Clothing/Accessories values, since this same props type covers
     * both sections. */
    type: string
    /** One photo renders exactly like before (plain static image, no
     * controls). More than one adds prev/next arrows + dot indicators —
     * same hand-rolled carousel as PastEventCard. */
    images: MerchProductImage[]
}

function MerchProductCard({ name, description, price, images }: MerchProductCardProps) {
    const [index, setIndex] = useState(0)
    const { ref, isInView } = useInView<HTMLDivElement>(0.15)

    const showPrev = () => setIndex((current) => (current - 1 + images.length) % images.length)
    const showNext = () => setIndex((current) => (current + 1) % images.length)

    const currentImage = images[index]

    return (
        <div ref={ref} className={`merch-product-card ${isInView ? 'is-visible' : ''}`}>
            {/* A paperclip pinned vertically over the CARD's own top edge —
                the rectangle sitting behind the photo, not just the photo
                itself — so the loop pokes out above the whole card, like it's
                physically clipped onto it. Replaces EventCard/UpcomingEventCard's
                flat folder tab for a bit of 3D "clipped file" depth rather than
                a folder. Rotated -45deg: the underlying glyph's hook-to-tip axis
                runs at a 45deg diagonal by default (a generic paperclip icon
                shape), so this straightens it to point the loop straight up. */}
            <svg
                className="merch-product-clip"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
            >
                <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
            </svg>

            <div className="merch-product-carousel">
                <div className="merch-product-image">
                    {currentImage.src ? (
                        <img
                            src={currentImage.src}
                            alt={currentImage.alt}
                            style={currentImage.objectPosition ? { objectPosition: currentImage.objectPosition } : undefined}
                        />
                    ) : (
                        <span>{currentImage.alt}</span>
                    )}

                    {images.length > 1 && (
                        <>
                            <button
                                type="button"
                                className="merch-product-carousel-arrow merch-product-carousel-arrow-prev"
                                onClick={showPrev}
                                aria-label={`Previous photo of ${name}`}
                            >
                                ‹
                            </button>
                            <button
                                type="button"
                                className="merch-product-carousel-arrow merch-product-carousel-arrow-next"
                                onClick={showNext}
                                aria-label={`Next photo of ${name}`}
                            >
                                ›
                            </button>
                        </>
                    )}
                </div>

                {images.length > 1 && (
                    <div className="merch-product-carousel-dots">
                        {images.map((image, photoIndex) => (
                            <button
                                key={image.alt + photoIndex}
                                type="button"
                                className={`merch-product-carousel-dot ${photoIndex === index ? 'is-active' : ''}`}
                                onClick={() => setIndex(photoIndex)}
                                aria-label={`Show photo ${photoIndex + 1} of ${images.length}`}
                                aria-current={photoIndex === index}
                            />
                        ))}
                    </div>
                )}
            </div>

            <div className="merch-product-body">
                <h3>{name}</h3>
                <p>{description}</p>
                <span className="merch-product-price">{price}</span>
            </div>
        </div>
    )
}

export default MerchProductCard
