import { useEffect, useRef, useState } from 'react'

/**
 * Tracks whether an element is within (or near) the viewport.
 * Used to pause R3F render loops and rAF animations for off-screen
 * sections so the page stays smooth even with several canvases.
 */
export function useInView({ rootMargin = '200px' } = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin, threshold: 0 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [rootMargin])

  return [ref, inView]
}
