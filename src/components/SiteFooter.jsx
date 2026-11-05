import { useEffect, useRef, useState } from 'react'
import { Mail, MessageCircle, MessageSquareText } from 'lucide-react'
import './site-footer.css'

const links = [
  ['Home', '/#top'],
  ['For DTC Brands', '/dtcbrands'],
  ['For Amazon Brands', '/amazonbrands'],
  ['Our Philosophy', '/philosophy'],
  ['FAQ', '/#faq'],
]

const contacts = [
  { label: 'Email', value: 'ella@fridgechannels.com', showValue: false, icon: Mail },
  { label: 'WhatsApp', value: '+1 (620) 894-1711', showValue: false, icon: MessageCircle },
  { label: 'SMS', value: '+1 (620) 894-1711', showValue: false, icon: MessageSquareText },
]

export default function SiteFooter() {
  const [copyStatus, setCopyStatus] = useState(null)
  const copyTimerRef = useRef(0)

  useEffect(() => () => window.clearTimeout(copyTimerRef.current), [])

  async function copyContact(label, text, button) {
    let copied = false
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text)
        copied = true
      }
    } catch {
      // Use the fallback when clipboard access is unavailable.
    }
    if (!copied) {
      const field = document.createElement('textarea')
      field.value = text
      field.setAttribute('readonly', '')
      field.style.cssText = 'position:fixed;top:0;left:0;opacity:0;'
      document.body.appendChild(field)
      field.focus()
      field.select()
      try { copied = document.execCommand('copy') } catch { copied = false }
      field.remove()
      button?.focus({ preventScroll: true })
    }
    window.clearTimeout(copyTimerRef.current)
    setCopyStatus({ label, message: copied ? 'Copied ✓' : 'Unable to copy' })
    copyTimerRef.current = window.setTimeout(() => setCopyStatus(null), 2500)
  }

  return <footer className="site-footer" id="footer">
    <div className="site-footer__main">
      <div className="site-footer__brand">
        <a className="site-footer__logo" href="/" aria-label="Hommio home">
          <span className="site-footer__logo-crop"><img src="/assets/hommio-logo-transparent.png" alt="Hommio" /></span>
        </a>
        <p>Hommio is an in-home retention solution provider for CPG brands.</p>
      </div>

      <nav className="site-footer__nav" aria-label="Footer navigation">
        <h2>Explore</h2>
        {links.map(([label, href]) => <a key={label} href={href}>{label}</a>)}
      </nav>

      <div className="site-footer__contact" aria-label="Contact channels">
        <h2>Get in touch</h2>
        <ul>
          {contacts.map(({ label, value, showValue = true, icon: Icon }) => <li key={label}>
            <button type="button" onClick={event => copyContact(label, value, event.currentTarget)} aria-label={`Copy ${label}`}>
              <Icon aria-hidden="true"/>
              <span className="site-footer__contact-copy"><span className="site-footer__contact-heading"><span>{label}</span><span className="site-footer__copy-status" aria-hidden="true">{copyStatus?.label === label ? copyStatus.message : ''}</span></span>{value && showValue && <small className="site-footer__contact-value">{value}</small>}</span>
            </button>
          </li>)}
        </ul>
        <span className="site-footer__copy-announcement" role="status" aria-live="polite">{copyStatus ? `${copyStatus.label}: ${copyStatus.message}` : ''}</span>
      </div>
    </div>


    <div className="site-footer__bottom">
      <span>© 2026 Hommio. All rights reserved.</span>
    </div>
  </footer>
}
