import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import StarFieldCanvas from './StarFieldCanvas'

export default function Hero() {
  const sectionRef = useRef(null)
  const heroSpeedRef = useRef(0)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.6])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const textY = useTransform(scrollYProgress, [0, 1], [0, -120])

  useEffect(() => {
    const unsub = scrollYProgress.on('change', (v) => {
      // stars accelerate gently as the hero scrolls past
      heroSpeedRef.current = Math.min(v * 0.6, 0.6)
    })
    return unsub
  }, [scrollYProgress])

  return (
    <section ref={sectionRef} className="sol-hero">
      <motion.div className="sol-hero-canvas" style={{ scale }}>
        <StarFieldCanvas speedRef={heroSpeedRef} />
        <div className="sol-nebula sol-nebula--1" />
        <div className="sol-nebula sol-nebula--2" />
      </motion.div>

      <motion.div className="sol-hero-content" style={{ opacity, y: textY }}>
        <span className="sol-eyebrow">Special Relativity · Interactive</span>
        <h1 className="sol-hero-title">
          What Happens as You<br />Approach the <span className="sol-glow">Speed of Light?</span>
        </h1>
        <p className="sol-hero-sub">A visual journey through Einstein&rsquo;s universe.</p>
        <div className="sol-scroll-hint">
          <span>Scroll to begin</span>
          <div className="sol-scroll-line" />
        </div>
      </motion.div>
    </section>
  )
}
