import { useState } from 'react'
import { ArrowDown, ArrowRight, ChevronDown, Menu, X } from 'lucide-react'
import './givingli-home.css'
import './philosophy.css'

const principles = [
  {
    number: '01',
    title: 'Brands Must Be Ambient.',
    subtitle: 'From buying attention to earning presence.',
    paragraphs: [
      "Brands should earn a natural place in people's everyday lives, rather than constantly demanding their attention. Every engagement, repeat purchase, or return to a brand begins with an opportunity to be seen or remembered. That opportunity should not always require another intrusive advertisement, email, or notification.",
      'By becoming a welcome part of the home, a brand can create natural, repeated exposure through everyday routines. This presence should be quiet, useful, lasting, and respectful. Customers choose when to engage, while the brand remains available whenever they need it.',
    ],
    quote: '“When I need you, take me straight there. When I don\'t, leave me in peace.”',
  },
  {
    number: '02',
    title: 'Every Sale Strengthens the Channel.',
    subtitle: 'A channel’s work does not end at checkout.',
    paragraphs: [
      'Every product that reaches a home is an opportunity to make that channel easier to return to. Sales are not just what a channel produces. They are how it grows stronger.',
      'A lasting, useful touchpoint can help customers reorder through the same retailer, marketplace, or brand store where they bought the product. Each sale should do more than generate revenue: it should strengthen the channel’s ability to generate future sales.',
    ],
    refrain: 'Channels generate sales. Sales should strengthen channels.',
  },
  {
    number: '03',
    title: 'Intelligence Begins Where the Product Is Consumed.',
    subtitle: 'The deeper understanding comes from what happens next.',
    paragraphs: [
      'A sale tells a brand what was bought. The deeper understanding comes from how the product fits into a household’s routines, what people need from it, and when they need it again.',
      'By staying connected where the product is consumed, a brand can learn from those experiences and show care in ways that matter—making everyday life easier and giving customers a reason to return.',
    ],
  },
]

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  return <header className="g-header philosophy-header"><div className="g-header__inner">
    <a className="g-logo" href="/" aria-label="Hommio home"><span className="g-logo__crop"><img src="/assets/hommio-logo.png" alt="Hommio" /></span></a>
    <button className="philosophy-menu-toggle" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(open => !open)}>{menuOpen ? <X size={20}/> : <Menu size={20}/>}</button>
    <nav className={`g-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
      <a href="/" onClick={closeMenu}>Hommio</a>
      <div className="g-nav__item"><a href="/#solutions" onClick={closeMenu}>Solutions <ChevronDown size={13}/></a></div>
      <a href="https://app.notion.com/p/Pricing-ROI-Calculator-40e9166fd9fd800d832fe88c51cb3236" target="_blank" rel="noreferrer" onClick={closeMenu}>Pricing &amp; ROI Calculator</a>
      <a href="/philosophy" aria-current="page" onClick={closeMenu}>Retention Philosophy</a>
    </nav>
    <a className="g-header-button g-header-button--blue philosophy-header-cta" href="/#talk-to-us">Talk to Hommio</a>
  </div></header>
}

export default function Philosophy() {
  return <div className="givingli-site philosophy-page">
    <Header/>
    <main>
      <section className="philosophy-hero">
        <span className="philosophy-kicker">THE HOMMIO POINT OF VIEW</span>
        <h1>Retention<br/><em>is at home.</em></h1>
        <p>Lasting customer relationships are built in the moments and routines that make up everyday life.</p>
        <a className="philosophy-scroll" href="#principles">Explore the principles <ArrowDown size={15}/></a>
      </section>
      <section className="philosophy-principles" id="principles" aria-label="Retention principles">
        {principles.map(item => <article className="philosophy-principle" key={item.number}>
          <div className="philosophy-principle__marker"><span>{item.number}</span><i/></div>
          <div className="philosophy-principle__content">
            <span className="philosophy-principle__eyebrow">PRINCIPLE {item.number}</span>
            <h2>{item.title}</h2>
            <h3>{item.subtitle}</h3>
            {item.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
            {item.quote && <blockquote>{item.quote}</blockquote>}
            {item.refrain && <p className="philosophy-refrain">{item.refrain}</p>}
          </div>
        </article>)}
      </section>
      <section className="philosophy-contact" id="contact">
        <span>MADE FOR EVERYDAY LIFE</span>
        <h2>Make your brand<br/>part of the home.</h2>
        <a href="/#talk-to-us">Talk to Hommio <ArrowRight size={16}/></a>
      </section>
    </main>
    <footer className="g-footer philosophy-footer">
      <div className="g-footer__main"><div className="g-footer__brand"><a className="g-logo g-logo--footer" href="/" aria-label="Hommio home"><span className="g-logo__crop"><img src="/assets/hommio-logo.png" alt="Hommio" /></span></a><p>Hommio is an in-home retention solution provider for CPG brands.</p></div>
        <div className="g-footer__group"><b>Explore</b><a href="/">Home</a><a href="/philosophy">Retention Philosophy</a></div>
        <div className="g-footer__group"><b>Contact</b><a href="/#talk-to-us">Talk to Hommio</a></div>
      </div>
      <div className="g-footer__bottom"><span>© 2026 Hommio. All rights reserved.</span></div>
    </footer>
  </div>
}
