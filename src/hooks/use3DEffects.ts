import { useState, useEffect, useRef } from 'react'

// ============================================
// useMousePosition3D - Global mouse tracking for 3D effects
// ============================================
interface Mouse3DPosition {
  x: number
  y: number
  normalizedX: number // -1 to 1
  normalizedY: number // -1 to 1
}

export function useMousePosition3D(): Mouse3DPosition {
  const [position, setPosition] = useState<Mouse3DPosition>({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
  })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const normalizedX = (e.clientX / window.innerWidth - 0.5) * 2
      const normalizedY = (e.clientY / window.innerHeight - 0.5) * 2

      setPosition({
        x: e.clientX,
        y: e.clientY,
        normalizedX,
        normalizedY,
      })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return position
}

// ============================================
// useSmoothValue - Smooth interpolation for values
// ============================================
export function useSmoothValue(target: number, smoothing: number = 0.1): number {
  const [value, setValue] = useState(target)
  const frameRef = useRef<number | null>(null)

  useEffect(() => {
    const animate = () => {
      setValue((current) => {
        const diff = target - current
        if (Math.abs(diff) < 0.001) return target
        return current + diff * smoothing
      })
      frameRef.current = requestAnimationFrame(animate)
    }

    frameRef.current = requestAnimationFrame(animate)
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [target, smoothing])

  return value
}
