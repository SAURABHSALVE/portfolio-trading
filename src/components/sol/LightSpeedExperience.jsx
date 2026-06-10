import { useRef } from 'react'
import { motion } from 'framer-motion'
import StarFieldCanvas from './StarFieldCanvas'
import { lorentzFactor, formatBetaPercent } from '../../data/relativity'

const DEMO_BETA = 0.9999

export default function LightSpeedExperience() {
  const speedRef = useRef(DEMO_BETA)
  const gamma = lorentzFactor(DEMO_BETA)

  return (
    <section className="sol-section sol-cinematic">
      <StarFieldCanvas speedRef={speedRef} className="sol-cinematic-canvas" tint="#aee4ff" />
      <div className="sol-cinematic-vignette" />

      <motion.div
        className="sol-content sol-cinematic-content"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1.2 }}
      >
        <div className="sol-section-label">06 — {formatBetaPercent(DEMO_BETA)} of Light Speed</div>
        <h2 className="sol-h2 sol-cinematic-title">
          From your perspective,<br />the universe changes.
        </h2>

        <div className="sol-readout-grid sol-readout-grid--cinematic">
          <div className="sol-readout">
            <div className="sol-readout-label">Time slows by</div>
            <div className="sol-readout-val sol-glow-text">{gamma.toFixed(1)}×</div>
          </div>
          <div className="sol-readout">
            <div className="sol-readout-label">Distances contract to</div>
            <div className="sol-readout-val sol-glow-text">{(100 / gamma).toFixed(2)}%</div>
          </div>
          <div className="sol-readout">
            <div className="sol-readout-label">A 100-year journey feels like</div>
            <div className="sol-readout-val sol-glow-text">{(100 / gamma).toFixed(2)} years</div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
