import classNames from 'classnames'

import './Button.css'

export function Button({ variant = 'primary', size = 'md', icon, children, className, ...props }) {
  return (
    <button
      className={classNames('salon-button', `salon-button--${variant}`, `salon-button--${size}`, className)}
      {...props}
    >
      {children}
      {icon && <span className="salon-button__icon">{icon}</span>}
    </button>
  )
}

