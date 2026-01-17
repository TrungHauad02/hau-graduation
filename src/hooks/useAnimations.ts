import { useState, useEffect, useRef, type RefObject } from 'react'

// ============================================
// useInView - Detect when element is in viewport
// ============================================
interface UseInViewOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
}

export function useInView<T extends HTMLElement>(
  options: UseInViewOptions = {}
): [RefObject<T | null>, boolean] {
  const { threshold = 0.1, rootMargin = '0px', triggerOnce = true } = options
  const ref = useRef<T | null>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          if (triggerOnce) observer.disconnect()
        } else if (!triggerOnce) {
          setIsInView(false)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold, rootMargin, triggerOnce])

  return [ref, isInView]
}

// ============================================
// useTilt3D - 3D tilt effect based on mouse
// ============================================
interface Tilt3D {
  rotateX: number
  rotateY: number
  scale: number
}

export function useTilt3D<T extends HTMLElement>(intensity: number = 10): [RefObject<T | null>, Tilt3D] {
  const ref = useRef<T | null>(null)
  const [tilt, setTilt] = useState<Tilt3D>({ rotateX: 0, rotateY: 0, scale: 1 })

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const mouseX = e.clientX - centerX
      const mouseY = e.clientY - centerY

      const rotateY = (mouseX / (rect.width / 2)) * intensity
      const rotateX = -(mouseY / (rect.height / 2)) * intensity

      setTilt({ rotateX, rotateY, scale: 1.02 })
    }

    const handleMouseLeave = () => {
      setTilt({ rotateX: 0, rotateY: 0, scale: 1 })
    }

    element.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      element.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [intensity])

  return [ref, tilt]
}
