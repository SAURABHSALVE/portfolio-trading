const certs = [
  { badge: '☁️', issuer: 'Google Cloud',              name: 'Generative AI Academy',                           skills: 'Vertex AI · Gemini API · Multimodal RAG · Imagen · Prompt Design' },
  { badge: '🎓', issuer: 'Google Cloud Skill Badge',  name: 'Build Real World AI Apps with Gemini & Imagen',  skills: 'Multimodal AI · Vertex AI Python SDK · Image-to-text pipelines' },
  { badge: '✏️', issuer: 'Google Cloud Skill Badge',  name: 'Prompt Design in Vertex AI',                     skills: 'Multi-turn prompting · Prompt chaining · Gemini Pro · GenAI SDK' },
  { badge: '🏅', issuer: 'Meta / Coursera',           name: 'Django Web Framework',                           skills: 'Django · REST APIs · Backend Development · Scalable Web Apps' },
  { badge: '🤖', issuer: 'Krish Naik',                name: 'Machine Learning Specialization',                skills: 'Regression · Classification · Model Deployment · Scikit-learn' },
  { badge: '☁️', issuer: 'Amazon Web Services',       name: 'AWS Academy Cloud Foundations',                  skills: 'Cloud Architecture · EC2 · Lambda · Security Best Practices' },
  { badge: '👁️', issuer: 'Coursera Project Network', name: 'Facial Recognition with PyTorch',                skills: 'PyTorch · Face Detection · CNN · Computer Vision' },
  { badge: '😊', issuer: 'Coursera Project Network',  name: 'Facial Expression Recognition',                  skills: 'Emotion Detection · CNN · PyTorch · Image Classification' },
  { badge: '🌩️', issuer: 'ServiceNow',               name: 'Welcome to ServiceNow Micro-Cert',               skills: 'ITSM · Workflow Automation · Low-code App Engine' },
  { badge: '🧠', issuer: 'Google / Coursera',         name: 'Introduction to Generative AI',                  skills: 'GenAI Fundamentals · Text & Image Generation · Real-world Applications' },
  { badge: '⚡', issuer: 'OpenAI / NxtWave',          name: 'Generative AI Mastery Workshop',                 skills: 'GenAI Buildathon · Practical AI · Product Development' },
  { badge: '📊', issuer: 'Coursera',                  name: 'Linear Regression with Python',                  skills: 'scikit-learn · California Housing · R² Evaluation · Pandas' },
]

export default function Certifications() {
  return (
    <section id="certifications" className="section-border">
      <div className="section-header reveal">
        <span className="section-num">04</span>
        <h2>Certifications</h2>
        <div className="section-line" />
      </div>
      <div className="cert-count reveal">
        <span className="cert-count-num">{certs.length}</span>
        <span className="cert-count-label">// CREDENTIALS_LOADED</span>
      </div>
      <div className="cert-grid">
        {certs.map((c, i) => (
          <div className="cert-card reveal" key={c.name} style={{ '--stagger': i % 6 }}>
            <div className="cert-card-top">
              <div className="cert-badge">{c.badge}</div>
              <div className="cert-index">C_{String(i + 1).padStart(2, '0')}</div>
            </div>
            <div className="cert-issuer">{c.issuer}</div>
            <div className="cert-name">{c.name}</div>
            <div className="cert-skills">
              {c.skills.split(' · ').map((s) => (
                <span className="cert-skill-pill" key={s}>{s}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
