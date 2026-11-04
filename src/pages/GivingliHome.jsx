import SiteFooter from '../components/SiteFooter.jsx'
import { useEffect, useState } from 'react'
import { ArrowRight, ChevronDown, X } from 'lucide-react'
import './givingli-home.css'

const root = 'https://givingli.com'
const img = (path) => `${root}${path}`


const channelFit = [
  { id: 'dtc', title: 'A way back to your DTC store', copy: 'Include a Reorder Magnet with your customers’ orders. Give them a simple way to return to your products, content, or reorder page when they need it.', cta: 'Explore Hommio for DTC Brands', href: 'https://app.notion.com/p/DTC-40e9166fd9fd80338d73d17c239779df?pvs=21', icon: '/assets/dtc-online-store.svg' },
  { id: 'amazon', title: 'A way back to your Amazon Brand Store', copy: 'Give customers a direct route from their home to your Amazon Brand Store—without starting with another search.', cta: 'Explore Hommio for Amazon Brands', href: 'https://app.notion.com/p/Amazon-40e9166fd9fd803f8f2bfa3c794f5c41?pvs=21', icon: '/assets/amazon-logo-squid-ink-smile-orange.png' },
]

const scenarios = [
  { title: 'Ongoing in-home retention', copy: 'Make a Reorder Magnet part of your ongoing retention strategy. Keep your brand within reach between purchases and give customers an easy way back.', image: '/assets/scenarios/golden-star-snowy-peaks.png', alt: 'A golden star above snowy mountain peaks', width: 1086, height: 1448 },
  { title: 'Seasonal gifts and promotions', copy: 'Add a branded Reorder Magnet to seasonal gifts or promotional bundles. Give customers something to keep after the occasion is over.', image: '/assets/scenarios/christmas-gift-box.png', alt: 'A Christmas gift box with a golden bow', width: 1083, height: 1452 },
  { title: 'Product sampling and launches', copy: 'Pair samples or new products with a Reorder Magnet so customers can find product information, share feedback, or return to buy.', image: '/assets/scenarios/new-product-poster.png', alt: 'A new product announcement revealed through torn paper', width: 1122, height: 1402 },
  { title: 'Engagement and member programs', copy: 'Include a Reorder Magnet in your member welcome kit or engagement gifts. Give your customers a lasting connection to your brand at home.', image: '/assets/scenarios/membership-card.png', alt: 'Hands exchanging a membership card', width: 1124, height: 1399 },
]

const faqs = [
  ['What is a Reorder Magnet?', 'A branded magnet customers keep at home and tap with their phone to reach your products, content, or reorder options. It is one part of the Hommio solution, not the whole solution.'],
  ['Is Hommio just the magnet?', 'No. Hommio combines deployment planning, the physical Reorder Magnet, and in-home retention intelligence to help your brand stay connected with customers between purchases.'],
  ['Where can a tap take customers?', 'Customers can open product pages, useful content, surveys, or reorder options. When they are ready to buy, the experience can take them to your DTC store or Amazon Brand Store.'],
  ['Can the digital experience be updated?', 'Yes. The experience can change as you learn, without replacing the magnet.'],
  ['How does Hommio personalize the experience?', 'With customer permission and available data, Hommio uses shared preferences, interactions, and reorder habits to help personalize products, content, and reorder options.'],
  ['How much does it cost?', 'Pricing consists of volume-based product pricing, applicable design fees, and performance-based commissions. Visit Pricing & ROI Calculator to explore the pricing and estimate a scenario for your brand.'],
]

function GLogo({ footer = false }) {
  return <a className={`g-logo ${footer ? 'g-logo--footer' : ''}`} href="/" aria-label="Hommio home"><span className="g-logo__crop"><img src="/assets/hommio-logo.png" alt="Hommio" /></span></a>
}

function Header({ onTalk }) {
  return <header className="g-header"><div className="g-header__inner">
    <div className="g-header__brand"><GLogo/></div>
    <nav className="g-nav" aria-label="Main navigation"><a href="#top">Hommio</a><div className="g-nav__item"><a href="#solutions">Solutions <ChevronDown size={13}/></a><div className="g-nav__menu"><a href="#dtc">For DTC Brands</a><a href="#amazon">For Amazon Brands</a></div></div><a href="https://app.notion.com/p/Pricing-ROI-Calculator-40e9166fd9fd800d832fe88c51cb3236?pvs=21" target="_blank" rel="noreferrer">Pricing &amp; ROI Calculator</a><a href="/philosophy">Retention Philosophy</a></nav>
    <div className="g-header__actions"><button className="g-header-button g-header-button--blue" onClick={onTalk}>Talk to Hommio</button></div>
  </div></header>
}

