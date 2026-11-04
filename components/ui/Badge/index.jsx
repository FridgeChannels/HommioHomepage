import './style.css'
export function Badge({ tone = 'blue', children, className = '' }) { return <span className={`ui-badge ui-badge--${tone} ${className}`}>{children}</span> }
