import SiteFooter from '../components/SiteFooter.jsx'
import { useEffect, useState } from 'react'
import { ArrowRight, ChevronDown, ChevronLeft, X } from 'lucide-react'
import './givingli.css'

const root = 'https://givingli.com'
const img = (path) => `${root}${path}`

const heroTabs = ['Deployment Plan', 'Reorder Magnet', 'Tap Experience', 'DTC Store', 'Amazon Store']
const heroSlides = [
  { title: 'Deployment Plan', copy: 'Plan how to reach the right households and support your retention goals.', image: '/images/business-gifting/hero/dashboard/Dashboard.png' },
  { title: 'Reorder Magnet', copy: 'Create a branded magnet customers can keep at home and tap when they need your products.', image: '/images/business-gifting/hero/dashboard/Top%20Row.png' },
  { title: 'Tap Experience', copy: 'Personalize what customers see when they tap, from useful content to reorder options.', image: '/images/business-gifting/hero/dashboard/Bottom%20Row.png' },
  { title: 'DTC Store', copy: 'Give customers a simple way back to your products, content, or reorder page.', image: '/images/business-gifting/hero/dashboard/add%20gift%20funds.png' },
  { title: 'Amazon Brand Store', copy: 'Give customers a direct route from home to your Amazon Brand Store.', image: '/images/business-gifting/hero/dashboard/manage%20budget.png' },
]

const channelFit = [
  { id: 'dtc', title: 'A way back to your DTC store.', copy: 'Include a Reorder Magnet with your customers’ orders. Give them a simple way to return to your products, content, or reorder page when they need it.', cta: 'Explore Hommio for DTC Brands', href: 'https://app.notion.com/p/DTC-40e9166fd9fd80338d73d17c239779df?pvs=21', icon: '↗' },
  { id: 'amazon', title: 'A way back to your Amazon Brand Store.', copy: 'Give customers a direct route from their home to your Amazon Brand Store—without starting with another search.', cta: 'Explore Hommio for Amazon Brands', href: '/amazonbrands', icon: '⌂' },
]

const scenarios = [
  ['Ongoing in-home retention', 'Make a Reorder Magnet part of your ongoing retention strategy. Keep your brand within reach between purchases and give customers an easy way back.', '↻'],
  ['Seasonal gifts and promotions', 'Add a branded Reorder Magnet to seasonal gifts or promotional bundles. Give customers something to keep after the occasion is over.', '✳'],
  ['Product sampling and launches', 'Pair samples or new products with a Reorder Magnet so customers can find product information, share feedback, or return to buy.', '↗'],
  ['Loyalty and member programs', 'Include a Reorder Magnet in your member welcome kit or loyalty gifts. Give your customers a lasting connection to your brand at home.', '♡'],
]

const faqs = [
  ['What is a Reorder Magnet?', 'A branded magnet customers keep at home and tap with their phone to reach your products, content, or reorder options. It is one part of the Hommio solution, not the whole solution.'],
  ['Is Hommio just the magnet?', 'No. Hommio combines deployment planning, the physical Reorder Magnet, and in-home retention intelligence to help your brand stay connected with customers between purchases.'],
  ['Where can a tap take customers?', 'Customers can open product pages, useful content, surveys, or reorder options. When they are ready to buy, the experience can take them to your DTC store or Amazon Brand Store.'],
  ['Can the digital experience be updated?', 'Yes. The experience can change as you learn, without replacing the magnet.'],
  ['How does Hommio personalize the experience?', 'With customer permission and available data, Hommio uses shared preferences, interactions, and reorder habits to help personalize products, content, and reorder options.'],
  ['How much does it cost?', 'Pricing consists of volume-based product pricing, applicable design fees, and performance-based commissions. Visit Pricing & ROI Calculator to explore the pricing and estimate a scenario for your brand.'],
]

const steps = [
  ['Plan your deployment', 'Decide how to reach the right households and make Hommio part of your retention strategy.'],
  ['Create your Reorder Magnet', 'Design a branded touchpoint your customers can keep at home between purchases.'],
  ['Personalize the tap', 'Choose products, content, surveys, and reorder options for the experience customers open.'],
  ['Give customers a way back', 'Connect the experience to your DTC store or Amazon Brand Store when customers are ready to buy.'],
]

