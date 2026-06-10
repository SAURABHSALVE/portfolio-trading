/* ── Special Relativity — core physics helpers ─────────────────────────
   All speeds are expressed as a fraction (beta) of c, where:
     c = 299,792,458 m/s
   Lorentz factor: γ = 1 / sqrt(1 - β²)
*/

export const C = 299792458 // speed of light, m/s

/** Lorentz factor for a given beta (v/c), clamped just under 1 to avoid Infinity/NaN */
export function lorentzFactor(beta) {
  const b = Math.min(Math.max(beta, 0), 0.999999999999)
  return 1 / Math.sqrt(1 - b * b)
}

/** Time experienced by the moving observer for a given Earth-frame duration */
export function dilatedTime(earthSeconds, beta) {
  return earthSeconds / lorentzFactor(beta)
}

/** Contracted length as observed from the moving frame */
export function contractedLength(properLength, beta) {
  return properLength / lorentzFactor(beta)
}

/** Relativistic kinetic energy factor (γ - 1), i.e. multiples of rest energy mc² */
export function kineticEnergyFactor(beta) {
  return lorentzFactor(beta) - 1
}

/** Format a velocity in m/s as a human-friendly string */
export function formatSpeed(ms) {
  if (ms >= 1000) return `${(ms / 1000).toLocaleString(undefined, { maximumFractionDigits: 1 })} km/s`
  return `${ms.toFixed(0)} m/s`
}

const LIGHT_YEAR = 9.4607e15

/** Format a distance (meters) as km or light-years, whichever is more readable */
export function formatDistance(meters) {
  if (meters >= LIGHT_YEAR * 0.1) {
    return `${(meters / LIGHT_YEAR).toLocaleString(undefined, { maximumFractionDigits: 2 })} ly`
  }
  return `${(meters / 1000).toLocaleString(undefined, { maximumFractionDigits: 0 })} km`
}

/** Format beta as a percentage of c with adaptive precision */
export function formatBetaPercent(beta) {
  const pct = beta * 100
  if (pct >= 99.99) return `${pct.toFixed(6)}%`
  if (pct >= 99) return `${pct.toFixed(3)}%`
  if (pct >= 90) return `${pct.toFixed(2)}%`
  return `${pct.toFixed(1)}%`
}

/* ── Real-world reference distances (in meters) ────────────────────── */
export const DISTANCES = {
  earthMoon:      3.844e8,
  earthMars:      2.25e11,        // average Earth-Mars distance
  alphaCentauri:  4.0975e16,      // 4.33 light-years
  betelgeuse:     6.0986e18,      // ~644 light-years
}

const SECONDS_PER_YEAR = 365.25 * 24 * 3600

/** Given a distance (m) and beta, return { earthYears, travelerYears } */
export function travelTimes(distanceMeters, beta) {
  const v = beta * C
  const earthSeconds = distanceMeters / v
  const travelerSeconds = dilatedTime(earthSeconds, beta)
  return {
    earthYears: earthSeconds / SECONDS_PER_YEAR,
    travelerYears: travelerSeconds / SECONDS_PER_YEAR,
  }
}

export const SCENARIOS = [
  { key: 'mars',     label: 'Travel to Mars',           distance: DISTANCES.earthMars,     beta: 0.5 },
  { key: 'alpha',    label: 'Travel to Alpha Centauri', distance: DISTANCES.alphaCentauri, beta: 0.99 },
  { key: 'betelgeuse', label: 'Travel to Betelgeuse',   distance: DISTANCES.betelgeuse,    beta: 0.999999 },
]

/* ── Slider mapping ─────────────────────────────────────────────────
   The slider's raw value `t` runs 0 → 1 linearly, but beta (v/c) needs
   huge dynamic range near c. We interpolate through control points so
   the visual "stages" described in the article line up with slider
   position: 0–30% gentle motion, 70–90% relativistic streaking,
   99.99%+ near-total light-speed distortion.
*/
const CONTROL_POINTS = [
  [0,     0],
  [0.30,  0.30],
  [0.70,  0.90],
  [0.90,  0.99],
  [0.99,  0.999],
  [0.999, 0.9999],
  [1,     0.999999999],
]

export function sliderToBeta(t) {
  const x = Math.min(Math.max(t, 0), 1)
  for (let i = 0; i < CONTROL_POINTS.length - 1; i++) {
    const [x0, y0] = CONTROL_POINTS[i]
    const [x1, y1] = CONTROL_POINTS[i + 1]
    if (x >= x0 && x <= x1) {
      const f = x1 === x0 ? 0 : (x - x0) / (x1 - x0)
      return y0 + (y1 - y0) * f
    }
  }
  return CONTROL_POINTS[CONTROL_POINTS.length - 1][1]
}

export const SOL_STAGES = [
  { max: 0.30, key: 'idle',      label: 'At rest' },
  { max: 0.70, key: 'drifting',  label: 'Stars begin to drift' },
  { max: 0.90, key: 'streaking', label: 'Relativistic streaking' },
  { max: 0.99, key: 'shifting',  label: 'Doppler shift intensifies' },
  { max: 1.00, key: 'warping',   label: 'Spacetime visibly warps' },
]

export function stageForT(t) {
  return SOL_STAGES.find((s) => t <= s.max) ?? SOL_STAGES[SOL_STAGES.length - 1]
}
