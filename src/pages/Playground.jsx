import SiteFooter from '../components/SiteFooter.jsx'
import { useState } from 'react'
import { ArrowUpRight, Box, Check, ChevronRight, Code2, Copy, Gift, Layers3, Palette, Sparkles, Type } from 'lucide-react'
import { Avatar, Badge, Button, Card, Checkbox, Divider, FeatureCard, GiftCard, Input, LogoCloud, Progress, SectionHeading, SegmentedControl, Select, StatCard, StepList, Switch, Tabs, TestimonialCard, Textarea } from '../../components/ui'
import './playground.css'

const catalog = [
  { name: 'Button', group: 'Actions' }, { name: 'Badge', group: 'Actions' }, { name: 'Card', group: 'Surfaces' },
  { name: 'Avatar', group: 'People' }, { name: 'Input', group: 'Forms' }, { name: 'Select', group: 'Forms' },
  { name: 'Textarea', group: 'Forms' }, { name: 'Checkbox', group: 'Forms' }, { name: 'Switch', group: 'Forms' },
  { name: 'Tabs', group: 'Navigation' }, { name: 'SegmentedControl', group: 'Navigation' },
  { name: 'Progress', group: 'Feedback' }, { name: 'Divider', group: 'Layout' }, { name: 'SectionHeading', group: 'Typography' },
  { name: 'StatCard', group: 'Data display' }, { name: 'GiftCard', group: 'Gifting' }, { name: 'FeatureCard', group: 'Content' },
  { name: 'TestimonialCard', group: 'Content' }, { name: 'StepList', group: 'Navigation' }, { name: 'LogoCloud', group: 'Content' },
]
const groups = ['Actions', 'Surfaces', 'People', 'Forms', 'Navigation', 'Feedback', 'Layout', 'Typography', 'Data display', 'Gifting', 'Content']
const tokens = [
  ['Canvas', 'var(--color-canvas)', '#F0EBE2'], ['Paper', 'var(--color-paper)', '#FFFDF9'], ['Ink', 'var(--color-ink)', '#210C02'],
  ['Denim', 'var(--color-blue)', '#5A6A92'], ['Love', 'var(--color-blue-light)', '#D3E6FF'], ['Sage', 'var(--color-sage)', '#909267'],
  ['Rose', 'var(--color-rose)', '#C42121'], ['Line', 'var(--color-line)', '#E7DFD4'],
]

function Spec({ id, title, meta, children }) {
  return <section className="specimen" id={id}><div className="specimen__heading"><div><span className="specimen__meta">{meta}</span><h3>{title}</h3></div><button className="icon-button" aria-label={`Copy ${title} import`} onClick={() => navigator.clipboard?.writeText(`import { ${title} } from '@/components/ui'`)}><Copy size={15}/></button></div><div className="specimen__stage">{children}</div></section>
}

