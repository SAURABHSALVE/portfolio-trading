import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { BLOG_POSTS } from '../data/blogData'
import { useScrollReveal } from '../hooks/useScrollReveal'
import Footer from '../components/Footer'

/* Derive filters dynamically from actual blog post categories */
const deriveFilters = () => {
  const seen = new Set()
  const cats = []
  BLOG_POSTS.forEach((p) => {
    if (!seen.has(p.category)) { seen.add(p.category); cats.push(p.category) }
  })
  return [{ key: 'all', label: 'All Posts' }, ...cats.map((c) => ({ key: c, label: c }))]
}

const FILTERS = deriveFilters()

const LINKEDIN_POSTS = [
  {
    date: '3 months ago',
    impressions: '2,234',
    title: '🧵 Artisan Craft Platform — AI + Blockchain + AR',
    excerpt: 'Built a full-stack platform combining Vertex AI storytelling, NFT minting (ERC-721), and AR visualization to preserve artisan heritage digitally. Hackathon finalist.',
    tags: ['Vertex AI', 'Blockchain', 'AR', 'React', 'Cloud Run'],
    reactions: '❤️ 48 reactions · 10 comments',
  },
  {
    date: '4 months ago',
    impressions: '624',
    title: '🧠 Deep Dive: Training ANN, CNN & ProCNN on MNIST',
    excerpt: 'Built 3 neural architectures and deployed them in a Streamlit app with smart PIL + OpenCV preprocessing. ProCNN with Batch Norm + Dropout pushed accuracy higher.',
    tags: ['PyTorch', 'CNN', 'Streamlit', 'MLOps'],
    reactions: '❤️ 23 reactions · 6 comments',
  },
  {
    date: '6 months ago',
    impressions: '936',
    title: '🚀 Production-Ready RAG AI Agent with Streamlit',
    excerpt: 'Built a conversational AI agent combining PDF knowledge base with real-time web search via Tavily. FAISS vector store, LangChain orchestration, GPT-4 responses.',
    tags: ['RAG', 'LangChain', 'FAISS', 'OpenAI'],
    reactions: '❤️ 40 reactions · 4 comments',
  },
  {
    date: '9 months ago',
    impressions: '1,337',
    title: '🚀 Customer Churn Prediction App — End-to-End ML',
    excerpt: 'Built an ANN-based churn predictor using TensorFlow/Keras with early stopping, dropout, full preprocessing pipeline, and TensorBoard logging.',
    tags: ['TensorFlow', 'ANN', 'Streamlit', 'MLOps'],
    reactions: '❤️ 36 reactions · 14 comments',
  },
]

const catColor = {
  'GenAI':           'var(--accent)',
  'Machine Learning':'var(--accent2)',
  'Cloud / MLOps':   'var(--accent3)',
  'Project Log':     'var(--accent4)',
  'Physics':         '#7c5cff',
}

function CategoryBadge({ cat }) {
  return (
    <span
      className="post-cat-badge"
      style={{ borderColor: catColor[cat] ?? 'var(--border)', color: catColor[cat] ?? 'var(--muted)' }}
    >
      {cat}
    </span>
  )
}

