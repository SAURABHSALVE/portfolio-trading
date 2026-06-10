import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { sliderToBeta } from '../data/relativity'
import Hero from '../components/sol/Hero'
import SpeedControl from '../components/sol/SpeedControl'
import TimeDilation from '../components/sol/TimeDilation'
import LengthContraction from '../components/sol/LengthContraction'
import RelativityGrid from '../components/sol/RelativityGrid'
import LightSpeedExperience from '../components/sol/LightSpeedExperience'
import Scenarios from '../components/sol/Scenarios'
import Finale from '../components/sol/Finale'
import '../styles/speed-of-light.css'

export default function SpeedOfLight() {
  const [t, setT] = useState(0)
  const beta = useMemo(() => sliderToBeta(t), [t])

  return (
    <div className="sol-page">
      <Link to="/blog" className="sol-back-link">← All Posts</Link>

      <Hero />
      <SpeedControl t={t} setT={setT} beta={beta} />
      <TimeDilation beta={beta} />
      <LengthContraction beta={beta} />
      <RelativityGrid beta={beta} />
      <LightSpeedExperience />
      <Scenarios />
      <Finale />
    </div>
  )
}
