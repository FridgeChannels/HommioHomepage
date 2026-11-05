import SiteFooter from '../components/SiteFooter.jsx'
import { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'
import { sampleFieldNames, submitLeadAndBook } from '../lib/submitLead.js'
import PendantLampRail, { makeGoalLamps } from '../../components/ui/pendant-lamp-rail.tsx'
import { dtcGoalSections, economicsCopy, dtcOperationSteps, pdfFaqs } from './dtcbrands-content.js'
import './givingli-home.css'
import './dtcbrands.css'

const faqs = [
  ['How does Hommio personalize the experience?', 'With customer permission and available data, Hommio uses shared preferences, interactions, and reorder habits to help personalize products, content, and reorder options.'],
  ...pdfFaqs,
]

const retentionGoals = [
  'encourage repeat purchases',
  'grow subscriptions',
  'support subscriber retention',
  'win back subscribers',
  'create cross-sell opportunities',
  'create upsell opportunities.',
]

const dtcGoalLamps = makeGoalLamps(dtcGoalSections)

function GLogo({ footer = false }) {
  return <a className={`g-logo ${footer ? 'g-logo--footer' : ''}`} href="/" aria-label="Hommio home"><span className="g-logo__crop"><img src="/assets/hommio-logo.png" alt="Hommio" /></span></a>
}

function Header({ onTalk }) {
  return <header className="g-header"><div className="g-header__inner">
    <div className="g-header__brand"><GLogo/></div>
    <nav className="g-nav" aria-label="Main navigation">
      <a href="/">Hommio</a>
      <a href="/dtcbrands">For DTC Brands</a>
      <a href="/amazonbrands">For Amazon Brands</a>
      <a href="/philosophy">Our Philosophy</a>
    </nav>
    <div className="g-header__actions"><button className="g-header-button g-header-button--blue" onClick={onTalk}>Talk to Hommio</button></div>
  </div></header>
}

function DtcbrandsHeroBackdrop() {
  return <div className="dtcbrands-hero-backdrop" aria-hidden="true">
    <div className="dtcbrands-hero-orbs">{Array.from({ length: 7 }, (_, index) => <div className={`dtcbrands-hero-orb dtcbrands-hero-orb--${index + 1}`} key={index}/>)}</div>
    <div className="dtcbrands-hero-glass"/>
    <div className="dtcbrands-hero-light"/>
    <div className="dtcbrands-hero-edge dtcbrands-hero-edge--top"/>
    <div className="dtcbrands-hero-edge dtcbrands-hero-edge--bottom"/>
  </div>
}

function Hero({ onTalk, onSampleRequest }) {
  const [goalIndex, setGoalIndex] = useState(0)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setGoalIndex(index => (index + 1) % retentionGoals.length)
    }, 2600)
    return () => window.clearInterval(interval)
  }, [])

  return <section className="g-hero" id="top">
    <DtcbrandsHeroBackdrop/>
    <div className="g-hero__title"><h1><span className="dtcbrands-hero-lead">Hommio handle your retention goal :</span><span key={goalIndex} className="dtcbrands-hero-term" aria-live="off">{retentionGoals[goalIndex]}</span></h1><div className="g-hero__actions"><button onClick={onTalk}>Talk to Hommio</button><a href="#request-sample" onClick={event => { event.preventDefault(); onSampleRequest() }}>Request a Sample</a></div></div>
  </section>
}

function FitYourGoal() {
  return <section className="dtc-guide" id="fit-your-goal">
    <div className="dtc-guide__inner">
      <header className="dtc-guide__header">
        <span className="dtc-guide__eyebrow">fit your goal</span>
        <h2>Different goals. Different customers. One way back.</h2>
      </header>

      <PendantLampRail
        className="dtc-goal-lamp-rail"
        items={dtcGoalLamps}
        autoplay
        interval={2600}
        caption="Explore each retention goal."
      />
    </div>
  </section>
}

