import { contractedLength, formatBetaPercent, DISTANCES } from '../../data/relativity'

export default function LengthContraction({ beta }) {
  const proper = DISTANCES.earthMoon
  const contracted = contractedLength(proper, beta)
  const ratio = Math.max(contracted / proper, 0.03)

  return (
    <section className="sol-section sol-length">
      <div className="sol-content">
        <div className="sol-section-label">04 — Length Contraction</div>
        <h2 className="sol-h2">Space itself shrinks</h2>
        <p className="sol-section-sub">
          From the rocket&rsquo;s point of view, distances along the direction of travel contract.
        </p>

        <div className="sol-distance-track">
          <div className="sol-distance-line" style={{ width: `${ratio * 100}%` }} />
          <div className="sol-planet sol-planet--earth">
            <span className="sol-planet-icon">🌍</span>
            <span className="sol-planet-name">Earth</span>
          </div>
          <div className="sol-planet sol-planet--moon" style={{ left: `${ratio * 100}%` }}>
            <span className="sol-planet-icon">🌑</span>
            <span className="sol-planet-name">Moon</span>
          </div>
        </div>

        <div className="sol-readout-grid">
          <div className="sol-readout">
            <div className="sol-readout-label">Proper distance (at rest)</div>
            <div className="sol-readout-val">{(proper / 1000).toLocaleString()} km</div>
          </div>
          <div className="sol-readout">
            <div className="sol-readout-label">Distance seen at {formatBetaPercent(beta)} c</div>
            <div className="sol-readout-val sol-glow-text">
              {(contracted / 1000).toLocaleString(undefined, { maximumFractionDigits: 1 })} km
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
