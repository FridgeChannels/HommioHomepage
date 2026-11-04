import './style.css'
export function Progress({ value = 0, label }) { return <div className="ui-progress-wrap">{label && <div className="ui-progress-label"><span>{label}</span><strong>{value}%</strong></div>}<div className="ui-progress" role="progressbar" aria-valuenow={value} aria-valuemin="0" aria-valuemax="100"><span style={{ width: `${Math.max(0, Math.min(100, value))}%` }} /></div></div> }
