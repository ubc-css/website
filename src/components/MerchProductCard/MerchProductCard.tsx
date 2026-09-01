import { useInView } from '../../hooks/useInView'
import './MerchProductCard.css'

export interface MerchProductCardProps {
    name: string
    description: string
    price: string
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
            <span className="merch-product-tab" aria-hidden="true" />

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
