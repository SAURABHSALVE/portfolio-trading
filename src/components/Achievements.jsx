const achievements = [
  {
    icon: '🏆',
    org: 'Google · Hack2Skill',
    title: 'National Finalist — GenAI Exchange Hackathon',
    desc: 'Top 5% of participants nationwide. Recognized for innovative generative AI application in the Google-backed hackathon.',
    stat: 'Top 5%',
  },
  {
    icon: '🎯',
    org: 'OpenAI · NxtWave',
    title: 'OpenAI Buildathon — Project Selected',
    desc: 'Project selected for the OpenAI Buildathon, competing among the best AI builders across India.',
    stat: 'Selected',
  },
  {
    icon: '⚡',
    org: 'GenAI Artisans',
    title: 'Hackathon Finalist — Agentic AI',
    desc: 'Recognized for innovative use of Agentic AI workflows. Built and demoed a full multi-agent system under live conditions.',
    stat: 'Finalist',
  },
]

export default function Achievements() {
  return (
    <section id="achievements" className="section-border">
      <div className="section-header reveal">
        <span className="section-num">05</span>
        <h2>Achievements</h2>
        <div className="section-line" />
      </div>
      <div className="ach-grid">
        {achievements.map((a, i) => (
          <div className="ach-card reveal" key={a.title} style={{ '--stagger': i }}>
            <div className="ach-card-header">
              <span className="ach-icon">{a.icon}</span>
              <span className="ach-stat">{a.stat}</span>
            </div>
            <div className="ach-org">{a.org}</div>
            <div className="ach-title">{a.title}</div>
            <p className="ach-desc">{a.desc}</p>
            <div className="ach-index">ACH_0{i + 1}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
