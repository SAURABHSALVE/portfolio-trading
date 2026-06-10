import { lorentzFactor, formatBetaPercent } from '../../data/relativity'

const REFERENCE_YEARS = 10

function Clock({ label, rate, accent }) {
  // Full sweep of the hand = 6s at rate 1. Slower rate -> longer (or frozen) sweep.
  const duration = rate > 0.000001 ? 6 / rate : 999999
  return (
    <div className={`sol-clock${accent ? ' sol-clock--accent' : ''}`}>
      <div className="sol-clock-face">
        <div className="sol-clock-tick sol-clock-tick--12" />
        <div className="sol-clock-tick sol-clock-tick--3" />
        <div className="sol-clock-tick sol-clock-tick--6" />
        <div className="sol-clock-tick sol-clock-tick--9" />
        <div
          className="sol-clock-hand"
          style={{ animationDuration: `${Math.min(duration, 999999)}s` }}
        />
        <div className="sol-clock-center" />
      </div>
      <div className="sol-clock-label">{label}</div>
    </div>
  )
}

export default function TimeDilation({ beta }) {
  const gamma = lorentzFactor(beta)
  const travelerYears = REFERENCE_YEARS / gamma

  return (
    <section className="sol-section sol-time">
      <div className="sol-content">
        <div className="sol-section-label">03 — Time Dilation</div>
        <h2 className="sol-h2">Two clocks, two realities</h2>
        <p className="sol-section-sub">
          At {formatBetaPercent(beta)} of c, the rocket&rsquo;s clock falls behind Earth&rsquo;s.
        </p>

        <div className="sol-clocks">
          <Clock label="Earth Clock" rate={1} />
          <Clock label="Rocket Clock" rate={1 / gamma} accent />
        </div>

        <div className="sol-gamma-display">
          <div className="sol-gamma-formula">γ&nbsp;=&nbsp;1&nbsp;/&nbsp;√(1&nbsp;−&nbsp;v²/c²)</div>
          <div className="sol-gamma-value">γ ≈ {gamma < 10 ? gamma.toFixed(4) : gamma.toLocaleString(undefined, { maximumFractionDigits: 1 })}</div>
        </div>

        <div className="sol-readout-grid">
          <div className="sol-readout">
            <div className="sol-readout-label">Time elapsed on Earth</div>
            <div className="sol-readout-val">{REFERENCE_YEARS.toFixed(2)} years</div>
          </div>
          <div className="sol-readout">
            <div className="sol-readout-label">Time experienced on Rocket</div>
            <div className="sol-readout-val sol-glow-text">{travelerYears.toFixed(6)} years</div>
          </div>
        </div>
      </div>
    </section>
  )
}
