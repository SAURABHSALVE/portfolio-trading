import { useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import WarpField from './WarpField'
import { useInView } from './useInView'

/**
 * Fixed-position fullscreen star field. `speedRef` is a mutable ref
 * (not state) so the slider can drive 60fps animation without
 * re-rendering React on every tick.
 *
 * The canvas only mounts once it nears the viewport, and its render
 * loop pauses while off-screen — keeps multiple WebGL contexts on the
 * page from competing for the same frame budget.
 */
export default function StarFieldCanvas({ speedRef, tint, className = '' }) {
  const [ref, inView] = useInView({ rootMargin: '250px' })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (inView) setMounted(true)
  }, [inView])

  return (
    <div ref={ref} className={`sol-canvas-bg ${className}`}>
      {mounted && (
        <Canvas
          camera={{ position: [0, 0, 5], fov: 75 }}
          dpr={[1, 1.5]}
          gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
          frameloop={inView ? 'always' : 'never'}
        >
          <WarpField speedRef={speedRef} tint={tint} />
        </Canvas>
      )}
    </div>
  )
}
