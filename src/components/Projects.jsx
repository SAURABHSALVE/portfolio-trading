import { useState, useEffect } from 'react'

const FILTERS = [
  { key: 'all',       label: 'All' },
  { key: 'genai',     label: 'GenAI / LLM' },
  { key: 'cv',        label: 'Computer Vision' },
  { key: 'ml',        label: 'ML / Data' },
  { key: 'fullstack', label: 'Full Stack' },
]

const projects = [
  {
    num: '01 — FEATURED',
    featured: true,
    cat: 'genai',
    title: 'Agentic AI Image Studio',
    sub: 'Multi-Agent Systems · PyTorch · Diffusers · LCM',
    desc: 'Architected a Multi-Agent System with 9 specialized agents handling prompt refinement, quality control, and iterative improvement. Implemented Latent Consistency Models achieving 10x faster generation (4–8 steps) vs standard Stable Diffusion pipelines. Modular agent workflows with autonomous error handling.',
    links: [{ label: 'GitHub →', href: 'https://github.com/SAURABHSALVE/image-generation' }],
    tags: ['LCM Models', 'Multi-Agent', 'Stable Diffusion', 'PyTorch', 'Diffusers'],
    stats: [{ num: '10x', label: 'Faster generation via LCM' }, { num: '9', label: 'Specialized AI agents' }],
  },
  {
    num: '02',
    cat: 'genai fullstack',
    title: 'Repo2Viral — EdTech SaaS',
    sub: 'GenAI · Next.js · FastAPI · OpenAI',
    desc: 'Full-stack GenAI SaaS converting GitHub repositories into structured learning materials and social content using LLMs. Context-aware RAG pipeline for semantic code understanding. Deployed on Render + Netlify with Gumroad payment integration.',
    links: [{ label: 'GitHub →', href: 'https://github.com/SAURABHSALVE/repo2viral' }],
    tags: ['RAG', 'Next.js', 'FastAPI', 'OpenAI'],
  },
  {
    num: '03',
    cat: 'genai',
    title: 'YouTube Bot — RAG Agent',
    sub: 'RAG · LangChain · FAISS · OpenAI GPT-4',
    desc: 'Conversational AI agent with PDF knowledge base + real-time web search. Features conversational memory, transparent reasoning chain, real-time token streaming, and hybrid retrieval — bridging static docs with live web data.',
    links: [
      { label: 'GitHub →', href: 'https://github.com/SAURABHSALVE/Youtube_Bot-RAG-' },
      { label: 'Live Demo →', href: 'https://watchless.streamlit.app/' },
    ],
    tags: ['LangChain', 'FAISS', 'Tavily', 'Streamlit'],
  },
  {
    num: '04',
    cat: 'cv',
    title: 'Plant Disease Detection API',
    sub: 'Computer Vision · FastAPI · Docker · ResNet50',
    desc: 'Production-ready inference API serving a fine-tuned ResNet50 model for real-time plant disease diagnosis. Dockerized for portability. Optimized preprocessing pipeline with augmentation handles high-concurrency requests.',
    links: [{ label: 'GitHub →', href: 'https://github.com/SAURABHSALVE/plant-disease-detection' }],
    inlineStat: { num: '98%', label: 'Validation Accuracy' },
    tags: ['ResNet50', 'FastAPI', 'Docker', 'PyTorch'],
  },
  {
    num: '05',
    cat: 'cv ml',
    title: 'MNIST Model Analysis',
    sub: 'PyTorch · CNN / ANN / ProCNN · Streamlit',
    desc: 'Built and benchmarked three architectures — ANN, CNN, and custom ProCNN (Batch Norm + Dropout). Ensemble prediction, PIL + OpenCV smart preprocessing, deployed to Streamlit Cloud with live accuracy dashboard.',
    links: [{ label: 'GitHub →', href: 'https://github.com/SAURABHSALVE/pytorch-mnist' }],
    tags: ['PyTorch', 'CNN', 'ANN', 'OpenCV', 'Streamlit'],
  },
  {
    num: '06',
    cat: 'genai',
    title: 'Multi-Lingual Blog Generator',
    sub: 'NLP · LLMs · Flask · Prompt Engineering',
    desc: 'Scalable content engine using LLMs with advanced prompt engineering for structured JSON outputs (Title, Intro, Body). Language-agnostic logic ensures consistent formatting across all target languages.',
    links: [{ label: 'GitHub →', href: 'https://github.com/SAURABHSALVE' }],
    tags: ['Flask', 'LLMs', 'Prompt Eng.', 'NLP'],
  },
  {
    num: '07',
    cat: 'ml',
    title: 'Customer Churn Prediction',
    sub: 'ANN · TensorFlow/Keras · Streamlit',
    desc: 'End-to-end ML solution predicting customer churn with ANNs. Full preprocessing pipeline, early stopping & dropout for robustness, TensorBoard experiment logging, and live interactive Streamlit UI.',
    links: [{ label: 'GitHub →', href: 'https://github.com/SAURABHSALVE' }],
    inlineStat: { num: '83%', label: 'Churn Prediction Accuracy' },
    tags: ['TensorFlow', 'ANN', 'Streamlit', 'TensorBoard'],
  },
  {
    num: '08',
    cat: 'ml',
    title: 'Stock Market Prediction App',
    sub: 'Random Forest · Plotly · yfinance · Streamlit',
    desc: '30-day stock price forecasting for U.S. and Indian markets. Integrates SMA, EMA, RSI, and MACD technical indicators. Interactive Plotly charts for historical & future trend exploration with real-time data via yfinance.',
    links: [{ label: 'GitHub →', href: 'https://github.com/SAURABHSALVE' }],
    tags: ['scikit-learn', 'yfinance', 'Plotly', 'Streamlit'],
  },
  {
    num: '09',
    cat: 'fullstack genai',
    title: 'AI Resume Analyzer',
    sub: 'Django · OpenAI API · PythonAnywhere',
    desc: 'AI-powered resume analysis accepting PDF, DOCX, and TXT formats. Custom Python scanning algorithm for deeper insight extraction. Deployed on PythonAnywhere with SQLite backend and structured recommendation output.',
    links: [{ label: 'GitHub →', href: 'https://github.com/SAURABHSALVE' }],
    tags: ['Django', 'OpenAI', 'SQLite', 'PDF/DOCX'],
  },
  {
    num: '10',
    cat: 'fullstack genai',
    title: 'Artisan Craft Platform',
    sub: 'Vertex AI · Blockchain · AR · React · Cloud Run',
    desc: 'Hackathon finalist — AI platform converting handmade crafts into digital collectibles with NFT minting (ERC-721), AR visualization, AI storytelling via Vertex AI + OpenAI. Direct artisan-to-buyer marketplace on Google Cloud.',
    links: [{ label: 'GitHub →', href: 'https://github.com/SAURABHSALVE' }],
    tags: ['Vertex AI', 'Web3.py', 'React', 'Cloud Run', 'NFT'],
  },
]

