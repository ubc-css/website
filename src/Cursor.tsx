import { useEffect, useRef } from 'react'

function Cursor() {
    const dotRef = useRef<HTMLDivElement | null>(null)
    const ringRef = useRef<HTMLDivElement | null>(null)
    const mouse = useRef({ x: 0, y: 0 })
    const ring = useRef({ x: 0, y: 0 })
    const rafId = useRef<number | null>(null)

    useEffect(() => {
        const supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches
        if (!supportsHover) return

        const handleMove = (event: PointerEvent) => {
            mouse.current.x = event.clientX
            mouse.current.y = event.clientY
            if (dotRef.current) {
                dotRef.current.style.transform = `translate(${event.clientX}px, ${event.clientY}px) translate(-50%, -50%)`
            }
        }

        const animate = () => {
            const ease = 0.15
            ring.current.x += (mouse.current.x - ring.current.x) * ease
            ring.current.y += (mouse.current.y - ring.current.y) * ease
            if (ringRef.current) {
                ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px) translate(-50%, -50%)`
            }
            rafId.current = requestAnimationFrame(animate)
        }

        const handleOver = (event: PointerEvent) => {
            const target = event.target as Element

            const isInsideSvg = target.closest('svg') !== null

            const isTextField =
                !isInsideSvg &&
                (target instanceof HTMLInputElement ||
                    target instanceof HTMLTextAreaElement ||
                    (target as HTMLElement).isContentEditable === true)

            const isInteractive =
                !isInsideSvg &&
                (target.tagName === 'A' ||
                    target.tagName === 'BUTTON' ||
                    target.closest('a, button') !== null)

            ringRef.current?.classList.toggle('is-text', isTextField)
            ringRef.current?.classList.toggle('is-active', isInteractive)
            dotRef.current?.classList.toggle('is-hidden', isTextField)
        }

        window.addEventListener('pointermove', handleMove)
        window.addEventListener('pointerover', handleOver)
        rafId.current = requestAnimationFrame(animate)

        return () => {
            window.removeEventListener('pointermove', handleMove)
            window.removeEventListener('pointerover', handleOver)
            if (rafId.current) cancelAnimationFrame(rafId.current)
        }
    }, [])

    return (
        <>
            <div ref={dotRef} className="cursor-dot" />
            <div ref={ringRef} className="cursor-ring" />
        </>
    )
}

export default Cursor