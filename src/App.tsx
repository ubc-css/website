import { useRef } from 'react'
import Cursor from './components/Cursor/Cursor'
import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import FolderShowcase from './components/FolderShowcase/FolderShowcase'
import ScrollCue from './components/ScrollCue/ScrollCue'

import './App.css'

function App() {
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
            <Hero />
            <FolderShowcase />
            <ScrollCue />
        </main>
    )
}

export default App
