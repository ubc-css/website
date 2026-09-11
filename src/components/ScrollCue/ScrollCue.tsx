import { useEffect, useState } from 'react'
import './ScrollCue.css'

function ScrollCue() {
    const [isAtTop, setIsAtTop] = useState(true)

    useEffect(() => {
        const handleScroll = () => {
            setIsAtTop(window.scrollY < 40)
        }

        handleScroll()
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <a
            href="#folder-showcase"
            className={`scroll-cue ${isAtTop ? 'is-visible' : ''}`}
            aria-label="Scroll to explore CSS sections"
            aria-hidden={!isAtTop}
            tabIndex={isAtTop ? 0 : -1}
        >
            <span aria-hidden="true">↓</span>
        </a>
    )
}

export default ScrollCue
