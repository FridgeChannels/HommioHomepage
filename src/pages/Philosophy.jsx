import SiteFooter from '../components/SiteFooter.jsx'
import { useState } from 'react'
import { ArrowDown, Menu, X } from 'lucide-react'
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
    subtitle: '',
    paragraphs: [
      'A channel’s work does not end at checkout. Every product that reaches a home is an opportunity to make that channel easier to return to. Sales are not just what a channel produces. They are how it grows stronger.',
      'Channels generate sales. But a sale should not be the end of the channel’s work. When a product enters the home, it creates an opportunity to make that channel easier to return to. A lasting, useful touchpoint can help customers reorder through the same retailer, marketplace, or brand store where they bought the product. Each sale should therefore do more than generate revenue: it should strengthen the channel’s ability to generate future sales.',
    ],
    refrain: 'Channels generate sales. Sales should strengthen channels.',
  },
  {
    number: '03',
    title: 'Intelligence Begins Where the Product Is Consumed.',
    subtitle: '',
    paragraphs: [
      'A sale tells a brand what was bought. The deeper understanding comes from what happens next: how the product fits into a household’s routines, what people need from it, and when they need it again.',
      'By staying connected where the product is consumed, a brand can learn from those experiences and show care in ways that matter—making everyday life easier and giving customers a reason to return.',
    ],
  },
  {
    number: '04',
    title: 'Reorder in 10 Seconds, Without Being Hijacked.',
    subtitle: '',
    paragraphs: [
      'The customer has already chosen the product. They should not have to search for it again, scroll past competing ads, or be redirected on the way to reorder. And the brand should not have to pay for advertising to reach a customer it has already earned.',
      'Hommio should take the customer straight from the home back to the original selling channel—whether a brand store, retailer, or marketplace. The goal is to make reordering possible in 10 seconds, without search engines or advertising systems getting in the way.',
      'The channel may still charge its normal selling fees. But the customer’s decision to return should not be an opportunity for someone else to charge the brand for their attention.',
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
      <a href="/dtcbrands" onClick={closeMenu}>For DTC Brands</a>
      <a href="/amazonbrands" onClick={closeMenu}>For Amazon Brands</a>
      <a href="/philosophy" aria-current="page" onClick={closeMenu}>Our Philosophy</a>
    </nav>
    <a className="g-header-button g-header-button--blue philosophy-header-cta" href="/#talk-to-us">Talk to Hommio</a>
  </div></header>
}

export default function Philosophy() {
  return <div className="givingli-site philosophy-page">
    <Header/>
    <main>
      <section className="philosophy-hero">
        <span className="philosophy-kicker">Declaration</span>
        <h1>Retention<br/><em>is at home.</em></h1>
        <a className="philosophy-scroll" href="#principles">Explore the principles <ArrowDown size={15}/></a>
      </section>
      <section className="philosophy-principles" id="principles" aria-label="Retention principles">
        {principles.map(item => <article className="philosophy-principle" key={item.number}>
          <div className="philosophy-principle__marker"><span>{item.number}</span><i/></div>
          <div className="philosophy-principle__content">
            <span className="philosophy-principle__eyebrow">Principle</span>
            <h2>{item.title}</h2>
            {item.subtitle && <h3>{item.subtitle}</h3>}
            {item.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
            {item.quote && <blockquote>{item.quote}</blockquote>}
            {item.refrain && <p className="philosophy-refrain">{item.refrain}</p>}
          </div>
        </article>)}
      </section>
    </main>
    <SiteFooter/>
  </div>
}
