import SiteFooter from '../components/SiteFooter.jsx'
import { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'
import { sampleFieldNames, submitLeadAndBook } from '../lib/submitLead.js'
import PendantLampRail, { makeGoalLamps } from '../../components/ui/pendant-lamp-rail.tsx'
import './givingli-home.css'
import './amazonbrands.css'

const goals = [
  {
    title: 'Improve Repeat-Purchase Profitability',
    summary: 'Make it easier for customers to reorder without starting another search.',
    copy: 'When customers are ready to buy again, a tap can take them to the relevant Amazon product or Brand Store. They can find their preferred product without navigating a new set of search results or clicking a sponsored search result on that visit.',
    helps: ['Return to the product: Link the magnet to the intended ASIN or a brand-approved alternative.', 'Find the right format: Help customers choose an appropriate size or variation before continuing to Amazon.', 'Support the reorder: Provide product-use guidance or a voluntary usage-based replenishment estimate.'],
    measure: 'Attributed Amazon purchases and contribution after program and marketplace costs. A comparison cohort can help assess whether purchases are incremental. Amazon’s normal selling fees still apply.',
  },
  {
    title: 'Grow Customer Lifetime Value (LTV)',
    summary: 'Give customers more reasons to return to your brand over time.',
    copy: 'A customer who knows one product may benefit from another format, a complementary product, or a convenient recurring-order option. HOMMIO can make these choices easier to discover from home.',
    helps: ['Reorder with confidence: Keep a familiar route to the product available between purchases.', 'Discover a useful companion: Introduce a relevant product or collection in your Amazon Brand Store.', 'Explore Subscribe & Save: Guide customers to an eligible listing to review current options, while keeping a one-time purchase available.'],
    measure: 'Repeat and cross-sell outcomes, subscription-related activity, and customer value over time where the necessary data is available. HOMMIO does not automatically receive individual Amazon purchase or subscription histories.',
  },
  {
    title: 'Gain Firsthand Customer Insights (Zero-Party Data)',
    summary: 'Learn directly from what customers choose to share.',
    copy: 'Customers can tell you about their preferences, product needs, or how they use your products. These voluntary answers can help make the experience more useful and inform future decisions.',
    helps: ['Ask a useful question: Invite customers to share a preference, use case, or replenishment need.', 'Help them find a fit: Use their answers to guide them toward relevant product information or choices.', 'Learn from responses: Review permitted feedback and engagement patterns to improve the experience.'],
    measure: 'Voluntary response rates, the needs customers share, and engagement with relevant content. Data collection and use require appropriate privacy practices and Amazon policy review; an Amazon purchase does not automatically provide customer contact details.',
  },
  {
    title: 'Turn Amazon Orders into Extra BRB Value',
    summary: 'Explore Amazon Brand Referral Bonus credits on qualifying return purchases.',
    copy: 'An initial Amazon order can place a HOMMIO Reorder Magnet in the home. When a customer later taps and returns to Amazon, that journey may create an opportunity for a Brand Referral Bonus (BRB) credit on qualifying sales.',
    helps: ['Create a return path: Guide customers from home to an appropriate Amazon listing or Brand Store.', 'Set up attribution: Assess the required Amazon Attribution configuration for the intended journey.', 'Review the economics: Compare any eligible credit with HOMMIO and other program costs.'],
    measure: 'Qualifying attributed sales and BRB credits, if available. BRB is a referral-fee credit, not sales revenue or a guaranteed payment. Brand enrollment, traffic source, attribution, and transaction eligibility must be verified; magnet-driven traffic is not automatically eligible.',
  },
  {
    title: 'Build Lasting Customer Relationships',
    summary: 'Stay useful after the order, without asking for constant attention.',
    copy: 'The Reorder Magnet gives your brand a place in the home and customers a familiar way to engage on their own terms. The relationship can grow through useful interactions, not just another sales message.',
    helps: ['Be there when needed: Give customers a convenient place to find your brand again.', 'Help before selling: Offer approved product guidance, ideas, or answers to common questions.', 'Keep the experience relevant: Update the digital destination and use appropriately shared preferences to improve what customers see.'],
    measure: 'Returning engagement, useful content interactions, and relevant Amazon visits or purchases where measurable. Customers choose when to engage; HOMMIO does not assume access to Amazon buyer contact information.',
  },
]


const amazonGoalLamps = makeGoalLamps(goals.map((goal, index) => ({
  id: `amazon-goal-${index + 1}`,
  number: `0${index + 1}`,
  title: goal.title,
  summary: goal.summary,
  description: goal.copy,
}))).map((lamp, index) => ({
  ...lamp,
  help: goals[index].helps,
  measure: goals[index].measure,
}))

const faqs = [
  ['How is HOMMIO different from Amazon advertising?', 'Amazon advertising is valuable for product discovery and growth. HOMMIO adds a customer-initiated route from the household back to your brand on Amazon. It is complementary, not a replacement for acquisition or sponsored advertising.'],
  ['Can HOMMIO give us direct access to Amazon buyers’ emails or phone numbers?', 'No. An Amazon purchase does not automatically transfer reusable contact details to the brand. HOMMIO’s proposition is a lasting physical point of return and permitted customer-initiated engagement, not unrestricted customer data ownership.'],
  ['Can a tap take customers directly to an ASIN or Amazon Brand Store?', 'A properly configured destination can open a selected Amazon product listing or Brand Store without requiring a new Amazon search. The particular package insert and linked experience must be checked against applicable Amazon rules.'],
  ['Will customers avoid competitors entirely?', 'Yes and no. HOMMIO can take customers directly to your selected ASIN or Amazon Brand Store, bypassing competing search results. However, Amazon may still show recommendations or advertising for other products on its pages.'],
  ['Can HOMMIO help with Subscribe & Save?', 'It can guide customers to eligible Amazon product options. Amazon controls subscription enrollment and account management; HOMMIO should not claim to administer a buyer’s subscription without authorized capability.'],
  ['Does every HOMMIO-referred Amazon order earn the 10% Brand Referral Bonus?', 'Amazon describes an average bonus around 10% for qualifying external marketing referrals. The brand must be eligible and enrolled, the traffic and transaction must qualify, and attribution must be valid. HOMMIO’s magnet-driven traffic and implementation require specific verification before any BRB benefit can be promised.'],
  ['Can the experience change after the customer receives the magnet?', 'The configured digital destination and content can be updated without replacing the physical magnet, within the capabilities and policy constraints of the deployment.'],
  ['How do we know if HOMMIO worked?', 'Track distributed units, customer engagement, eligible outbound Amazon traffic, attributed transactions, bonus credits where applicable, and total costs. To evaluate actual incremental retention, compare outcomes against a suitable baseline or holdout rather than counting all attributed revenue as new revenue.'],
]

const operationSteps = [
  ['Build your deployment plan', 'HOMMIO works with you to choose the products, customers, timing, magnet design and experience that fit your retention goals and Amazon operation.'],
  ['Include the magnet with your product', 'Together, we plan how to include the magnet with your product, including whether your manufacturer or co-packer can add it during production or packaging.'],
  ['Review the setup', 'Before launch, review the magnet and packaging message, digital experience, Amazon destinations and any data collection against the applicable marketplace policies.'],
  ['Set up measurement', 'Agree on what to track, including distributed magnets, engagement and attributed Amazon purchases where available. If using Amazon Attribution and Brand Referral Bonus, verify the configuration and whether the magnet-driven journey is eligible.'],
  ['Deliver and learn', 'Your products and magnets reach customers through the agreed fulfillment workflow. Review engagement data as it becomes available, along with attributed sales and eligible credits where measurable, and use what you learn to improve the experience over time. Amazon reporting and credits may not be available in real time.'],
]

function GLogo() {
  return <a className="g-logo" href="/" aria-label="Hommio home"><span className="g-logo__crop"><img src="/assets/hommio-logo.png" alt="Hommio" /></span></a>
}

function Header({ onTalk }) {
  return <header className="g-header"><div className="g-header__inner">
    <div className="g-header__brand"><GLogo/></div>
    <nav className="g-nav" aria-label="Main navigation">
      <a href="/">Hommio</a><a href="/dtcbrands">For DTC Brands</a><a href="/amazonbrands" aria-current="page">For Amazon Brands</a><a href="/philosophy">Our Philosophy</a>
    </nav>
    <div className="g-header__actions"><button className="g-header-button g-header-button--blue" onClick={onTalk}>Talk to Hommio</button></div>
  </div></header>
}

function Hero({ onTalk, onSampleRequest }) {
  return <section className="g-hero amazonbrands-hero" id="top">
    <div className="amazonbrands-hero__glow" aria-hidden="true"/><div className="g-hero__title">
      <span className="amazonbrands-eyebrow">HOMMIO for Amazon Brands</span>
      <h1>Make every Amazon order into an in-home retention point.</h1>
      <p>Amazon brings your products into customers’ homes. HOMMIO helps your brand stay there—with an in-home presence, a customer-initiated experience, and a direct way back to your products on Amazon.</p>
      <div className="g-hero__actions"><button onClick={onTalk}>Talk to Hommio</button><button className="amazonbrands-secondary" onClick={onSampleRequest}>Request a Sample</button></div>
    </div>
  </section>
}


function FitYourGoal() {
  return <section className="dtc-guide amazonbrands-advantage" id="advantage">
    <div className="dtc-guide__inner">
      <header className="dtc-guide__header">
        <span className="dtc-guide__eyebrow">The HOMMIO advantage for Amazon Brands</span>
        <h2>Five goals. One way back from home.</h2>
        <p>Your Amazon order brings your product into the household. HOMMIO gives customers a useful way to return to your brand when they need it. Choose a goal to see how that in-home connection can work for your business.</p>
      </header>
      <PendantLampRail
        className="dtc-goal-lamp-rail amazonbrands-goal-lamps"
        items={amazonGoalLamps}
        autoplay
        interval={2600}
        caption="Explore each Amazon retention goal."
      />
    </div>
  </section>
}

function EconomicsSection() {
  const [dashboardHeight, setDashboardHeight] = useState(900)
  const [dashboardHintTop, setDashboardHintTop] = useState(230)
  const dashboardFrameRef = useRef(null)
  useEffect(() => {
    function handleDashboardMessage(event) {
      if (event.source !== dashboardFrameRef.current?.contentWindow || event.data?.type !== 'hommio-dashboard-resize') return
      const height = Math.ceil(Number(event.data.height))
      if (Number.isFinite(height)) setDashboardHeight(Math.max(600, Math.min(height, 5000)))
      const hintTop = Number(event.data.hintTop)
      if (Number.isFinite(hintTop) && hintTop >= 0) setDashboardHintTop(hintTop)
    }
    window.addEventListener('message', handleDashboardMessage)
    return () => window.removeEventListener('message', handleDashboardMessage)
  }, [])
  return <section className="dtc-economics amazonbrands-economics" id="economics"><div className="dtc-economics__inner">
    <div className="dtc-economics__copy"><span className="dtc-guide__eyebrow">The economics of HOMMIO Repeat-Purchase Household</span><h2>A way to understand the value of repeat purchases on Amazon.</h2><p>A <strong>HOMMIO Repeat-Purchase Household (HPH)</strong> is a household that places at least two HOMMIO-attributed orders with your brand within a year. The Reorder Magnet keeps your brand visible at home and gives customers a convenient way back to your products on Amazon when they’re ready to reorder.</p><p className="amazonbrands-economics__brb">Amazon BRB can help cover your cost of HOMMIO.</p></div>
    <div className="dtc-dashboard-layout"><iframe ref={dashboardFrameRef} className="dtc-hph-dashboard-embed" src="/assets/hommio_amazon_hph_dashboard.html" title="HOMMIO Amazon household economics calculator" sandbox="allow-scripts" loading="lazy" onLoad={() => dashboardFrameRef.current?.contentWindow?.postMessage({ type: 'hommio-measure' }, '*')} style={{ height: `${dashboardHeight}px` }}/><div className="dtc-dashboard-hint" aria-hidden="true" style={{ '--hint-top': `${dashboardHintTop}px` }}><svg className="dtc-dashboard-hint__arrow" viewBox="0 0 72 46" fill="none"><path d="M68 7 C48 4 51 31 9 29 M19 22 L8 29 L18 36" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M64 10 C51 10 50 24 33 28" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity=".55"/></svg><span className="dtc-dashboard-hint__text">select a period</span></div></div>
  </div></section>
}

function DTCOperationSection() {
  return <section className="dtc-operations amazonbrands-operations" id="amazon-operations"><div className="dtc-operations__inner"><header className="dtc-operations__header"><span className="dtc-guide__eyebrow">Built around Amazon operations</span><h2>From deployment plan to results, HOMMIO helps you get started.</h2></header><ol className="dtc-operation-steps amazonbrands-operation-steps">{operationSteps.map(([title, copy], index) => <li className="dtc-operation-step" key={title}><span className="dtc-operation-step__number">0{index + 1}</span><h3>{title}</h3><p>{copy}</p></li>)}</ol></div></section>
}

function FAQ() {
  return <section className="g-faq amazonbrands-faq" id="faq"><div className="g-faq__intro"><span>FAQ and Talk to HOMMIO</span></div><div className="g-faq__list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section>
}

function ContactSection({ onTalk, onSampleRequest }) {
  return <section className="g-contact dtc-book-demo amazonbrands-contact" id="talk-to-us"><div className="g-contact__intro"><h2>The next Amazon order should not have to start from zero.</h2><p>Your customers already know your product. Give them a useful place to return—and keep the purchase on Amazon.</p><div className="g-hero__actions"><button onClick={onTalk}>Talk to Hommio</button><button className="amazonbrands-secondary" onClick={onSampleRequest}>Request a Sample</button></div></div></section>
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


export default function AmazonBrands() {
  const [sampleRequestOpen, setSampleRequestOpen] = useState(false)
  const [talkFormOpen, setTalkFormOpen] = useState(false)
  const openTalkForm = () => setTalkFormOpen(true)
  const closeTalkForm = () => setTalkFormOpen(false)
  const openSampleRequest = () => setSampleRequestOpen(true)
  const closeSampleRequest = () => setSampleRequestOpen(false)
  return <div className="givingli-site givingli-home-site amazonbrands-page"><Header onTalk={openTalkForm}/><main><Hero onTalk={openTalkForm} onSampleRequest={openSampleRequest}/><FitYourGoal/><EconomicsSection/><DTCOperationSection/><FAQ/><ContactSection onTalk={openTalkForm} onSampleRequest={openSampleRequest}/></main><ReorderMagnetForm open={sampleRequestOpen} onClose={closeSampleRequest}/><TalkToHommioForm open={talkFormOpen} onClose={closeTalkForm}/><SiteFooter/></div>
}