function GLogo({ footer = false }) {
  return <a className={`g-logo ${footer ? 'g-logo--footer' : ''}`} href="#top" aria-label="Hommio home"><span className="g-logo__crop"><img src="/assets/hommio-logo-transparent.png" alt="Hommio" /></span></a>
}

function Header({ onTalk }) {
  return <header className="g-header"><div className="g-header__inner">
    <div className="g-header__brand"><GLogo/></div>
    <nav className="g-nav" aria-label="Main navigation"><a href="#top">Hommio</a><div className="g-nav__item"><a href="#solutions">Solutions <ChevronDown size={13}/></a><div className="g-nav__menu"><a href="#dtc">For DTC Brands</a><a href="/amazonbrands">For Amazon Brands</a></div></div><a href="https://app.notion.com/p/Pricing-ROI-Calculator-40e9166fd9fd800d832fe88c51cb3236?pvs=21" target="_blank" rel="noreferrer">Pricing &amp; ROI Calculator</a><a href="#retention-philosophy">Retention Philosophy</a></nav>
    <div className="g-header__actions"><button className="g-header-button g-header-button--blue" onClick={onTalk}>Talk to Hommio</button></div>
  </div></header>
}

function Hero({ onTalk }) {
  const [active, setActive] = useState(0)
  const [activeFloat, setActiveFloat] = useState(0)
  const slide = heroSlides[active]
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
    <div className="g-hero__title"><h1>Retention<br/><span>is at home.</span></h1><h2>In-home retention solution for CPG brands.</h2><p>Hommio helps customers remember your brand and buy from you again. We plan how to reach the right households, create a Reorder Magnet they can keep at home, and personalize what happens when they tap.</p><div className="g-hero__actions"><button onClick={onTalk}>Talk to Hommio</button><a href="#talk-to-us">Request a Reorder Magnet</a></div></div>
    <div className="g-hero__objects" aria-hidden="true"><div className="g-hero__glow"/><img className="g-hero-float g-hero-float--left" src={img(floatSlides[activeFloat][0])} alt=""/><img className="g-hero-float g-hero-float--right" src={img(floatSlides[activeFloat][1])} alt=""/></div>
    <div className="g-hero__demo"><span className="g-script">See it in action</span><div className="g-hero__tabs">{heroTabs.map((tab, i) => <button key={tab} className={active === i ? 'is-active' : ''} onClick={() => setActive(i)}>{tab}</button>)}</div><h2>{slide.title}</h2><p>{slide.copy}</p><div className="g-hero__preview"><img src={img(slide.image)} alt="Hommio retention experience preview"/><button aria-label="Previous preview" onClick={() => setActive((active + 4) % 5)}><ChevronLeft/></button><button aria-label="Next preview" onClick={() => setActive((active + 1) % 5)}><ArrowRight/></button></div><div className="g-pagination"><button onClick={() => setActive((active + 4) % 5)} aria-label="Previous"><ChevronLeft size={17}/></button><span>0{active + 1} / 05</span><button onClick={() => setActive((active + 1) % 5)} aria-label="Next"><ArrowRight size={17}/></button></div></div>
  </section>
}

function Solutions() {
  return <section className="g-solutions" id="solutions"><div className="g-solutions__inner"><span>Find your fit</span><h2>Built around how your customers buy.</h2><p>Help customers return to your DTC store or Amazon Brand Store with a Reorder Magnet designed around your brand and sales channels.</p><div className="g-solution-grid g-solution-grid--channels">{channelFit.map(item => <article className="g-solution-card" id={item.id} key={item.id}><div className="g-solution-card__icon">{item.icon}</div><h3>{item.title}</h3><p>{item.copy}</p><a href={item.href} target="_blank" rel="noreferrer">{item.cta} <ArrowRight size={18}/></a></article>)}</div></div></section>
}

