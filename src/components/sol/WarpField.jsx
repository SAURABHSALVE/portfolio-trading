import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'

const STAR_COUNT = 1800
const SPREAD = 60
const DEPTH = 90

function randomStar(out, i) {
  out[i]     = (Math.random() - 0.5) * SPREAD
  out[i + 1] = (Math.random() - 0.5) * SPREAD
  out[i + 2] = -Math.random() * DEPTH
}

/**
 * A field of stars rendered as line segments (point -> trailing point).
 * At low speed they look like dots; as `speedRef.current` (0..1) rises,
 * the trailing segment stretches into a streak — simulating relativistic
 * motion blur without any post-processing passes.
 */
export default function WarpField({ speedRef, tint = '#ffffff' }) {
  const lineRef = useRef()

  const positions = useMemo(() => {
    const arr = new Float32Array(STAR_COUNT * 6)
    for (let i = 0; i < STAR_COUNT; i++) {
      const tmp = new Float32Array(3)
      randomStar(tmp, 0)
      const idx = i * 6
      arr[idx] = tmp[0]; arr[idx + 1] = tmp[1]; arr[idx + 2] = tmp[2]
      arr[idx + 3] = tmp[0]; arr[idx + 4] = tmp[1]; arr[idx + 5] = tmp[2]
    }
    return arr
  }, [])

  useFrame((_, delta) => {
    const speed = speedRef?.current ?? 0
    const dt = Math.min(delta, 0.05)
    const baseSpeed = 6 + speed * speed * 240
    const streak = 0.4 + speed * speed * 38

    const arr = lineRef.current.geometry.attributes.position.array
    for (let i = 0; i < STAR_COUNT; i++) {
      const idx = i * 6
      arr[idx + 2] += baseSpeed * dt
      if (arr[idx + 2] > 4) {
        randomStar(arr, idx)
        arr[idx + 3] = arr[idx]
        arr[idx + 4] = arr[idx + 1]
        arr[idx + 5] = arr[idx + 2]
        continue
      }
      arr[idx + 3] = arr[idx]
      arr[idx + 4] = arr[idx + 1]
      arr[idx + 5] = arr[idx + 2] - streak
    }
    lineRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <lineSegments ref={lineRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={STAR_COUNT * 2}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color={tint} transparent opacity={0.85} />
    </lineSegments>
  )
}
