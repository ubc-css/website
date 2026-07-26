import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import './MobileNav.css'

interface MobileNavProps {
  children: React.ReactNode
}

function MobileNav({ children }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return createPortal(
    <>
      <button
        type="button"
        className={`hamburger-btn ${isOpen ? 'is-open' : ''}`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
      >
        <span />
        <span />
        <span />
      </button>

      <div className={`mobile-nav-panel ${isOpen ? 'is-open' : ''}`}>
        <nav className="mobile-nav-links" onClick={() => setIsOpen(false)}>
          {children}
        </nav>
      </div>
    </>,
    document.body
  )
}

export default MobileNav
