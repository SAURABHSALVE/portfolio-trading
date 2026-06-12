import { useState } from 'react'

// ── WEB3FORMS CONFIG ───────────────────────────────────────────
// 1. Go to https://web3forms.com → enter your Gmail → get an Access Key
//    (sent to your inbox instantly, no signup/template needed)
// 2. Replace the value below with your real Access Key
const ACCESS_KEY = '5bdd5c33-8bc9-46f9-8882-bb177c3ea946'
// ──────────────────────────────────────────────────────────────

const directLinks = [
  { label: 'Email',        val: 'saurabhsalve9999@gmail.com',    href: 'mailto:saurabhsalve9999@gmail.com' },
  { label: 'LinkedIn',     val: '/in/saurabhsalve99',             href: 'https://www.linkedin.com/in/saurabhsalve99/' },
  { label: 'GitHub',       val: 'SAURABHSALVE',                   href: 'https://github.com/SAURABHSALVE' },
  { label: 'Google Cloud', val: 'Skills Boost Profile',           href: 'https://www.skills.google/public_profiles/8e099b66-523c-407e-9c78-c58e960a2c4d' },
  { label: 'Phone',        val: '+91 97667 89387',                href: 'tel:+919766789387' },
]

const INITIAL = { fname: '', lname: '', email: '', subject: '', message: '' }

export default function Contact() {
  const [form, setForm]     = useState(INITIAL)
  const [status, setStatus] = useState({ msg: '', type: '' })
  const [sending, setSending] = useState(false)

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { fname, email, message } = form
    if (!fname || !email || !message) {
      setStatus({ msg: '⚠  Please fill in Name, Email, and Message.', type: 'error' })
      return
    }
    if (ACCESS_KEY === 'YOUR_ACCESS_KEY') {
      setStatus({ msg: '⚙  Form not configured yet — see code comments.', type: 'error' })
      return
    }
    setSending(true)
    setStatus({ msg: '', type: '' })
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          to_email: 'saurabhsalve9999@gmail.com',
          name:       `${form.fname} ${form.lname}`,
          email:      form.email,
          subject:    form.subject || 'Portfolio Contact',
          message:    form.message,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setStatus({ msg: "✓ Message sent! I'll get back to you within 24 hours.", type: 'success' })
        setForm(INITIAL)
      } else {
        throw new Error(data.message)
      }
    } catch {
      setStatus({ msg: '✗ Failed. Please email me directly: saurabhsalve9999@gmail.com', type: 'error' })
    } finally {
      setTimeout(() => setSending(false), 1000)
    }
  }

  return (
    <section id="contact" className="section-border">
      <div className="section-header reveal">
        <span className="section-num">07</span>
        <h2>Contact</h2>
        <div className="section-line" />
      </div>
      <div className="contact-wrapper">
        {/* Left — info */}
        <div className="contact-info reveal">
          <div className="contact-headline">
            Let&apos;s build<br />something <span>great.</span>
          </div>
          <p className="contact-sub">
            Open to full-time roles, freelance projects, and AI/ML collaborations. Send a message
            — I&apos;ll reply within 24 hours.
          </p>
          <div className="contact-direct">
            {directLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                className="direct-link"
              >
                <span className="direct-link-label">{l.label}</span>
                <span className="direct-link-val">{l.val}</span>
                <span className="direct-link-arrow">↗</span>
              </a>
            ))}
          </div>
        </div>

        {/* Right — form */}
        <div className="reveal">
          <div className="form-header">— Drop me a message</div>
          <form className="contact-form-section" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="fname">First Name</label>
                <input className="form-input" id="fname" name="fname" type="text"
                  placeholder="Rahul" value={form.fname} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="lname">Last Name</label>
                <input className="form-input" id="lname" name="lname" type="text"
                  placeholder="Sharma" value={form.lname} onChange={handleChange} />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="email">Email Address</label>
              <input className="form-input" id="email" name="email" type="email"
                placeholder="you@company.com" value={form.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="subject">Subject</label>
              <input className="form-input" id="subject" name="subject" type="text"
                placeholder="Job Opportunity / Collaboration / Question"
                value={form.subject} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="message">Message</label>
              <textarea className="form-textarea" id="message" name="message"
                placeholder="Tell me about the role, project, or what you're working on..."
                value={form.message} onChange={handleChange} required />
            </div>
            <button className="form-submit" type="submit" disabled={sending}>
              {sending ? 'Sending...' : 'Send Message →'}
            </button>
            {status.msg && (
              <div className={`form-status ${status.type}`}>{status.msg}</div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
