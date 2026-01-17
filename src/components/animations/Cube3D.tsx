import { type CSSProperties } from 'react'
import { useMousePosition3D, useSmoothValue } from '../../hooks/use3DEffects'

interface Cube3DProps {
  className?: string
  /** Size of the cube in pixels */
  size?: number
  /** Color of the cube edges */
  color?: string
  /** Rotation speed in seconds for full rotation */
  rotationDuration?: number
  /** How much mouse affects the rotation */
  mouseInfluence?: number
  /** Reverse rotation */
  reverse?: boolean
  /** Opacity of the faces */
  faceOpacity?: number
}

/**
 * A 3D rotating cube that responds to mouse movement.
 */
export default function Cube3D({
  className = '',
  size = 40,
  color = 'rgba(20, 184, 166, 0.5)',
  rotationDuration = 20,
  mouseInfluence = 0.5,
  reverse = false,
  faceOpacity = 0.1,
}: Cube3DProps) {
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

  const cubeStyle: CSSProperties = {
    position: 'relative',
    width: '100%',
    height: '100%',
    transformStyle: 'preserve-3d',
    transform: `rotateX(${mouseRotateX}deg) rotateY(${mouseRotateY}deg)`,
    animation: `rotate3d-xyz ${rotationDuration}s linear infinite ${reverse ? 'reverse' : 'normal'}`,
  }

  const faceStyle: CSSProperties = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    border: `1px solid ${color}`,
    backgroundColor: color,
    opacity: faceOpacity,
    backfaceVisibility: 'visible',
  }

  const halfSize = size / 2

  return (
    <div 
      className={`pointer-events-none ${className}`}
      style={containerStyle}
      aria-hidden="true"
    >
      <div style={cubeStyle}>
        <div style={{ ...faceStyle, transform: `translateZ(${halfSize}px)` }} />
        <div style={{ ...faceStyle, transform: `rotateY(180deg) translateZ(${halfSize}px)` }} />
        <div style={{ ...faceStyle, transform: `rotateY(90deg) translateZ(${halfSize}px)` }} />
        <div style={{ ...faceStyle, transform: `rotateY(-90deg) translateZ(${halfSize}px)` }} />
        <div style={{ ...faceStyle, transform: `rotateX(90deg) translateZ(${halfSize}px)` }} />
        <div style={{ ...faceStyle, transform: `rotateX(-90deg) translateZ(${halfSize}px)` }} />
      </div>
    </div>
  )
}
