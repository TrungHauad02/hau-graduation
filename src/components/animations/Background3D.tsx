import { type ReactNode, type CSSProperties } from 'react'
import { useMousePosition3D, useSmoothValue } from "../../hooks/use3DEffects";

interface Background3DProps {
  children: ReactNode
  className?: string
  intensity?: number
}

/**
 * A 3D background layer that responds to mouse movement.
 * Only affects background/decorative elements, not main content.
 */
export default function Background3D({
  children,
  className = '',
  intensity = 20,
}: Background3DProps) {
  const mouse = useMousePosition3D()
  
  // Smooth the mouse values for natural movement
  const smoothX = useSmoothValue(mouse.normalizedX, 0.05)
  const smoothY = useSmoothValue(mouse.normalizedY, 0.05)

  const translateX = smoothX * intensity
  const translateY = smoothY * intensity

  const style: CSSProperties = {
    transform: `translate3d(${translateX}px, ${translateY}px, 0)`,
    transition: 'transform 0.1s ease-out',
  }

  return (
    <div 
      className={`pointer-events-none ${className}`} 
      style={style}
      aria-hidden="true"
    >
      {children}
    </div>
  )
}
