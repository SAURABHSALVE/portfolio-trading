import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'

export default function Hero() {
  const canvasRef   = useRef(null)
  const [photoLoaded, setPhotoLoaded] = useState(false)
  const [photoError,  setPhotoError]  = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId

    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()

    // Floating particles
    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.5,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.5 + 0.1,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0,212,255,${p.alpha})`
        ctx.fill()
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1
      })
      animId = requestAnimationFrame(draw)
    }
    draw()

    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <section id="hero">
      <div className="hero-noise" />
      <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />

      {/* HUD corner brackets */}
      <div className="hud-corner hud-tl" aria-hidden="true" />
      <div className="hud-corner hud-br" aria-hidden="true" />

      <div className="hero-inner">
        {/* ── Left: text content ── */}
        <div className="hero-content">
          

          <h1 className="hero-h1">
            <span>Saurabh</span>
            <span className="name-outline" data-text="Salve">Salve</span>
          </h1>

          <div className="hero-role-label">AI &amp; ML Engineer</div>

          <p className="hero-desc hero-desc-main">
            <span className="word-anim">I</span>
            <span className="word-anim">don't</span>
            <span className="word-anim">just</span>
            <span className="word-anim highlight-ship">build</span>
            <span className="word-anim">models</span>
            <span className="word-anim highlight-orange">I</span>
            <span className="word-anim highlight-orange">ship</span>
            <span className="word-anim">systems.</span>
            <span className="word-anim highlight-cyan">Generative AI</span>,
            <span className="word-anim highlight-green">LLMs</span>,
            <span className="word-anim highlight-purple">RAG pipelines</span>,
            <span className="word-anim highlight-cyan">multi-agent</span>
            <span className="word-anim highlight-cyan">architectures</span>.
            <span className="word-anim">If</span>
            <span className="word-anim">it's</span>
            <span className="word-anim">in</span>
            <span className="word-anim">the</span>
            <span className="word-anim highlight-orange">stack</span>,
            <span className="word-anim">I've</span>
            <span className="word-anim">run</span>
            <span className="word-anim">it</span>
            <span className="word-anim">in</span>
            <span className="word-anim highlight-green">production</span>.
          </p>

          

          <div className="hero-actions">
            <Link to="/projects" className="btn-primary">View Projects</Link>
            <Link to="/about"    className="btn-ghost btn-ghost-purple">About Me</Link>
            <Link to="/skills"   className="btn-ghost">Skills →</Link>
            <Link to="/contact"  className="btn-ghost btn-ghost-orange">Get In Touch</Link>
            <Link to="/blog" className="btn-ghost btn-ghost-green btn-blog-cta">
              Read Blog
              <span className="blog-cta-arrows" aria-hidden="true">
                <span className="blog-cta-arrow">→</span>
                <span className="blog-cta-arrow">→</span>
                <span className="blog-cta-arrow">→</span>
              </span>
            </Link>
          </div>
        </div>

        {/* ── Right: profile photo ── */}
        <div className="hero-photo-wrap">
          <div className="hero-photo-frame">
            {/* Animated scan line */}
            <div className="hero-photo-scan" aria-hidden="true" />

            {/* HUD corner brackets */}
            <span className="hero-photo-corner tl" aria-hidden="true" />
            <span className="hero-photo-corner tr" aria-hidden="true" />
            <span className="hero-photo-corner bl" aria-hidden="true" />
            <span className="hero-photo-corner br" aria-hidden="true" />

            {/*
              ── PROFILE PHOTO ──
              Replace src="/profile.jpg" with your actual image path.
              The placeholder below auto-hides once the image loads.
            */}
            <img
              src="/profile.png"
              alt="Saurabh Salve"
              className="hero-photo-img"
              onLoad={() => setPhotoLoaded(true)}
              onError={() => setPhotoError(true)}
              style={{ display: photoError ? 'none' : 'block' }}
            />

            {/* Placeholder — shown until real photo loads */}
            {(!photoLoaded || photoError) && (
              <div className="hero-photo-placeholder" aria-hidden="true">
                <div className="hero-photo-grid-overlay" />
                <span className="hero-photo-initials">SS</span>
                <span className="hero-photo-id-label">AI_ENG_001</span>
              </div>
            )}
          </div>

          {/* Status badge */}
          
        </div>
      </div>

    </section>
  )
}

