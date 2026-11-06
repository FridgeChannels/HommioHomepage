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
  { label: 'Email', recipient: 'ella@fridgechannels.com', href: 'mailto:ella@fridgechannels.com', icon: Mail },
  { label: 'WhatsApp', recipient: '+1 (620) 894-1711', href: 'https://wa.me/16208941711', icon: MessageCircle },
  { label: 'SMS', recipient: '+1 (620) 894-1711', href: 'sms:+16208941711', icon: MessageSquareText },
]

export default function SiteFooter() {
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
          {contacts.map(({ label, recipient, href, icon: Icon }) => <li key={label}>
            <a href={href} aria-label={`${label}: ${recipient}`}>
              <Icon aria-hidden="true"/>
              <span className="site-footer__contact-copy"><span className="site-footer__contact-heading"><span>{label}</span></span></span>
            </a>
          </li>)}
        </ul>
      </div>
    </div>


    <div className="site-footer__bottom">
      <span>© 2026 Hommio. All rights reserved.</span>
    </div>
  </footer>
}
