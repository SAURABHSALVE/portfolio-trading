import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { formatBetaPercent } from '../../data/relativity'
import { useInView } from './useInView'

function WarpMesh({ betaRef }) {
  const meshRef = useRef()
  const groupRef = useRef()

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(40, 40, 56, 56)
    geo.rotateX(-Math.PI / 2)
    return geo
  }, [])

  const basePositions = useMemo(
    () => Float32Array.from(geometry.attributes.position.array),
    [geometry]
  )

  useFrame(({ clock }) => {
    const beta = betaRef.current
    const warp = beta * beta * 9
    const pos = geometry.attributes.position
    const arr = pos.array
    for (let i = 0; i < arr.length; i += 3) {
      const x = basePositions[i]
      const z = basePositions[i + 2]
      const distSq = x * x + z * z
      arr[i + 1] = basePositions[i + 1] - warp * Math.exp(-distSq / 30)
    }
    pos.needsUpdate = true

    if (groupRef.current) {
      const t = clock.getElapsedTime()
      groupRef.current.rotation.y = Math.sin(t * 0.08) * 0.35 + t * 0.02
    }
  })

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef} geometry={geometry}>
        <meshBasicMaterial color="#7c5cff" wireframe transparent opacity={0.55} />
      </mesh>
      <mesh position={[0, 0.2, 0]}>
        <sphereGeometry args={[0.6, 24, 24]} />
        <meshBasicMaterial color="#5cd0ff" />
      </mesh>
    </group>
  )
}

export default function RelativityGrid({ beta }) {
  const betaRef = useRef(0)
  betaRef.current = beta

  const [ref, inView] = useInView({ rootMargin: '250px' })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (inView) setMounted(true)
  }, [inView])

  return (
    <section className="sol-section sol-grid">
      <div className="sol-canvas-bg" ref={ref}>
        {mounted && (
          <Canvas
            camera={{ position: [0, 11, 20], fov: 50 }}
            dpr={[1, 1.5]}
            gl={{ powerPreference: 'high-performance' }}
            frameloop={inView ? 'always' : 'never'}
          >
            <WarpMesh betaRef={betaRef} />
          </Canvas>
        )}
      </div>

      <div className="sol-content">
        <div className="sol-section-label">05 — Spacetime</div>
        <h2 className="sol-h2">Mass and motion bend the grid</h2>
        <p className="sol-section-sub">
          At {formatBetaPercent(beta)} of c, the fabric of spacetime around the rocket warps further.
          Reality itself is the geometry being deformed.
        </p>
      </div>
    </section>
  )
}
