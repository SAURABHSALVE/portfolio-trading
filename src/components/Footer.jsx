const SOCIALS = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/saurabhsalve99/',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    color: '#0077b5',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/SAURABHSALVE',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
      </svg>
    ),
    color: '#8b96a5',
  },
  {
    label: 'Twitter / X',
    href: 'https://twitter.com/saurabhsalve99',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
    color: '#1da1f2',
  },
  {
    label: 'Email',
    href: 'mailto:saurabhsalve9999@gmail.com',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
      </svg>
    ),
    color: '#ea4335',
  },
  {
    label: 'Phone',
    href: 'tel:+919766789387',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
      </svg>
    ),
    color: '#00ff9d',
  },
]

const NAV_LINKS = [
  { label: 'About',          href: '/about' },
  { label: 'Experience',     href: '#experience' },
  { label: 'Projects',       href: '/projects' },
  { label: 'Skills',         href: '/skills' },
  { label: 'Contact',        href: '/contact' },
  { label: 'Blog',           href: '/blog' },
]

export default function Footer() {
  const handleNavClick = (href) => {
    if (href.startsWith('#')) {
      document.getElementById(href.slice(1))?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="footer-full">
      <div className="footer-row">
        <div className="footer-brand-mini">
          <div className="footer-logo-sm">SS_</div>
          <span className="footer-tagline-sm">AI &amp; ML Engineer</span>
        </div>

        <ul className="footer-nav-inline">
          {NAV_LINKS.map((l) => (
            <li key={l.label}>
              {l.href.startsWith('#') ? (
                <button className="footer-nav-btn" onClick={() => handleNavClick(l.href)}>
                  {l.label}
                </button>
              ) : (
                <a href={l.href} className="footer-nav-link">{l.label}</a>
              )}
            </li>
          ))}
        </ul>

        <div className="footer-socials">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              className="footer-social-btn"
              title={s.label}
              style={{ '--social-color': s.color }}
            >
              {s.icon}
            </a>
          ))}
        </div>
      </div>

      <div className="footer-bottom">
        <span className="footer-copy">© 2025 Saurabh Salve · Built with React + Vite</span>
        <span className="footer-status">
          <span className="footer-dot" />
          Open to opportunities
        </span>
      </div>
    </footer>
  )
}
