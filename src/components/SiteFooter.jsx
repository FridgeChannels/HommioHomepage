import { useEffect, useLayoutEffect, useRef } from 'react'
import { Linkedin, Mail, MessageCircle, MessageSquareText, Phone } from 'lucide-react'
import './site-footer.css'

const DITHER = "url('data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20width%3D%27360%27%20height%3D%27240%27%3E%3Cdefs%3E%3ClinearGradient%20id%3D%27g%27%20x1%3D%270%27%20y1%3D%270%27%20x2%3D%270%27%20y2%3D%271%27%3E%3Cstop%20offset%3D%270.04%27%20stop-color%3D%27%23000%27%2F%3E%3Cstop%20offset%3D%270.96%27%20stop-color%3D%27%23fff%27%2F%3E%3C%2FlinearGradient%3E%3Cfilter%20id%3D%27f%27%20x%3D%270%27%20y%3D%270%27%20width%3D%27100%25%27%20height%3D%27100%25%27%20color-interpolation-filters%3D%27sRGB%27%3E%3CfeTurbulence%20type%3D%27fractalNoise%27%20baseFrequency%3D%270.45%27%20numOctaves%3D%272%27%20seed%3D%277%27%20stitchTiles%3D%27stitch%27%20result%3D%27n%27%2F%3E%3CfeColorMatrix%20in%3D%27n%27%20type%3D%27matrix%27%20values%3D%271%200%200%200%200%201%200%200%200%200%201%200%200%200%200%200%200%200%200%201%27%20result%3D%27ng%27%2F%3E%3CfeComposite%20in%3D%27SourceGraphic%27%20in2%3D%27ng%27%20operator%3D%27arithmetic%27%20k2%3D%270.5%27%20k3%3D%270.5%27%20result%3D%27s%27%2F%3E%3CfeComponentTransfer%20in%3D%27s%27%20result%3D%27t%27%3E%3CfeFuncR%20type%3D%27discrete%27%20tableValues%3D%270%201%27%2F%3E%3C%2FfeComponentTransfer%3E%3CfeColorMatrix%20in%3D%27t%27%20type%3D%27matrix%27%20values%3D%270%200%200%200%201%200%200%200%200%200.5%200%200%200%200%200%201%200%200%200%200%27%2F%3E%3C%2Ffilter%3E%3C%2Fdefs%3E%3Crect%20width%3D%27100%25%27%20height%3D%27100%25%27%20fill%3D%27url%28%23g%29%27%20filter%3D%27url%28%23f%29%27%2F%3E%3C%2Fsvg%3E')"
const DITHER_STYLES = `
.df-field { position: absolute; inset: 0; }
.df-field.df-lit {
  -webkit-mask-image: radial-gradient(circle 190px at var(--df-x, 50%) var(--df-y, 50%), #000 35%, rgb(0 0 0 / .22) 100%);
  mask-image: radial-gradient(circle 190px at var(--df-x, 50%) var(--df-y, 50%), #000 35%, rgb(0 0 0 / .22) 100%);
}
.df-dots {
  position: absolute; top: 0; bottom: 0; left: 0;
  width: calc(100% + 360px);
  background: var(--df-accent);
  -webkit-mask-image: radial-gradient(circle, #000 0.9px, transparent 1.3px), linear-gradient(to bottom, rgb(0 0 0 / .48) 0%, rgb(0 0 0 / .68) 42%, #000 100%);
  mask-image: radial-gradient(circle, #000 0.9px, transparent 1.3px), linear-gradient(to bottom, rgb(0 0 0 / .48) 0%, rgb(0 0 0 / .68) 42%, #000 100%);
  -webkit-mask-size: 4px 4px, 100% 100%;
  mask-size: 4px 4px, 100% 100%;
  -webkit-mask-repeat: repeat, no-repeat;
  mask-repeat: repeat, no-repeat;
  -webkit-mask-composite: source-in;
  mask-composite: intersect;
}
@media (prefers-reduced-motion: no-preference) {
  .df-dots { animation: df-drift 40s linear infinite; }
  @supports (animation-timeline: view()) {
    .df-band { view-timeline: --df-band; }
    .df-mark { animation: df-rise linear both; animation-timeline: --df-band; animation-range: entry 20% entry 100%; }
  }
}
@keyframes df-drift { to { translate: -360px 0; } }
@keyframes df-rise { from { translate: 0 30%; } }
`

