import { useState, useEffect } from 'react'

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
     FEATURED PROJECTS (3)
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
    github: 'https://github.com/SAURABHSALVE',
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
    github: 'https://github.com/SAURABHSALVE',
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
    github: 'https://github.com/SAURABHSALVE',
    features: [
      'Multi-Agent Debate: 5 AI executives debate from different perspectives',
      'Human-In-The-Loop: Pause mid-debate to challenge agents or redirect discussion',
      'Real-Time Streaming: Watch debate unfold live via Server-Sent Events',
      'Domain-Specific Boards: Customize for Tech, Healthcare, Finance, Retail',
      'Strategy Brief PDF: Auto-generated with board votes, risk matrix, recommendations',
    ],
    stats: { agents: '5', phases: '3' },
  },

  /* ════════════════════════════════════════════════════════════════
     REGULAR PROJECTS (3)
     ════════════════════════════════════════════════════════════════ */
  {
    id: 'plant-disease',
    num: '04',
    featured: false,
    cat: 'cv',
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
    accuracy: '98%',
  },
  {
    id: 'blog-generator',
    num: '05',
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
    id: 'artisan-craft',
    num: '06',
    featured: false,
    cat: 'fullstack genai',
    title: 'Artisan Craft Platform',
    subtitle: 'AI + Blockchain for Handmade Crafts',
    summary: 'Hackathon finalist. AI platform converting handmade crafts into NFT digital collectibles with storytelling, AR visualization, and artisan marketplace.',
    description: 'AI-powered global platform bridging local artisans and global audience through OpenAI storytelling, Google Cloud infrastructure, and Blockchain minting. Each craft becomes a digital collectible with emotional storytelling and AR preview.',
    image: '/repo2viral.png',
    tech: 'Vertex AI · Blockchain · AR · React · Cloud Run',
    github: 'https://github.com/SAURABHSALVE/genai-artisans',
    youtube: 'https://youtu.be/EZZlAaDLxVQ',
    features: [
      'Cloud Photo Upload: Images to Google Cloud Storage with auto-optimization',
      'AI Storytelling: Vertex AI + OpenAI generate emotional, cultural stories',
      'Blockchain Minting: Stories minted as NFTs for authenticity and provenance',
      'Augmented Reality: Preview crafts in AR before purchase',
      'Direct Artisan Connection: Bypasses intermediaries, empowers creators',
    ],
    stats: { demos: '3', status: 'Hackathon Finalist' },
  },
  {
    id: 'ai-image-studio',
    num: '07',
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

  return (
    <div className={`project-card zigzag reveal ${isOdd ? 'zigzag-left' : 'zigzag-right'}`} onClick={() => onOpen(project)}>
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

  const links = [
    { label: 'Live Demo', href: project.demo },
    { label: 'GitHub', href: project.github },
    { label: 'Docker Hub', href: project.docker },
    { label: 'Devpost', href: project.devpost },
    { label: 'YouTube', href: project.youtube },
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
              className="proj-modal-link"
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
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
