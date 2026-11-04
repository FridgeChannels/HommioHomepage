import './style.css'
export function Checkbox({ label, id, ...props }) { const fieldId = id || props.name || label?.toLowerCase().replaceAll(' ', '-'); return <label className="ui-check" htmlFor={fieldId}><input type="checkbox" id={fieldId} {...props} /><span className="ui-check__box" aria-hidden="true"/><span>{label}</span></label> }
