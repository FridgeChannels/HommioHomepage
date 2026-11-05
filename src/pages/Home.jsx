import SiteFooter from '../components/SiteFooter.jsx'
import { useState } from 'react'
import { ArrowDown, ArrowRight, ArrowUpRight, ChevronDown, Menu, Play, X } from 'lucide-react'
import { Button, Card, SectionHeading } from '../../components/ui'
import './home.css'

const faqs = [
  { question: 'What is a Reorder Magnet?', answer: 'A branded magnet customers keep at home and tap with their phone to reach your products, content, or reorder options. It is one part of the Hommio solution, not the whole solution.' },
  { question: 'Is Hommio just the magnet?', answer: 'No. Hommio combines deployment planning, the physical Reorder Magnet, and in-home retention intelligence to help your brand stay connected with customers between purchases.' },
  { question: 'Where can a tap take customers?', answer: 'Customers can open product pages, useful content, surveys, or reorder options. When they are ready to buy, the experience can take them to your DTC store or Amazon Brand Store.' },
  { question: 'Can the digital experience be updated?', answer: 'Yes. The experience can change as you learn, without replacing the magnet.' },
  { question: 'How does Hommio personalize the experience?', answer: 'With customer permission and available data, Hommio uses shared preferences, interactions, and reorder habits to help personalize products, content, and reorder options.' },
  { question: 'How much does it cost?', answer: 'Pricing consists of volume-based product pricing, applicable design fees, and performance-based commissions. Visit Pricing & ROI Calculator to explore the pricing and estimate a scenario for your brand.' },
]

const scenarios = [
  { number: '01', title: 'Ongoing in-home retention', description: 'Make a Reorder Magnet part of your ongoing retention strategy. Keep your brand within reach between purchases and give customers an easy way back.', icon: '⌂' },
  { number: '02', title: 'Seasonal gifts and promotions', description: 'Add a branded Reorder Magnet to seasonal gifts or promotional bundles. Give customers something to keep after the occasion is over.', icon: '✳' },
  { number: '03', title: 'Product sampling and launches', description: 'Pair samples or new products with a Reorder Magnet so customers can find product information, share feedback, or return to buy.', icon: '↗' },
  { number: '04', title: 'Loyalty and member programs', description: 'Include a Reorder Magnet in your member welcome kit or loyalty gifts. Give your customers a lasting connection to your brand at home.', icon: '♡' },
]

function Brand({ footer = false }) {
  return <a className={`home-brand ${footer ? 'home-brand--footer' : ''}`} href="#home" aria-label="Hommio home"><span className="home-brand__crop"><img src="/assets/hommio-logo.png" alt="" /></span></a>
}

