import { useState } from 'react'
import './style.css'
export function SegmentedControl({ items, initial = 0 }) { const [active, setActive] = useState(initial); return <div className="ui-segmented">{items.map((item, i) => <button key={item} className={i === active ? 'is-active' : ''} onClick={() => setActive(i)}>{item}</button>)}</div> }
