import logo from '../../assets/robbie-icon-black.png'
import './Footer.css'

const footerColumns = [
    {
        title: 'Events',
        links: [
            { label: 'Upcoming', href: '/events/upcoming' },
            { label: 'Past Events', href: '/events/past' },
        ],
    },
    {
        title: 'Merch',
        links: [
            { label: 'Clothing', href: '/merch#clothing' },
            { label: 'Accessories', href: '/merch#accessories' },
            { label: 'Purchasing Swag', href: '/merch#purchasing' },
        ],
    },
    {
        title: 'Resources',
        links: [
            { label: 'Degree Planning', href: '/resources#degree' },
            { label: 'Career', href: '/resources#career' },
            { label: 'Podcast', href: '/resources#podcast' },
        ],
    },
    {
        title: 'About',
        links: [
            { label: 'Our Team', href: '/about#team' },
            { label: 'The Lounge', href: '/about#thelounge' },
            { label: 'Contact', href: '/about#contact' },
        ],
    },
]

function Footer() {
    return (
        <footer className="site-footer">
            <div className="footer-top">
                <nav className="footer-columns" aria-label="Footer">
                    {footerColumns.map((column) => (
                        <div className="footer-column" key={column.title}>
                            <span className="footer-column-title">{column.title}</span>
                            {column.links.map((link) => (
                                <a key={link.href} href={link.href}>
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    ))}
                </nav>

                <div className="footer-cta-block">
                    <a
                        href="https://www.showpass.com/m/css-club-membership/"
                        target="_blank"
                        rel="noreferrer"
                        className="footer-cta"
                    >
                        Become a Member
                    </a>
                    <a href="#" className="back-to-top">
                        Back to top
                        <span className="back-to-top-arrow" aria-hidden="true">↑</span>
                    </a>
                </div>
            </div>

            <div className="footer-bottom">
                <a href="/" className="footer-brand" aria-label="UBC CSS home">
                    <img src={logo} alt="UBC CSS logo" className="footer-logo" />
                </a>

                <div className="footer-contact">
                    <span className="footer-contact-label">Contact us!</span>
                    <a href="mailto:cogsubc@gmail.com" aria-label="Email UBC CSS">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                            <rect x="3" y="5" width="18" height="14" rx="2.5" />
                            <path d="M4 6.5l8 6.5 8-6.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </a>
                    <a
                        href="https://www.instagram.com/cogsubc/"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="UBC CSS on Instagram"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                            <rect x="3" y="3" width="18" height="18" rx="5.5" />
                            <circle cx="12" cy="12" r="4.2" />
                            <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
                        </svg>
                    </a>
                    <a
                        href="https://ca.linkedin.com/company/cognitive-systems-society"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="UBC CSS on LinkedIn"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                            <rect x="3" y="3" width="18" height="18" rx="4" />
                            <circle cx="7.6" cy="8" r="0.4" fill="currentColor" stroke="currentColor" strokeWidth="2" />
                            <path d="M7.6 10.8v6.2" strokeLinecap="round" />
                            <path
                                d="M11.4 17V10.8M11.4 13.4c0-1.6 1-2.6 2.4-2.6 1.5 0 2.4 1 2.4 2.6V17"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </a>
                    <a
                        href="https://linktr.ee/cogsubc"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="UBC CSS on Linktree"
                    >
                        {/* Linktree's actual logo mark — exact path from Simple
                            Icons (simple-icons/simple-icons, icons/linktree.svg)
                            — but in the same circular button + currentColor
                            treatment as the mail/Instagram/LinkedIn icons above
                            (fill="currentColor" instead of a hardcoded brand
                            color) rather than its own brand-colored squircle, so
                            all five read as one consistent icon set. */}
                        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path d="m13.73635 5.85251 4.00467-4.11665 2.3248 2.3808-4.20064 4.00466h5.9085v3.30473h-5.9365l4.22865 4.10766-2.3248 2.3338L12.0005 12.099l-5.74052 5.76852-2.3248-2.3248 4.22864-4.10766h-5.9375V8.12132h5.9085L3.93417 4.11666l2.3248-2.3808 4.00468 4.11665V0h3.4727zm-3.4727 10.30614h3.4727V24h-3.4727z" />
                        </svg>
                    </a>
                    <a
                        href="https://discord.com/invite/ndq7epCG4F"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="UBC CSS on Discord"
                    >
                        {/* Discord's actual logo mark — exact path from Simple
                            Icons (simple-icons/simple-icons, icons/discord.svg)
                            — same currentColor/shared-circle-button treatment
                            as Linktree above, rather than white-on-blurple. */}
                        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
                        </svg>
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer
