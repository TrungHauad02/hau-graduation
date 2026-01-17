import { type ReactNode, type CSSProperties } from 'react'
import { useMousePosition3D, useSmoothValue } from '../../hooks/use3DEffects'

interface Rotating3DObjectProps {
  children: ReactNode
  className?: string
  /** Base rotation speed in degrees per second */
  rotationSpeed?: number
  /** How much mouse affects the rotation (0-1) */
  mouseInfluence?: number
  /** Which axes to rotate on */
  axis?: 'x' | 'y' | 'z' | 'xy' | 'xz' | 'yz' | 'xyz'
  /** Reverse rotation direction */
  reverse?: boolean
  /** Size of the 3D object container */
  size?: number
}

/**
 * A 3D rotating object that spins continuously and responds to mouse movement.
 */
export default function Rotating3DObject({
  children,
  className = '',
  rotationSpeed = 20,
  mouseInfluence = 0.3,
  axis = 'xyz',
  reverse = false,
  size = 60,
}: Rotating3DObjectProps) {
  const mouse = useMousePosition3D()
  
  const smoothX = useSmoothValue(mouse.normalizedX, 0.05)
  const smoothY = useSmoothValue(mouse.normalizedY, 0.05)

  const mouseRotateX = smoothY * 30 * mouseInfluence
  const mouseRotateY = smoothX * 30 * mouseInfluence

  // Build animation based on axis
  const getAnimationName = () => {
    switch (axis) {
      case 'x': return 'rotate3d-x'
      case 'y': return 'rotate3d-y'
      case 'z': return 'rotate3d-z'
      case 'xy': return 'rotate3d-xy'
      case 'xz': return 'rotate3d-xz'
      case 'yz': return 'rotate3d-yz'
      case 'xyz': return 'rotate3d-xyz'
      default: return 'rotate3d-xyz'
    }
  }

  const containerStyle: CSSProperties = {
    perspective: '500px',
    perspectiveOrigin: '50% 50%',
    width: size,
    height: size,
  }

  const objectStyle: CSSProperties = {
    transformStyle: 'preserve-3d',
    transform: `rotateX(${mouseRotateX}deg) rotateY(${mouseRotateY}deg)`,
    animation: `${getAnimationName()} ${360 / rotationSpeed}s linear infinite ${reverse ? 'reverse' : 'normal'}`,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }

  return (
    <div 
      className={`pointer-events-none ${className}`}
      style={containerStyle}
      aria-hidden="true"
    >
      <div style={objectStyle}>
        {children}
      </div>
    </div>
  )
}
