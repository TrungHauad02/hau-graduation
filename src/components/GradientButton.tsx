import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface GradientButtonProps {
  children: ReactNode
  to?: string
  href?: string
  onClick?: () => void
  className?: string
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

export default function GradientButton({
  children,
  to,
  href,
  onClick,
  className = '',
  variant = 'primary',
  size = 'md'
}: GradientButtonProps) {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }

  const variantClasses = {
    primary: 'btn-gradient text-white font-semibold',
    secondary: 'bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm border border-white/20',
    outline: 'bg-transparent border-2 border-teal-500 text-teal-400 hover:bg-teal-500 hover:text-white'
  }

  const baseClasses = `
    inline-flex items-center justify-center gap-2
    rounded-full
    transition-all duration-300 ease-out
    cursor-pointer
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${className}
  `

  if (to) {
    return (
      <Link to={to} className={baseClasses}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={baseClasses}>
        {children}
      </a>
    )
  }

  return (
    <button onClick={onClick} className={baseClasses}>
      {children}
    </button>
  )
}
