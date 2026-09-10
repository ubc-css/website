import { useMemo, useState } from 'react'
import MerchCarousel from '../../components/MerchCarousel/MerchCarousel'
import MerchProductCard, { type MerchProductCardProps } from '../../components/MerchProductCard/MerchProductCard'
import merchHoodies from '../../assets/merch/MerchHoodies.png'
import merchKeychain from '../../assets/merch/MerchKeychain.png'
import merchStickers from '../../assets/merch/MerchStickers.png'
// Real product photos — replacing the generic reused placeholders above for
// the actual catalog below (the three MerchXxx imports stay in use for the
// hero MerchCarousel, which wasn't part of this update).
import zipupFront from '../../assets/merch/zipup-front.png'
import zipupBack from '../../assets/merch/zipup-back.png'
import beigeCrewFront from '../../assets/merch/beigeCrew-front.png'
import beigeCrewBack from '../../assets/merch/beigeCrew-back.png'
import robbieShirtFront from '../../assets/merch/robbieShirt-front.png'
import robbieShirtBack from '../../assets/merch/robbieShirt-back.png'
import robbieHoodieFront from '../../assets/merch/robbieHoodie-front.png'
import robbieHoodieBack from '../../assets/merch/robbieHoodie-back.png'
import brainHoodieFront from '../../assets/merch/brainHoodie-front.png'
import brainHoodieBack from '../../assets/merch/brainHoodie-back.png'
import whiteHoodieFront from '../../assets/merch/whiteHoodie-front.png'
import whiteHoodieBack from '../../assets/merch/whiteHoodie-back.png'
import boboRobbie from '../../assets/merch/boboRobbie.png'
import confusedRobbie from '../../assets/merch/confusedRobbie.png'
import cryRobbie from '../../assets/merch/cryRobbie.png'
import loveRobbie from '../../assets/merch/loveRobbie.png'
import nerdRobbie from '../../assets/merch/nerdRobbie.png'
import shyRobbie from '../../assets/merch/shyRobbie.png'
import brainyTote from '../../assets/merch/brainyTote.png'
import robbieTote from '../../assets/merch/robbieTote.png'
import cognitiveSisyphusSticker from '../../assets/merch/cognitivesisyphusSticker.png'
import cogsPortalSticker from '../../assets/merch/cogsportalSticker.jpg'
import robbieXWugSticker from '../../assets/merch/robbiexwugSticker.jpg'
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
        type: 'Hoodie',
        description: 'NEW: a cozy zip-up with a trippy looking back graphic',
        price: '$35',
        images: [
            { src: zipupFront, alt: 'Black CSS zip-up hoodie, front, with a small printed chest logo', objectPosition: 'top' },
            { src: zipupBack, alt: 'Black CSS zip-up hoodie, back, with a large "Question Everything" print', objectPosition: 'top' },
        ],
    },
    {
        name: 'Robbie Hoodie - Black',
        year: 2024,
        type: 'Hoodie',
        description: 'A drawstring pullover hoodie with a printed Robbie logo on the chest and our CSS logo across the back.',
        price: '$25',
        images: [
            { src: robbieHoodieFront, alt: 'Black pullover hoodie, front, with a small Robbie chest logo' },
            { src: robbieHoodieBack, alt: 'Black pullover hoodie, back, with a circular UBC CSS seal print' },
        ],
    },
    {
        name: 'Brain Hoodie',
        year: 2023,
        type: 'Hoodie',
        description: 'A pullover hoodie featuring a bold circuit-brain graphic across the back.',
        price: '$25',
        images: [
            { src: brainHoodieFront, alt: 'Black pullover hoodie, front, with a small chest logo' },
            { src: brainHoodieBack, alt: 'Black pullover hoodie, back, with a large circuit-brain graphic' },
        ],
    },
    {
        name: 'Robbie Hoodie - White',
        year: 2023,
        type: 'Hoodie',
        description: 'A white pullover hoodie with a small Robbie logo up front and our colourful CSS crest on the back.',
        price: '$25',
        images: [
            { src: whiteHoodieFront, alt: 'White pullover hoodie, front, with a small Robbie chest logo' },
            { src: whiteHoodieBack, alt: 'White pullover hoodie, back, with a colourful circular UBC CSS crest' },
        ],
    },
    {
        name: 'COGS Beige Crewneck',
        year: 2023,
        type: 'Crewneck',
        description: 'A classic beige crewneck sweater with a COGS graphic across the chest.',
        price: '$20',
        images: [
            { src: beigeCrewFront, alt: 'Beige crewneck sweater, front, with a "Cognitive Systems" chest graphic' },
            { src: beigeCrewBack, alt: 'Beige crewneck sweater, back' },
        ],
    },
    {
        name: 'Navy Blue Pocket Tee',
        year: 2023,
        type: 'T-shirt',
        description: 'Our original club tee with a Robbie peeking out the pocket and a UBC CSS graphic on the back.',
        price: '$15',
        images: [
            { src: robbieShirtFront, alt: 'Navy pocket t-shirt, front, with a Robbie graphic over the pocket' },
            { src: robbieShirtBack, alt: 'Navy pocket t-shirt, back, with a "UBC CSS" print' },
        ],
    },
]

