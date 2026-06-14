import { useState } from 'react'

const certs = [
  {
    id: 1,
    badge: '🚀',
    issuer: 'OpenAI / NxtWave',
    name: 'India\'s Biggest GenAI Buildathon',
    description: 'Participated in the Generative AI Mastery Workshop with hands-on experience in building production-grade AI applications.',
    image: '/certification/opena-buildathon.png',
    color: 'cyan',
    date: 'Aug 2025',
  },
  {
    id: 2,
    badge: '☁️',
    issuer: 'Google Cloud',
    name: 'Gen AI Academy',
    description: 'Comprehensive training on Generative AI fundamentals, Vertex AI, Gemini API, and RAG pipelines through curated content.',
    image: '/certification/genai-academy.png',
    color: 'orange',
    date: 'Aug 2025',
  },
  {
    id: 3,
    badge: '⚙️',
    issuer: 'ServiceNow',
    name: 'ServiceNow Welcome to ServiceNow',
    description: 'Micro-certification demonstrating knowledge of ITSM, workflow automation, and low-code app development on ServiceNow platform.',
    image: '/certification/servicenow.png',
    color: 'green',
    date: 'Apr 2025',
  },
  {
    id: 4,
    badge: '🔗',
    issuer: 'Meta / Coursera',
    name: 'Django Web Framework',
    description: 'Master Django development including REST APIs, database design, and building scalable web applications with proper deployment practices.',
    image: '/certification/meta-django-developer.png',
    color: 'purple',
    date: 'Oct 2024',
  },
  {
    id: 5,
    badge: '☁️',
    issuer: 'AWS Academy',
    name: 'AWS Cloud Foundations',
    description: 'AWS Academy Graduate certificate covering cloud architecture fundamentals, EC2, Lambda, security best practices. 20 hours completed.',
    image: '/certification/aws-1.png',
    color: 'orange',
    date: 'Jul 2024',
  },
  {
    id: 6,
    badge: '🌥️',
    issuer: 'AWS Academy',
    name: 'AWS Introduction to Cloud',
    description: 'Advanced AWS training covering cloud services, infrastructure, and enterprise solutions. Semester 1 completion with 60 hours of coursework.',
    image: '/certification/aws-2.png',
    color: 'orange',
    date: 'Jul 2024',
  },
  {
    id: 7,
    badge: '✨',
    issuer: 'Google Cloud',
    name: 'Introduction to Generative AI',
    description: 'Foundational course covering Generative AI concepts, text & image generation, and real-world applications using Google Cloud tools.',
    image: '/certification/intro-genai.png',
    color: 'cyan',
    date: 'Oct 2024',
  },
  {
    id: 8,
    badge: '👁️',
    issuer: 'Coursera Project Network',
    name: 'Facial Expression Recognition with PyTorch',
    description: 'Hands-on project certificate for building facial expression recognition models using PyTorch CNNs and computer vision techniques.',
    image: '/certification/facial-recognition.png',
    color: 'purple',
    date: 'Aug 2024',
  },
  {
    id: 9,
    badge: '📊',
    issuer: 'Udemy',
    name: 'Complete Data Science, ML, DL, NLP Bootcamp',
    description: 'Comprehensive 99-hour bootcamp covering the complete ML/DL/NLP stack with hands-on projects and real-world implementations.',
    image: '/certification/udemy-ml.jpg',
    color: 'green',
    date: 'Nov 2025',
  },
  {
    id: 10,
    badge: '🐍',
    issuer: 'Udemy',
    name: '100 Days of Code: Complete Python Pro Bootcamp',
    description: '58-hour intensive Python programming bootcamp with Dr. Angela Yu, covering all fundamental and advanced Python concepts.',
    image: '/certification/udemy-100-days-of-python.jpg',
    color: 'cyan',
    date: 'Feb 2024',
  },
  {
    id: 11,
    badge: '🤖',
    issuer: 'Anthropic',
    name: 'Introduction to Model Context Protocol',
    description: 'Certification for completing Anthropic\'s MCP training, demonstrating expertise in Model Context Protocol for AI integrations.',
    image: '/certification/claude-certification-mcp.jpg',
    color: 'green',
    date: 'Mar 2026',
  },
]

function CertModal({ cert, onClose }) {
  if (!cert) return null

  return (
    <div className="cert-modal-overlay" onClick={onClose}>
      <div className="cert-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="cert-modal-close" onClick={onClose}>✕</button>
        <img src={cert.image} alt={cert.name} className="cert-modal-image" />
        <div className="cert-modal-info">
          <h3>{cert.name}</h3>
          <p className="cert-modal-issuer">{cert.issuer} · {cert.date}</p>
          <p className="cert-modal-desc">{cert.description}</p>
        </div>
      </div>
    </div>
  )
}

export default function Certifications() {
  const [selectedCert, setSelectedCert] = useState(null)

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
        {certs.map((cert, i) => (
          <div
            key={cert.id}
            className={`cert-card reveal cert-card--${cert.color}`}
            style={{ '--stagger': i % 4 }}
            onClick={() => setSelectedCert(cert)}
          >
            <div className="cert-card-shimmer" />
            <div className="cert-card-top">
              <div className="cert-badge">{cert.badge}</div>
              <div className="cert-index">C_{String(i + 1).padStart(2, '0')}</div>
            </div>

            <div className="cert-issuer">{cert.issuer}</div>
            <div className="cert-name">{cert.name}</div>
            <p className="cert-description">{cert.description}</p>

            <div className="cert-card-footer">
              <span className="cert-date">{cert.date}</span>
              <span className="cert-view-btn">View →</span>
            </div>
          </div>
        ))}
      </div>

      <CertModal cert={selectedCert} onClose={() => setSelectedCert(null)} />
    </section>
  )
}