function Hero({ onTalk, onSampleRequest }) {
  const [activeFloat, setActiveFloat] = useState(0)
  const floatSlides = [
    ['/images/business-gifting/hero/Starbucks.png', "/images/business-gifting/hero/let's%20grab%20coffee.png"],
    ['/images/business-gifting/hero/Sephora.png', '/images/business-gifting/hero/can%27t%20thank%20you%20enough.png'],
    ['/images/business-gifting/hero/Target.png', '/images/business-gifting/hero/congratulation.png'],
    ['/images/business-gifting/hero/Nike.png', '/images/business-gifting/hero/hey%2C%20thanks.png'],
    ['/images/business-gifting/hero/Doordash.png', '/images/business-gifting/hero/treat%20on%20me.png'],
    ['/images/business-gifting/hero/Dunkin%E2%80%99.png', '/images/business-gifting/hero/best%20boss.png'],
    ['/images/business-gifting/hero/Best%20Buy.png', '/images/business-gifting/hero/well%20done.png'],
    ['/images/business-gifting/hero/Delta.png', "/images/business-gifting/hero/you're%20going%20places.png"],
  ]
  useEffect(() => {
    const timer = window.setInterval(() => setActiveFloat(index => (index + 1) % floatSlides.length), 3200)
    return () => window.clearInterval(timer)
  }, [])
  return <section className="g-hero" id="top">
    <div className="g-hero__title"><h1>Retention<br/><span>is at home</span></h1><h2>In-home retention solution for CPG brands</h2><p>Hommio helps customers remember your brand and buy from you again. We plan how to reach the right households, create a Reorder Magnet they can keep at home, and personalize what happens when they tap.</p><div className="g-hero__actions"><button onClick={onTalk}>Talk to Hommio</button><a href="#request-sample" onClick={event => { event.preventDefault(); onSampleRequest() }}>Request a Reorder Magnet</a></div></div>
    <div className="g-hero__objects" aria-hidden="true"><div className="g-hero__glow"/><img className="g-hero-float g-hero-float--left" src={img(floatSlides[activeFloat][0])} alt=""/><img className="g-hero-float g-hero-float--right" src={img(floatSlides[activeFloat][1])} alt=""/></div>
  </section>
}

function Solutions() {
  return <section className="g-solutions" id="solutions"><div className="g-solutions__inner"><span>find your fit</span><h2>Built around how your customers buy</h2><p>Help customers return to your DTC store or Amazon Brand Store with a Reorder Magnet designed around your brand and sales channels.</p><div className="g-solution-grid g-solution-grid--channels">{channelFit.map(item => <article className="g-solution-card" id={item.id} key={item.id}><div className="g-solution-card__icon"><img className={`g-solution-card__logo g-solution-card__logo--${item.id}`} src={item.icon} alt="" aria-hidden="true"/></div><h3>{item.title}</h3><p>{item.copy}</p><a href={item.href} target="_blank" rel="noreferrer">{item.cta} <ArrowRight size={18}/></a></article>)}</div></div></section>
}

function RetentionPhilosophy() {
  return <section className="g-philosophy" id="retention-philosophy"><div className="g-philosophy__intro"><h2>why retention is at home</h2></div><div className="g-philosophy__principles"><article><span>01</span><h3>Brands Must Be Ambient</h3></article><article><span>02</span><h3>Every Sale Strengthens the Channel</h3></article><article><span>03</span><h3>Intelligence Begins Where the Product Is Consumed</h3></article></div><a className="g-philosophy__link" href="/philosophy">Explore Our Retention Philosophy</a></section>
}

function FAQ() {
  return <section className="g-faq" id="faq"><div className="g-faq__intro"><span>frequently asked questions</span></div><div className="g-faq__list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section>
}

function CustomCard() {
  return <section className="g-custom-card g-custom-card--video"><video className="g-custom-card__video" controls playsInline preload="metadata" aria-label="Hommio Reorder Magnet video"><source src="/assets/hommio-homepage-video.mp4" type="video/mp4"/>Your browser does not support the video element.</video></section>
}

