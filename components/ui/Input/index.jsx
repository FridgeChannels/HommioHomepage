import './style.css'
export function Input({ label, hint, error, id, ...props }) {
  const fieldId = id || props.name || label?.toLowerCase().replaceAll(' ', '-')
  return <div className="ui-field"><label className="ui-label" htmlFor={fieldId}>{label}</label><input className={`ui-input ${error ? 'is-error' : ''}`} id={fieldId} {...props} />{error ? <span className="ui-error">{error}</span> : hint && <span className="ui-hint">{hint}</span>}</div>
}
