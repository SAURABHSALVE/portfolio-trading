const CHAPTERS = [
  {
    phase: '01',
    year: 'YEAR_01',
    period: '1st Year',
    label: 'Foundation Layer',
    color: 'var(--accent)',
    title: 'The Spark — Java & Data Structures',
    body: 'College began with a compiler and a lot of curiosity. Dived headfirst into Java — classes, objects, inheritance, the logic of machines. Paired it with Data Structures & Algorithms to build the problem-solving foundation every serious engineer needs. No frameworks, no shortcuts — just clean, fundamental thinking.',
    tags: ['Java', 'Data Structures', 'Algorithms', 'OOP', 'Logic Building'],
  },
  {
    phase: '02',
    year: 'YEAR_02',
    period: '2nd Year',
    label: 'Expansion Phase',
    color: 'var(--accent2)',
    title: 'Markets, Machines & the IBM Moment',
    body: "While engineering continued, launched into Forex trading as a side gig — learning discipline, market pattern recognition, and high-stakes decision-making under pressure. Built a professional network and made real connections. Then came the defining moment: an internship at IBM SkillsBuild that completely reoriented everything. Witnessed what AI and ML can do in enterprise systems. Curiosity became conviction. Picked up Python in the final semester of Year 2 and never looked back.",
    tags: ['Forex Trading', 'IBM SkillsBuild', 'Python', 'Professional Networking', 'ML Foundations'],
  },
  {
    phase: '03',
    year: 'YEAR_03',
    period: '3rd Year',
    label: 'Deep Dive Protocol',
    color: 'var(--accent3)',
    title: 'The ML Rabbit Hole — scikit-learn to PyTorch',
    body: 'Year 3 was about going deep and going deliberate. Began with scikit-learn for classical ML — regression, classification, clustering, model evaluation. Then came the big decision: TensorFlow or PyTorch? Explored both, chose PyTorch for its Pythonic flexibility and research-grade power. Built CNNs, ANNs, and ResNet variants — learning backpropagation and gradient descent from the ground up. Simultaneously sharpened communication through Group Discussions and grew a meaningful LinkedIn presence sharing real projects.',
    tags: ['scikit-learn', 'PyTorch', 'Deep Learning', 'CNNs', 'LinkedIn Growth', 'GD Practice'],
  },
  {
    phase: '04',
    year: 'YEAR_04',
    period: 'Final Year',
    label: 'Production Mode',
    color: 'var(--accent4)',
    title: 'From Models to Systems — Ship, Deploy, Scale',
    body: "Final year meant one thing: stop prototyping, start shipping. Learned to deploy models with FastAPI, containerize with Docker, wire CI/CD through GitHub Actions, and scale on AWS and GCP. Sharpened Python DSA for interviews. Now building production-grade Agentic AI — multi-agent orchestration with LangGraph, RAG pipelines with LangChain, GenAI applications that don't just demo well, they run in the real world. The mission: become a system builder, not just a model trainer.",
    tags: ['FastAPI', 'Docker', 'GitHub Actions', 'AWS', 'GCP', 'LangGraph', 'LangChain', 'Agentic AI', 'Python DSA'],
  },
]

export default function Journey() {
  return (
    <section id="journey" className="section-border">

      <div className="section-header reveal">
        <span className="section-num">00</span>
        <h2>My Journey</h2>
        <div className="section-line" />
      </div>

      <p className="journey-intro reveal">
        From a first-year student writing Java loops to building production-grade AI systems —
        this is the story of how curiosity became a craft.
      </p>

      {/* ── Flow timeline ── */}
      <div className="journey-flow">
        {CHAPTERS.map((ch, i) => (
          <div key={ch.phase} className="journey-step reveal">

            {/* Track: numbered circle + vertical connector */}
            <div className="journey-track">
              <div
                className="journey-phase-circle"
                style={{ background: ch.color, boxShadow: `0 0 20px ${ch.color}` }}
              >
                {ch.phase}
              </div>
              {i < CHAPTERS.length - 1 && (
                <div
                  className="journey-track-line"
                  style={{ background: `linear-gradient(180deg, ${ch.color} 0%, ${CHAPTERS[i + 1].color} 100%)` }}
                />
              )}
            </div>

            {/* Card */}
            <div
              className="journey-step-card"
              style={{ '--jc': ch.color, borderLeftColor: ch.color }}
            >
              {/* Large ghost number backdrop */}
              <span className="journey-card-bg-num" aria-hidden="true">{ch.phase}</span>

              {/* Top meta row */}
              <div className="journey-card-top">
                <div className="journey-card-pills">
                  <span
                    className="journey-year-pill"
                    style={{ color: ch.color, borderColor: ch.color }}
                  >
                    {ch.year}
                  </span>
                  <span className="journey-period-pill">{ch.period}</span>
                </div>
                <span
                  className="journey-phase-tag"
                  style={{ color: ch.color }}
                >
                  {ch.label}
                </span>
              </div>

              <h3 className="journey-step-title">{ch.title}</h3>
              <p className="journey-step-body">{ch.body}</p>

              <div className="journey-step-tags">
                {ch.tags.map((t) => (
                  <span
                    key={t}
                    className="journey-step-tag"
                    style={{ borderColor: ch.color, color: ch.color }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* End node */}
        <div className="journey-end-node reveal">
          <div className="journey-end-dot" />
          <span className="journey-end-label">// PRESENT</span>
        </div>
      </div>


    </section>
  )
}