function GiftOptions() {
  return <section className="g-gift-options" id="gift-options"><div className="g-section-intro"><span>Use Hommio your way</span><h2>Support the moments that bring customers back.</h2><p>Build an in-home retention strategy around the ways your customers discover, use, and return to your products.</p></div><div className="g-gift-grid g-gift-grid--scenarios">{scenarios.map(([title, copy, icon], i) => <article className={`g-gift-card g-gift-card--${i + 1}`} key={title}><div className="g-scenario-icon" aria-hidden="true">{icon}</div><h3>{title}</h3><p>{copy}</p></article>)}</div><a className="g-text-link" href="https://app.notion.com/p/Pricing-ROI-Calculator-40e9166fd9fd800d832fe88c51cb3236?pvs=21" target="_blank" rel="noreferrer">Explore Pricing &amp; ROI Calculator <ArrowRight size={18}/></a></section>
}

function RetentionPhilosophy() {
  return <section className="g-philosophy" id="retention-philosophy"><div className="g-philosophy__intro"><span>Why retention is at home</span><h2>Retention is at home.</h2><a href="https://app.notion.com/p/Retention-Philosophy-40e9166fd9fd802ea69cc75110f099ea?pvs=21" target="_blank" rel="noreferrer">Explore Our Retention Philosophy <ArrowRight size={18}/></a></div><div className="g-philosophy__principles"><article><span>01</span><h3>Brands Must Be Ambient.</h3></article><article><span>02</span><h3>Every Sale Strengthens the Channel.</h3></article><article><span>03</span><h3>Intelligence Begins Where the Product Is Consumed.</h3></article></div></section>
}

function FAQ() {
  return <section className="g-faq" id="faq"><div className="g-faq__intro"><span>FAQ</span><h2>Questions, answered.</h2></div><div className="g-faq__list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section>
}

function CustomCard() {
  return <section className="g-custom-card"><div className="g-custom-card__copy"><span>Made for the home</span><h2>A branded Reorder Magnet gives customers a simple way back to your products when they need them.</h2><a href="#talk-to-us">Request a Reorder Magnet</a></div><img src={img('/images/business-gifting/gift-options/cant-thank-you-enough-pro-card.png')} alt="A branded card showing an example of a Reorder Magnet design"/></section>
}

function HowItWorks({ onTalk }) {
  const [page, setPage] = useState(0)
  return <section className="g-how" id="how-it-works"><div className="g-section-intro"><span className="g-script">How it works</span><h2>From household to reorder.</h2><p>Build a deployment plan, design a Reorder Magnet, and shape the experience customers open when they tap.</p></div><div className="g-step-grid">{steps.map(([title, copy], i) => <article className={`g-step-card g-step-card--${i + 1}`} key={title}><div className="g-step-card__art"><div className={`g-hommio-step-art g-hommio-step-art--${i + 1}`}><span>0{i + 1}</span><b>{['Households','Reorder Magnet','Tap experience','Storefront'][i]}</b><small>{['DTC · Amazon','Keep at home','Products · Content','Return to shop'][i]}</small></div></div><h3>{title}</h3><p>{copy}</p><button onClick={onTalk}>Talk to Hommio</button></article>)}</div><div className="g-pagination"><button onClick={() => setPage((page + 3) % 4)} aria-label="Previous step"><ChevronLeft size={17}/></button><span>0{page + 1} / 04</span><button onClick={() => setPage((page + 1) % 4)} aria-label="Next step"><ArrowRight size={17}/></button></div></section>
}

