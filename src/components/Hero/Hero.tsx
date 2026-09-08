import './Hero.css'

function Hero() {
    return (
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
                        <a className="secondary-action" href="#folder-showcase">
                            Learn what CSS does
                        </a>
                        <a
                            className="primary-action"
                            href="https://www.showpass.com/m/css-club-membership/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Join CSS
                        </a>
                    </div>
                </div>

                <div className="hero-mascot" aria-label="UBC CSS mascot">
                    <div className="mascot-frame">
                        <div className="mascot-figure" aria-hidden="true">
                            <svg viewBox="0 0 300 280" className="mascot-svg">
                                {/* antenna squiggle + spiral curl */}
                                <path
                                    className="mascot-line"
                                    d="M 150 95 C 150 60 160 35 180 32.2
                                    C 192.7 31.4 198 31.2 199.087 40.903
                                    C 198.433 49.514 188.733 50.495 183.937 44.609
                                    C 181.3 39.2 184.046 32.62 190.803 32.075"
                                    fill="none"
                                />
                                {/* body rectangle */}
                                <path
                                    className="mascot-line"
                                    d="M45 95
             L250 92
             C255 92, 258 96, 256 100
             L256 230
             C256 235, 252 238, 247 238
             L48 240
             C43 240, 40 236, 40 231
             L42 100
             C42 96, 45 95, 45 95 Z"
                                    fill="var(--mascot-body, #ffffff)"
                                />
                                {/* eyes */}
                                <ellipse className="mascot-eye" cx="75" cy="205" rx="9" ry="13" transform="rotate(-8 95 205)" />
                                <ellipse className="mascot-eye" cx="170" cy="205" rx="9" ry="13" transform="rotate(-8 180 205)" />
                            </svg>
                        </div>
                        <div className="mascot-badge">MEET ROBBIE, THE CSS MASCOT</div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero
