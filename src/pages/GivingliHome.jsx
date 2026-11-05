import SiteFooter from '../components/SiteFooter.jsx'
import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Menu, X } from 'lucide-react'
import { sampleFieldNames, submitLeadAndBook } from '../lib/submitLead.js'
import { videos } from '../lib/videos.js'
import './givingli-home.css'

const root = 'https://givingli.com'
const img = (path) => `${root}${path}`


const channelFit = [
  { id: 'dtc', title: 'A way back to your DTC store', copy: 'Include a Reorder Magnet with your customers’ orders. Give them a simple way to return to your products, content, or reorder page when they need it.', cta: 'Explore Hommio for DTC Brands', href: '/dtcbrands', icon: '/assets/dtc-online-store-shopify-green.svg' },
  { id: 'amazon', title: 'A way back to your Amazon Brand Store', copy: 'Give customers a direct route from their home to your Amazon Brand Store—without starting with another search.', cta: 'Explore Hommio for Amazon Brands', href: 'https://app.notion.com/p/Amazon-40e9166fd9fd803f8f2bfa3c794f5c41?pvs=21', icon: '/assets/amazon-browser-package-icon.png' },
]

const scenarios = [
  { image: '/assets/scenarios/golden-star-snowy-peaks.png', alt: 'Boost Reorders and Subscriptions poster', width: 1086, height: 1448 },
  { image: '/assets/scenarios/christmas-gift-box.png', alt: 'Seasonal gifts and promotions poster', width: 1086, height: 1448 },
  { image: '/assets/scenarios/new-product-poster.png', alt: 'Product sampling and launches poster', width: 1086, height: 1448 },
  { image: '/assets/scenarios/membership-card.png', alt: 'Engagement and member programs poster', width: 1086, height: 1448 },
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
  return <a className={`g-logo ${footer ? 'g-logo--footer' : ''}`} href="/" aria-label="Hommio home"><span className="g-logo__crop"><img src="/assets/hommio-logo-transparent.png" alt="Hommio" /></span></a>
}

function Header({ onTalk }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  return <header className="g-header"><div className="g-header__inner">
    <div className="g-header__brand"><GLogo/></div>
    <nav className={`g-nav${menuOpen ? ' is-open' : ''}`} id="main-navigation" aria-label="Main navigation">
      <a href="#top" onClick={closeMenu}>Hommio</a>
      <a href="/dtcbrands" onClick={closeMenu}>For DTC Brands</a>
      <a href="/amazonbrands" onClick={closeMenu}>For Amazon Brands</a>
      <a href="/philosophy" onClick={closeMenu}>Our Philosophy</a>
    </nav>
    <div className="g-header__actions"><button className="g-header-button g-header-button--blue" onClick={() => { closeMenu(); onTalk() }}>Talk to Hommio</button><button className="g-header__menu-toggle" type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen(value => !value)}>{menuOpen ? <X size={20}/> : <Menu size={20}/>}</button></div>
  </div></header>
}

function HeroGiftStack({ media, position, index }) {
  const asset = media[index]
  const orientation = asset.type === 'image' ? 'g-hero-gift-stack--landscape' : 'g-hero-gift-stack--portrait'
  return <div role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${media.length}`} className={`g-hero-gift-stack g-hero-gift-stack--${position} ${orientation}`}>
    {asset.type === 'video'
      ? <video className="g-hero-float" src={asset.src} autoPlay muted loop playsInline aria-label={asset.alt}/>
      : <img className="g-hero-float" src={asset.src} alt={asset.alt} loading="eager" decoding="async"/>}
  </div>
}

function Hero({ onTalk, onSampleRequest }) {
  const heroMedia = [
    { src: videos.dogChoice, type: 'video', alt: 'Dog choosing a Hommio reorder magnet' },
    { src: '/assets/home-hero/hero-frame-2.png', type: 'image', alt: 'Customer considering a product on a refrigerator magnet' },
    { src: '/assets/home-hero/fridge-scene.png', type: 'image', alt: 'Customer reaching into a refrigerator with a Hommio magnet nearby' },
    { src: '/assets/home-hero/dtc-who-we-serve.png', type: 'image', alt: 'Example DTC coffee brand magnet' },
  ]
  const positions = ['left', 'right', 'lower-left', 'lower-right']
  return <section className="g-hero" id="top">
    <div className="g-hero__title"><h1>Retention <span>is</span>{' '}<em>at home</em></h1><h2>In-home retention solution for CPG brands</h2><p>Hommio helps customers remember your brand and buy from you again. We plan how to reach the right households, create a Reorder Magnet they can keep at home, and personalize what happens when they tap.</p><div className="g-hero__actions"><button onClick={onTalk}>Talk to Hommio</button><a href="#request-sample" onClick={event => { event.preventDefault(); onSampleRequest() }}>Request a Sample</a></div></div>
    <div className="g-hero__objects" role="region" aria-label="Hommio in the home gallery"><div className="g-hero__glow" aria-hidden="true"/>{positions.map((position, index) => <HeroGiftStack key={position} position={position} index={index} media={heroMedia}/>)}</div>
  </section>
}

function Solutions() {
  return <section className="g-solutions" id="solutions"><div className="g-solutions__inner"><span>find your fit</span><h2>Built around how your customers buy</h2><p>Help customers return to your DTC store or Amazon Brand Store with a Reorder Magnet designed around your brand and sales channels.</p><div className="g-solution-grid g-solution-grid--channels">{channelFit.map(item => <article className="g-solution-card" id={item.id} key={item.id}><div className="g-solution-card__icon"><img className={`g-solution-card__logo g-solution-card__logo--${item.id}`} src={item.icon} alt="" aria-hidden="true"/></div><h3>{item.title}</h3><p>{item.copy}</p><a href={item.href} target={item.id === 'dtc' ? undefined : '_blank'} rel="noreferrer">{item.cta} <ArrowRight size={18}/></a></article>)}</div></div></section>
}

function RetentionPhilosophy() {
  return <section className="g-philosophy" id="retention-philosophy"><div className="g-philosophy__intro"><h2>why retention is at home</h2></div><div className="g-philosophy__principles"><article><span>01</span><h3>Brands Must Be Ambient</h3></article><article><span>02</span><h3>Every Sale Strengthens the Channel</h3></article><article><span>03</span><h3>Intelligence Begins Where the Product Is Consumed</h3></article></div><a className="g-philosophy__link" href="/philosophy">Explore Our Retention Philosophy</a></section>
}

function FAQ() {
  return <section className="g-faq" id="faq"><div className="g-faq__intro"><span>frequently asked questions</span></div><div className="g-faq__list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section>
}

function CustomCard() {
  return <section className="g-custom-card g-custom-card--video"><video className="g-custom-card__video" controls playsInline preload="metadata" aria-label="Hommio Reorder Magnet video"><source src={videos.homepage} type="video/mp4"/>Your browser does not support the video element.</video></section>
}

function ScenarioSection() {
  return <section className="g-how" id="scenarios">
    <div className="g-section-intro"><h2>What secnario to use Hommio ?</h2></div>
    <div className="g-step-grid">
      {scenarios.map(({ image, alt, width, height }) => <article className="g-scenario-item" key={image}>
        <div className="g-scenario-art-frame"><img className="g-scenario-art" src={image} alt={alt} width={width} height={height} loading="lazy" decoding="async"/></div>
      </article>)}
    </div>
  </section>
}

function ContactSection({ onTalk, onSampleRequest }) {
  return <section className="g-contact" id="talk-to-us"><div className="g-contact__intro"><h2>Start Driving Repeat Purchases from Your Customers’ Homes.</h2><p>Put a Reorder Magnet in your customers’ homes and give them a direct way back to your brand.</p><div className="g-hero__actions"><button onClick={onTalk}>Talk to Hommio</button><a href="#request-sample" onClick={event => { event.preventDefault(); onSampleRequest() }}>Request a Sample</a></div></div></section>
}

function ReorderMagnetForm({ open, onClose }) {
  const [channel, setChannel] = useState('')
  const [fullName, setFullName] = useState('')
  const [recipientName, setRecipientName] = useState('')
  const [recipientNameEdited, setRecipientNameEdited] = useState(false)
  const [status, setStatus] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [channelError, setChannelError] = useState(false)

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
  const handleSubmit = async event => {
    event.preventDefault()
    if (!channel) { setChannelError(true); document.getElementById('request-channel')?.focus(); return }
    setChannelError(false)
    setStatus('')
    setSubmitting(true)
    try {
      await submitLeadAndBook({ form: event.currentTarget, source: 'Request a Sample' })
    } catch (error) {
      setStatus(error.message)
      setSubmitting(false)
    }
  }
  const field = (id, label, options = {}) => (
    <div className={`g-contact-form__field g-request-form__field${options.full ? ' g-request-form__field--full' : ''}`}>
      <label htmlFor={id}>{label}{options.required && <> <b>*</b></>}</label>
      <input id={id} name={sampleFieldNames[id]} type={options.type || 'text'} placeholder={options.placeholder || ''} autoComplete={options.autoComplete} required={options.required} value={options.value} onChange={options.onChange}/>
      {options.hint && <small>{options.hint}</small>}
    </div>
  )

  return <div className="g-request-modal" role="presentation" onMouseDown={event => { if (event.target === event.currentTarget) onClose() }}>
    <section className="g-request-dialog" role="dialog" aria-modal="true" aria-labelledby="request-sample-title">
      <button className="g-request-dialog__close" type="button" onClick={onClose} aria-label="Close sample request"><X size={19}/></button>
      <form className="g-contact-form g-request-form" onSubmit={handleSubmit}>
        <blockquote><p id="request-sample-title">Request a Reorder Magnet sample for your brand.</p></blockquote>

        <section className="g-request-form__section" aria-labelledby="request-about-title">
          <h3 id="request-about-title">About you</h3>
          <div className="g-request-form__grid">
            {field('request-full-name', 'Full name', { required: true, autoComplete: 'name', value: fullName, onChange: event => { setFullName(event.target.value); setStatus('') } })}
            {field('request-work-email', 'Work email', { required: true, type: 'email', autoComplete: 'email', placeholder: 'you@brand.com', onChange: () => setStatus('') })}
            {field('request-brand-name', 'Brand / company name', { required: true, autoComplete: 'organization', value: undefined, onChange: () => setStatus('') })}
            <div className="g-contact-form__field g-request-form__field g-request-form__field--full">
              <label id="request-channel-label" htmlFor="request-channel">Which channel would you like to explore? <b>*</b></label>
              <FormSelect id="request-channel" name="channel" value={channel} onChange={value => { setChannel(value); setStatus(''); setChannelError(false) }} placeholder="Select a channel" options={[{ value: 'dtc', label: 'DTC / Our own online store' }, { value: 'amazon', label: 'Amazon' }, { value: 'both', label: 'Both DTC and Amazon' }, { value: 'other', label: 'Other / Not sure yet' }]}/>
              {channelError && <small className="g-request-form__select-error" role="alert">Please select a channel.</small>}
            </div>
          </div>
        </section>

        <section className="g-request-form__section" aria-labelledby="request-brand-title">
          <h3 id="request-brand-title">Your brand</h3>
          <div className="g-request-form__grid">
            {showDtc && field('request-dtc-url', 'DTC store URL', { required: true, type: 'url', autoComplete: 'url', placeholder: 'https://', full: true, onChange: () => setStatus('') })}
            {showAmazon && field('request-amazon-url', 'Amazon product or Brand Store URL', { required: true, placeholder: 'URL or ASIN with marketplace', full: true, hint: 'Use an ASIN with its marketplace.', onChange: () => setStatus('') })}
            {showOther && field('request-brand-url', 'Brand website or store URL', { type: 'url', autoComplete: 'url', placeholder: 'https://', full: true, onChange: () => setStatus('') })}
          </div>
        </section>

        <section className="g-request-form__section" aria-labelledby="request-shipping-title">
          <h3 id="request-shipping-title">Shipping details</h3>
          <div className="g-request-form__grid">
            {field('request-recipient-name', 'Recipient name', { required: true, autoComplete: 'shipping name', value: recipientNameEdited ? recipientName : fullName, onChange: event => { setRecipientName(event.target.value); setRecipientNameEdited(true); setStatus('') },  })}
            {field('request-country', 'Country / region', { required: true, autoComplete: 'shipping country-name', onChange: () => setStatus('') })}
            {field('request-street-address', 'Street address', { required: true, autoComplete: 'shipping address-line1', full: true, onChange: () => setStatus('') })}
            {field('request-apartment', 'Apartment, suite, or unit', { autoComplete: 'shipping address-line2', full: true })}
            {field('request-city', 'City', { required: true, autoComplete: 'shipping address-level2', onChange: () => setStatus('') })}
            {field('request-state', 'State / province / region', { autoComplete: 'shipping address-level1',  })}
            {field('request-postal-code', 'ZIP / postal code', { autoComplete: 'shipping postal-code',  })}
            {field('request-delivery-phone', 'Delivery phone number', { required: true, type: 'tel', autoComplete: 'shipping tel', full: true, onChange: () => setStatus('') })}
            <div className="g-contact-form__field g-request-form__field g-request-form__field--full">
              <label htmlFor="request-delivery-instructions">Delivery instructions</label>
              <textarea id="request-delivery-instructions" name="deliveryInstructions" rows="3" autoComplete="off"/>
            </div>
          </div>
        </section>

        {status && <p className="g-request-form__success" role="status">{status}</p>}
        <button className="g-contact-form__submit" type="submit" disabled={submitting}>{submitting ? 'Saving…' : 'Request a Sample'}</button>
      </form>
    </section>
  </div>
}

const improvementOptions = [
  'Higher repeat-purchase',
  'Higher subscription conversion rates',
  'Lower subscriber churn',
  'Increase average order value (AOV)',
  'Increase customer lifetime value (LTV)',
]

function FormSelect({ id, name, value, onChange, options, placeholder }) {
  const [open, setOpen] = useState(false)
  const buttonRef = useRef(null)
  const currentLabel = options.find(option => option.value === value)?.label || placeholder
  const selectOption = option => { onChange(option.value); setOpen(false); buttonRef.current?.focus() }
  return <div className="g-form-select">
    <button ref={buttonRef} id={id} className={`g-form-select__trigger${value ? '' : ' is-placeholder'}`} type="button" role="combobox" aria-haspopup="listbox" aria-expanded={open} aria-controls={`${id}-options`} aria-labelledby={`${id}-label ${id}-value`} onClick={() => setOpen(current => !current)} onKeyDown={event => {
      if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setOpen(true) }
      if (event.key === 'Escape') setOpen(false)
    }}>
      <span id={`${id}-value`}>{currentLabel}</span><i aria-hidden="true"/>
    </button>
    <input type="hidden" name={name} value={value}/>
    {open && <div className="g-form-select__menu" id={`${id}-options`} role="listbox" aria-labelledby={id}>
      {options.map(option => <button key={option.value} type="button" role="option" aria-selected={value === option.value} className={value === option.value ? 'is-selected' : ''} onClick={() => selectOption(option)}>{option.label}</button>)}
    </div>}
  </div>
}

function TalkToHommioForm({ open, onClose }) {
  const [channel, setChannel] = useState('')
  const [improvements, setImprovements] = useState([])
  const [status, setStatus] = useState('')
  const [submitting, setSubmitting] = useState(false)
  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    const closeOnEscape = event => { if (event.key === 'Escape') onClose() }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', closeOnEscape)
    document.getElementById('talk-full-name')?.focus()
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [open, onClose])
  if (!open) return null
  const showDtc = channel === 'dtc' || channel === 'both'
  const showAmazon = channel === 'amazon' || channel === 'both'
  const showOther = channel === 'other'
  const toggleImprovement = value => {
    setImprovements(current => current.includes(value)
      ? current.filter(item => item !== value)
      : current.length < 2 ? [...current, value] : current)
  }
  const handleSubmit = async event => {
    event.preventDefault()
    if (!channel) { setStatus('Select a channel to continue.'); return }
    if (!improvements.length) { setStatus('Choose at least one improvement area.'); return }
    setStatus('')
    setSubmitting(true)
    try {
      await submitLeadAndBook({ form: event.currentTarget, source: 'Talk to Hommio' })
    } catch (error) {
      setStatus(error.message)
      setSubmitting(false)
    }
  }
  return <div className="g-request-modal" role="presentation" onMouseDown={event => { if (event.target === event.currentTarget) onClose() }}>
    <section className="g-request-dialog g-talk-dialog" role="dialog" aria-modal="true" aria-labelledby="talk-form-title">
      <button className="g-request-dialog__close" type="button" onClick={onClose} aria-label="Close form"><X size={19}/></button>
      <form className="g-contact-form g-request-form" onSubmit={handleSubmit}>
        <header className="g-talk-form__header"><h2 id="talk-form-title">Talk to Hommio</h2><p>Share a few details so we can tailor our conversation.</p></header>
        <section className="g-request-form__section" aria-labelledby="talk-about-title">
          <h3 id="talk-about-title">About you</h3><div className="g-request-form__grid">
            <div className="g-contact-form__field g-request-form__field"><label htmlFor="talk-full-name">Full name <b>*</b></label><input id="talk-full-name" name="fullName" autoComplete="name" required/></div>
            <div className="g-contact-form__field g-request-form__field"><label htmlFor="talk-work-email">Work email <b>*</b></label><input id="talk-work-email" name="workEmail" type="email" autoComplete="email" required/></div>
            <div className="g-contact-form__field g-request-form__field"><label htmlFor="talk-brand-name">Brand / company name <b>*</b></label><input id="talk-brand-name" name="brandName" autoComplete="organization" required/></div>
            <div className="g-contact-form__field g-request-form__field"><label htmlFor="talk-phone">Phone number <b>*</b></label><input id="talk-phone" name="phoneNumber" type="tel" autoComplete="tel" required/></div>
            <div className="g-contact-form__field g-request-form__field g-request-form__field--full"><label id="talk-channel-label" htmlFor="talk-channel">Which channel would you like to explore? <b>*</b></label><FormSelect id="talk-channel" name="channel" value={channel} onChange={value => { setChannel(value); setStatus('') }} placeholder="Select a channel" options={[{ value: 'dtc', label: 'DTC / Our own online store' }, { value: 'amazon', label: 'Amazon' }, { value: 'both', label: 'Both DTC and Amazon' }, { value: 'other', label: 'Other / Not sure yet' }]}/></div>
            <fieldset className="g-talk-form__goals g-request-form__field--full"><legend>What would you most like to improve? <b>*</b></legend><p>Choose up to two.</p><div className="g-checkboxes">{improvementOptions.map(option => <label key={option}><input type="checkbox" name="improvements" value={option} checked={improvements.includes(option)} disabled={improvements.length >= 2 && !improvements.includes(option)} onChange={() => { toggleImprovement(option); setStatus('') }}/><span>{option}</span></label>)}</div></fieldset>
          </div>
        </section>
        {showDtc && <section className="g-request-form__section"><h3>DTC</h3><div className="g-request-form__grid">
          <div className="g-contact-form__field g-request-form__field g-request-form__field--full"><label htmlFor="talk-dtc-url">Your online store URL <b>*</b></label><input id="talk-dtc-url" name="dtcUrl" type="url" placeholder="https://" required/></div>
          <div className="g-contact-form__field g-request-form__field g-request-form__field--full"><label htmlFor="talk-dtc-orders">Approximately how many DTC orders do you receive each month?</label><small>Exclude canceled or refunded orders; estimates are fine.</small><select id="talk-dtc-orders" name="dtcMonthlyOrders"><option value="">Choose an estimate</option><option>Fewer than 1,000</option><option>1,000–4,999</option><option>5,000–9,999</option><option>10,000 or more</option><option>Not sure / Prefer to discuss</option></select></div>
          <div className="g-contact-form__field g-request-form__field g-request-form__field--full"><label htmlFor="talk-dtc-aov">What is your net average order value in USD?</label><small>After discounts and refunds; exclude tax and shipping.</small><input id="talk-dtc-aov" name="dtcAov" type="number" min="0" step="0.01" placeholder="USD"/></div>
        </div></section>}
        {showAmazon && <section className="g-request-form__section"><h3>Amazon</h3><div className="g-request-form__grid">
          <div className="g-contact-form__field g-request-form__field g-request-form__field--full"><label htmlFor="talk-amazon-product">Link to one Amazon product you would like to focus on <b>*</b></label><small>Use one product URL or ASIN + marketplace. Keep the same ASIN below.</small><input id="talk-amazon-product" name="amazonProduct" required placeholder="Product URL or ASIN + marketplace"/></div>
          <div className="g-contact-form__field g-request-form__field g-request-form__field--full"><label htmlFor="talk-amazon-units">Approximately how many units does this ASIN sell each month?</label><small>For this ASIN only.</small><select id="talk-amazon-units" name="amazonMonthlyUnits"><option value="">Choose an estimate</option><option>Fewer than 1,000</option><option>1,000–4,999</option><option>5,000–9,999</option><option>10,000 or more</option><option>Not sure / Prefer to discuss</option></select></div>
          <div className="g-contact-form__field g-request-form__field g-request-form__field--full"><label htmlFor="talk-amazon-price">What is this ASIN’s usual selling price in USD?</label><small>Usual unit price, not list price. Include currency code if not USD.</small><input id="talk-amazon-price" name="amazonPrice" placeholder="USD"/></div>
        </div></section>}
        {showOther && <section className="g-request-form__section"><h3>Other channels</h3><div className="g-request-form__grid"><div className="g-contact-form__field g-request-form__field g-request-form__field--full"><label htmlFor="talk-other-url">Brand website or store URL</label><input id="talk-other-url" name="otherUrl" type="url" placeholder="https://"/></div></div></section>}
        <section className="g-request-form__section"><h3>Anything else?</h3><div className="g-request-form__grid"><div className="g-contact-form__field g-request-form__field g-request-form__field--full"><label htmlFor="talk-notes">Is there anything you’d like us to know before we meet?</label><textarea id="talk-notes" name="notes" rows="4"/></div></div></section>
        {status && <p className="g-request-form__success" role="status">{status}</p>}
        <button className="g-contact-form__submit" type="submit" disabled={submitting}>{submitting ? 'Saving…' : 'Next'}</button>
      </form>
    </section>
  </div>
}

export default function Givingli() {
  const [sampleRequestOpen, setSampleRequestOpen] = useState(false)
  const [talkFormOpen, setTalkFormOpen] = useState(false)
  const openTalkForm = () => setTalkFormOpen(true)
  const closeTalkForm = () => setTalkFormOpen(false)
  const openSampleRequest = () => setSampleRequestOpen(true)
  const closeSampleRequest = () => setSampleRequestOpen(false)
  return <div className="givingli-site givingli-home-site"><Header onTalk={openTalkForm}/><main><Hero onTalk={openTalkForm} onSampleRequest={openSampleRequest}/><CustomCard/><Solutions/><ScenarioSection/><RetentionPhilosophy/><FAQ/><ContactSection onTalk={openTalkForm} onSampleRequest={openSampleRequest}/></main><ReorderMagnetForm open={sampleRequestOpen} onClose={closeSampleRequest}/><TalkToHommioForm open={talkFormOpen} onClose={closeTalkForm}/><SiteFooter/></div>
}
