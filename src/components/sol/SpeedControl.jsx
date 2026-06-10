import { useRef, useEffect } from 'react'
import StarFieldCanvas from './StarFieldCanvas'
import { C, formatSpeed, formatBetaPercent, stageForT } from '../../data/relativity'

export default function SpeedControl({ t, setT, beta }) {
  const speedRef = useRef(0)
  speedRef.current = beta

  const stage = stageForT(t)
  const v = beta * C

  // Visual intensities derived from slider position
  const rocketX = 8 + t * 64           // % across the track
  const glow = Math.min(t / 0.7, 1)     // glow ramps up through 70%
  const blur = Math.max(0, (t - 0.7) / 0.3) // motion blur after 70%
  const blueShift = Math.max(0, (t - 0.7) / 0.3)
  const redShift = Math.max(0, (t - 0.7) / 0.3)
  const warp = Math.max(0, (t - 0.9) / 0.1)

  return (
    <section className="sol-section sol-speed">
      <StarFieldCanvas speedRef={speedRef} className="sol-speed-canvas" />

      {/* Doppler shift overlays */}
      <div className="sol-shift sol-shift--blue" style={{ opacity: blueShift * 0.5 }} />
      <div className="sol-shift sol-shift--red" style={{ opacity: redShift * 0.4 }} />
      <div className="sol-warp-vignette" style={{ opacity: warp }} />

      <div className="sol-content">
        <div className="sol-section-label">02 — Speed Control</div>
        <h2 className="sol-h2">Push the throttle toward <span className="sol-glow">c</span></h2>
        <p className="sol-section-sub">{stage.label}</p>

        <div className="sol-track-wrap">
          <div className="sol-track">
            <div className="sol-track-body" style={{ filter: `blur(${blur * 4}px)` }}>
              <span className="sol-earth" aria-hidden="true">🌍</span>
              <span
                className="sol-rocket"
                style={{
                  left: `${rocketX}%`,
                  filter: `drop-shadow(0 0 ${4 + glow * 28}px var(--sol-accent))`,
                  transform: `translate(-50%, -50%) scale(${1 + glow * 0.15})`,
                }}
                aria-hidden="true"
              >
                🚀
              </span>
            </div>
          </div>

          <input
            className="sol-slider"
            type="range"
            min={0}
            max={1}
            step={0.0001}
            value={t}
            onChange={(e) => setT(Number(e.target.value))}
            aria-label="Speed as a fraction of the speed of light"
          />
        </div>

        <div className="sol-readout-grid">
          <div className="sol-readout">
            <div className="sol-readout-label">Velocity</div>
            <div className="sol-readout-val">{formatSpeed(v)}</div>
          </div>
          <div className="sol-readout">
            <div className="sol-readout-label">Fraction of c</div>
            <div className="sol-readout-val">{formatBetaPercent(beta)}</div>
          </div>
          <div className="sol-readout">
            <div className="sol-readout-label">Speed of Light</div>
            <div className="sol-readout-val">{formatSpeed(C)}</div>
          </div>
        </div>
      </div>
    </section>
  )
}
