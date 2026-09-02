import { useMemo, useState } from 'react'
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

// Placeholder catalog — names/descriptions/prices/years are all stand-ins
// until the club has a real product lineup. `year` is a real number (the
// year each product was added to the catalog) purely so the sort dropdown
// below can order oldest/newest correctly — same "store a real sortable
// value" reasoning as Past Events' numeric year, and it's never rendered.
const clothingItems: MerchProductCardProps[] = [
    {
        name: 'CSS Zip-Up Hoodie',
        year: 2025,
        description: 'Placeholder description: a cozy embroidered zip-up in the club colors, our newest drop.',
        price: '$45',
        // Multiple photos — demos MerchProductCard's carousel (arrows +
        // dots). Cycles the site's 3 real merch photos same as everywhere
        // else in this placeholder catalog, not actual extra angles of the
        // hoodie.
        images: [
            { src: merchHoodies, alt: '2025/2026 CSS zip-up hoodie' },
            { src: merchStickers, alt: 'COGS stickers and pins' },
            { src: merchKeychain, alt: 'Cute Robbie keychain' },
        ],
    },
    {
        name: 'COGS Crewneck',
        year: 2024,
        description: 'Placeholder description: a classic crewneck sweater with the COGS logo across the chest.',
        price: '$40',
        images: [{ src: merchHoodies, alt: 'COGS crewneck sweater' }],
    },
    {
        name: 'Classic CSS Tee',
        year: 2023,
        description: 'Placeholder description: our original club tee — soft cotton, screen-printed logo.',
        price: '$25',
        images: [{ src: merchHoodies, alt: 'Classic CSS t-shirt' }],
    },
]

const accessoryItems: MerchProductCardProps[] = [
    {
        name: 'Robbie Enamel Pin',
        year: 2025,
        description: 'Placeholder description: a hard enamel pin of our mascot Robbie, perfect for a tote or lanyard.',
        price: '$8',
        images: [{ src: merchKeychain, alt: 'Robbie enamel pin' }],
    },
    {
        name: 'COGS Sticker Pack',
        year: 2024,
        description: 'Placeholder description: a set of 5 vinyl stickers featuring COGS-themed designs.',
        price: '$6',
        images: [{ src: merchStickers, alt: 'COGS sticker pack' }],
    },
    {
        name: 'Robbie Keychain',
        year: 2023,
        description: 'Placeholder description: a mini acrylic charm of Robbie to clip onto your bag or keys.',
        price: '$10',
        // Second product with multiple photos, same reasoning as the hoodie
        // above.
        images: [
            { src: merchKeychain, alt: 'Robbie keychain' },
            { src: merchStickers, alt: 'COGS stickers and pins' },
        ],
    },
]

type MerchSort = 'newest' | 'oldest' | 'price-low' | 'price-high'

const SORT_OPTIONS: { value: MerchSort; label: string }[] = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
]

// Prices are stored as display strings ("$45"), so sorting by price needs a
// real number pulled back out of that string rather than comparing text.
function parsePrice(price: string): number {
    return Number.parseFloat(price.replace(/[^0-9.]/g, '')) || 0
}

function sortMerchItems(items: MerchProductCardProps[], sort: MerchSort): MerchProductCardProps[] {
    const sorted = [...items]
    switch (sort) {
        case 'newest':
            sorted.sort((a, b) => b.year - a.year)
            break
        case 'oldest':
            sorted.sort((a, b) => a.year - b.year)
            break
        case 'price-low':
            sorted.sort((a, b) => parsePrice(a.price) - parsePrice(b.price))
            break
        case 'price-high':
            sorted.sort((a, b) => parsePrice(b.price) - parsePrice(a.price))
            break
    }
    return sorted
}

function MerchSortSelect({ value, onChange, label }: { value: MerchSort; onChange: (value: MerchSort) => void; label: string }) {
    return (
        <label className="merch-sort">
            <select aria-label={label} value={value} onChange={(event) => onChange(event.target.value as MerchSort)}>
                {SORT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </label>
    )
}

function Merch() {
    // Newest-to-oldest by default, per the layout sketch's "ordered from
    // newest to oldest" note — each section sorts independently.
    const [clothingSort, setClothingSort] = useState<MerchSort>('newest')
    const [accessoriesSort, setAccessoriesSort] = useState<MerchSort>('newest')

    const sortedClothing = useMemo(() => sortMerchItems(clothingItems, clothingSort), [clothingSort])
    const sortedAccessories = useMemo(() => sortMerchItems(accessoryItems, accessoriesSort), [accessoriesSort])

    return (
        <section className="merch">
            <div className="merch-hero">
                <div className="merch-hero-copy">
                    {/* Same eyebrow-label pattern as the homepage's Hero.tsx
                        (small caps kicker + a short gradient line), just
                        scoped to its own class here rather than reused —
                        Hero.css's own .eyebrow is intentionally left
                        unshared/unscoped-selector-free after the earlier h1
                        leak bug. */}
                    <p className="merch-hero-eyebrow">Official CSS Merch</p>
                    <h1>Shop Now</h1>
                    <p className="merch-hero-lede">
                        Hoodies, pins, and stickers designed by COGS students, for COGS students.
                    </p>
                </div>

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
                <div className="merch-section-title-row">
                    <h2>Clothing</h2>
                    <MerchSortSelect value={clothingSort} onChange={setClothingSort} label="Sort clothing" />
                </div>
                <div className="merch-grid">
                    {sortedClothing.map((item) => (
                        <MerchProductCard key={item.name} {...item} />
                    ))}
                </div>
            </div>

            <div className="merch-section" id="accessories">
                <div className="merch-section-title-row">
                    <h2>Accessories</h2>
                    <MerchSortSelect value={accessoriesSort} onChange={setAccessoriesSort} label="Sort accessories" />
                </div>
                <div className="merch-grid">
                    {sortedAccessories.map((item) => (
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
