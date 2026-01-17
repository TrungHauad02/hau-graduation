import type { ReactNode, CSSProperties } from 'react'
import { useTilt3D } from "../../hooks/useAnimations";

interface Tilt3DCardProps {
  children: ReactNode
  className?: string
  intensity?: number
  glowColor?: string
}

export default function Tilt3DCard({
  children,
  className = '',
  intensity = 8,
  glowColor = 'rgba(20, 184, 166, 0.3)',
}: Tilt3DCardProps) {
  const [ref, tilt] = useTilt3D<HTMLDivElement>(intensity)

  const style: CSSProperties = {
    transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(${tilt.scale})`,
    transition: 'transform 0.15s ease-out, box-shadow 0.15s ease-out',
    transformStyle: 'preserve-3d',
    boxShadow: tilt.scale > 1
      ? `0 25px 50px -12px ${glowColor}, 0 0 40px ${glowColor}`
      : `0 10px 40px -10px rgba(0, 0, 0, 0.3)`,
  }

  return (
    <div
      ref={ref}
      className={`cursor-pointer ${className}`}
      style={style}
    >
      {children}
    </div>
  )
}
