import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { useScrollReveal } from './hooks/useScrollReveal'
import { ThemeProvider } from './context/ThemeContext'
import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Journey from './components/Journey'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Certifications from './components/Certifications'
import Achievements from './components/Achievements'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Skills from './pages/Skills'
import BlogList from './pages/BlogList'
import BlogPost from './pages/BlogPost'

/* Home page — Hero + Journey + Experience + Certifications + Achievements + Education */
function HomePage() {
  useScrollReveal()
  return (
    <>
      <Hero />
      <Journey />
      <Experience />
      <Certifications />
      <Achievements />
      <Education />
      <Footer />
    </>
  )
}

function PageFrame({ children, showFooter = true }) {
  useScrollReveal()
  return (
    <>
      {children}
      {showFooter && <Footer />}
    </>
  )
}

/* Only scroll to top on path changes, not hash-only changes */
function ScrollToTop() {
  const { pathname, hash } = useLocation()
  const prevPath = useRef(pathname)

  useEffect(() => {
    if (pathname !== prevPath.current) {
      prevPath.current = pathname
      if (!hash) window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [pathname, hash])

  return null
}

/* Floating back-to-top / go-home button */
function FloatHomeBtn() {
  const [show, setShow]   = useState(false)
  const location          = useLocation()
  const navigate          = useNavigate()
  const isHome            = location.pathname === '/'

  useEffect(() => {
    if (!isHome) { setShow(true); return }
    const onScroll = () => setShow(window.scrollY > 350)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome])

  const handleClick = () => {
    if (isHome) window.scrollTo({ top: 0, behavior: 'smooth' })
    else navigate('/')
  }

  return (
    <button
      className={`float-home-btn${show ? ' float-home-btn--show' : ''}`}
      onClick={handleClick}
      aria-label={isHome ? 'Scroll to top' : 'Go to home page'}
      title={isHome ? 'Back to top' : 'Home'}
    >
      <span className="float-home-icon">{isHome ? '↑' : '⌂'}</span>
      <span className="float-home-label">{isHome ? 'Top' : 'Home'}</span>
    </button>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <Cursor />
      <Navbar />
      <ScrollToTop />
      <FloatHomeBtn />
      <Routes>
        <Route path="/"           element={<HomePage />} />
        <Route path="/about"      element={<PageFrame><div className="page-top-pad"><About /></div></PageFrame>} />
        <Route path="/projects"   element={<PageFrame><div className="page-top-pad"><Projects /></div></PageFrame>} />
        <Route path="/contact"    element={<PageFrame><div className="page-top-pad"><Contact /></div></PageFrame>} />
        <Route path="/skills"     element={<PageFrame><Skills /></PageFrame>} />
        <Route path="/blog"       element={<PageFrame showFooter={false}><BlogList /></PageFrame>} />
        <Route path="/blog/:slug" element={<PageFrame showFooter={false}><BlogPost /></PageFrame>} />
      </Routes>
    </ThemeProvider>
  )
}
