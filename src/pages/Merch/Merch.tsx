import MerchCarousel from '../../components/MerchCarousel/MerchCarousel'
import MerchProductCard, { type MerchProductCardProps } from '../../components/MerchProductCard/MerchProductCard'
import merchHoodies from '../../assets/merch/MerchHoodies.png'
import merchKeychain from '../../assets/merch/MerchKeychain.png'
import merchStickers from '../../assets/merch/MerchStickers.png'
import './Merch.css'

// Cycles through the site's existing real merch photos for the hero
// carousel — same "reuse the few real photos we have" approach as Past
// Events' placeholder cards.
const carouselImages = [
    { src: merchHoodies, alt: '2025/2026 CSS zip-up hoodies' },
    { src: merchStickers, alt: 'COGS stickers and pins' },
    { src: merchKeychain, alt: 'Cute Robbie keychain' },
]

// Placeholder catalog — names/descriptions/prices are all stand-ins until the
// club has a real product lineup. Ordered newest-first (left to right, top
// row first) per the layout sketch's "ordered from newest to oldest" note.
const clothingItems: MerchProductCardProps[] = [
    {
        name: 'CSS Zip-Up Hoodie',
        description: 'Placeholder description: a cozy embroidered zip-up in the club colors, our newest drop.',
        price: '$45',
        image: { src: merchHoodies, alt: '2025/2026 CSS zip-up hoodie' },
    },
    {
        name: 'COGS Crewneck',
        description: 'Placeholder description: a classic crewneck sweater with the COGS logo across the chest.',
        price: '$40',
        image: { src: merchHoodies, alt: 'COGS crewneck sweater' },
    },
    {
        name: 'Classic CSS Tee',
        description: 'Placeholder description: our original club tee — soft cotton, screen-printed logo.',
        price: '$25',
        image: { src: merchHoodies, alt: 'Classic CSS t-shirt' },
    },
]

const accessoryItems: MerchProductCardProps[] = [
    {
        name: 'Robbie Enamel Pin',
        description: 'Placeholder description: a hard enamel pin of our mascot Robbie, perfect for a tote or lanyard.',
        price: '$8',
        image: { src: merchKeychain, alt: 'Robbie enamel pin' },
    },
    {
        name: 'COGS Sticker Pack',
        description: 'Placeholder description: a set of 5 vinyl stickers featuring COGS-themed designs.',
        price: '$6',
        image: { src: merchStickers, alt: 'COGS sticker pack' },
    },
    {
        name: 'Robbie Keychain',
        description: 'Placeholder description: a mini acrylic charm of Robbie to clip onto your bag or keys.',
        price: '$10',
        image: { src: merchKeychain, alt: 'Robbie keychain' },
    },
]

function Merch() {
    return (
        <section className="merch">
            <div className="merch-hero">
                <h1>The CSS Has Merch!</h1>

                <MerchCarousel images={carouselImages} />

                {/* Native #fragment anchors + the site-wide smooth-scroll from
                    index.css — same approach as the homepage's "Learn what CSS
                    does" link and ScrollCue, no JS scroll handler needed. */}
                <nav className="merch-section-nav" aria-label="Jump to merch section">
                    <a href="#clothing">Clothing</a>
                    <span className="merch-section-nav-divider" aria-hidden="true">|</span>
                    <a href="#accessories">Accessories</a>
                    <span className="merch-section-nav-divider" aria-hidden="true">|</span>
                    <a href="#purchasing">Purchasing Swag</a>
                </nav>
            </div>

            <div className="merch-section" id="clothing">
                <h2>Clothing</h2>
                <div className="merch-grid">
                    {clothingItems.map((item) => (
                        <MerchProductCard key={item.name} {...item} />
                    ))}
                </div>
            </div>

            <div className="merch-section" id="accessories">
                <h2>Accessories</h2>
                <div className="merch-grid">
                    {accessoryItems.map((item) => (
                        <MerchProductCard key={item.name} {...item} />
                    ))}
                </div>
            </div>

            <div className="merch-purchase" id="purchasing">
                <h2>Like What You See?</h2>

                <div className="merch-purchase-options">
                    <div className="merch-purchase-option">
                        <span className="merch-purchase-option-label">Option 1</span>
                        <p>Fill in this online order form and pick up your swag at our next event!</p>
                        {/* Placeholder href — swap for the club's real external
                            order form link once one exists. */}
                        <a className="merch-order-button" href="#" target="_blank" rel="noreferrer">
                            Order Now!
                        </a>
                    </div>

                    <div className="merch-purchase-option">
                        <span className="merch-purchase-option-label">Option 2</span>
                        <p>
                            Buy in person at our merch booth, happening once per term (keep an eye out!), or
                            at select events.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Merch
