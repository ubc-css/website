import { useInView } from '../../hooks/useInView'
import './MerchProductCard.css'

export interface MerchProductCardProps {
    name: string
    description: string
    price: string
    /** The year this product was added to the catalog — used only for the
     * section's oldest/newest sort in Merch.tsx, never rendered on the card
     * itself (there's no "year" shown anywhere in the UI). */
    year: number
    image: {
        alt: string
        /** Left unset until a real product photo exists — renders a labeled
         * placeholder box instead of an <img>, same pattern as FolderPreview's
         * photo slots. */
        src?: string
    }
}

function MerchProductCard({ name, description, price, image }: MerchProductCardProps) {
    const { ref, isInView } = useInView<HTMLDivElement>(0.15)

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

            <div className="merch-product-image">
                {image.src ? <img src={image.src} alt={image.alt} /> : <span>{image.alt}</span>}
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