function EconomicsSection() {
  const [economicsLead] = economicsCopy.split('without per-impression fees.')
  const [dashboardHeight, setDashboardHeight] = useState(900)
  const [dashboardHintTop, setDashboardHintTop] = useState(230)
  const dashboardFrameRef = useRef(null)

  useEffect(() => {
    function handleDashboardMessage(event) {
      if (event.source !== dashboardFrameRef.current?.contentWindow) return
      if (event.data?.type !== 'hommio-dashboard-resize') return
      const height = Math.ceil(Number(event.data.height))
      if (Number.isFinite(height)) setDashboardHeight(Math.max(600, Math.min(height, 5000)))
      const hintTop = Number(event.data.hintTop)
      if (Number.isFinite(hintTop) && hintTop >= 0) setDashboardHintTop(hintTop)
    }
    window.addEventListener('message', handleDashboardMessage)
    return () => window.removeEventListener('message', handleDashboardMessage)
  }, [])

  return <section className="dtc-economics" id="economics">
    <DtcbrandsHeroBackdrop/>
    <div className="dtc-economics__inner">
      <div className="dtc-economics__copy">
        <span className="dtc-guide__eyebrow">economics</span>
        <h2 id="economics-title">Make repeat purchasing a household habit.</h2>
        <p>{economicsLead}<strong className="dtc-economics__emphasis">without per-impression fees.</strong></p>
      </div>
      <div className="dtc-dashboard-layout">
        <iframe
          ref={dashboardFrameRef}
          className="dtc-hph-dashboard-embed"
          src="/assets/hommio_hph_dashboard.html"
          title="Hommio DTC household economics dashboard"
          sandbox="allow-scripts"
          loading="lazy"
          onLoad={() => dashboardFrameRef.current?.contentWindow?.postMessage({ type: 'hommio-measure' }, '*')}
          style={{ height: `${dashboardHeight}px` }}
        />
        <div className="dtc-dashboard-hint" aria-hidden="true" style={{ '--hint-top': `${dashboardHintTop}px` }}>
          <svg className="dtc-dashboard-hint__arrow" viewBox="0 0 72 46" fill="none"><path d="M68 7 C48 4 51 31 9 29 M19 22 L8 29 L18 36" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M64 10 C51 10 50 24 33 28" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity=".55"/></svg>
          <span className="dtc-dashboard-hint__text">select a period</span>
        </div>
      </div>
    </div>
  </section>
}
function DTCOperationSection() {
  return <section className="dtc-operations" id="dtc-operation">
    <div className="dtc-operations__inner">
      <header className="dtc-operations__header">
        <span className="dtc-guide__eyebrow">built around your dtc workflow</span>
        <h2>Built Around Your DTC Workflow</h2>
      </header>
      <ol className="dtc-operation-steps">
        {dtcOperationSteps.map((step, index) => <li className="dtc-operation-step" key={step.title}>
          <span className="dtc-operation-step__number">0{index + 1}</span>
          <h3>{step.title}</h3>
          <p>{step.copy}</p>
        </li>)}
      </ol>
    </div>
  </section>
}

function FAQ() {
  return <section className="g-faq" id="faq"><div className="g-faq__intro"><span>frequently asked questions</span></div><div className="g-faq__list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section>
}

function ContactSection({ onTalk, onSampleRequest }) {
  return <section className="g-contact dtc-book-demo" id="talk-to-us"><div className="g-contact__intro"><span>book a demo</span><h2>Select a goal and talk to Hommio</h2><div className="g-hero__actions"><button onClick={onTalk}>Talk to Hommio</button><a href="#request-sample" onClick={event => { event.preventDefault(); onSampleRequest() }}>Request a Sample</a></div></div></section>
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
            {field('request-state', 'State / province / region', { required: true, autoComplete: 'shipping address-level1', onChange: () => setStatus('') })}
            {field('request-postal-code', 'ZIP / postal code', { required: true, autoComplete: 'shipping postal-code', onChange: () => setStatus('') })}
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

function ChatWidget() {
  const [open, setOpen] = useState(false)
  return <div className="g-chat"><button className="g-chat__toggle" onClick={() => setOpen(v => !v)} aria-label={open ? 'Close chat' : 'Open chat'}>{open ? <X size={22}/> : <img src="/assets/hommio-h-mark.png" alt="" aria-hidden="true"/>}</button>{open && <div className="g-chat__panel"><button className="g-chat__close" onClick={() => setOpen(false)} aria-label="Close chat"><X size={14}/></button><div className="g-chat__brand"><b>Hommio</b></div><p>What brings you here today?</p><a href="#talk-to-us">Talk to Hommio</a><small>Questions about in-home retention? Talk with Hommio.</small></div>}</div>
}

export default function DTCBrands() {
  const [sampleRequestOpen, setSampleRequestOpen] = useState(false)
  const [talkFormOpen, setTalkFormOpen] = useState(false)
  const openTalkForm = () => setTalkFormOpen(true)
  const closeTalkForm = () => setTalkFormOpen(false)
  const openSampleRequest = () => setSampleRequestOpen(true)
  const closeSampleRequest = () => setSampleRequestOpen(false)
  return <div className="givingli-site givingli-home-site dtcbrands-page"><Header onTalk={openTalkForm}/><main><Hero onTalk={openTalkForm} onSampleRequest={openSampleRequest}/><FitYourGoal/><EconomicsSection/><DTCOperationSection/><FAQ/><ContactSection onTalk={openTalkForm} onSampleRequest={openSampleRequest}/></main><ReorderMagnetForm open={sampleRequestOpen} onClose={closeSampleRequest}/><TalkToHommioForm open={talkFormOpen} onClose={closeTalkForm}/><SiteFooter/><ChatWidget/></div>
}
