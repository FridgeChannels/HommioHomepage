import { Badge } from '../Badge'
import './style.css'
export function StatCard({ label, value, change, tone = 'paper' }) { return <div className={`ui-stat-card ui-stat-card--${tone}`}><span>{label}</span><strong>{value}</strong>{change && <Badge tone="sage">↗ {change}</Badge>}</div> }
