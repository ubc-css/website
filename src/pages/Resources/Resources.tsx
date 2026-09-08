import './Resources.css'

// A deliberately minimal placeholder — Degree Planning/Career/Podcast are
// real nav items already (see Header.tsx's "Resources" dropdown) pointing
// here, but none of those sections exist yet. Same "reuse existing real
// content, mark the rest clearly as placeholder" spirit as the rest of the
// site's placeholder copy, just with nothing built out at all yet.
function Resources() {
    return (
        <section className="resources">
            <div className="resources-content">
                {/* Same eyebrow-label recipe as Hero.tsx/Merch.tsx/About.tsx
                    (small-caps kicker + a short gradient line) — reimplemented
                    under its own class rather than shared, same reasoning as
                    those pages: Hero.css's own .eyebrow is intentionally left
                    unshared after the earlier unscoped-h1 leak bug. */}
                <p className="resources-eyebrow">Resources</p>
                <h1>This page is a work in progress…</h1>
                <p className="resources-lede">
                    Degree planning guides, career resources, and our podcast hub are all on the
                    way — check back soon!
                </p>
                <a className="resources-home-link" href="/">
                    Back to home
                </a>
            </div>
        </section>
    )
}

export default Resources
