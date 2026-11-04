import './style.css'
export function Divider({ label }) { return <div className={`ui-divider ${label ? 'has-label' : ''}`}><span>{label}</span></div> }
