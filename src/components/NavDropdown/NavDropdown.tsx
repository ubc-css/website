import { useState } from 'react'
import './NavDropdown.css'

interface NavDropdownProps {
    label: string
    items: { label: string; href: string }[]
    isOpen: boolean
    onToggle: () => void
}

function NavDropdown({ label, items, isOpen, onToggle }: NavDropdownProps) {
    // Lazy initializer, not useState + a sync-only useEffect — this only
    // ever needs to be read once (on mount), so there's no reason to render
    // once with the wrong default and then correct it a tick later.
    const [supportsHover] = useState(() => window.matchMedia('(hover: hover) and (pointer: fine)').matches)

    const handleClick = (event: React.MouseEvent) => {
        event.stopPropagation()
        onToggle()
    }

    return (
        <div className={`nav-dropdown ${isOpen ? 'is-open' : ''}`}>
            <button
                type="button"
                className="nav-dropdown-label"
                onClick={handleClick}
                aria-expanded={supportsHover ? undefined : isOpen}
            >
                {label}
                <span className="nav-dropdown-arrow" aria-hidden="true">▾</span>
            </button>

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
