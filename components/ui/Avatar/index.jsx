import './style.css'
const colors = ['lilac', 'peach', 'sage', 'blue']
export function Avatar({ name = 'Guest', src, size = 'md', className = '' }) {
  const initials = name.split(' ').map(part => part[0]).slice(0, 2).join('').toUpperCase()
  return src ? <img className={`ui-avatar ui-avatar--${size} ${className}`} src={src} alt={name} /> : <span className={`ui-avatar ui-avatar--${size} ui-avatar--${colors[name.length % colors.length]} ${className}`} aria-label={name}>{initials}</span>
}
