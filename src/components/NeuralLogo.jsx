import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function NeuralLogo() {
  const [isHovering, setIsHovering] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    const handler = (e) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  const nodeVariants = {
    idle: { scale: 1 },
    hover: { scale: 1.3 }
  }

  // Random glow pulses on outer nodes - respects prefers-reduced-motion
  const getRandomPulse = (nodeIndex) => {
    if (prefersReducedMotion) return { opacity: 0.8 }
    const baseDelay = nodeIndex * 0.8
    return {
      animate: { opacity: [0.4, 1, 0.4] },
      transition: {
        duration: 3,
        repeat: Infinity,
        delay: baseDelay,
        ease: 'easeInOut'
      }
    }
  }

  // Energy packets traveling along connections
  const EnergyPacket = ({ x1, y1, x2, y2, delay }) => {
    if (prefersReducedMotion) return null

    const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))

    return (
      <>
        {/* Moving energy dot */}
        <motion.circle
          cx={x1}
          cy={y1}
          r="1.2"
          fill="#00e5ff"
          filter="url(#neural-glow)"
          animate={{
            cx: [x1, x2, x2],
            cy: [y1, y2, y2],
            opacity: [0, 0.9, 0]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            delay,
            ease: 'easeInOut'
          }}
        />
        {/* Energy trail / glow behind packet */}
        <motion.circle
          cx={x1}
          cy={y1}
          r="1.5"
          fill="none"
          stroke="#00e5ff"
          strokeWidth="0.5"
          filter="url(#neural-glow)"
          animate={{
            cx: [x1, x2, x2],
            cy: [y1, y2, y2],
            opacity: [0, 0.5, 0]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            delay: delay + 0.1,
            ease: 'easeInOut'
          }}
        />
      </>
    )
  }

  return (
    <motion.svg
      width="52"
      height="52"
      viewBox="0 0 52 52"
      className="neural-logo-svg"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{ cursor: 'pointer' }}
    >
      <defs>
        {/* Standard glow filter */}
        <filter id="neural-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.8" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>

        {/* Intense glow for hover state */}
        <filter id="neural-glow-hover" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>

        {/* Ambient glow backdrop */}
        <filter id="neural-ambient">
          <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
          </feMerge>
        </filter>
      </defs>

      {/* Ambient glow backdrop - creates holographic feel */}
      {!prefersReducedMotion && (
        <>
          <motion.circle
            cx="26" cy="26" r="20"
            fill="none"
            stroke="#00e5ff"
            strokeWidth="0.5"
            opacity="0.1"
            filter="url(#neural-ambient)"
            animate={{ r: [20, 22, 20], opacity: [0.1, 0.15, 0.1] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </>
      )}

      {/* Connection lines - subtle backdrop */}
      <line x1="26" y1="26" x2="26" y2="8" stroke="#00e5ff" strokeWidth="1" opacity="0.25"/>
      <line x1="26" y1="26" x2="44" y2="26" stroke="#00e5ff" strokeWidth="1" opacity="0.25"/>
      <line x1="26" y1="26" x2="26" y2="44" stroke="#00e5ff" strokeWidth="1" opacity="0.25"/>
      <line x1="26" y1="26" x2="8" y2="26" stroke="#00e5ff" strokeWidth="1" opacity="0.25"/>

      {/* Energy packets traveling through connections */}
      <EnergyPacket x1="26" y1="26" x2="26" y2="8" delay={0} />
      <EnergyPacket x1="26" y1="26" x2="44" y2="26" delay={1.25} />
      <EnergyPacket x1="26" y1="26" x2="26" y2="44" delay={2.5} />
      <EnergyPacket x1="26" y1="26" x2="8" y2="26" delay={3.75} />

      {/* Connection pulse glow */}
      {!prefersReducedMotion && (
        <>
          <motion.line x1="26" y1="26" x2="26" y2="8" stroke="#00e5ff" strokeWidth="0.8" filter="url(#neural-glow)" animate={{ opacity: [0, 0.6, 0] }} transition={{ duration: 5, repeat: Infinity, delay: 0 }} />
          <motion.line x1="26" y1="26" x2="44" y2="26" stroke="#00e5ff" strokeWidth="0.8" filter="url(#neural-glow)" animate={{ opacity: [0, 0.6, 0] }} transition={{ duration: 5, repeat: Infinity, delay: 1.25 }} />
          <motion.line x1="26" y1="26" x2="26" y2="44" stroke="#00e5ff" strokeWidth="0.8" filter="url(#neural-glow)" animate={{ opacity: [0, 0.6, 0] }} transition={{ duration: 5, repeat: Infinity, delay: 2.5 }} />
          <motion.line x1="26" y1="26" x2="8" y2="26" stroke="#00e5ff" strokeWidth="0.8" filter="url(#neural-glow)" animate={{ opacity: [0, 0.6, 0] }} transition={{ duration: 5, repeat: Infinity, delay: 3.75 }} />
        </>
      )}

      {/* Outer nodes - with random glow pulses */}
      <motion.circle
        cx="26" cy="8" r="2.8"
        fill="#00e5ff"
        filter={isHovering ? 'url(#neural-glow-hover)' : 'url(#neural-glow)'}
        variants={nodeVariants}
        animate={isHovering ? 'hover' : 'idle'}
        transition={{ type: 'spring', stiffness: 400, damping: 12 }}
        {...getRandomPulse(0)}
      />
      <motion.circle
        cx="44" cy="26" r="2.8"
        fill="#00e5ff"
        filter={isHovering ? 'url(#neural-glow-hover)' : 'url(#neural-glow)'}
        variants={nodeVariants}
        animate={isHovering ? 'hover' : 'idle'}
        transition={{ type: 'spring', stiffness: 400, damping: 12 }}
        {...getRandomPulse(1)}
      />
      <motion.circle
        cx="26" cy="44" r="2.8"
        fill="#00e5ff"
        filter={isHovering ? 'url(#neural-glow-hover)' : 'url(#neural-glow)'}
        variants={nodeVariants}
        animate={isHovering ? 'hover' : 'idle'}
        transition={{ type: 'spring', stiffness: 400, damping: 12 }}
        {...getRandomPulse(2)}
      />
      <motion.circle
        cx="8" cy="26" r="2.8"
        fill="#00e5ff"
        filter={isHovering ? 'url(#neural-glow-hover)' : 'url(#neural-glow)'}
        variants={nodeVariants}
        animate={isHovering ? 'hover' : 'idle'}
        transition={{ type: 'spring', stiffness: 400, damping: 12 }}
        {...getRandomPulse(3)}
      />

      {/* Central AI core - nucleus of the network */}
      <motion.circle
        cx="26" cy="26" r="4"
        fill="#00e5ff"
        filter={isHovering ? 'url(#neural-glow-hover)' : 'url(#neural-glow)'}
        variants={nodeVariants}
        animate={isHovering ? 'hover' : 'idle'}
        transition={{ type: 'spring', stiffness: 400, damping: 12 }}
      />

      {/* Core pulse indicator - subtle breathing effect */}
      {!prefersReducedMotion && (
        <motion.circle
          cx="26" cy="26" r="4"
          fill="none"
          stroke="#00e5ff"
          strokeWidth="0.5"
          opacity="0.5"
          animate={{ r: [4, 5.5, 4], opacity: [0.5, 0.15, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
    </motion.svg>
  )
}