const accessoryItems: MerchProductCardProps[] = [
    {
        name: 'Robbie Keychain',
        year: 2025,
        type: 'Keychain',
        description: 'A cute keychain featuring our club mascot, Robbie.',
        price: '$5',
        images: [{ src: merchKeychain, alt: 'Robbie keychain' }],
    },
    {
        name: 'Bobo Robbie Sticker',
        year: 2025,
        type: 'Sticker',
        description: 'A vinyl sticker of Robbie dressed up as a clown.',
        price: '$2',
        images: [{ src: boboRobbie, alt: 'Sticker of Robbie dressed as a clown' }],
    },
    {
        name: 'Love Robbie Sticker',
        year: 2025,
        type: 'Sticker',
        description: 'A vinyl sticker of Robbie with heart eyes.',
        price: '$2',
        images: [{ src: loveRobbie, alt: 'Sticker of Robbie with heart eyes' }],
    },
    {
        name: 'Nerd Robbie Sticker',
        year: 2025,
        type: 'Sticker',
        description: 'A vinyl sticker of Robbie looking extra smart.',
        price: '$2',
        images: [{ src: nerdRobbie, alt: 'Sticker of Robbie wearing glasses' }],
    },
    {
        name: 'Confused Robbie Sticker',
        year: 2025,
        type: 'Sticker',
        description: 'A vinyl sticker of a confused-looking Robbie.',
        price: '$2',
        images: [{ src: confusedRobbie, alt: 'Sticker of a confused-looking Robbie' }],
    },
    {
        name: 'Shy Robbie Sticker',
        year: 2025,
        type: 'Sticker',
        description: 'A vinyl sticker of a sweating, embarassed Robbie.',
        price: '$2',
        images: [{ src: shyRobbie, alt: 'Sticker of a shy, sweating Robbie' }],
    },
    {
        name: 'Cry Robbie Sticker',
        year: 2025,
        type: 'Sticker',
        description: 'A vinyl sticker of a sobbing Robbie.',
        price: '$2',
        images: [{ src: cryRobbie, alt: 'Sticker of a crying Robbie' }],
    },
    {
        name: 'Cognitive Sisyphus Sticker',
        year: 2025,
        type: 'Sticker',
        description: 'A vinyl sticker of a figure pushing a giant gear up a hill, à la Sisyphus.',
        price: '$2',
        images: [{ src: cognitiveSisyphusSticker, alt: 'Sticker of a figure pushing a gear up a hill like Sisyphus' }],
    },
    {
        name: 'COGS Portal Sticker',
        year: 2025,
        type: 'Sticker',
        description: 'A vinyl sticker of Robbie unlocking a hidden gear-covered door inside a giant brain.',
        price: '$2',
        images: [{ src: cogsPortalSticker, alt: 'Sticker of Robbie opening a door inside a giant brain' }],
    },
    {
        name: 'Robbie x Wug Sticker',
        year: 2025,
        type: 'Sticker',
        description: 'A vinyl sticker of Robbie posing alongside the classic linguistics "Wug" bird.',
        price: '$2',
        images: [{ src: robbieXWugSticker, alt: 'Sticker of Robbie next to the linguistics "wug" bird' }],
    },
    {
        name: 'Brainy Tote',
        year: 2024,
        type: 'Tote',
        description: 'A trendy canvas tote bag with our Brainy mascot printed on the front.',
        price: '$15',
        images: [{ src: brainyTote, alt: 'Canvas tote bag with a walking brain character graphic' }],
    },
    {
        name: 'Robbie Tote',
        year: 2024,
        type: 'Tote',
        description: 'A trendy canvas tote bag with our CSS Robbie logo printed un the front.',
        price: '$15',
        images: [{ src: robbieTote, alt: 'Canvas tote bag with a large Robbie outline graphic' }],
    },
]

