import { useState, useEffect } from 'react'

interface NavDropdownProps {
    label: string
    items: { label: string; href: string }[]
}

function NavDropdown({ label, items }: NavDropdownProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [supportsHover, setSupportsHover] = useState(true)

    useEffect(() => {
        setSupportsHover(window.matchMedia('(hover: hover) and (pointer: fine)').matches)
    }, [])

    const handleClick = (event: React.MouseEvent) => {
        event.stopPropagation()
        setIsOpen((prev) => !prev)
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