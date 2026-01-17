import { type CSSProperties } from 'react'
import { useMousePosition3D, useSmoothValue } from '../../hooks/use3DEffects'

interface Diamond3DProps {
  className?: string
  /** Size of the diamond in pixels */
  size?: number
  /** Color of the diamond */
  color?: string
  /** Rotation speed in seconds for full rotation */
  rotationDuration?: number
  /** How much mouse affects the rotation */
  mouseInfluence?: number
  /** Reverse rotation */
  reverse?: boolean
}

/**
 * A 3D rotating diamond/octahedron that responds to mouse movement.
 */
export default function Diamond3D({
  className = '',
  size = 40,
  color = 'rgba(251, 191, 36, 0.5)',
  rotationDuration = 15,
  mouseInfluence = 0.5,
  reverse = false,
}: Diamond3DProps) {
  const mouse = useMousePosition3D()
  
  const smoothX = useSmoothValue(mouse.normalizedX, 0.03)
  const smoothY = useSmoothValue(mouse.normalizedY, 0.03)

  const mouseRotateX = smoothY * 45 * mouseInfluence
  const mouseRotateY = smoothX * 45 * mouseInfluence

  const containerStyle: CSSProperties = {
    perspective: '600px',
    perspectiveOrigin: '50% 50%',
    width: size,
    height: size,
  }

  const diamondStyle: CSSProperties = {
    position: 'relative',
    width: '100%',
    height: '100%',
    transformStyle: 'preserve-3d',
    transform: `rotateX(${mouseRotateX}deg) rotateY(${mouseRotateY}deg)`,
    animation: `rotate3d-y ${rotationDuration}s linear infinite ${reverse ? 'reverse' : 'normal'}`,
  }

  const halfSize = size / 2
  
  // Create triangular faces for diamond shape
  const triangleStyle = (rotateY: number, isTop: boolean): CSSProperties => ({
    position: 'absolute',
    width: 0,
    height: 0,
    left: '50%',
    top: isTop ? 0 : '50%',
    transform: `translateX(-50%) rotateY(${rotateY}deg) ${isTop ? '' : 'rotateX(180deg)'}`,
    transformOrigin: 'center bottom',
    borderLeft: `${halfSize}px solid transparent`,
    borderRight: `${halfSize}px solid transparent`,
    borderBottom: `${halfSize}px solid ${color}`,
    opacity: 0.3,
  })

  return (
    <div 
      className={`pointer-events-none ${className}`}
      style={containerStyle}
      aria-hidden="true"
    >
      <div style={diamondStyle}>
        {/* Top pyramid */}
        <div style={triangleStyle(0, true)} />
        <div style={triangleStyle(90, true)} />
        <div style={triangleStyle(180, true)} />
        <div style={triangleStyle(270, true)} />
        {/* Bottom pyramid */}
        <div style={triangleStyle(0, false)} />
        <div style={triangleStyle(90, false)} />
        <div style={triangleStyle(180, false)} />
        <div style={triangleStyle(270, false)} />
      </div>
    </div>
  )
}
