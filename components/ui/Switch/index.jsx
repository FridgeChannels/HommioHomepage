import './style.css'
export function Switch({ label, defaultChecked = false }) { return <label className="ui-switch"><span>{label}</span><input type="checkbox" defaultChecked={defaultChecked} /><span className="ui-switch__track"><i /></span></label> }
