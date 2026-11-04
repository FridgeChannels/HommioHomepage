import './site-footer.css'

const groups = [
  {
    title: 'hommio',
    links: [
      ['Home', '/#top'],
      ['For DTC Brands', '/#dtc'],
      ['For Amazon Brands', '/#amazon'],
    ],
  },
  {
    title: 'explore',
    links: [
      ['Pricing & ROI Calculator', 'https://app.notion.com/p/Pricing-ROI-Calculator-40e9166fd9fd800d832fe88c51cb3236?pvs=21'],
      ['Retention Philosophy', '/philosophy'],
      ['Frequently Asked Questions', '/#faq'],
    ],
  },
  {
    title: 'legal',
    links: [
      ['Contact', '/#talk-to-us'],
      ['Privacy Policy', '/#privacy'],
      ['Terms of Use', '/#terms'],
    ],
  },
]

export default function SiteFooter() {
  return <footer className="site-footer" id="footer">
    <div className="site-footer__main">
      <div className="site-footer__brand">
        <a className="site-footer__logo" href="/" aria-label="Hommio home">
          <span className="site-footer__logo-crop"><img src="/assets/hommio-logo.png" alt="Hommio" /></span>
        </a>
        <p>Hommio is an in-home retention solution provider for CPG brands.</p>
      </div>
      {groups.map(({ title, links }) => <div className="site-footer__group" key={title}>
        <b>{title}</b>
        {links.map(([label, href]) => <a
          key={label}
          href={href}
          target={href.startsWith('https://') ? '_blank' : undefined}
          rel={href.startsWith('https://') ? 'noreferrer' : undefined}
        >{label}</a>)}
      </div>)}
    </div>
    <div className="site-footer__bottom">
      <span>© 2026 Hommio. All rights reserved.</span>
      <a href="/#privacy">Privacy Policy</a>
      <a href="/#terms">Terms of Use</a>
    </div>
  </footer>
}
