import './SocialLinks.css'

// The same 5 contact channels as Footer.tsx's `.footer-contact` row —
// verbatim copies of the real Linktree/Discord logo paths (sourced from
// simple-icons/simple-icons) and the same real mailto/Instagram/LinkedIn/
// Linktree URLs, recolored via currentColor to match whatever text color
// they're placed in (same treatment Footer.tsx settled on). Reimplemented as
// its own component — used by the About page's "Contact Us!" section —
// rather than imported from Footer, since Footer's row is styled for its own
// dark background and this one needs a light-background version elsewhere on
// the site. Kept as a real shared component (unlike this codebase's usual
// per-page-duplicated carousel logic) specifically because these five are
// long, exact brand-logo paths and real account URLs where copy-paste drift
// between two files would be easy to introduce and hard to notice.
function SocialLinks() {
    return (
        <div className="social-links">
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
            <a href="https://linktr.ee/cogsubc" target="_blank" rel="noreferrer" aria-label="UBC CSS on Linktree">
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
                {/* Same real Discord invite as Footer.tsx's copy of this icon. */}
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
                </svg>
            </a>
        </div>
    )
}

export default SocialLinks
