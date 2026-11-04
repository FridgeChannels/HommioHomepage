import './style.css'
export function FeatureCard({ number, icon, title, children, link = 'Explore feature' }) { return <article className="ui-feature-card"><div className="ui-feature-card__meta"><span>{number}</span><span className="ui-feature-card__icon">{icon}</span></div><div><h3>{title}</h3><p>{children}</p><a href="#components">{link} <span>↗</span></a></div></article> }
