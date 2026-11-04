import './style.css'
export function LogoCloud({ logos = ['Northstar', 'Morrow', 'daybreak', 'goodwell', 'Common Ground'] }) { return <div className="ui-logo-cloud" aria-label="Trusted by teams at leading companies">{logos.map((logo, i) => <span key={logo} className={`ui-logo-cloud__logo ui-logo-cloud__logo--${i % 3}`}>{logo}</span>)}</div> }