export default function BlogList() {
  useScrollReveal()
  const [active, setActive] = useState('all')
  const [animKey, setAnimKey] = useState(0)

  const featured = BLOG_POSTS.find((p) => p.featured)
  const regular  = BLOG_POSTS.filter((p) => !p.featured)

  /* All regular posts — use CSS to show/hide for smooth animation */
  const featuredVisible = active === 'all' || featured?.category === active

  const handleFilter = (key) => {
    setActive(key)
    setAnimKey((k) => k + 1)   // re-trigger CSS stagger animations
  }

  /* Count per category for badge */
  const countFor = (cat) => cat === 'all'
    ? regular.length
    : regular.filter((p) => p.category === cat).length

  return (
    <>
      {/* ── HEADER ──────────────────────────────────────────────── */}
      <div className="blog-header-wrap">
        <div className="blog-bg-text" aria-hidden="true">BLOG</div>
        <div className="blog-tag-line">
          <span className="blog-tag-dot" />
          Writing &amp; Thoughts
        </div>
        <h1 className="blog-main-title">
          The<br />
          <span className="blog-title-outline">Blog_</span>
        </h1>
        <p className="blog-subtitle-text">
          AI experiments, build logs, lessons learned deploying real systems — written for builders.
        </p>
      </div>

      {/* ── FILTER ──────────────────────────────────────────────── */}
      <div className="blog-section-pad">
        <div className="blog-filter-bar">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              className={`fbtn${active === f.key ? ' active' : ''}`}
              onClick={() => handleFilter(f.key)}
            >
              {f.label}
              <span className="fbtn-count">{countFor(f.key)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── FEATURED POST ───────────────────────────────────────── */}
      {featured && (
        <div
          className="blog-section-pad"
          style={{
            paddingTop: 0,
            transition: 'opacity 0.35s, transform 0.35s',
            opacity: featuredVisible ? 1 : 0,
            transform: featuredVisible ? 'translateY(0)' : 'translateY(12px)',
            pointerEvents: featuredVisible ? 'auto' : 'none',
            height: featuredVisible ? 'auto' : 0,
            overflow: 'hidden',
          }}
        >
          <Link to={`/blog/${featured.slug}`} className="featured-post reveal">
            <div className="fp-content">
              <div className="fp-meta">
                <CategoryBadge cat={featured.category} />
                <span className="post-date">{featured.date}</span>
                <span className="fp-read-time">{featured.readTime}</span>
                <span className="post-arrow">↗</span>
              </div>
              <div className="fp-label">Featured Post</div>
              <div className="fp-title">{featured.title}</div>
              <p className="fp-excerpt">{featured.excerpt}</p>
              <span className="fp-cta">Read Full Article →</span>
            </div>
            <div className="fp-side">
              <div className="fp-stats">
                {featured.stats.map((s) => (
                  <div key={s.label}>
                    <div className="fp-stat-num">{s.num}</div>
                    <div className="fp-stat-label">{s.label}</div>
                  </div>
                ))}
              </div>
              <div className="fp-tags-wrap">
                {featured.tags.map((t) => (
                  <span className="ftag" key={t}>{t}</span>
                ))}
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* ── POSTS GRID — all posts in DOM, CSS-filtered for smooth animation ── */}
      <div className="blog-section-pad" style={{ paddingTop: 0 }}>
        <div className="blog-posts-grid" key={animKey}>
          {regular.map((post, i) => {
            const visible = active === 'all' || post.category === active
            return (
              <Link
                to={`/blog/${post.slug}`}
                className={`post-card blog-filter-item${visible ? ' blog-filter-visible' : ' blog-filter-hidden'}`}
                key={post.slug}
                style={{ '--stagger': i % 6 }}
                tabIndex={visible ? 0 : -1}
                aria-hidden={!visible}
              >
                <div className="post-meta-row">
                  <span className="post-num">POST — {String(i + 1).padStart(2, '0')}</span>
                  <span className="post-arrow">↗</span>
                </div>
                <CategoryBadge cat={post.category} />
                <div className="post-title">{post.title}</div>
                <p className="post-excerpt">{post.excerpt}</p>
                <div className="post-footer-row">
                  <span className="post-readtime">{post.readTime}</span>
                  <span className="post-year">{post.date}</span>
                </div>
              </Link>
            )
          })}
          {regular.filter((p) => active === 'all' || p.category === active).length === 0 && (
            <div className="blog-empty">No posts in this category yet.</div>
          )}
        </div>
      </div>

      {/* ── LINKEDIN POSTS ──────────────────────────────────────── */}
      {(active === 'all') && (
        <div className="blog-section-pad linkedin-section-wrap">
          <div className="linkedin-section-header">
            <span className="linkedin-label">LinkedIn Posts</span>
            <div className="section-line" />
            <a
              href="https://www.linkedin.com/in/saurabhsalve99/"
              target="_blank"
              rel="noreferrer"
              className="linkedin-follow"
            >
              Follow on LinkedIn ↗
            </a>
          </div>
          <div className="linkedin-grid">
            {LINKEDIN_POSTS.map((lp) => (
              <div className="li-card reveal" key={lp.title}>
                <div className="li-card-header">
                  <span className="li-platform-badge">LinkedIn</span>
                  <span className="li-date">{lp.date}</span>
                  <span className="li-impressions">{lp.impressions} impressions</span>
                </div>
                <div className="li-title">{lp.title}</div>
                <p className="li-excerpt">{lp.excerpt}</p>
                <div className="li-tags">
                  {lp.tags.map((t) => <span className="li-tag" key={t}>{t}</span>)}
                </div>
                <div className="li-card-footer">
                  <span className="li-reactions">{lp.reactions}</span>
                  <a
                    href="https://www.linkedin.com/in/saurabhsalve99/"
                    target="_blank"
                    rel="noreferrer"
                    className="li-link"
                  >
                    View Post ↗
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── NEWSLETTER ──────────────────────────────────────────── */}
      <div className="blog-section-pad" style={{ paddingBottom: '80px' }}>
        <Newsletter />
      </div>

      <Footer />
    </>
  )
}

// Same Web3Forms access key used by the Contact form (saurabhsalve9999@gmail.com)
const NEWSLETTER_ACCESS_KEY = '5bdd5c33-8bc9-46f9-8882-bb177c3ea946'

function Newsletter() {
  const [name, setName]     = useState('')
  const [email, setEmail]   = useState('')
  const [status, setStatus] = useState('')
  const [sending, setSending] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name || !email) { setStatus('error'); return }
    setSending(true)
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: NEWSLETTER_ACCESS_KEY,
          subject: 'New Newsletter Subscriber',
          name,
          email,
          message: `${name} (${email}) subscribed to the blog newsletter.`,
        }),
      })
      const data = await res.json()
      if (!data.success) throw new Error(data.message)
      setStatus('success')
      setName(''); setEmail('')
    } catch {
      setStatus('error')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="newsletter-block reveal">
      <div className="nl-bg-icon" aria-hidden="true">✉</div>
      <div className="nl-left">
        <div className="nl-label">Stay Updated</div>
        <div className="nl-title">Get my latest posts &amp; project updates</div>
        <p className="nl-sub">
          I write about AI/ML engineering, deployment lessons, and what I&apos;m building.
          No spam, one email when there&apos;s something worth sharing.
        </p>
      </div>
      <form className="nl-form" onSubmit={handleSubmit}>
        <input
          className="nl-input" type="text" placeholder="Your name"
          value={name} onChange={(e) => setName(e.target.value)}
        />
        <input
          className="nl-input" type="email" placeholder="your@email.com"
          value={email} onChange={(e) => setEmail(e.target.value)}
        />
        <button className="nl-btn" type="submit" disabled={sending}>
          {sending ? 'Subscribing...' : 'Subscribe →'}
        </button>
        {status === 'success' && (
          <p className="nl-status success">✓ You&apos;re on the list. Thanks{name ? `, ${name}` : ''}!</p>
        )}
        {status === 'error' && (
          <p className="nl-status error">⚠ Please enter your name and email, or try again.</p>
        )}
      </form>
    </div>
  )
}
