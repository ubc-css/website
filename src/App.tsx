import { useRef } from 'react'

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
      <header className="site-header">
        <div className="brand-lockup">
          <span className="brand-mark">CSS</span>
          <span className="brand-subtitle">UBC Cognitive Systems Society</span>
        </div>
      </header>

      <section className="hero-section">
        <div className="hero-stage">
          <div className="hero-copy">
            <p className="eyebrow">Cognitive Systems Society</p>
            <h1>A club home for COGS students.</h1>
            <p className="lede">
              CSS connects students across the four Cognitive Systems streams and gives
              the program one shared place to belong.
            </p>

            <div className="actions">
              <a className="secondary-action" href="#about">
                Learn what CSS does
              </a>
              <a className="primary-action" href="#join">
                Join CSS
              </a>
            </div>
          </div>

          <div className="hero-mascot" aria-label="Mascot placeholder">
            <div className="mascot-frame">
              <div className="mascot-badge">Mascot placeholder</div>
              <div className="mascot-figure" aria-hidden="true">
                <span className="mascot-ear mascot-ear-left" />
                <span className="mascot-ear mascot-ear-right" />
                <span className="mascot-face" />
              </div>
              <p>Swap this panel with the CSS mascot illustration or photo.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
