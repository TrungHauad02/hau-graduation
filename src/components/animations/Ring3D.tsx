import { type CSSProperties } from 'react'
import { useMousePosition3D, useSmoothValue } from '../../hooks/use3DEffects'

interface Ring3DProps {
  className?: string
  /** Size of the ring in pixels */
  size?: number
  /** Color of the ring */
  color?: string
  /** Rotation speed in seconds for full rotation */
  rotationDuration?: number
  /** How much mouse affects the rotation */
  mouseInfluence?: number
  /** Reverse rotation */
  reverse?: boolean
  /** Number of segments in the ring */
  segments?: number
}

/**
 * A 3D rotating ring that responds to mouse movement.
 */
export default function Ring3D({
  className = '',
  size = 50,
  color = 'rgba(6, 182, 212, 0.6)',
  rotationDuration = 12,
  mouseInfluence = 0.5,
  reverse = false,
  segments = 12,
}: Ring3DProps) {
  const mouse = useMousePosition3D()
  
  const smoothX = useSmoothValue(mouse.normalizedX, 0.03)
  const smoothY = useSmoothValue(mouse.normalizedY, 0.03)

  const mouseRotateX = smoothY * 60 * mouseInfluence
  const mouseRotateY = smoothX * 60 * mouseInfluence

  const containerStyle: CSSProperties = {
    perspective: '600px',
    perspectiveOrigin: '50% 50%',
    width: size,
    height: size,
  }

  const ringStyle: CSSProperties = {
    position: 'relative',
    width: '100%',
    height: '100%',
    transformStyle: 'preserve-3d',
    transform: `rotateX(${mouseRotateX + 70}deg) rotateY(${mouseRotateY}deg)`,
    animation: `rotate3d-z ${rotationDuration}s linear infinite ${reverse ? 'reverse' : 'normal'}`,
  }

  const segmentElements = []
  const angleStep = 360 / segments
  const radius = size / 2

  for (let i = 0; i < segments; i++) {
    const angle = i * angleStep
    const segmentStyle: CSSProperties = {
      position: 'absolute',
      width: size * 0.15,
      height: size * 0.15,
      borderRadius: '50%',
      backgroundColor: color,
      left: '50%',
      top: '50%',
      transform: `rotateZ(${angle}deg) translateX(${radius * 0.7}px) translateY(-50%)`,
      boxShadow: `0 0 10px ${color}`,
    }
    segmentElements.push(<div key={i} style={segmentStyle} />)
  }

  return (
    <div 
      className={`pointer-events-none ${className}`}
      style={containerStyle}
      aria-hidden="true"
    >
      <div style={ringStyle}>
        {segmentElements}
      </div>
    </div>
  )
}
