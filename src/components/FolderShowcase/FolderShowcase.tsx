import FolderPreview, { type FolderPreviewProps } from '../FolderPreview/FolderPreview'
import './FolderShowcase.css'

const previews: FolderPreviewProps[] = [
    {
        title: 'Events',
        description:
            'From socials to workshops, see what CSS has coming up on the calendar this term.',
        href: '#events',
        align: 'left',
        photos: [
            { alt: 'Event photo 1' },
            { alt: 'Event photo 2' },
            { alt: 'Event photo 3' },
        ],
    },
    {
        title: 'Merch',
        description:
            'Hoodies, pins, and stickers designed by COGS students, for COGS students.',
        href: '#merch',
        align: 'right',
        photos: [
            { alt: 'Merch photo 1' },
            { alt: 'Merch photo 2' },
            { alt: 'Merch photo 3' },
        ],
    },
    {
        title: 'Resources',
        description:
            'Degree planning guides, career resources, and the CSS podcast, all in one place.',
        href: '#resources',
        align: 'left',
        photos: [
            { alt: 'Resource photo 1' },
            { alt: 'Resource photo 2' },
            { alt: 'Resource photo 3' },
        ],
    },
    {
        title: 'About',
        description: 'Meet the team behind CSS and learn what the club is all about.',
        href: '#about',
        align: 'right',
        photos: [
            { alt: 'About photo 1' },
            { alt: 'About photo 2' },
            { alt: 'About photo 3' },
        ],
    },
]

function FolderShowcase() {
    return (
        <section className="folder-showcase" id="folder-showcase">
            {previews.map((preview) => (
                <FolderPreview key={preview.title} {...preview} />
            ))}
        </section>
    )
}

export default FolderShowcase
