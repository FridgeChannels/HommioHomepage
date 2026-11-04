import './style.css'
export function Button({ variant = 'primary', size = 'md', children, className = '', ...props }) {
  return <button className={`ui-button ui-button--${variant} ui-button--${size} ${className}`} {...props}>{children}</button>
}