function ScenarioSection() {
  return <section className="g-how" id="scenarios">
    <div className="g-section-intro"><h2>What secnario to use Hommio ?</h2></div>
    <div className="g-step-grid">
      {scenarios.map(({ title, copy, image, alt, width, height }) => <article className="g-scenario-item" key={title}>
        <img className="g-scenario-art" src={image} alt={alt} width={width} height={height} loading="lazy" decoding="async"/>
        <div className="g-scenario-copy"><h3>{title}</h3><p>{copy}</p></div>
      </article>)}
    </div>
  </section>
}

function ContactSection({ onTalk, onSampleRequest }) {
  return <section className="g-contact" id="talk-to-us"><div className="g-contact__intro"><h2>Bring Hommio to your customers’ homes</h2><p>Let’s build a deployment plan, Reorder Magnet, and personalized experience around your brand.</p><div className="g-hero__actions"><button onClick={onTalk}>Talk to Hommio</button><a href="#request-sample" onClick={event => { event.preventDefault(); onSampleRequest() }}>Request a Reorder Magnet</a></div></div></section>
}

function ReorderMagnetForm({ open, onClose }) {
  const [channel, setChannel] = useState('')
  const [fullName, setFullName] = useState('')
  const [recipientName, setRecipientName] = useState('')
  const [recipientNameEdited, setRecipientNameEdited] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    const handleKeyDown = event => {
      if (event.key === 'Escape') onClose()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)
    document.getElementById('request-full-name')?.focus()
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, onClose])

  if (!open) return null

  const showDtc = channel === 'dtc' || channel === 'both'
  const showAmazon = channel === 'amazon' || channel === 'both'
  const showOther = channel === 'other'
  const handleSubmit = event => {
    event.preventDefault()
    setSubmitted(true)
  }
  const field = (id, label, options = {}) => (
    <div className={`g-contact-form__field g-request-form__field${options.full ? ' g-request-form__field--full' : ''}`}>
      <label htmlFor={id}>{label}{options.required && <> <b>*</b></>}</label>
      <input id={id} type={options.type || 'text'} placeholder={options.placeholder || ''} autoComplete={options.autoComplete} required={options.required} value={options.value} onChange={options.onChange}/>
      {options.hint && <small>{options.hint}</small>}
    </div>
  )

  return <div className="g-request-modal" role="presentation" onMouseDown={event => { if (event.target === event.currentTarget) onClose() }}>
    <section className="g-request-dialog" role="dialog" aria-modal="true" aria-labelledby="request-sample-title">
      <button className="g-request-dialog__close" type="button" onClick={onClose} aria-label="Close sample request"><X size={19}/></button>
      <form className="g-contact-form g-request-form" onSubmit={handleSubmit}>
        <blockquote><p id="request-sample-title">Experience a Reorder Magnet for yourself. Tell us about your brand and where you’d like us to send it.</p></blockquote>

        <section className="g-request-form__section" aria-labelledby="request-about-title">
          <h3 id="request-about-title">About you</h3>
          <div className="g-request-form__grid">
            {field('request-full-name', 'Full name', { required: true, autoComplete: 'name', value: fullName, onChange: event => { setFullName(event.target.value); setSubmitted(false) } })}
            {field('request-work-email', 'Work email', { required: true, type: 'email', autoComplete: 'email', placeholder: 'you@brand.com', onChange: () => setSubmitted(false) })}
            {field('request-brand-name', 'Brand / company name', { required: true, autoComplete: 'organization', value: undefined, onChange: () => setSubmitted(false) })}
            <div className="g-contact-form__field g-request-form__field g-request-form__field--full">
              <label htmlFor="request-channel">Which channel would you like to explore? <b>*</b></label>
              <select id="request-channel" required value={channel} onChange={event => { setChannel(event.target.value); setSubmitted(false) }}>
                <option value="" disabled>Select a channel</option>
                <option value="dtc">DTC / Our own online store</option>
                <option value="amazon">Amazon</option>
                <option value="both">Both DTC and Amazon</option>
                <option value="other">Other / Not sure yet</option>
              </select>
            </div>
          </div>
        </section>

        <section className="g-request-form__section" aria-labelledby="request-brand-title">
          <h3 id="request-brand-title">Your brand</h3>
          <p className="g-request-form__hint">Fields shown here depend on the channel you selected.</p>
          <div className="g-request-form__grid">
            {showDtc && field('request-dtc-url', 'DTC store URL', { required: true, type: 'url', autoComplete: 'url', placeholder: 'https://', full: true, onChange: () => setSubmitted(false) })}
            {showAmazon && field('request-amazon-url', 'Amazon product or Brand Store URL', { required: true, placeholder: 'URL or ASIN with marketplace', full: true, hint: 'An ASIN with its marketplace is also accepted.', onChange: () => setSubmitted(false) })}
            {showOther && field('request-brand-url', 'Brand website or store URL (Optional)', { type: 'url', autoComplete: 'url', placeholder: 'https://', full: true, onChange: () => setSubmitted(false) })}
            {!channel && <p className="g-request-form__hint g-request-form__field--full">Choose a channel to see the matching URL fields.</p>}
          </div>
        </section>

        <section className="g-request-form__section" aria-labelledby="request-shipping-title">
          <h3 id="request-shipping-title">Shipping details</h3>
          <div className="g-request-form__grid">
            {field('request-recipient-name', 'Recipient name', { required: true, autoComplete: 'shipping name', value: recipientNameEdited ? recipientName : fullName, onChange: event => { setRecipientName(event.target.value); setRecipientNameEdited(true); setSubmitted(false) }, hint: 'Uses your full name by default. You can change it for delivery.' })}
            {field('request-country', 'Country / region', { required: true, autoComplete: 'shipping country-name', onChange: () => setSubmitted(false) })}
            {field('request-street-address', 'Street address', { required: true, autoComplete: 'shipping address-line1', full: true, onChange: () => setSubmitted(false) })}
            {field('request-apartment', 'Apartment, suite, or unit (Optional)', { autoComplete: 'shipping address-line2', full: true })}
            {field('request-city', 'City', { required: true, autoComplete: 'shipping address-level2', onChange: () => setSubmitted(false) })}
            {field('request-state', 'State / province / region', { autoComplete: 'shipping address-level1', hint: 'Required only where applicable to the destination.' })}
            {field('request-postal-code', 'ZIP / postal code', { autoComplete: 'shipping postal-code', hint: 'Required only where applicable to the destination.' })}
            <details className="g-request-form__delivery-phone g-request-form__field--full">
              <summary>Delivery phone number <small>Only if required by the shipping carrier</small></summary>
              <div className="g-request-form__delivery-phone-body">
                <label htmlFor="request-delivery-phone">Delivery phone number</label>
                <input id="request-delivery-phone" type="tel" autoComplete="shipping tel"/>
                <small>We’ll ask only if required by the shipping carrier. Used for delivery purposes only.</small>
              </div>
            </details>
            <div className="g-contact-form__field g-request-form__field g-request-form__field--full">
              <label htmlFor="request-delivery-instructions">Delivery instructions (Optional)</label>
              <textarea id="request-delivery-instructions" rows="3" autoComplete="off"/>
            </div>
          </div>
        </section>

        {submitted && <p className="g-request-form__success" role="status">We’ll review your request and contact you about availability and shipping details.</p>}
        <button className="g-contact-form__submit" type="submit">Request a sample</button>
        <p className="g-request-form__privacy">We’ll use your details to review your request, arrange sample delivery, and follow up about your sample experience.</p>
      </form>
    </section>
  </div>
}

