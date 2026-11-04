import { Avatar } from '../Avatar'
import './style.css'
export function TestimonialCard({ quote, name, role, company, tone = 'paper' }) { return <figure className={`ui-testimonial ui-testimonial--${tone}`}><div className="ui-testimonial__stars">★★★★★</div><blockquote>“{quote}”</blockquote><figcaption><Avatar name={name} size="sm" /><div><strong>{name}</strong><span>{role} · {company}</span></div></figcaption></figure> }
