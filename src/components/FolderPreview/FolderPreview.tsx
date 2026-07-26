import { useInView } from '../../hooks/useInView'
import './FolderPreview.css'

export interface FolderPhoto {
    alt: string
    src?: string
}

export interface FolderPreviewProps {
    title: string
    description: string
    href: string
    align: 'left' | 'right'
    photos: [FolderPhoto, FolderPhoto, FolderPhoto]
}

function FolderPreview({ title, description, href, align, photos }: FolderPreviewProps) {
    const { ref, isInView } = useInView<HTMLDivElement>(0.15)

    return (
        <div
            ref={ref}
            className={`folder-preview align-${align} ${isInView ? 'is-visible' : ''}`}
        >
            <div className="folder-stage">
                <div className="photos-stage" aria-hidden="true">
                    {photos.map((photo) => (
                        <div key={photo.alt} className="photo-slot">
                            {photo.src ? (
                                <img src={photo.src} alt={photo.alt} />
                            ) : (
                                <span>{photo.alt}</span>
                            )}
                        </div>
                    ))}
                </div>

                <div className="folder">
                    <span className="folder-tab" aria-hidden="true" />
                    <div className="folder-body">
                        <h3>{title}</h3>
                        <p>{description}</p>
                        <a className="folder-link" href={href}>
                            Explore {title}
                            <span className="folder-link-arrow" aria-hidden="true">→</span>
                        </a>
                    </div>
                    <span className="hover-hint" aria-hidden="true">Hover to explore</span>
                </div>
            </div>
        </div>
    )
}

export default FolderPreview
