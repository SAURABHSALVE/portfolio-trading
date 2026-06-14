import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

/**
 * Premium Asymmetrical Neural Network Topology
 * 16 nodes in complex, intelligent-looking clustered architecture
 */
function generateNeuralTopology() {
  const nodes = [
    // Ultra-prominent central core - the AI brain
    { id: 0, x: 50, y: 50, r: 7, layer: 'core', importance: 1, color: '#00E5FF' },

    // Inner ring - strong connections (6 nodes at varying distances)
    { id: 1, x: 38, y: 32, r: 3.8, layer: 'inner', importance: 0.85, color: '#00E5FF' },
    { id: 2, x: 62, y: 28, r: 3.6, layer: 'inner', importance: 0.83, color: '#00E5FF' },
    { id: 3, x: 70, y: 50, r: 3.7, layer: 'inner', importance: 0.84, color: '#00E5FF' },
    { id: 4, x: 60, y: 70, r: 3.5, layer: 'inner', importance: 0.82, color: '#00E5FF' },
    { id: 5, x: 35, y: 68, r: 3.6, layer: 'inner', importance: 0.83, color: '#00E5FF' },
    { id: 6, x: 30, y: 48, r: 3.7, layer: 'inner', importance: 0.84, color: '#00E5FF' },

    // Outer cluster - secondary connections (10 nodes, highly asymmetrical)
    { id: 7, x: 20, y: 20, r: 2.9, layer: 'outer', importance: 0.68, color: '#00E5FF' },
    { id: 8, x: 12, y: 48, r: 2.7, layer: 'outer', importance: 0.62, color: '#00E5FF' },
    { id: 9, x: 22, y: 78, r: 2.8, layer: 'outer', importance: 0.65, color: '#00E5FF' },
    { id: 10, x: 75, y: 22, r: 2.8, layer: 'outer', importance: 0.64, color: '#00E5FF' },
    { id: 11, x: 82, y: 72, r: 2.7, layer: 'outer', importance: 0.63, color: '#00E5FF' },
    { id: 12, x: 58, y: 85, r: 2.6, layer: 'outer', importance: 0.60, color: '#00E5FF' },
    { id: 13, x: 18, y: 70, r: 2.8, layer: 'outer', importance: 0.65, color: '#00E5FF' },
    { id: 14, x: 78, y: 8, r: 2.5, layer: 'outer', importance: 0.58, color: '#00E5FF' },
    { id: 15, x: 85, y: 50, r: 2.6, layer: 'outer', importance: 0.61, color: '#00E5FF' },
    { id: 16, x: 45, y: 12, r: 2.7, layer: 'outer', importance: 0.62, color: '#00E5FF' },
  ]

  return nodes
}

/**
 * Generates premium connections creating intelligent topology
 */
function generateConnections(nodes) {
  const connections = []
  const seenPairs = new Set()

  // Core to all inner ring - strong primary connections
  for (let i = 1; i <= 6; i++) {
    connections.push({
      from: 0,
      to: i,
      strength: 0.95,
      width: 1.3,
      priority: 'high',
    })
  }

  // Inner ring mutual connections - create intelligent web
  for (let i = 1; i <= 6; i++) {
    for (let j = i + 1; j <= 6; j++) {
      const n1 = nodes[i]
      const n2 = nodes[j]
      const dist = Math.sqrt((n1.x - n2.x) ** 2 + (n1.y - n2.y) ** 2)

      if (dist < 36) {
        const key = `${i}-${j}`
        if (!seenPairs.has(key)) {
          connections.push({
            from: i,
            to: j,
            strength: Math.max(0.45, 1 - dist / 45),
            width: 0.95,
            priority: 'medium',
          })
          seenPairs.add(key)
        }
      }
    }
  }

  // Strategic outer ring connections
  for (let i = 7; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const n1 = nodes[i]
      const n2 = nodes[j]
      const dist = Math.sqrt((n1.x - n2.x) ** 2 + (n1.y - n2.y) ** 2)

      if (dist < 32 && Math.random() > 0.45) {
        const key = `${i}-${j}`
        if (!seenPairs.has(key)) {
          connections.push({
            from: i,
            to: j,
            strength: Math.max(0.3, 1 - dist / 36),
            width: 0.75,
            priority: 'low',
          })
          seenPairs.add(key)
        }
      }
    }
  }

  // Inner to Outer connections - bridge system
  for (let i = 1; i <= 6; i++) {
    for (let j = 7; j < nodes.length; j++) {
      const n1 = nodes[i]
      const n2 = nodes[j]
      const dist = Math.sqrt((n1.x - n2.x) ** 2 + (n1.y - n2.y) ** 2)

      if (dist < 30 && Math.random() > 0.55) {
        const key = `${i}-${j}`
        if (!seenPairs.has(key)) {
          connections.push({
            from: i,
            to: j,
            strength: Math.max(0.35, 1 - dist / 35),
            width: 0.8,
            priority: 'medium',
          })
          seenPairs.add(key)
        }
      }
    }
  }

  return connections
}

