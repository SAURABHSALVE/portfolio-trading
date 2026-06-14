import { useState, useEffect, useCallback } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'

/* Social / profile quick-links shown in top-right */
const NAV_SOCIALS = [
  {
    label: 'GitHub',
    href:  'https://github.com/SAURABHSALVE',
    color: '#e6edf3',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href:  'https://www.linkedin.com/in/saurabhsalve99/',
    color: '#0a66c2',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    label: 'LeetCode',
    href:  'https://leetcode.com/u/Saurabhsalve9999/',
    color: '#ffa116',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
        <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/>
      </svg>
    ),
  },
]

/* Home-page sections accessible via hash scroll */
const HOME_SECTIONS = [
  { hash: 'journey',        label: 'Journey' },
  { hash: 'experience',     label: 'Experience' },
  { hash: 'certifications', label: 'Certs' },
  { hash: 'achievements',   label: 'Achievements' },
  { hash: 'education',      label: 'Education' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen]           = useState(false)
  const [scrolled, setScrolled]           = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const location   = useLocation()
  const navigate   = useNavigate()
  const isHome     = location.pathname === '/'
  const isAbout    = location.pathname === '/about'
  const isProjects = location.pathname === '/projects'
  const isContact  = location.pathname === '/contact'
  const isSkills   = location.pathname === '/skills'
  const isBlog     = location.pathname.startsWith('/blog')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Track which section is in viewport on home page */
  useEffect(() => {
    if (!isHome) { setActiveSection(''); return }

    const onScroll = () => {
      if (window.scrollY < 100) {
        setActiveSection('')
        return
      }
    }

    const observers = HOME_SECTIONS.map(({ hash }) => {
      const el = document.getElementById(hash)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && window.scrollY >= 100) {
            setActiveSection(hash)
          }
        },
        { threshold: 0.3 }
      )
      obs.observe(el)
      return obs
    }).filter(Boolean)

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      observers.forEach((o) => o.disconnect())
      window.removeEventListener('scroll', onScroll)
    }
  }, [isHome, location.pathname])

  useEffect(() => { setMenuOpen(false) }, [location.pathname])
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  /* Scroll to section — works from any page */
  const scrollToSection = useCallback((hash) => {
    setMenuOpen(false)
    if (isHome) {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      navigate('/')
      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 150)
    }
  }, [isHome, navigate])

  return (
    <>
      <nav className={scrolled ? 'nav-scrolled' : ''}>
        <Link to="/" className="nav-logo">
          SS<span>_</span>
          <span className="nav-logo-sub">AI_ENG</span>
        </Link>

        <ul className="nav-links nav-desktop">
          <li>
            <Link to="/about" className={isAbout ? 'active' : ''}>About</Link>
          </li>
          {HOME_SECTIONS.map(({ hash, label }) => (
            <li key={hash} className={hash !== 'experience' ? 'hide-mob' : ''}>
              <button
                className={`nav-hash-btn${isHome && activeSection === hash ? ' active' : ''}`}
                onClick={() => scrollToSection(hash)}
              >
                {label}
              </button>
            </li>
          ))}
          <li>
            <Link to="/projects" className={isProjects ? 'active' : ''}>Projects</Link>
          </li>
          <li>
            <Link to="/skills" className={isSkills ? 'active' : ''}>Skills</Link>
          </li>
          <li>
            <Link to="/contact" className={isContact ? 'active' : ''}>Contact</Link>
          </li>
          <li>
            <Link to="/blog" className={`nav-blog${isBlog ? ' active' : ''}`}>Blog</Link>
          </li>
        </ul>

        <div className="nav-right">
          {/* ── Social / Resume quick-links ── */}
          <div className="nav-socials">
            {NAV_SOCIALS.map((s, i) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="nav-social-icon"
                aria-label={s.label}
                style={{ '--sc': s.color, '--si': i }}
              >
                {s.icon}
                <span className="nav-social-tip">{s.label}</span>
              </a>
            ))}
            <a
              href="https://drive.google.com/file/d/11IuGRHvQkOvnITn1qVc8I0LtCssPrL4-/view"
              target="_blank"
              rel="noreferrer"
              className="nav-resume-btn"
              aria-label="View Resume"
            >
              CV ↗
            </a>
          </div>

          <ThemeToggle compact />
          <button
            className={`hamburger${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle navigation"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        <ul className="mobile-nav-links">
          <li><Link to="/about"    className={isAbout    ? 'active' : ''}>About</Link></li>
          {HOME_SECTIONS.map(({ hash, label }) => (
            <li key={hash}>
              <button
                className={`mobile-hash-btn${isHome && activeSection === hash ? ' active' : ''}`}
                onClick={() => scrollToSection(hash)}
              >
                {label}
              </button>
            </li>
          ))}
          <li><Link to="/projects" className={isProjects ? 'active' : ''}>Projects</Link></li>
          <li><Link to="/skills"   className={isSkills   ? 'active' : ''}>Skills</Link></li>
          <li><Link to="/contact"  className={isContact  ? 'active' : ''}>Contact</Link></li>
          <li><Link to="/blog"     className={isBlog     ? 'active' : ''}>Blog</Link></li>
        </ul>
        <div className="mobile-menu-footer">
          <div className="mobile-socials">
            {NAV_SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="mobile-social-icon"
                aria-label={s.label}
                style={{ '--sc': s.color }}
              >
                {s.icon}
              </a>
            ))}
            <a
              href="https://drive.google.com/file/d/11IuGRHvQkOvnITn1qVc8I0LtCssPrL4-/view"
              target="_blank"
              rel="noreferrer"
              className="mobile-resume-link"
            >
              View Resume ↗
            </a>
          </div>
          <span>Saurabh Salve · AI &amp; ML Engineer</span>
        </div>
      </div>

      {menuOpen && (
        <div className="mobile-overlay" onClick={() => setMenuOpen(false)} />
      )}
    </>
  )
}
