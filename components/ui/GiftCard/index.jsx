import { Badge } from '../Badge'
import './style.css'
const palettes = { coral: ['#efcbc1', '#692b24'], blue: ['#cad9eb', '#253856'], sage: ['#d7ddc8', '#384531'], lilac: ['#e1d5e8', '#48364d'] }
export function GiftCard({ brand, amount, label = 'A little something for you', tone = 'coral' }) { const colors = palettes[tone] || palettes.coral; return <article className="ui-gift-card" style={{ '--gift-bg': colors[0], '--gift-ink': colors[1] }}><div className="ui-gift-card__top"><Badge tone="neutral">Gifting, made personal</Badge><span className="ui-gift-card__mark">✳</span></div><div className="ui-gift-card__message">{label}</div><div className="ui-gift-card__bottom"><span>{brand}</span><strong>{amount}</strong></div></article> }