/**
 * Premium Energy Particle Animation
 */
function EnergyParticle({ fromNode, toNode, delay, duration = 4.5, color }) {
  return (
    <>
      {/* Main particle */}
      <motion.circle
        cx={fromNode.x}
        cy={fromNode.y}
        r="1"
        fill={color}
        filter="url(#energyGlow)"
        initial={{ cx: fromNode.x, cy: fromNode.y, opacity: 0 }}
        animate={{
          cx: [fromNode.x, toNode.x, toNode.x],
          cy: [fromNode.y, toNode.y, toNode.y],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration,
          repeat: Infinity,
          delay,
          ease: 'easeInOut',
        }}
      />

      {/* Trailing glow */}
      <motion.circle
        cx={fromNode.x}
        cy={fromNode.y}
        r="2"
        fill="none"
        stroke={color}
        strokeWidth={0.5}
        opacity={0.4}
        filter="url(#energyGlow)"
        animate={{
          cx: [fromNode.x, toNode.x, toNode.x],
          cy: [fromNode.y, toNode.y, toNode.y],
          opacity: [0.4, 0.8, 0],
        }}
        transition={{
          duration,
          repeat: Infinity,
          delay: delay + 0.05,
          ease: 'easeInOut',
        }}
      />
    </>
  )
}

