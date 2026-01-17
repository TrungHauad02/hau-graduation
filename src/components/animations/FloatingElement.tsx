import type { CSSProperties } from 'react'

interface FloatingElementProps {
  children: React.ReactNode
  className?: string
  duration?: number
  delay?: number
  distance?: number
  direction?: 'y' | 'x' | 'both'
}

export default function FloatingElement({
  children,
  className = '',
  duration = 3,
  delay = 0,
  distance = 15,
  direction = 'y',
}: FloatingElementProps) {
  const animationName = direction === 'y' 
    ? 'float-y' 
    : direction === 'x' 
    ? 'float-x' 
    : 'float-both'

  const style: CSSProperties = {
    animation: `${animationName} ${duration}s ease-in-out infinite`,
    animationDelay: `${delay}s`,
    ['--float-distance' as string]: `${distance}px`,
  }

  return (
    <div className={className} style={style}>
      {children}
    </div>
  )
}
