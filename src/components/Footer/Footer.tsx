import logo from '../../assets/robbie-icon-black.png'
import './Footer.css'

const footerColumns = [
    {
        title: 'Events',
        links: [
            { label: 'Upcoming', href: '#upcoming' },
            { label: 'Past Events', href: '#past' },
        ],
    },
    {
        title: 'Merch',
        links: [
            { label: 'Clothing', href: '#clothing' },
            { label: 'Accessories', href: '#accessories' },
        ],
    },
    {
        title: 'Resources',
        links: [
            { label: 'Degree Planning', href: '#degree' },
            { label: 'Career', href: '#career' },
            { label: 'Podcast', href: '#podcast' },
        ],
    },
    {
        title: 'About',
        links: [
            { label: 'Our Team', href: '#team' },
            { label: 'The Lounge', href: '#thelounge' },
            { label: 'Contact', href: '#contact' },
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
                    <a href="#join" className="footer-cta">
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
                </div>
            </div>
        </footer>
    )
}

export default Footer
