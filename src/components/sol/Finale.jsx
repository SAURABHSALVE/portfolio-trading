import { useEffect, useState } from 'react'
import { lorentzFactor, kineticEnergyFactor } from '../../data/relativity'
import { useInView } from './useInView'

export default function Finale() {
  const [t, setT] = useState(0)
  const [ref, inView] = useInView({ rootMargin: '100px' })

  useEffect(() => {
    if (!inView) return
    let raf
    let dir = 1
    const tick = () => {
      setT((prev) => {
        let next = prev + dir * 0.0015
        if (next > 0.999) { next = 0.999; dir = -1 }
        if (next < 0) { next = 0; dir = 1 }
        return next
      })
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView])

  const beta = t
  const gamma = lorentzFactor(beta)
  const energy = kineticEnergyFactor(beta)
  const rocketPos = Math.min(beta * 100, 98)

  return (
    <section className="sol-section sol-finale" ref={ref}>
      <div className="sol-content sol-finale-content">
        <div className="sol-section-label">08 — The Limit</div>
        <h2 className="sol-h2 sol-finale-title">
          You never reach<br />the speed of light.
        </h2>
        <p className="sol-section-sub">
          As velocity approaches c, the energy required to accelerate further grows toward infinity.
        </p>

        <div className="sol-finale-track">
          <div className="sol-finale-rocket" style={{ left: `${rocketPos}%` }}>🚀</div>
          <div className="sol-finale-c-marker">c</div>
        </div>

        <div className="sol-readout-grid">
          <div className="sol-readout">
            <div className="sol-readout-label">Speed</div>
            <div className="sol-readout-val">{(beta * 100).toFixed(3)}% of c</div>
          </div>
          <div className="sol-readout">
            <div className="sol-readout-label">Lorentz factor (γ)</div>
            <div className="sol-readout-val">{gamma < 1000 ? gamma.toFixed(2) : gamma.toExponential(2)}</div>
          </div>
          <div className="sol-readout">
            <div className="sol-readout-label">Energy required</div>
            <div className="sol-readout-val sol-glow-text">
              {energy < 1000 ? energy.toFixed(2) : energy.toExponential(2)}× mc²
            </div>
          </div>
        </div>

        <blockquote className="sol-finale-quote">
          &ldquo;The distinction between past, present and future is only a stubbornly persistent illusion.&rdquo;
          <cite>— Albert Einstein</cite>
        </blockquote>
      </div>
    </section>
  )
}
