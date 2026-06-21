import { useState, useEffect, useRef } from 'react'

const FILTERS = [
  { key: 'all',       label: 'All Projects' },
  { key: 'featured',  label: '⭐ Featured' },
  { key: 'genai',     label: 'GenAI / LLM' },
  { key: 'cv',        label: 'Computer Vision' },
  { key: 'ml',        label: 'ML / Data' },
  { key: 'fullstack', label: 'Full Stack' },
]

const projects = [
  /* ════════════════════════════════════════════════════════════════
     FEATURED PROJECTS (6)
     ════════════════════════════════════════════════════════════════ */
  {
    id: 'watchless',
    num: '01',
    featured: true,
    cat: 'genai featured',
    title: 'WatchLess',
    subtitle: 'YouTube RAG Chatbot',
    summary: 'Chat with any YouTube video instantly using RAG technology. Extract insights, summarize content, and ask questions about video transcripts.',
    description: 'WatchLess allows you to extract insights, summarize content, and ask specific questions about any YouTube video. Powered by LangChain, OpenAI GPT-4o, and Streamlit. Uses Retrieval-Augmented Generation to provide accurate answers based only on the video transcript. Smart memory remembers your previous questions for natural conversation flow.',
    image: '/youtube-rag.png',
    tech: 'RAG · LangChain · OpenAI GPT-4o · Streamlit',
    demo: 'https://watchless.streamlit.app/',
    github: 'https://github.com/SAURABHSALVE/ai-math-tutor-rag-system',
    features: [
      'RAG Technology: Provides accurate answers based only on video transcript',
      'Smart Memory: Chatbot remembers previous questions for natural conversation',
      'Multi-Language Support: Works with videos in 6+ languages',
      'GPT-4o Powered: Superior reasoning and summarization',
      'Modern UI: Clean dark-themed responsive interface',
    ],
    stats: { chunks: '20+', languages: '6+' },
  },
  {
    id: 'mathmentor',
    num: '02',
    featured: true,
    cat: 'genai featured',
    title: 'Math Mentor',
    subtitle: 'AI-Powered JEE Tutor',
    summary: 'Multimodal AI application solving JEE-style math problems with 6 LangGraph agents, OCR, human-in-the-loop verification, and SQLite memory.',
    description: 'A production-grade AI math tutor that solves JEE-style problems using GPT-4o, LangGraph multi-agent orchestration, and advanced OCR. Supports text, image (Mistral OCR + EasyOCR), and audio (Whisper API) inputs. Features 6 specialized agents: Guardrail, Parser, Intent Router, Solver, Verifier, and Explainer.',
    image: '/math-wise.png',
    tech: 'LangGraph · Mistral OCR · GPT-4o · SymPy',
    demo: 'https://ai-math-wise.streamlit.app/',
    github: 'https://github.com/SAURABHSALVE/ai-math-tutor',
    features: [
      'Multimodal Input: Text, Image (GPT-4o Vision), Audio (Whisper API)',
      '6 LangGraph Agents: Each handling a specific task in the pipeline',
      'RAG Pipeline: LangChain + FAISS for fast knowledge retrieval',
      'Human-in-the-Loop: Triggers on low confidence or verification failures',
      'Self-Learning: SQLite memory stores solutions, learns from corrections',
    ],
    stats: { agents: '6', accuracy: '95%' },
  },
  {
    id: 'shadowboard',
    num: '03',
    featured: true,
    cat: 'genai featured',
    title: 'Shadow Board',
    subtitle: 'AI Executive Decision Simulation',
    summary: 'AI-powered executive boardroom simulation. 5 AI agents debate strategic decisions with real-time streaming, HITL intervention, and auto-generated strategy briefs.',
    description: 'Shadow Board assembles a panel of AI executive agents — CFO, CMO, Legal Counsel, Devil\'s Advocate, and Moderator — to rigorously analyze your strategic questions from every angle. Multi-agent debate across 3 structured phases with real-time streaming and human-in-the-loop intervention.',
    image: '/shadow-board.png',
    tech: 'CrewAI · Google Gemini · FastAPI · React',
    demo: 'https://devils-advocate-black.vercel.app/',
    github: 'https://github.com/SAURABHSALVE/Devils-Advocate',
    features: [
      'Multi-Agent Debate: 5 AI executives debate from different perspectives',
      'Human-In-The-Loop: Pause mid-debate to challenge agents or redirect discussion',
      'Real-Time Streaming: Watch debate unfold live via Server-Sent Events',
      'Domain-Specific Boards: Customize for Tech, Healthcare, Finance, Retail',
      'Strategy Brief PDF: Auto-generated with board votes, risk matrix, recommendations',
    ],
    stats: { agents: '5', phases: '3' },
  },

  {
    id: 'plant-disease',
    num: '04',
    featured: true,
    cat: 'cv featured',
    title: 'Plant Disease Detection',
    subtitle: 'Production-Grade Deep Learning System',
    summary: 'Production-ready deep learning system for precision agriculture. Fine-tuned ResNet50 detecting 38 disease classes with 98% accuracy.',
    description: 'Dockerized web application for detecting plant diseases from leaf images using deep learning. Built with FastAPI, powered by a fine-tuned ResNet50, and featuring a beautiful glassmorphism UI. Fully containerized for portability.',
    image: '/plant-disease-detection.png',
    tech: 'ResNet50 · FastAPI · Docker · PyTorch',
    github: 'https://github.com/SAURABHSALVE/plant-disease-detection',
    docker: 'https://hub.docker.com/r/saurabhsalve/plant-disease-detection',
    features: [
      'Deep Learning: Fine-tuned ResNet50 CNN across 38 disease classes',
      'Beautiful Frontend: Dark-theme UI with drag-and-drop image upload',
      'FastAPI Backend: High-performance async Python framework',
      'Dockerized & Portable: Runs identically on any system',
      'Production Ready: Gunicorn + Uvicorn for concurrent requests',
    ],
    stats: { accuracy: '98%', classes: '38' },
  },
  {
    id: 'repo2viral',
    num: '05',
    featured: true,
    cat: 'fullstack genai featured',
    title: 'Repo2Viral',
    subtitle: 'Code to Content, In Seconds',
    summary: 'AI platform that analyzes GitHub repositories and generates viral Twitter threads, LinkedIn posts, and SEO-optimized blogs instantly.',
    description: 'Stop wasting hours writing threads. Repo2Viral analyzes your GitHub repository and generates viral Twitter threads, LinkedIn carousels, and technical blogs instantly. Our deep code understanding scans file structure, dependencies, and comments for accuracy, then generates platform-specific content with customizable tones: Senior Architect, Hype Man, or Helpful Educator.',
    image: '/repo2viral.png',
    tech: 'Next.js · OpenAI GPT-4 · MongoDB · React · Netlify',
    demo: 'https://repo2viral.netlify.app/',
    github: 'https://github.com/SAURABHSALVE/repo2viral',
    features: [
      'Multi-Platform Ready: Generate tailored content for Twitter, LinkedIn, and Technical Blogs simultaneously',
      'Deep Code Understanding: Scans file structure, dependencies, and code comments for accuracy',
      'Instant Carousels: Beautiful, exportable PDF carousels for LinkedIn with zero design skills',
      'Technical Accuracy: Cites specific files and lines of code to back up every claim',
      'SEO Optimized Blogs: 1,000+ word technical tutorials with code snippets and meta tags',
      'Tone Customization: Choose from Senior Architect, Hype Man, or Helpful Educator personas',
    ],
    stats: { repos: '10,000+', posts: '75k+' },
  },
  {
    id: 'artisan-craft',
    num: '06',
    featured: true,
    cat: 'fullstack genai blockchain featured',
    title: 'Digital Souls for Handmade Creations',
    subtitle: 'AI + Blockchain Platform for Artisans',
    summary: 'An AI-powered platform transforming handmade crafts into digital NFT collectibles with emotional storytelling, AR preview, and direct artisan connection.',
    description: 'Artisan Craft Platform bridges local artisans and global audiences by fusing AI + Cloud + Blockchain. Each handmade craft is transformed into a unique digital collectible with emotional storytelling using Vertex AI & OpenAI, secure Google Cloud storage, and Ethereum NFT minting. Demonstrates full production-grade architecture combining deep learning, cloud infrastructure, and blockchain technology.',
    image: '/genai-artisan.png',
    tech: 'Vertex AI · OpenAI · Flask · Cloud SQL · GCS · Web3.py · React · Ethereum',
    links: [
      { label: 'Full Demo', href: 'https://youtu.be/EZZlAaDLxVQ?si=XG1r4Jt8Y4G9Msnj', color: 'cyan' },
      { label: 'AR Visualization', href: 'https://youtu.be/cQNGJm1eRd0', color: 'purple' },
      { label: 'Blockchain Demo', href: 'https://youtu.be/tDBTcvJVFIk', color: 'orange' },
      { label: 'GitHub', href: 'https://github.com/SAURABHSALVE/genai-artisans', color: 'green' },
    ],
    features: [
      'Cloud Photo Upload: Craft photos auto-optimized and stored in Google Cloud Storage buckets',
      'AI Storytelling: Vertex AI & OpenAI generate emotional, cultural, and creative narratives',
      'Blockchain NFT Minting: Stories minted as ERC-721 NFTs on Ethereum (Sepolia testnet)',
      'Augmented Reality Preview: View handmade crafts in AR to experience digital presence',
      'Direct Artisan Connection: Bypasses intermediaries, empowers artisans with full control',
      'End-to-End Production: Fully functional architecture with Cloud Run deployment and live demos',
    ],
    stats: { features: '6', status: 'Hackathon Demo' },
  },
  {
    id: 'intelligence-system',
    num: '07',
    featured: true,
    cat: 'genai fullstack featured',
    title: 'Saurabh Labs Intelligence System',
    subtitle: 'Automated 24/7 AI Intelligence Pipeline',
    summary: 'Fully automated AI-powered intelligence pipeline generating 4 daily reports from 50+ data sources, analyzed with GPT-4o, delivered via email + Notion + Git.',
    description: 'A production-grade intelligence automation system that runs flawlessly 24/7 on GitHub Actions. Every day at 4 scheduled times, it aggregates data from 50+ sources (NASA APIs, SpaceX, Reddit, arXiv, Product Hunt, RSS feeds, ISS, stock markets), analyzes trends with OpenAI GPT-4o using advanced prompt engineering, and delivers richly formatted reports via email (HTML), Notion (block-based rendering with callouts, code blocks, colored headings), and Git (markdown archive). Demonstrates systems thinking, DevOps mastery, LLM integration, and production-grade reliability. Zero manual intervention — 1,460+ reports generated annually with 100% uptime.',
    image: '/saurabh-intelligence.png',
    tech: 'Python · GPT-4o · GitHub Actions · Notion API · NASA/SpaceX APIs · Gmail SMTP',
    github: 'https://github.com/SAURABHSALVE/automation-intelligence',
    links: [
      { label: 'GitHub Repo', href: 'https://github.com/SAURABHSALVE/automation-intelligence', color: 'green' },
      { label: 'Live Reports', href: 'https://github.com/SAURABHSALVE/automation-intelligence/tree/main/reports', color: 'cyan' },
    ],
    features: [
      '4 Daily Reports: Automated runs at 7 AM, 9 PM, 9:30 PM, 10:30 PM IST (100% uptime)',
      '50+ Data Sources: NASA, SpaceX, Reddit, arXiv, Product Hunt, 13 RSS feeds, ISS, Solar data, stocks',
      'GPT-4o Analysis: Advanced prompt engineering for viral content angles and deep insights',
      'Multi-Channel Delivery: Beautiful HTML emails, richly formatted Notion pages, Git markdown archive',
      'Notion Rich Text: Auto-generated colored headings, callout blocks, code snippets, inline markdown rendering',
      'Production Resilience: Fast-fail on permanent errors, retry logic, context truncation, git auto-commit',
      'Scalable Output: 2,000–8,000 word reports, 50+ structured blocks per Notion page',
      'Complete Archive: All reports stored in git for SEO, retrospectives, and portfolio value',
    ],
    stats: { sources: '50+', reports: '1,460+/year' },
  },

  /* ════════════════════════════════════════════════════════════════
     REGULAR PROJECTS (2)
     ════════════════════════════════════════════════════════════════ */
  {
    id: 'blog-generator',
    num: '08',
    featured: false,
    cat: 'genai fullstack',
    title: 'Multi-Lingual Blog Generator',
    subtitle: 'AI Content Engine for Global Reach',
    summary: 'Full-stack AI content engine generating high-quality blog posts in multiple languages from a single prompt.',
    description: 'Scalable content engine using LLMs with advanced prompt engineering for structured JSON outputs. Language-agnostic logic ensures consistent formatting across all target languages. Perfect for content creators, bloggers, and startups.',
    image: '/aws.png',
    tech: 'LLMs · Flask · Prompt Engineering · NLP',
    github: 'https://github.com/SAURABHSALVE/AWS-blog-generator',
    devpost: 'https://devpost.com/software/multilingual-blog-generator',
    features: [
      'Multi-language generation from single prompt',
      'AI-powered content creation using LLMs',
      'Structured output: title, intro, body, conclusion',
      'Fast and user-friendly UI',
      'Easy copy and share functionality',
    ],
  },
  {
    id: 'ai-image-studio',
    num: '09',
    featured: false,
    cat: 'genai cv',
    title: 'AI Image Studio',
    subtitle: 'Multi-File Streamlit Toolkit for AI Image Generation',
    summary: 'Fast, multi-file Streamlit toolkit for generating AI images using Latent Consistency Model. Features dedicated 3D model generation mode and random art creation.',
    description: 'A comprehensive Streamlit-based image generation toolkit powered by the Latent Consistency Model (LCM) for ultra-fast generation. Includes three modes: enhanced app for full features, Colab-optimized version, and a tiny demo app. Special feature: "This 3D Model Does Not Exist" mode generates 4 angles with consistent seeds for 3D model creation. Optimized for speed with 4–8 steps recommended.',
    image: '/image-generation.png',
    tech: 'Streamlit · LCM · HuggingFace · Python',
    demo: 'https://huggingface.co/spaces/SAURABHSALVE/ai-image-studio',
    github: 'https://github.com/SAURABHSALVE/ai-image-studio',
    features: [
      'Fast Generation: Latent Consistency Model (LCM) generates images in 4-8 steps',
      '3D Model Mode: "This 3D Model Does Not Exist" with consistent 4-angle generation',
      'Random Art Creation: Automated artistic prompt generation and rendering',
      'Multi-Platform: Works locally, on Colab, and with GPU acceleration',
      'Optimized Settings: 256-512px sizes recommended for best speed/quality balance',
    ],
    stats: { modes: '3', speed: '4-8 steps' },
  },
]

