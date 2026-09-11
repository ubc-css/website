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
                href="/merch"
                items={[
                    { label: 'Clothing', href: '/merch#clothing' },
                    { label: 'Accessories', href: '/merch#accessories' },
                    { label: 'Purchasing Swag', href: '/merch#purchasing' },
                ]}
                {...dropdownProps('Merch')}
            />
            <NavDropdown
                label="Resources"
                href="/resources"
                items={[
                    { label: 'Degree Planning', href: '/resources#degree' },
                    { label: 'Career', href: '/resources#career' },
                    { label: 'Podcast', href: '/resources#podcast' },
                ]}
                {...dropdownProps('Resources')}
            />
            <NavDropdown
                label="About"
                href="/about"
                items={[
                    { label: 'Our Team', href: '/about#team' },
                    { label: 'The Lounge', href: '/about#thelounge' },
                    { label: 'Contact', href: '/about#contact' },
                ]}
                {...dropdownProps('About')}
            />
            <a
                href="https://www.showpass.com/m/css-club-membership/"
                target="_blank"
                rel="noreferrer"
                className="nav-cta"
            >
                Become A Member
            </a>
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