export default function Playground() {
  const [activeNav, setActiveNav] = useState('Overview')
  const [query, setQuery] = useState('')
  const visibleCatalog = catalog.filter(item => `${item.name} ${item.group}`.toLowerCase().includes(query.toLowerCase()))
  const scrollTo = id => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); setActiveNav(id === 'tokens' ? 'Design tokens' : 'Components') }

  return <div className="playground-shell">
    <aside className="sidebar">
      <a className="brand" href="#top"><span className="brand__mark"><img src="/assets/hommio-h-mark.png" alt=""/></span><span>hommio<small>Design system</small></span></a>
      <div className="sidebar__label">Workspace</div>
      <nav className="side-nav">
        <button className={activeNav === 'Overview' ? 'active' : ''} onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setActiveNav('Overview') }}><Layers3 size={16}/> Overview</button>
        <button className={activeNav === 'Design tokens' ? 'active' : ''} onClick={() => scrollTo('tokens')}><Palette size={16}/> Design tokens</button>
        <button className={activeNav === 'Components' ? 'active' : ''} onClick={() => scrollTo('components')}><Box size={16}/> Components <span className="nav-count">20</span></button>
        <button onClick={() => scrollTo('type')}><Type size={16}/> Typography</button>
      </nav>
      <div className="sidebar__label sidebar__label--components">Components <span>20</span></div>
      <div className="component-nav">
        {groups.map(group => { const rows = catalog.filter(item => item.group === group); return <div key={group}><p>{group}</p>{rows.map(item => <a href={`#${item.name}`} key={item.name}>{item.name}</a>)}</div> })}
      </div>
      <div className="sidebar__bottom"><span className="status-dot"/> v1.0 · Living system</div>
    </aside>

    <main className="main-content" id="top">
      <header className="topbar"><div className="breadcrumbs">Hommio <ChevronRight size={14}/> <span>Playground</span></div><div className="topbar__right"><span className="live-label"><i/> All components</span><Button size="sm" variant="dark" onClick={() => scrollTo('components')}>Browse library</Button></div></header>

      <div className="page-wrap">
        <section className="intro">
          <div className="intro__text"><Badge tone="blue"><Sparkles size={12}/> Hommio UI · Version 1.0</Badge><h1>Thoughtful by<br/><em>design.</em></h1><p>A shared visual language for gifting experiences. Warm, clear, and made to scale with every page.</p><div className="intro__actions"><Button onClick={() => scrollTo('components')}>Explore components</Button><button className="text-link" onClick={() => scrollTo('tokens')}>View design tokens</button></div></div>
          <div className="intro__visual"><div className="orbit orbit--one"/><div className="orbit orbit--two"/><div className="gift-stack"><div className="gift-stack__back"><Gift size={25}/></div><div className="gift-stack__front"><div className="gift-stack__ribbon"/><span>made<br/>for you</span><small>Hommio · A little something</small></div></div><div className="float-chip float-chip--top"><span className="float-chip__icon">✳</span> Made with care</div><div className="float-chip float-chip--bottom"><span className="mini-check"><Check size={12}/></span> 20 reusable pieces</div></div>
        </section>

        <section className="overview-strip"><div><strong>20</strong><span>UI components</span></div><div><strong>8</strong><span>Color tokens</span></div><div><strong>4px</strong><span>Spacing base</span></div><div className="overview-strip__note">One consistent foundation<br/>for every experience <ArrowUpRight size={15}/></div></section>

        <section className="token-section" id="tokens"><div className="section-topline"><SectionHeading eyebrow="Foundation" title="Design tokens" description="A small, intentional palette keeps every experience feeling unmistakably Hommio."/><button className="section-link" onClick={() => navigator.clipboard?.writeText('src/styles/tokens.css')}>View tokens</button></div><div className="color-grid">{tokens.map(([name, color, hex]) => <button key={name} className="color-swatch" onClick={() => navigator.clipboard?.writeText(hex)}><span style={{ background: color }}/><strong>{name}</strong><small>{hex}</small></button>)}</div><div className="token-details"><div className="type-token" id="type"><div className="detail-label">Type · DM Sans</div><strong>Thoughtful gifts<br/>make lasting moments.</strong><span>Display / 46px / Medium</span></div><div className="space-token"><div className="detail-label">Spacing · 4px base</div><div className="space-token__bars"><i style={{width:16}}/><i style={{width:32}}/><i style={{width:48}}/><i style={{width:64}}/><i style={{width:80}}/></div><span>4 · 8 · 12 · 16 · 20</span></div><div className="radius-token"><div className="detail-label">Radius · soft edges</div><div><i/><i/><i/></div><span>10 · 16 · 24 px</span></div></div></section>

        <section className="component-section" id="components"><div className="section-topline"><SectionHeading eyebrow="Component library" title="Made to work together" description="Each component lives in its own folder under /components/ui and is ready to use across the product."/><label className="component-search"><Code2 size={15}/><input placeholder="Find a component…" value={query} onChange={e => setQuery(e.target.value)}/><kbd>⌘ K</kbd></label></div>
          <div className="component-summary"><span>Showing <b>{visibleCatalog.length}</b> of {catalog.length} components</span><span>Import from <code>@/components/ui</code></span></div>
          <div className="specimen-grid">
            {visibleCatalog.some(x => x.name === 'Button') && <Spec id="Button" title="Button" meta="Actions · 4 variants"><div className="demo-row"><Button>Talk to us</Button><Button variant="dark">Explore gifts</Button><Button variant="secondary">Secondary</Button><Button variant="ghost">Learn more</Button></div><div className="demo-row demo-row--separated"><Button size="sm">Small</Button><Button size="md">Medium</Button><Button size="lg">Large</Button><Button disabled>Disabled</Button></div></Spec>}
            {visibleCatalog.some(x => x.name === 'Badge') && <Spec id="Badge" title="Badge" meta="Actions · 5 tones"><div className="demo-row"><Badge>Pro account</Badge><Badge tone="neutral">Coming soon</Badge><Badge tone="sage">Active</Badge><Badge tone="rose">Limited</Badge><Badge tone="dark">New</Badge></div></Spec>}
            {visibleCatalog.some(x => x.name === 'Card') && <Spec id="Card" title="Card" meta="Surfaces · 4 tones"><div className="mini-card-grid"><Card><b>Paper</b><span>For most content surfaces</span></Card><Card tone="soft"><b>Soft</b><span>For nested sections</span></Card><Card tone="blue"><b>Blue</b><span>For a gentle highlight</span></Card><Card tone="dark"><b>Ink</b><span>For rich contrast</span></Card></div></Spec>}
            {visibleCatalog.some(x => x.name === 'Avatar') && <Spec id="Avatar" title="Avatar" meta="People · 3 sizes"><div className="demo-row"><Avatar name="Taylor Moss" size="sm"/><Avatar name="Jordan Lee"/><Avatar name="Morgan Reed" size="lg"/><div className="avatar-stack"><Avatar name="Taylor Moss" size="sm"/><Avatar name="Jordan Lee" size="sm"/><Avatar name="Morgan Reed" size="sm"/><span>+4</span></div></div></Spec>}
            {visibleCatalog.some(x => x.name === 'Input') && <Spec id="Input" title="Input" meta="Forms · label, hint, error"><div className="form-demo"><Input label="Work email" placeholder="you@company.com" hint="We’ll only use this for your account."/><Input label="Company name" defaultValue="Hommio Studio"/><Input label="Email address" defaultValue="not-an-email" error="Enter a valid email address."/></div></Spec>}
            {visibleCatalog.some(x => x.name === 'Select') && <Spec id="Select" title="Select" meta="Forms · native options"><div className="form-demo form-demo--two"><Select label="Team size" options={['1–10 people','11–50 people','51–200 people']}/><Select label="Gift occasion" options={['Thank you','Birthday','New customer']}/></div></Spec>}
            {visibleCatalog.some(x => x.name === 'Textarea') && <Spec id="Textarea" title="Textarea" meta="Forms · resizable"><div className="form-demo"><Textarea label="Add a personal note" placeholder="A few kind words go a long way…" rows="3"/></div></Spec>}
            {visibleCatalog.some(x => x.name === 'Checkbox') && <Spec id="Checkbox" title="Checkbox" meta="Forms · selection"><div className="demo-column"><Checkbox label="Send me product updates" defaultChecked/><Checkbox label="I agree to the terms and privacy policy"/></div></Spec>}
            {visibleCatalog.some(x => x.name === 'Switch') && <Spec id="Switch" title="Switch" meta="Forms · boolean"><div className="demo-column"><Switch label="Email notifications" defaultChecked/><Switch label="Monthly gifting reminders"/></div></Spec>}
            {visibleCatalog.some(x => x.name === 'Tabs') && <Spec id="Tabs" title="Tabs" meta="Navigation · pill"><Tabs items={['Overview','Gifts','Recipients','Activity']}/></Spec>}
            {visibleCatalog.some(x => x.name === 'SegmentedControl') && <Spec id="SegmentedControl" title="SegmentedControl" meta="Navigation · compact"><SegmentedControl items={['Monthly','Quarterly','Yearly']}/></Spec>}
            {visibleCatalog.some(x => x.name === 'Progress') && <Spec id="Progress" title="Progress" meta="Feedback · determinate"><div style={{width:'100%',maxWidth:380}}><Progress label="Gift budget used" value={72}/></div></Spec>}
            {visibleCatalog.some(x => x.name === 'Divider') && <Spec id="Divider" title="Divider" meta="Layout · with or without label"><div className="divider-demo"><Divider/><Divider label="Or continue with"/></div></Spec>}
            {visibleCatalog.some(x => x.name === 'SectionHeading') && <Spec id="SectionHeading" title="SectionHeading" meta="Typography · eyebrow + title"><SectionHeading eyebrow="A little something" title="Make every moment matter." description="A clear hierarchy that sets context and gives your content room to breathe."/></Spec>}
            {visibleCatalog.some(x => x.name === 'StatCard') && <Spec id="StatCard" title="StatCard" meta="Data display · value + trend"><div className="demo-row"><StatCard label="Gifts sent" value="1,284" change="12.8%"/><StatCard label="Redemption rate" value="94.6%" change="4.2%" tone="blue"/></div></Spec>}
            {visibleCatalog.some(x => x.name === 'GiftCard') && <Spec id="GiftCard" title="GiftCard" meta="Gifting · 4 colorways"><div className="gift-grid"><GiftCard brand="Goodwell Market" amount="$50" tone="coral"/><GiftCard brand="Little Day" amount="$75" tone="blue"/><GiftCard brand="Common Ground" amount="$40" tone="sage"/></div></Spec>}
            {visibleCatalog.some(x => x.name === 'FeatureCard') && <Spec id="FeatureCard" title="FeatureCard" meta="Content · icon + link"><div className="feature-grid"><FeatureCard number="01" icon="✳" title="Send with care">A thoughtful gift, sent in just a few clicks.</FeatureCard><FeatureCard number="02" icon="↗" title="Track every moment">Know when your gift is opened and enjoyed.</FeatureCard></div></Spec>}
            {visibleCatalog.some(x => x.name === 'TestimonialCard') && <Spec id="TestimonialCard" title="TestimonialCard" meta="Content · quote + attribution"><TestimonialCard quote="The little moments are the ones our team remembers. Hommio makes it easy to show up for all of them." name="Jamie Rivera" role="People & Culture" company="Goodwell"/></Spec>}
            {visibleCatalog.some(x => x.name === 'StepList') && <Spec id="StepList" title="StepList" meta="Navigation · progressive steps"><StepList current={1} steps={[{title:'Connect your tools',description:'Bring your existing workflow.'},{title:'Choose a gift',description:'Pick something meaningful.'},{title:'Send a little joy'}]}/></Spec>}
            {visibleCatalog.some(x => x.name === 'LogoCloud') && <Spec id="LogoCloud" title="LogoCloud" meta="Content · trusted by"><LogoCloud logos={['goodwell','Morrow','Northstar','common ground','daybreak']}/></Spec>}
          </div>
          {visibleCatalog.length === 0 && <div className="empty-state">No components match “{query}”. Try another name.</div>}
        </section>
      </div>
      <SiteFooter/>
    </main>
  </div>
}