function MagnetScene({ showCaption = false }) {
  return <div className="magnet-scene" aria-label="A Reorder Magnet at home beside a phone">
    <div className="scene-sun"/><div className="scene-counter"/><div className="scene-tile scene-tile--one"/><div className="scene-tile scene-tile--two"/>
    <div className="magnet-object"><div className="magnet-object__shine"/><div className="magnet-object__leaf leaf-one"/><div className="magnet-object__leaf leaf-two"/><div className="magnet-object__leaf leaf-three"/><div className="magnet-object__brand">Hommio</div><div className="magnet-object__line"/></div>
    <div className="phone-object"><div className="phone-object__speaker"/><div className="phone-object__screen"><span className="phone-object__dot"><img src="/assets/hommio-h-mark.png" alt=""/></span><i/><i/><b/><small/></div></div>
    {showCaption && <div className="scene-caption"><span className="scene-caption__play"><Play size={13} fill="currentColor"/></span><span>Product features video</span></div>}
  </div>
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  return <div className="home-page">
    <header className="home-header">
      <div className="home-header__inner"><Brand/><button className="mobile-menu-toggle" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(v => !v)}>{menuOpen ? <X size={21}/> : <Menu size={21}/>}</button>
        <nav className={`home-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
          <a href="#home" onClick={closeMenu}>Hommio</a>
          <div className="nav-solutions"><a href="#solutions" onClick={closeMenu}>Solutions <ChevronDown size={13}/></a><div className="solutions-menu"><a href="/dtcbrands">For DTC Brands <ArrowUpRight size={14}/></a><a href="#amazon">For Amazon Brands <ArrowUpRight size={14}/></a></div></div>
          <a href="#pricing" onClick={closeMenu}>Pricing &amp; ROI Calculator</a>
          <a href="#philosophy" onClick={closeMenu}>Retention Philosophy</a>
          <a className="mobile-nav-cta" href="#talk-to-hommio" onClick={closeMenu}>Talk to Hommio</a>
        </nav>
        <Button className="header-cta" size="sm" onClick={() => document.querySelector('#talk-to-hommio')?.scrollIntoView({ behavior: 'smooth' })}>Talk to Hommio</Button>
      </div>
    </header>

    <main>
      <section className="home-hero" id="home">
        <div className="hero-inner">
          <div className="hero-copy"><h1>Retention<br/><em>is at home.</em></h1><h2>In-home retention solution for CPG brands.</h2><p>Hommio helps customers remember your brand and buy from you again. We plan how to reach the right households, create a Reorder Magnet they can keep at home, and personalize what happens when they tap.</p><div className="hero-actions"><Button size="lg" onClick={() => document.querySelector('#talk-to-hommio')?.scrollIntoView({ behavior: 'smooth' })}>Talk to Hommio</Button><a className="button-secondary" href="#talk-to-hommio">Request a Reorder Magnet</a></div></div>
          <div className="hero-art"><div className="hero-art__halo"/><div className="hero-art__orbit hero-art__orbit--a"/><div className="hero-art__orbit hero-art__orbit--b"/><MagnetScene/></div>
        </div>
        <a className="scroll-cue" href="#product-video"><ArrowDown size={14}/></a>
      </section>

      <section className="video-section section-shell" id="product-video"><div className="video-heading"><h2>Product features video</h2></div><MagnetScene showCaption/></section>

      <section className="fit-section section-shell" id="solutions"><div className="section-heading-row"><SectionHeading eyebrow="Find your fit" title="Built around how your customers buy." description="Help customers return to your DTC store or Amazon Brand Store with a Reorder Magnet designed around your brand and sales channels."/></div>
        <div className="fit-grid">
          <Card className="fit-card fit-card--dtc" id="dtc" tone="paper"><div className="fit-card__visual fit-card__visual--dtc"><div className="fit-card__sun"/><div className="fit-card__magnet"><img src="/assets/hommio-h-mark.png" alt="" /><i/><i/></div><span className="fit-card__orbit"/></div><div className="fit-card__body"><span className="fit-card__eyebrow">For DTC Brands <span>01</span></span><h3>A way back to your DTC store.</h3><p>Include a Reorder Magnet with your customers’ orders. Give them a simple way to return to your products, content, or reorder page when they need it.</p><a href="#talk-to-hommio">Explore Hommio for DTC Brands <ArrowRight size={15}/></a></div></Card>
          <Card className="fit-card fit-card--amazon" id="amazon" tone="paper"><div className="fit-card__visual fit-card__visual--amazon"><div className="amazon-box"><span>a</span><i/><i/><i/></div><div className="fit-card__magnet fit-card__magnet--blue"><img src="/assets/hommio-h-mark.png" alt="" /><i/><i/></div><span className="fit-card__orbit"/></div><div className="fit-card__body"><span className="fit-card__eyebrow">For Amazon Brands <span>02</span></span><h3>A way back to your Amazon Brand Store.</h3><p>Give customers a direct route from their home to your Amazon Brand Store—without starting with another search.</p><a href="#talk-to-hommio">Explore Hommio for Amazon Brands <ArrowRight size={15}/></a></div></Card>
        </div>
      </section>

      <section className="scenario-section section-shell" id="use-cases"><div className="scenario-top"><SectionHeading title="What scenario to use Hommio?"/><a className="scenario-pricing" id="pricing" href="#pricing">Explore Pricing &amp; ROI Calculator <ArrowUpRight size={15}/></a></div><div className="scenario-grid">{scenarios.map(item => <article className="scenario-item" key={item.number}><div className="scenario-item__top"><span>{item.number}</span><b>{item.icon}</b></div><h3>{item.title}</h3><p>{item.description}</p></article>)}</div></section>

      <section className="philosophy-section section-shell" id="philosophy"><div className="philosophy-intro"><h2>Why retention<br/>is <em>at home.</em></h2><a href="#talk-to-hommio">Explore Our Retention Philosophy <ArrowRight size={15}/></a></div><div className="philosophy-list"><article><span>01</span><div><h3>Brands Must Be Ambient.</h3></div><i>↗</i></article><article><span>02</span><div><h3>Every Sale Strengthens the Channel.</h3></div><i>↗</i></article><article><span>03</span><div><h3>Intelligence Begins Where the Product Is Consumed.</h3></div><i>↗</i></article></div><div className="philosophy-orb"><div className="philosophy-orb__inner"><img src="/assets/hommio-h-mark.png" alt=""/><small>Hommio</small></div></div></section>

      <section className="faq-section section-shell" id="faq"><div className="faq-intro"><h2>FAQ</h2><a href="#talk-to-hommio">Talk to Hommio <ArrowRight size={15}/></a></div><div className="faq-list">{faqs.map(faq => <details className="faq-item" key={faq.question}><summary><span>{faq.question}</span><i/></summary><p>{faq.answer}</p></details>)}</div></section>

      <section className="contact-section" id="talk-to-hommio"><div className="contact-shape contact-shape--one"/><div className="contact-shape contact-shape--two"/><div className="contact-inner"><h2>Bring Hommio to your<br/>customers’ homes.</h2><p>Let’s build a deployment plan, Reorder Magnet, and personalized experience around your brand.</p><div className="contact-actions"><a className="contact-button" href="#footer">Talk to Hommio</a><a className="contact-link" href="#footer">Request a Reorder Magnet</a></div></div></section>
    </main>

    <SiteFooter/>
  </div>
}

export default Home
