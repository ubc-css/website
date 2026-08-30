import { useState } from 'react'
import NavDropdown from '../NavDropdown/NavDropdown'
import MobileNav from '../MobileNav/MobileNav'
import logo from '../../assets/robbie-icon-black.png'
import './Header.css'

function Header() {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null)

    const dropdownProps = (label: string) => ({
        isOpen: openDropdown === label,
        onToggle: () => setOpenDropdown((prev) => (prev === label ? null : label)),
    })

    const navContent = (
        <>
            <a href="/">Home</a>
            <NavDropdown
                label="Events"
                items={[
                    { label: 'Upcoming', href: '/events/upcoming' },
                    { label: 'Past Events', href: '/events/past' },
                ]}
                {...dropdownProps('Events')}
            />
            <NavDropdown
                label="Merch"
                items={[
                    { label: 'Clothing', href: '#clothing' },
                    { label: 'Accessories', href: '#accessories' },
                ]}
                {...dropdownProps('Merch')}
            />
            <NavDropdown
                label="Resources"
                items={[
                    { label: 'Degree Planning', href: '#degree' },
                    { label: 'Career', href: '#career' },
                    { label: 'Podcast', href: '#podcast' },
                ]}
                {...dropdownProps('Resources')}
            />
            <NavDropdown
                label="About"
                items={[
                    { label: 'Our Team', href: '#team' },
                    { label: 'The Lounge', href: '#thelounge' },
                    { label: 'Contact', href: '#contact' },
                ]}
                {...dropdownProps('About')}
            />
            <a href="#join" className="nav-cta">Become A Member</a>
        </>
    )

    return (
        <header className="site-header">
            <a href="/" className="brand-logo-link" aria-label="UBC CSS home">
                <img src={logo} alt="UBC CSS logo" className="brand-logo" />
            </a>

            <nav className="site-nav desktop-only"> {navContent}</nav>

            <div className="mobile-only">
                <MobileNav>{navContent}</MobileNav>
            </div>
        </header>
    )
}

export default Header