function ProjectCard({ project, visible, onOpen, index }) {
  if (!visible) return null

  const isOdd = index % 2 === 0
  const animationDelay = `${index * 0.15}s`

  return (
    <div
      className={`project-card zigzag reveal ${isOdd ? 'zigzag-left' : 'zigzag-right'}`}
      onClick={() => onOpen(project)}
      style={{ animationDelay: animationDelay }}
    >
      <div className="proj-zigzag-wrapper">
        {project.image && (
          <div className="proj-image-container zigzag">
            <img src={project.image} alt={project.title} className="proj-image zigzag" />
            <div className="proj-image-overlay"></div>
          </div>
        )}
        <div className="proj-zigzag-content">
          {project.featured && <div className="proj-badge">Featured</div>}
          <div className="proj-num">{project.num}</div>
          <h3 className="proj-title zigzag">{project.title}</h3>
          <p className="proj-subtitle">{project.subtitle}</p>
          <div className="proj-tech">{project.tech}</div>
          <p className="proj-summary">{project.summary}</p>

          <div className="proj-stats-row">
            {project.stats && Object.entries(project.stats).map(([key, value]) => (
              <div className="proj-stat-item" key={key}>
                <div className="proj-stat-value">{value}</div>
                <div className="proj-stat-key">{key}</div>
              </div>
            ))}
          </div>

          <div className="proj-action">
            <span className="proj-action-text">View Details ↗</span>
          </div>
        </div>
      </div>
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

  const links = project.links || [
    { label: 'Live Demo', href: project.demo, color: 'cyan' },
    { label: 'GitHub', href: project.github, color: 'green' },
    { label: 'Docker Hub', href: project.docker, color: 'purple' },
    { label: 'Devpost', href: project.devpost, color: 'orange' },
    { label: 'YouTube', href: project.youtube, color: 'orange' },
  ].filter(l => l.href)

  return (
    <div className="proj-modal-overlay" onClick={onClose}>
      <div className="proj-modal" onClick={(e) => e.stopPropagation()}>
        <button className="proj-modal-close" onClick={onClose} aria-label="Close">×</button>

        {project.image && (
          <div className="proj-modal-image">
            <img src={project.image} alt={project.title} />
          </div>
        )}

        <div className="proj-modal-header">
          <div className="proj-modal-num">{project.num}</div>
          <h2 className="proj-modal-title">{project.title}</h2>
          <p className="proj-modal-subtitle">{project.subtitle}</p>
        </div>

        <div className="proj-modal-tech">
          <span className="proj-tech-badge">{project.tech}</span>
        </div>

        <p className="proj-modal-description">{project.description}</p>

        {project.stats && (
          <div className="proj-modal-stats">
            {Object.entries(project.stats).map(([key, value]) => (
              <div className="proj-modal-stat" key={key}>
                <div className="proj-modal-stat-num">{value}</div>
                <div className="proj-modal-stat-label">{key}</div>
              </div>
            ))}
          </div>
        )}

        {project.features && (
          <div className="proj-modal-features">
            <h4 className="proj-modal-features-title">✨ Key Features</h4>
            <ul className="proj-modal-features-list">
              {project.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="proj-modal-links">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className={`proj-modal-link link-${l.color || 'cyan'}`}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              {l.label} ↗
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

function WIPToast({ isOpen, onClose, position = 'right' }) {
  useEffect(() => {
    if (!isOpen) return
    const timer = setTimeout(onClose, 6000) // Auto-dismiss after 6s
    return () => clearTimeout(timer)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className={`wip-toast wip-toast-${position}`}>
      <div className="wip-toast-badge">🚀 WIP</div>
      <div className="wip-toast-content">
        <h4 className="wip-toast-title">
          <span className="wip-toast-word wip-toast-color-1">Building</span>
          <span className="wip-toast-word wip-toast-color-2">HR</span>
          <span className="wip-toast-word wip-toast-color-3">Automation</span>
        </h4>
        <p className="wip-toast-text">Want to contribute? <a href="https://github.com/SAURABHSALVE/hr-automation" target="_blank" rel="noreferrer">Check repo 🔥</a></p>
      </div>
    </div>
  )
}

export default function Projects() {
  const [active, setActive] = useState('all')
  const [selected, setSelected] = useState(null)
  const [showWIPPopup, setShowWIPPopup] = useState(false)
  const [wipPosition, setWipPosition] = useState('right')

  useEffect(() => {
    // Show toast endlessly: 6 seconds visible, 15 seconds gap
    const SHOW_DURATION = 6000 // 6 seconds per toast
    const HIDE_DURATION = 15000 // 15 seconds between shows

    let timeoutId

    const scheduleToast = () => {
      // Random position: top-right or top-left
      const position = Math.random() > 0.5 ? 'right' : 'left'
      setWipPosition(position)

      // Show toast for 6 seconds
      setShowWIPPopup(true)
      timeoutId = setTimeout(() => {
        setShowWIPPopup(false)
        // Schedule next show after 15 seconds
        timeoutId = setTimeout(scheduleToast, HIDE_DURATION)
      }, SHOW_DURATION)
    }

    // Start immediately
    scheduleToast()
    return () => clearTimeout(timeoutId)
  }, [])

  return (
    <section id="projects" className="section-border">
      <WIPToast isOpen={showWIPPopup} onClose={() => setShowWIPPopup(false)} position={wipPosition} />

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
      <div className="projects-grid zigzag-container">
        {projects.map((p, idx) => (
          <ProjectCard
            key={p.num}
            project={p}
            visible={active === 'all' || p.cat.includes(active)}
            onOpen={setSelected}
            index={idx}
          />
        ))}

        {active === 'ml' && (
          <div className="filter-empty-state">
            <p className="empty-state-title">🤖 ML & Data Projects?</p>
            <p className="empty-state-text">
              Bro, you want to see my ML/Data work? Check my{' '}
              <a href="https://github.com/SAURABHSALVE" target="_blank" rel="noreferrer" className="github-link">
                GitHub
              </a>
              {' '}— got a whole treasure chest of notebooks, models, and data pipelines over there! 🔥
            </p>
          </div>
        )}
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
