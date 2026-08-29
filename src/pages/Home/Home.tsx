import Hero from '../../components/Hero/Hero'
import FolderShowcase from '../../components/FolderShowcase/FolderShowcase'
import ScrollCue from '../../components/ScrollCue/ScrollCue'

// The homepage's own content, rendered inside <Layout />'s <Outlet />.
// ScrollCue lives here (not in Layout) since it's homepage-specific — it
// scrolls to #folder-showcase, which only exists on this page.
function Home() {
    return (
        <>
            <Hero />
            <FolderShowcase />
            <ScrollCue />
        </>
    )
}

export default Home
