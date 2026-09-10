import { useState } from 'react'
import './NavDropdown.css'

interface NavDropdownProps {
    label: string
    items: { label: string; href: string }[]
    isOpen: boolean
    onToggle: () => void
    /** The page this dropdown's own label points at, when it has one — set
     * for Merch/Resources/About, whose labels double as links to the top of
     * their page. Left unset for Events, which is a grouping label with no
     * landing page of its own (there's only /events/upcoming and
     * /events/past), so its label stays a plain toggle. */
    href?: string
}

function NavDropdown({ label, items, isOpen, onToggle, href }: NavDropdownProps) {
    // Lazy initializer, not useState + a sync-only useEffect — this only
    // ever needs to be read once (on mount), so there's no reason to render
    // once with the wrong default and then correct it a tick later.
    const [supportsHover] = useState(() => window.matchMedia('(hover: hover) and (pointer: fine)').matches)

    const handleClick = (event: React.MouseEvent) => {
        event.stopPropagation()

        // A label with an href only gets to actually navigate where the menu
        // is reachable *without* clicking it — i.e. the desktop nav, where
        // the menu opens on hover/focus. Everywhere else the click is the
        // only way to reveal the sub-items (MobileNav renders this same
        // component as a click-to-expand accordion), so navigating away
        // instead would strand them. Re-checked on every click rather than
        // captured at mount, so a desktop window resized across the 980px
        // MobileNav breakpoint behaves correctly with no resize listener.
        const menuOpensWithoutClicking =
            window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
            window.matchMedia('(min-width: 981px)').matches

        if (href && menuOpensWithoutClicking) return

        // No-op on the <button> branch; only meaningful for the <a>.
        event.preventDefault()
        onToggle()
    }

    const labelContent = (
        <>
            {label}
            <span className="nav-dropdown-arrow" aria-hidden="true">▾</span>
        </>
    )

    return (
        <div className={`nav-dropdown ${isOpen ? 'is-open' : ''}`}>
            {href ? (
                <a
                    className="nav-dropdown-label"
                    href={href}
                    onClick={handleClick}
                    aria-expanded={supportsHover ? undefined : isOpen}
                >
                    {labelContent}
                </a>
            ) : (
                <button
                    type="button"
                    className="nav-dropdown-label"
                    onClick={handleClick}
                    aria-expanded={supportsHover ? undefined : isOpen}
                >
                    {labelContent}
                </button>
            )}

            <div className="nav-dropdown-menu">
                <div className="nav-dropdown-menu-inner">
                    {items.map((item) => (
                        <a key={item.href} href={item.href} className="nav-dropdown-item">
                            {item.label}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default NavDropdown