function ContactForm() {
  const [sent, setSent] = useState(false)
  return <section className="g-contact" id="talk-to-us"><div className="g-contact__intro"><span>Talk to Hommio</span><h2>Bring Hommio to your customers’ homes.</h2><p>Let’s build a deployment plan, Reorder Magnet, and personalized experience around your brand.</p><ul><li>Deployment planning for your brand</li><li>A Reorder Magnet designed for your customers</li><li>A personalized experience when they tap</li></ul></div><form className="g-contact-form" onSubmit={e => { e.preventDefault(); setSent(true) }}>
    <blockquote><img src="/assets/hommio-logo-transparent.png" alt="Hommio"/><p>Retention is at home.</p><cite>Let’s build your plan</cite></blockquote>
    <div className="g-contact-form__field"><label>(01) Work email <b>*</b></label><input type="email" placeholder="you@brand.com" required/></div>
    <div className="g-contact-form__field"><label>(02) Full name <b>*</b></label><input placeholder="Your name" required/></div>
    <div className="g-contact-form__field"><label htmlFor="legacy-phone">(03) Phone number <b>*</b></label><input id="legacy-phone" name="phoneNumber" type="tel" autoComplete="tel" placeholder="Your phone number" required/></div>
    <div className="g-contact-form__field"><label>(04) Brand / company name <b>*</b></label><input placeholder="Your brand" required/></div>
    <div className="g-contact-form__field"><label>(05) Your role <b>*</b></label><select required defaultValue=""><option value="" disabled>Select your role</option>{['Founder / Owner','Marketing','Ecommerce','Retention / CRM','Brand','Other'].map(x => <option key={x}>{x}</option>)}</select></div>
    <div className="g-contact-form__field"><label>(06) Primary sales channel <b>*</b></label><select required defaultValue=""><option value="" disabled>Select a channel</option>{['DTC store','Amazon Brand Store','Both','Other'].map(x => <option key={x}>{x}</option>)}</select></div>
    <div className="g-contact-form__optional"><b>Optional · Tell us more</b><p>Share a few details about your products and retention goals so we can shape a useful first conversation.</p></div>
    <div className="g-contact-form__field"><label>(07) Product category</label><input placeholder="For example, food, beverage, or personal care"/></div>
    <fieldset className="g-contact-form__field"><legend>(08) What would you like to explore?</legend><p>Select all that apply</p><div className="g-checkboxes">{['In-home retention','Reorder Magnet design','DTC customer journey','Amazon customer journey','Sampling or launch campaign','Other'].map(x => <label key={x}><input type="checkbox"/> {x}</label>)}</div></fieldset>
    <div className="g-contact-form__field"><label>(09) Estimated annual order volume</label><select defaultValue=""><option value="" disabled>Select a range</option>{['Under 5,000','5,000–25,000','25,000–100,000','100,000+','Not sure yet'].map(x => <option key={x}>{x}</option>)}</select></div>
    <div className="g-contact-form__field"><label>(10) When are you looking to start?</label><select defaultValue=""><option value="" disabled>Select a timeline</option>{['As soon as possible','1–3 months','3–6 months','Just exploring'].map(x => <option key={x}>{x}</option>)}</select></div>
    <div className="g-contact-form__field"><label>(11) Anything else we should know?</label><textarea rows="3"/></div>
    <button className="g-contact-form__submit" type="submit">{sent ? "We'll reply within one business day." : "Talk to Hommio"}</button>
  </form></section>
}

function ChatWidget() {
  const [open, setOpen] = useState(false)
  return <div className="g-chat"><button className="g-chat__toggle" onClick={() => setOpen(v => !v)} aria-label={open ? 'Close chat' : 'Open chat'}>{open ? <X size={22}/> : <img src="/assets/hommio-h-mark.png" alt="" aria-hidden="true"/>}</button>{open && <div className="g-chat__panel"><button className="g-chat__close" onClick={() => setOpen(false)} aria-label="Close chat"><X size={14}/></button><div className="g-chat__brand"><b>Hommio</b></div><p>What brings you here today?</p><a href="#talk-to-us">Talk to Hommio</a><small>Questions about in-home retention? Talk with Hommio.</small></div>}</div>
}

export default function Givingli() {
  const jumpToTalk = () => document.getElementById('talk-to-us')?.scrollIntoView({ behavior: 'smooth' })
  return <div className="givingli-site"><Header onTalk={jumpToTalk}/><main><Hero onTalk={jumpToTalk}/><CustomCard/><HowItWorks onTalk={jumpToTalk}/><Solutions/><GiftOptions/><RetentionPhilosophy/><FAQ/><ContactForm/></main><SiteFooter/><ChatWidget/></div>
}
