import './style.css'
export function Card({ children, tone = 'paper', className = '', ...props }) { return <div className={`ui-card ui-card--${tone} ${className}`} {...props}>{children}</div> }
