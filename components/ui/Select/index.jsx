import './style.css'
export function Select({ label, options = [], id, ...props }) {
  const fieldId = id || props.name || label?.toLowerCase().replaceAll(' ', '-')
  return <div className="ui-field"><label className="ui-label" htmlFor={fieldId}>{label}</label><select className="ui-select" id={fieldId} defaultValue="" {...props}><option value="" disabled>Choose an option</option>{options.map(option => <option key={option} value={option}>{option}</option>)}</select></div>
}
