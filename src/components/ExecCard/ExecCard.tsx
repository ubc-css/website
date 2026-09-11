import './ExecCard.css'

export interface ExecCardProps {
    /** The position's title (e.g. "VP Media") — always shown. */
    title: string
    /**
     * The person currently holding the position. Left unset for a role
     * that isn't filled yet (used for the Event/Media Coordinator groups on
     * the About page, which render their own "Coming Soon" treatment
     * instead) — no name row renders in that case. Real names below are
     * clearly-fake placeholders ("Firstname Lastname") until the club has a
     * real roster, same "obviously a stand-in" approach as the rest of the
     * site's placeholder copy.
     */
    name?: string
    photoAlt: string
    /** Left unset until a real headshot exists — same placeholder-until-src
     * pattern as FolderPreview's photo slots / MerchCarousel's images. */
    photoSrc?: string
}

// Every card renders at the same size — the President's card used to render
// larger than the rest of the roster (a `size` prop toggled an
// `exec-card-large` modifier class), but that's been dropped in favor of one
// consistent size across the whole team.
function ExecCard({ title, name, photoAlt, photoSrc }: ExecCardProps) {
    return (
        <div className="exec-card">
            <div className="exec-photo">
                {photoSrc ? <img src={photoSrc} alt={photoAlt} /> : <span>{photoAlt}</span>}
            </div>
            <span className="exec-title">{title}</span>
            {name && <span className="exec-name">{name}</span>}
        </div>
    )
}

export default ExecCard
