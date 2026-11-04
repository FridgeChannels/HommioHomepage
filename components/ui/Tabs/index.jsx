import { useState } from 'react'
import './style.css'
export function Tabs({ items, initial = 0, onChange }) { const [active, setActive] = useState(initial); return <div className="ui-tabs" role="tablist">{items.map((item, i) => <button key={item} role="tab" aria-selected={i === active} className={i === active ? 'is-active' : ''} onClick={() => { setActive(i); onChange?.(i) }}>{item}</button>)}</div> }