const links = [
  ['Home', '/#top'],
  ['For DTC Brands', '/dtcbrands'],
  ['For Amazon Brands', '/#amazon'],
  ['Our Philosophy', '/philosophy'],
  ['FAQ', '/#faq'],
]

// Add the real hrefs here once the contact details are confirmed. Until then,
// the channels remain visible as labels without linking to placeholder addresses.
const contacts = [
  { label: 'Phone', icon: Phone, href: null },
  { label: 'Email', icon: Mail, href: null },
  { label: 'LinkedIn', icon: Linkedin, href: null },
  { label: 'WhatsApp', icon: MessageCircle, href: null },
  { label: 'SMS', icon: MessageSquareText, href: null },
]

export default function SiteFooter() {
  const mainRef = useRef(null)
  const smsRef = useRef(null)
  const ditherRef = useRef(null)
  const fieldRef = useRef(null)
  const frameRef = useRef(0)

  useEffect(() => () => cancelAnimationFrame(frameRef.current), [])

  useLayoutEffect(() => {
    const main = mainRef.current
    const sms = smsRef.current
    const dither = ditherRef.current
    if (!main || !sms || !dither) return undefined

    const alignDitherWithSms = () => {
      const mainBottom = main.getBoundingClientRect().bottom
      const smsBottom = sms.getBoundingClientRect().bottom
      dither.style.setProperty('--df-overlap', `${Math.max(0, mainBottom - smsBottom)}px`)
    }

    alignDitherWithSms()
    const observer = new ResizeObserver(alignDitherWithSms)
    observer.observe(main)
    observer.observe(sms)
    window.addEventListener('resize', alignDitherWithSms)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', alignDitherWithSms)
    }
  }, [])

  function onPointerMove(event) {
    if (event.pointerType !== 'mouse' || !fieldRef.current) return
    const field = fieldRef.current
    const bounds = field.getBoundingClientRect()
    const x = event.clientX - bounds.left
    const y = event.clientY - bounds.top
    cancelAnimationFrame(frameRef.current)
    frameRef.current = requestAnimationFrame(() => {
      field.style.setProperty('--df-x', `${x}px`)
      field.style.setProperty('--df-y', `${y}px`)
      field.classList.add('df-lit')
    })
  }

  function onPointerLeave() {
    cancelAnimationFrame(frameRef.current)
    fieldRef.current?.classList.remove('df-lit')
  }

  return <footer className="site-footer" id="footer">
    <div className="site-footer__main" ref={mainRef}>
      <div className="site-footer__brand">
        <a className="site-footer__logo" href="/" aria-label="Hommio home">
          <span className="site-footer__logo-crop"><img src="/assets/hommio-logo.png" alt="Hommio" /></span>
        </a>
        <p>Hommio is an in-home retention solution provider for CPG brands.</p>
      </div>

      <nav className="site-footer__nav" aria-label="Footer navigation">
        <h2>Explore</h2>
        {links.map(([label, href]) => <a key={label} href={href}>{label}</a>)}
      </nav>

      <div className="site-footer__contact" aria-label="Contact channels">
        <h2>Get in touch</h2>
        <ul>
          {contacts.map(({ label, icon: Icon, href }) => <li key={label} ref={label === 'SMS' ? smsRef : undefined}>
            {href
              ? <a href={href}><Icon aria-hidden="true"/><span>{label}</span></a>
              : <span className="site-footer__contact-label"><Icon aria-hidden="true"/><span>{label}</span></span>}
          </li>)}
        </ul>
      </div>
    </div>

    <div
      className="df-band site-footer__dither"
      ref={ditherRef}
      aria-hidden="true"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <style>{DITHER_STYLES}</style>
      <div ref={fieldRef} className="df-field">
        <div className="df-dots" />
      </div>
      <img className="df-mark site-footer__dither-mark" src="/assets/hommio-logo.png" alt="" />
    </div>

    <div className="site-footer__bottom">
      <span>© 2026 Hommio. All rights reserved.</span>
    </div>
  </footer>
}