export default function NeuralNetworkLogo() {
  const [isHovering, setIsHovering] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [nodes, setNodes] = useState([])
  const [connections, setConnections] = useState([])
  const [isDarkMode, setIsDarkMode] = useState(true)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    const handler = (e) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    const checkDarkMode = () => {
      const theme = document.documentElement.getAttribute('data-theme')
      setIsDarkMode(theme !== 'light')
    }
    checkDarkMode()
    const observer = new MutationObserver(checkDarkMode)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const newNodes = generateNeuralTopology()
    const newConnections = generateConnections(newNodes)
    setNodes(newNodes)
    setConnections(newConnections)
  }, [])

  if (nodes.length === 0) return null

  const logoColor = isDarkMode ? '#00E5FF' : '#0052cc'
  const coreNode = nodes[0]
  const nodeGlowOffsets = nodes.map((_, i) => (i * 0.6) % 3.5)

  return (
    <motion.svg
      width="70"
      height="70"
      viewBox="0 0 100 100"
      className="neural-network-logo"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      animate={isHovering ? { scale: 1.15 } : { scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <defs>
        {/* Glow filters */}
        <filter id="nodeGlow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="energyGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="coreGlow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="hoverGlow" x="-120%" y="-120%" width="340%" height="340%">
          <feGaussianBlur stdDeviation="5.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Ambient energy field */}
      {!prefersReducedMotion && (
        <motion.circle
          cx="50"
          cy="50"
          r="38"
          fill="none"
          stroke={logoColor}
          strokeWidth={0.3}
          opacity={0.05}
          animate={{
            r: isHovering ? [38, 42, 38] : [35, 38, 35],
            opacity: isHovering ? [0.1, 0.2, 0.1] : [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: isHovering ? 1.2 : 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      )}

      {/* Connection lines - static base */}
      {connections.map((conn, i) => {
        const fromNode = nodes[conn.from]
        const toNode = nodes[conn.to]
        return (
          <motion.line
            key={`conn-${i}`}
            x1={fromNode.x}
            y1={fromNode.y}
            x2={toNode.x}
            y2={toNode.y}
            stroke={logoColor}
            strokeWidth={conn.width || 0.8}
            opacity={isHovering ? 0.6 : 0.2}
            transition={{ opacity: { duration: 0.3 } }}
          />
        )
      })}

      {/* Breathing connection glow during hover */}
      {isHovering &&
        !prefersReducedMotion &&
        connections.slice(0, Math.ceil(connections.length * 0.5)).map((conn, i) => {
          const fromNode = nodes[conn.from]
          const toNode = nodes[conn.to]
          return (
            <motion.line
              key={`glow-${i}`}
              x1={fromNode.x}
              y1={fromNode.y}
              x2={toNode.x}
              y2={toNode.y}
              stroke={logoColor}
              strokeWidth={(conn.width || 0.8) * 1.5}
              filter="url(#nodeGlow)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.5, 0] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: (i * 0.12) % 2.2,
              }}
            />
          )
        })}

      {/* Energy particles traveling through connections */}
      {!prefersReducedMotion &&
        connections.slice(0, Math.ceil(connections.length * 0.65)).map((conn, i) => (
          <EnergyParticle
            key={`energy-${i}`}
            fromNode={nodes[conn.from]}
            toNode={nodes[conn.to]}
            delay={(i * 0.55) % 4.2}
            duration={4.5 + (i % 3) * 0.4}
            color={logoColor}
          />
        ))}

      {/* Neural nodes with hierarchy-based glows */}
      {nodes.map((node) => {
        const isCore = node.id === 0
        const isInner = node.layer === 'inner'

        return (
          <motion.g key={`node-${node.id}`}>
            {/* Pulsing outer glow */}
            {!prefersReducedMotion && (
              <motion.circle
                cx={node.x}
                cy={node.y}
                r={node.r + 2}
                fill="none"
                stroke={logoColor}
                strokeWidth={0.4}
                opacity={isHovering ? 0.5 : 0.15}
                animate={{
                  r: isHovering
                    ? [node.r + 2, node.r + 5, node.r + 2]
                    : [node.r + 1.5, node.r + 3.5, node.r + 1.5],
                  opacity: isHovering ? [0.5, 1, 0.5] : [0.15, 0.35, 0.15],
                }}
                transition={{
                  duration: isCore ? 1.8 : 2.5 + node.id * 0.15,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: nodeGlowOffsets[node.id],
                }}
              />
            )}

            {/* Main node circle */}
            <motion.circle
              cx={node.x}
              cy={node.y}
              r={node.r}
              fill={logoColor}
              filter={isHovering ? 'url(#hoverGlow)' : isCore ? 'url(#coreGlow)' : 'url(#nodeGlow)'}
              animate={
                isHovering
                  ? {
                      r: node.r * (isCore ? 1.55 : isInner ? 1.35 : 1.22),
                      opacity: 1,
                    }
                  : {
                      r: node.r,
                      opacity: isCore ? 1 : 0.88,
                    }
              }
              transition={{
                type: 'spring',
                stiffness: 350,
                damping: 22,
              }}
            />

            {/* 3D highlight on core */}
            {isCore && (
              <motion.circle
                cx={node.x - 1.5}
                cy={node.y - 2}
                r={node.r * 0.45}
                fill="white"
                opacity={isHovering ? 0.5 : 0.25}
                transition={{ opacity: { duration: 0.3 } }}
              />
            )}
          </motion.g>
        )
      })}

      {/* Core pulse wave - premium effect */}
      {!prefersReducedMotion && (
        <motion.circle
          cx={coreNode.x}
          cy={coreNode.y}
          r={coreNode.r}
          fill="none"
          stroke={logoColor}
          strokeWidth={0.7}
          animate={{
            r: isHovering ? [coreNode.r + 3, coreNode.r + 7] : [coreNode.r + 2, coreNode.r + 5],
            opacity: isHovering ? [0.9, 0] : [0.6, 0],
          }}
          transition={{
            duration: isHovering ? 0.7 : 1.3,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      )}
    </motion.svg>
  )
}
