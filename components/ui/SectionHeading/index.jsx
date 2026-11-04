import './style.css'
export function SectionHeading({ eyebrow, title, description, align = 'left' }) { return <div className={`ui-section-heading ui-section-heading--${align}`}>{eyebrow && <span className="ui-section-heading__eyebrow">{eyebrow}</span>}<h2>{title}</h2>{description && <p>{description}</p>}</div> }