function ProjectCard({ project, visible, onOpen }) {
  if (!visible) return null

  if (project.featured) {
    return (
      <div className="project-card featured reveal" onClick={() => onOpen(project)}>
        <div>
          <div className="proj-num">{project.num}</div>
          <div className="proj-header">
            <div className="proj-title">{project.title}</div>
            <span className="proj-arrow">↗</span>
          </div>
          <div className="proj-sub">{project.sub}</div>
          <p className="proj-desc">{project.desc}</p>
          <div className="proj-links">
            {project.links.map((l) => (
              <a key={l.label} href={l.href} className="proj-link" target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>{l.label}</a>
            ))}
            <span className="proj-link proj-link--ghost">View Details ↗</span>
          </div>
          <div className="skill-tags" style={{ marginTop: '16px' }}>
            {project.tags?.map((t) => <span className="tag" key={t}>{t}</span>)}
          </div>
        </div>
        <div className="proj-side">
          <div>
            {project.stats?.map((s) => (
              <div key={s.label}>
                <div className="proj-stat">{s.num}</div>
                <div className="proj-stat-label" style={{ marginBottom: '24px' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="project-card reveal" onClick={() => onOpen(project)}>
      <div className="proj-num">{project.num}</div>
      <div className="proj-header">
        <div className="proj-title">{project.title}</div>
        <span className="proj-arrow">↗</span>
      </div>
      <div className="proj-sub">{project.sub}</div>
      <p className="proj-desc">{project.desc}</p>
      {project.inlineStat && (
        <>
          <div className="proj-stat">{project.inlineStat.num}</div>
          <div className="proj-stat-label">{project.inlineStat.label}</div>
        </>
      )}
      <div className="proj-links" style={{ marginTop: project.inlineStat ? '12px' : '16px' }}>
        {project.links.map((l) => (
          <a key={l.label} href={l.href} className="proj-link" target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>{l.label}</a>
        ))}
        <span className="proj-link proj-link--ghost">Details ↗</span>
      </div>
      {project.tags && (
        <div className="skill-tags" style={{ marginTop: '14px' }}>
          {project.tags.map((t) => <span className="tag" key={t}>{t}</span>)}
        </div>
      )}
    </div>
  )
}

function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return

    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [project, onClose])

  if (!project) return null

  return (
    <div className="proj-modal-overlay" onClick={onClose}>
      <div className="proj-modal" onClick={(e) => e.stopPropagation()}>
        <button className="proj-modal-close" onClick={onClose} aria-label="Close">×</button>

        <div className="proj-modal-num">{project.num}</div>
        <h3 className="proj-modal-title">{project.title}</h3>
        <div className="proj-modal-sub">{project.sub}</div>

        {(project.stats || project.inlineStat) && (
          <div className="proj-modal-stats">
            {project.stats?.map((s) => (
              <div className="proj-modal-stat" key={s.label}>
                <div className="proj-modal-stat-num">{s.num}</div>
                <div className="proj-modal-stat-label">{s.label}</div>
              </div>
            ))}
            {project.inlineStat && (
              <div className="proj-modal-stat">
                <div className="proj-modal-stat-num">{project.inlineStat.num}</div>
                <div className="proj-modal-stat-label">{project.inlineStat.label}</div>
              </div>
            )}
          </div>
        )}

        <p className="proj-modal-desc">{project.desc}</p>

        {project.tags && (
          <div className="skill-tags" style={{ marginBottom: '24px' }}>
            {project.tags.map((t) => <span className="tag" key={t}>{t}</span>)}
          </div>
        )}

        <div className="proj-modal-links">
          {project.links.map((l) => (
            <a key={l.label} href={l.href} className="proj-link proj-link--lg" target="_blank" rel="noreferrer">
              {l.label.replace('→', '').trim()} ↗
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const [active, setActive] = useState('all')
  const [selected, setSelected] = useState(null)

  return (
    <section id="projects" className="section-border">
      <div className="section-header reveal">
        <span className="section-num">03</span>
        <h2>Projects</h2>
        <div className="section-line" />
      </div>
      <div className="projects-filter reveal">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            className={`filter-btn${active === f.key ? ' active' : ''}`}
            onClick={() => setActive(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="projects-grid">
        {projects.map((p) => (
          <ProjectCard
            key={p.num}
            project={p}
            visible={active === 'all' || p.cat.includes(active)}
            onOpen={setSelected}
          />
        ))}
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