function ChatWidget() {
  const [open, setOpen] = useState(false)
  return <div className="g-chat"><button className="g-chat__toggle" onClick={() => setOpen(v => !v)} aria-label={open ? 'Close chat' : 'Open chat'}>{open ? <X size={22}/> : <img src="/assets/hommio-h-mark.png" alt="" aria-hidden="true"/>}</button>{open && <div className="g-chat__panel"><button className="g-chat__close" onClick={() => setOpen(false)} aria-label="Close chat"><X size={14}/></button><div className="g-chat__brand"><b>Hommio</b></div><p>What brings you here today?</p><a href="#talk-to-us">Talk to Hommio</a><small>Questions about in-home retention? Talk with Hommio.</small></div>}</div>
}

export default function Givingli() {
  const [sampleRequestOpen, setSampleRequestOpen] = useState(false)
  const jumpToTalk = () => document.getElementById('talk-to-us')?.scrollIntoView({ behavior: 'smooth' })
  const openSampleRequest = () => setSampleRequestOpen(true)
  const closeSampleRequest = () => setSampleRequestOpen(false)
  return <div className="givingli-site givingli-home-site"><Header onTalk={jumpToTalk}/><main><Hero onTalk={jumpToTalk} onSampleRequest={openSampleRequest}/><CustomCard/><Solutions/><ScenarioSection/><RetentionPhilosophy/><FAQ/><ContactSection onTalk={jumpToTalk} onSampleRequest={openSampleRequest}/></main><ReorderMagnetForm open={sampleRequestOpen} onClose={closeSampleRequest}/><SiteFooter/><ChatWidget/></div>
}
