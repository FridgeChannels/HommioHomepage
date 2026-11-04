import './style.css'
export function Textarea({ label, id, ...props }) { const fieldId = id || props.name || label?.toLowerCase().replaceAll(' ', '-'); return <div className="ui-field"><label className="ui-label" htmlFor={fieldId}>{label}</label><textarea className="ui-textarea" id={fieldId} {...props} /></div> }