// Derived once from the catalog above, not hardcoded — see getMerchTypes.
const clothingTypes = getMerchTypes(clothingItems)
const accessoryTypes = getMerchTypes(accessoryItems)

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

// Sentinel for "no type filter applied" — lowercase specifically so it can't
// collide with a real `type` value (all of which are capitalized, e.g.
// "Hoodie"), same reasoning Past Events' `'All'` year option uses.
const ALL_TYPES = 'all'

// Each section's available types are derived from its own item list rather
// than hardcoded, so adding/removing a product's `type` automatically
// updates the dropdown's options with no second place to edit.
function getMerchTypes(items: MerchProductCardProps[]): string[] {
    return Array.from(new Set(items.map((item) => item.type)))
}

function filterMerchItemsByType(items: MerchProductCardProps[], type: string): MerchProductCardProps[] {
    return type === ALL_TYPES ? items : items.filter((item) => item.type === type)
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

// Same `.merch-sort` pill styling as MerchSortSelect — reused rather than a
// new class, since visually it's the same "small pill select" control, just
// filtering by `type` instead of resorting by year/price.
function MerchTypeSelect({ value, onChange, types, label }: { value: string; onChange: (value: string) => void; types: string[]; label: string }) {
    return (
        <label className="merch-sort">
            <select aria-label={label} value={value} onChange={(event) => onChange(event.target.value)}>
                <option value={ALL_TYPES}>All Types</option>
                {types.map((type) => (
                    <option key={type} value={type}>
                        {type}
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
    // "Group by Type" filters — independent per section, same as sort.
    // Defaults to ALL_TYPES (no filtering) rather than the first real type,
    // so the section shows everything until the visitor actively narrows it.
    const [clothingType, setClothingType] = useState(ALL_TYPES)
    const [accessoriesType, setAccessoriesType] = useState(ALL_TYPES)

    const sortedClothing = useMemo(
        () => sortMerchItems(filterMerchItemsByType(clothingItems, clothingType), clothingSort),
        [clothingType, clothingSort],
    )
    const sortedAccessories = useMemo(
        () => sortMerchItems(filterMerchItemsByType(accessoryItems, accessoriesType), accessoriesSort),
        [accessoriesType, accessoriesSort],
    )

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
                    <div className="merch-section-filters">
                        <MerchTypeSelect
                            value={clothingType}
                            onChange={setClothingType}
                            types={clothingTypes}
                            label="Filter clothing by type"
                        />
                        <MerchSortSelect value={clothingSort} onChange={setClothingSort} label="Sort clothing" />
                    </div>
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
                    <div className="merch-section-filters">
                        <MerchTypeSelect
                            value={accessoriesType}
                            onChange={setAccessoriesType}
                            types={accessoryTypes}
                            label="Filter accessories by type"
                        />
                        <MerchSortSelect value={accessoriesSort} onChange={setAccessoriesSort} label="Sort accessories" />
                    </div>
                </div>
                <div className="merch-grid">
                    {sortedAccessories.map((item) => (
                        <MerchProductCard key={item.name} {...item} />
                    ))}
                </div>
            </div>

            <div className="merch-purchase" id="purchasing">
                <h2>Like What You See?</h2>
                <p className="merch-purchase-lede">
                       Purchase your swag using one of the following two options:
                    </p>

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
