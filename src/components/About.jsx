import { Link } from 'react-router-dom'

const skillGroups = [
  {
    label: 'GenAI & LLMs',
    color: 'cyan',
    tags: ['LangChain', 'LangGraph', 'LangSmith', 'RAG Pipelines', 'OpenAI API', 'Hugging Face', 'Prompt Engineering', 'Multi-Agent Systems'],
  },
  {
    label: 'Deep Learning',
    color: 'purple',
    tags: ['PyTorch', 'TensorFlow', 'CNNs', 'ResNet', 'Computer Vision', 'FAISS'],
  },
  {
    label: 'Backend & Cloud',
    color: 'orange',
    tags: ['FastAPI', 'Flask', 'Django', 'Docker', 'AWS Lambda/EC2', 'GCP Vertex AI', 'CI/CD'],
  },
  {
    label: 'Frontend & Tools',
    color: 'green',
    tags: ['Python', 'Next.js', 'React.js', 'Streamlit', 'n8n', 'PostgreSQL', 'Git'],
  },
]

export default function About() {
  return (
    <section id="about" className="section-border">
      <div className="section-header reveal">
        <span className="section-num">01</span>
        <h2>About</h2>
        <div className="section-line" />
      </div>

      <div className="about-grid">
        <div className="about-text reveal">
          <p>
            <span className="about-accent-large">AI/ML Engineer</span>. I don't prototype and pray — I <span className="about-accent-highlight">ship</span>.
          </p>
          <p>
            <span className="about-accent-primary">Generative AI</span>, <span className="about-accent-secondary">RAG pipelines</span>, <span className="about-accent-tertiary">multi-agent systems</span>, <span className="about-accent-quaternary">predictive models</span> — if it's in the <span className="about-accent-bold">AI/ML stack</span>, I've <span className="about-verb">built</span> it, <span className="about-verb">broken</span> it, <span className="about-verb">fixed</span> it, and <span className="about-verb">deployed</span> it. The kind of engineer who figures it out regardless of whether the docs are good or the problem is clean.
          </p>
          <p>
            <span className="about-accent-primary">Final year CS undergrad</span>. <span className="about-accent-highlight">Zero experience gaps</span>, just <span className="about-accent-secondary">experience</span>.
          </p>
          <p>
            <span className="about-accent-tertiary">Aurangabad, Maharashtra</span> · <span className="about-accent-primary">Remote</span> / <span className="about-accent-secondary">Hybrid</span> / <span className="about-accent-tertiary">On-site</span>
          </p>

          <div className="about-links">
            {/* Creative Skills page CTA */}
            <Link to="/skills" className="btn-about-skills">
              <div className="btn-skills-left">
                <span className="btn-skills-label">// SKILL_MATRIX</span>
                <span className="btn-skills-text">Explore Full Skills</span>
              </div>
              <span className="btn-skills-arrow">→</span>
            </Link>

            {/* Social links */}
            <div className="about-socials">
              <a
                href="https://www.linkedin.com/in/saurabhsalve99/"
                target="_blank"
                rel="noreferrer"
                className="btn-about-social btn-social-linkedin"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </a>
              <a
                href="https://github.com/SAURABHSALVE"
                target="_blank"
                rel="noreferrer"
                className="btn-about-social btn-social-github"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                </svg>
                GitHub
              </a>
              <a
                href="mailto:saurabhsalve9999@gmail.com"
                className="btn-about-social btn-social-email"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                Email
              </a>
            </div>
          </div>
        </div>

        <div className="skills-grid reveal">
          <div className="skills-grid-label">// SKILL_MATRIX</div>
          {skillGroups.map((group) => (
            <div key={group.label} className={`skill-group skill-group--${group.color}`}>
              <div className="skill-group-label">{group.label}</div>
              <div className="skill-tags">
                {group.tags.map((tag) => (
                  <span className="tag" key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
