import { useState, useMemo } from 'react'
import { SCENARIOS, travelTimes, formatBetaPercent, formatDistance } from '../../data/relativity'

export default function Scenarios() {
  const [active, setActive] = useState(SCENARIOS[0].key)
  const scenario = SCENARIOS.find((s) => s.key === active)

  const { earthYears, travelerYears } = useMemo(
    () => travelTimes(scenario.distance, scenario.beta),
    [scenario]
  )

  return (
    <section className="sol-section sol-scenarios">
      <div className="sol-content">
        <div className="sol-section-label">07 — Interactive Scenarios</div>
        <h2 className="sol-h2">Pick a destination</h2>
        <p className="sol-section-sub">Each journey cruises at a fixed fraction of light speed.</p>

        <div className="sol-scenario-buttons">
          {SCENARIOS.map((s) => (
            <button
              key={s.key}
              className={`sol-scenario-btn${active === s.key ? ' active' : ''}`}
              onClick={() => setActive(s.key)}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="sol-readout-grid">
          <div className="sol-readout">
            <div className="sol-readout-label">Distance</div>
            <div className="sol-readout-val">{formatDistance(scenario.distance)}</div>
          </div>
          <div className="sol-readout">
            <div className="sol-readout-label">Cruise speed</div>
            <div className="sol-readout-val">{formatBetaPercent(scenario.beta)} of c</div>
          </div>
          <div className="sol-readout">
            <div className="sol-readout-label">Earth time elapsed</div>
            <div className="sol-readout-val">{earthYears.toLocaleString(undefined, { maximumFractionDigits: 2 })} yrs</div>
          </div>
          <div className="sol-readout">
            <div className="sol-readout-label">Astronaut time elapsed</div>
            <div className="sol-readout-val sol-glow-text">{travelerYears.toLocaleString(undefined, { maximumFractionDigits: 2 })} yrs</div>
          </div>
        </div>
      </div>
    </section>
  )
}
