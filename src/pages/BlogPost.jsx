import { useParams, Link, Navigate } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import { getPost, BLOG_POSTS } from '../data/blogData'
import ReadingProgress from '../components/ReadingProgress'
import Footer from '../components/Footer'

/* ── Inline code renderer: backtick → <code> ──────────────── */
function InlineText({ text }) {
  if (!text.includes('`')) return <>{text}</>
  const parts = text.split(/`([^`]+)`/)
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? <code key={i} className="inline-code">{part}</code> : part
      )}
    </>
  )
}

/* ── Content block renderer ───────────────────────────────── */
function Block({ block }) {
  switch (block.type) {
    case 'h2':
      return <h2 className="article-h2"><InlineText text={block.text} /></h2>
    case 'h3':
      return <h3 className="article-h3"><InlineText text={block.text} /></h3>
    case 'p':
      return <p className="article-p"><InlineText text={block.text} /></p>
    case 'highlight':
      return (
        <blockquote className="article-highlight">
          <InlineText text={block.text} />
        </blockquote>
      )
    case 'tip':
      return (
        <div className="article-tip">
          <span className="article-tip-icon">💡</span>
          <InlineText text={block.text} />
        </div>
      )
    case 'list':
      return (
        <ul className="article-list">
          {block.items.map((item, i) => (
            <li key={i}><InlineText text={typeof item === 'string' ? item : item} /></li>
          ))}
        </ul>
      )
    case 'code':
      return (
        <div className="article-code-block">
          {block.lang && <div className="code-lang-label">{block.lang}</div>}
          <pre><code>{block.text}</code></pre>
        </div>
      )
    case 'image':
      return (
        <figure className="article-image-figure">
          <img
            src={block.src}
            alt={block.alt || 'Article illustration'}
            className="article-image"
          />
          {block.caption && <figcaption className="article-image-caption">{block.caption}</figcaption>}
        </figure>
      )
    default:
      return null
  }
}

/* ── Table of Contents ────────────────────────────────────── */
function TableOfContents({ content }) {
  const headings = content.filter((b) => b.type === 'h2')
  if (headings.length < 2) return null

  const handleClick = (text) => {
    const els = document.querySelectorAll('.article-h2')
    for (const el of els) {
      if (el.textContent.trim() === text) {
        const y = el.getBoundingClientRect().top + window.scrollY - 100
        window.scrollTo({ top: y, behavior: 'smooth' })
        break
      }
    }
  }

  return (
    <aside className="toc-sidebar">
      <div className="toc-label">Contents</div>
      <ul className="toc-list">
        {headings.map((h, i) => (
          <li key={i}>
            <button className="toc-item" onClick={() => handleClick(h.text)}>
              {h.text}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  )
}

/* ── Related Posts ────────────────────────────────────────── */
function RelatedPosts({ current }) {
  const related = BLOG_POSTS
    .filter((p) => p.slug !== current.slug && p.category === current.category)
    .slice(0, 2)
  if (related.length === 0) return null

  return (
    <div className="related-section">
      <div className="related-label">More in {current.category}</div>
      <div className="related-grid">
        {related.map((p) => (
          <Link to={`/blog/${p.slug}`} className="related-card" key={p.slug}>
            <div className="related-cat">{p.category}</div>
            <div className="related-title">{p.title}</div>
            <div className="related-meta">{p.readTime} · {p.date}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}

/* ── Main BlogPost Component ──────────────────────────────── */
export default function BlogPost() {
  const { slug } = useParams()
  const post = getPost(slug)
  const articleRef = useRef(null)
  const [showToc, setShowToc] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!post) return <Navigate to="/blog" replace />

  const catColors = {
    'GenAI':            'var(--accent)',
    'Machine Learning': 'var(--accent2)',
    'Cloud / MLOps':    'var(--accent3)',
    'Project Log':      'var(--accent4)',
    'Physics':          '#7c5cff',
  }
  const catColor = catColors[post.category] ?? 'var(--accent)'

  return (
    <>
      <ReadingProgress />

      <div className="blogpost-wrapper">
        {/* TOC sidebar (desktop only) */}
        <TableOfContents content={post.content} />

        {/* Main content */}
        <article className="blogpost-main" ref={articleRef}>
          {/* Back nav */}
          <Link to="/blog" className="back-link">
            ← All Posts
          </Link>

          {/* Header */}
          <header className="article-header">
            <div className="article-meta-top">
              <span
                className="article-cat-badge"
                style={{ borderColor: catColor, color: catColor }}
              >
                {post.category}
              </span>
              <span className="article-date">{post.date}</span>
              <span className="article-readtime">{post.readTime}</span>
            </div>
            <h1 className="article-title">{post.title}</h1>
            <p className="article-excerpt">{post.excerpt}</p>
            <div className="article-tags">
              {post.tags.map((t) => (
                <span className="article-tag" key={t}>{t}</span>
              ))}
            </div>

            {/* Mobile TOC toggle */}
            {post.content.filter((b) => b.type === 'h2').length >= 2 && (
              <button
                className="toc-mobile-toggle"
                onClick={() => setShowToc((v) => !v)}
              >
                {showToc ? 'Hide' : 'Show'} Contents ↕
              </button>
            )}
            {showToc && (
              <div className="toc-mobile">
                {post.content
                  .filter((b) => b.type === 'h2')
                  .map((h, i) => (
                    <div key={i} className="toc-mobile-item">
                      <span className="toc-mobile-num">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {h.text}
                    </div>
                  ))}
              </div>
            )}
          </header>

          {/* Article body */}
          <div className="article-body">
            {post.content.map((block, i) => (
              <Block key={i} block={block} />
            ))}
          </div>

          {/* Footer bar */}
          <div className="article-footer-bar">
            <Link to="/blog" className="article-back-btn">← Back to Blog</Link>
            <div className="article-share">
              <span className="article-share-label">Share</span>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noreferrer"
                className="share-btn"
              >
                X (Twitter)
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noreferrer"
                className="share-btn"
              >
                LinkedIn
              </a>
            </div>
          </div>

          {/* Related posts */}
          <RelatedPosts current={post} />
        </article>
      </div>

      <Footer />
    </>
  )
}
