import type { ReactNode, CSSProperties } from 'react'
import { useInView } from "../../hooks/useAnimations";

interface FadeInSectionProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  duration?: number
}

export default function FadeInSection({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 800,
}: FadeInSectionProps) {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.1 })

  const directionStyles = {
    up: { transform: 'translateY(40px)' },
    down: { transform: 'translateY(-40px)' },
    left: { transform: 'translateX(40px)' },
    right: { transform: 'translateX(-40px)' },
    none: { transform: 'none' },
  }

  const hiddenStyle: CSSProperties = {
    opacity: 0,
    ...directionStyles[direction],
    transition: `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`,
    transitionDelay: `${delay}ms`,
  }

  const visibleStyle: CSSProperties = {
    opacity: 1,
    transform: 'translate(0)',
    transition: `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`,
    transitionDelay: `${delay}ms`,
  }

  return (
    <div
      ref={ref}
      className={className}
      style={isInView ? visibleStyle : hiddenStyle}
    >
      {children}
    </div>
  )
}
