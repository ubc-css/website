import { useRef } from 'react'
import { Outlet } from 'react-router-dom'
import Cursor from '../Cursor/Cursor'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import './Layout.css'

// Persistent shell shared by every route: the pointer-tracked spotlight
// background, custom cursor, header, and footer. Only the <Outlet /> content
// in between changes per page. Moved here from App.tsx when routing was
// introduced — App.tsx is now just the route definitions.
function Layout() {
    const shellRef = useRef<HTMLElement | null>(null)

    const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
        const element = shellRef.current
        if (!element) return

        const rect = element.getBoundingClientRect()
        const x = ((event.clientX - rect.left) / rect.width) * 100
        const y = ((event.clientY - rect.top) / rect.height) * 100

        element.style.setProperty('--pointer-x', `${x}%`)
        element.style.setProperty('--pointer-y', `${y}%`)
    }

    return (
        <main className="site-shell" ref={shellRef} onPointerMove={handlePointerMove}>
            <Cursor />
            <Header />
            <Outlet />
            <Footer />
        </main>
    )
}

export default Layout
