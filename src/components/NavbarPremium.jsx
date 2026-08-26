import { useState, useEffect, useCallback } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import NeuralNetworkLogo from './NeuralNetworkLogo'
import ThemeToggle from './ThemeToggle'

/**
 * Section color system - each section has its own identity color
 */
const SECTION_COLORS = {
  journey: { name: 'Journey', hex: '#9B5CFF', label: 'Growth & Evolution' },
  experience: { name: 'Experience', hex: '#FF8A3D', label: 'Building & Execution' },
  certifications: { name: 'Certs', hex: '#FFD54A', label: 'Achievement' },
  achievements: { name: 'Achievements', hex: '#FF4FD8', label: 'Impact' },
  education: { name: 'Education', hex: '#6EC6FF', label: 'Knowledge' },
  projects: { name: 'Projects', hex: '#00FF9D', label: 'Creation' },
  skills: { name: 'Skills', hex: '#FF6B4A', label: 'Capability' },
  about: { name: 'About', hex: '#00E5FF', label: 'Identity' },
  blog: { name: 'Blog', hex: '#A3FF5B', label: 'Ideas' },
}

const HOME_SECTIONS = [
  { hash: 'journey', label: 'Journey' },
  { hash: 'experience', label: 'Experience' },
  { hash: 'certifications', label: 'Certs' },
  { hash: 'achievements', label: 'Achievements' },
  { hash: 'education', label: 'Education' },
]

const PAGE_SECTIONS = [
  { path: '/about', label: 'About' },
  { path: '/projects', label: 'Projects' },
  { path: '/skills', label: 'Skills' },
  { path: '/blog', label: 'Blog' },
]

const NAV_SOCIALS = [
  {
    label: 'GitHub',
    href: 'https://github.com/SAURABHSALVE',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/saurabhsalve99/',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
]

export default function NavbarPremium() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'

  const activeColor = activeSection ? SECTION_COLORS[activeSection] : { hex: '#00E5FF' }

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Detect active section
  useEffect(() => {
    if (!isHome) {
      setActiveSection(null)
      return
    }

    const observers = HOME_SECTIONS.map(({ hash }) => {
      const el = document.getElementById(hash)
      if (!el) return null
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && window.scrollY > 100) {
            setActiveSection(hash)
          }
        },
        { threshold: 0.3 }
      )
      observer.observe(el)
      return observer
    }).filter(Boolean)

    const handleScroll = () => {
      if (window.scrollY < 100) setActiveSection(null)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      observers.forEach((o) => o.disconnect())
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isHome])

  const handleLogoClick = useCallback(() => {
    setMenuOpen(false)
    if (!isHome) {
      navigate('/')
      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100)
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [isHome, navigate])

  const scrollToSection = useCallback((hash) => {
    setMenuOpen(false)
    if (isHome) {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/')
      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }, [isHome, navigate])

  return (
    <>
      <motion.nav
        className="navbar-premium"
        initial={false}
        animate={{
          borderBottomColor: scrolled ? activeColor.hex + '60' : activeColor.hex + '20',
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Logo */}
        <motion.button
          onClick={handleLogoClick}
          className="navbar-logo"
          whileHover={{ backgroundColor: 'rgba(0, 229, 255, 0.08)' }}
          aria-label="Home"
        >
          <NeuralNetworkLogo />
        </motion.button>

        {/* Center Nav - Desktop Only */}
        <div className="navbar-nav-center">
          <div className="navbar-nav-group">
            {HOME_SECTIONS.map(({ hash, label }) => (
              <motion.button
                key={hash}
                onClick={() => scrollToSection(hash)}
                className="navbar-nav-item"
                layout
                animate={{
                  color: activeSection === hash ? activeColor.hex : 'rgba(255, 255, 255, 0.5)',
                  backgroundColor: activeSection === hash ? activeColor.hex + '15' : 'transparent',
                  scale: activeSection === hash ? 1.05 : 1,
                }}
                whileHover={{
                  backgroundColor: activeColor.hex + '20',
                  scale: 1.08,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                {activeSection === hash && (
                  <motion.div
                    layoutId="underline"
                    className="navbar-underline"
                    style={{ backgroundColor: activeColor.hex }}
                  />
                )}
                {label}
              </motion.button>
            ))}
          </div>

          <div className="navbar-nav-separator" />

          <div className="navbar-nav-group">
            {PAGE_SECTIONS.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className="navbar-nav-item navbar-nav-static"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Right Section */}
        <div className="navbar-right">
          {/* Socials - Desktop Only */}
          <div className="navbar-socials-container">
            {NAV_SOCIALS.map(({ label, href, icon }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="navbar-social-icon"
                whileHover={{ backgroundColor: 'rgba(0, 229, 255, 0.15)', y: -2 }}
                aria-label={label}
              >
                {icon}
              </motion.a>
            ))}
          </div>

          {/* Resume Button */}
          <motion.a
            href="/Saurabh_Salve_Resume_BACKEND_AI_DEVELOPER.pdf"
            target="_blank"
            rel="noreferrer"
            className="navbar-resume-btn"
            style={{
              borderColor: activeColor.hex + '60',
              color: activeColor.hex,
              backgroundColor: activeColor.hex + '10',
            }}
            whileHover={{
              borderColor: activeColor.hex + 'c0',
              backgroundColor: activeColor.hex + '20',
              y: -2,
            }}
          >
            CV ↗
          </motion.a>

          {/* Theme Toggle */}
          <ThemeToggle compact />

          {/* Hamburger - Mobile Only */}
          <motion.button
            onClick={() => setMenuOpen(!menuOpen)}
            className="navbar-hamburger"
            aria-label="Toggle menu"
          >
            <motion.span animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }} />
            <motion.span animate={menuOpen ? { opacity: 0 } : { opacity: 1 }} />
            <motion.span animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }} />
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="navbar-mobile-menu"
          >
            {HOME_SECTIONS.map(({ hash, label }) => (
              <motion.button
                key={hash}
                onClick={() => {
                  scrollToSection(hash)
                  setMenuOpen(false)
                }}
                className="navbar-mobile-item"
                style={{
                  color: activeSection === hash ? activeColor.hex : 'rgba(255, 255, 255, 0.7)',
                  backgroundColor: activeSection === hash ? activeColor.hex + '15' : 'transparent',
                }}
              >
                {label}
              </motion.button>
            ))}

            <div className="navbar-mobile-divider" />

            {PAGE_SECTIONS.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                onClick={() => setMenuOpen(false)}
                className="navbar-mobile-item"
              >
                {label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="h-16" />
    </>
  )
}
