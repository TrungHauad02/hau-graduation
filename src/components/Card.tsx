import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  gradient?: boolean
  glow?: 'amber' | 'teal' | 'cyan' | 'purple' | 'pink' | 'none'
}

export default function Card({
  children,
  className = '',
  hover = true,
  gradient = false,
  glow = 'none'
}: CardProps) {
  const glowClasses = {
    amber: 'glow-amber',
    teal: 'glow-teal',
    cyan: 'glow-cyan',
    purple: 'glow-purple',
    pink: 'glow-pink',
    none: ''
  }

  return (
    <div
      className={`
        rounded-2xl p-6
        ${gradient ? 'card-gradient' : 'glass'}
        ${hover ? 'hover-lift' : ''}
        ${glowClasses[glow]}
        ${className}
      `}
    >
      {children}
    </div>
  )
}
