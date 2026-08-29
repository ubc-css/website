import FolderPreview, { type FolderPreviewProps } from '../FolderPreview/FolderPreview'
import merchHoodies from '../../assets/merch/MerchHoodies.png'
import merchKeychain from '../../assets/merch/MerchKeychain.png'
import merchSticker from '../../assets/merch/nerdrobbie.png'
import welcomeBack from '../../assets/events/Welcome-back-bbq.jpg'
import alumNight from '../../assets/events/alumni-mixer.jpg'
import labPanel from '../../assets/events/lab-panel.jpg'
import podcast from '../../assets/resources/css-podcast.jpg'
import gearingUp from '../../assets/resources/gearing-up.jpg'
import labRobots from '../../assets/resources/lab-robot.jpg'
import team from '../../assets/about/execs.jpg'
import colleen from '../../assets/about/program-director-colleen-da-queen.jpg'
import lounge from '../../assets/about/lounge.jpg'
import './FolderShowcase.css'

const previews: FolderPreviewProps[] = [
    {
        title: 'Events',
        description:
            'From socials to workshops, see what CSS has coming up on the calendar this term.',
        href: '#events',
        align: 'left',
        photos: [
            { alt: 'Event photo 1', src: welcomeBack},
            { alt: 'Event photo 2', src: alumNight},
            { alt: 'Event photo 3', src: labPanel},
        ],
    },
    {
        title: 'Merch',
        description:
            'Hoodies, pins, and stickers designed by COGS students, for COGS students.',
        href: '#merch',
        align: 'right',
        photos: [
            { alt: 'Merch photo 1', src: merchSticker },
            { alt: 'Merch photo 2', src: merchKeychain},
            { alt: 'Merch photo 3', src: merchHoodies, large: true },
        ],
    },
    {
        title: 'Resources',
        description:
            'Degree planning guides, career resources, and the CSS podcast, all in one place.',
        href: '#resources',
        align: 'left',
        photos: [
            { alt: 'Resource photo 1', src: gearingUp},
            { alt: 'Resource photo 2', src: podcast},
            { alt: 'Resource photo 3', src: labRobots},
        ],
    },
    {
        title: 'About',
        description: 'Meet the team behind CSS and learn what the club is all about.',
        href: '#about',
        align: 'right',
        photos: [
            { alt: 'About photo 1', src: team},
            { alt: 'About photo 2', src: lounge},
            { alt: 'About photo 3', src: colleen},
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
