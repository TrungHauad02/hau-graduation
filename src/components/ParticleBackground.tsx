interface Particle {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
  color: string
}

// Pre-generated particles for consistent rendering - Teal/Gold theme
const particles: Particle[] = [
  { id: 0, x: 15, y: 20, size: 3, duration: 4, delay: 0, color: '#14b8a6' },
  { id: 1, x: 85, y: 15, size: 4, duration: 5, delay: 1, color: '#fbbf24' },
  { id: 2, x: 45, y: 80, size: 2, duration: 3, delay: 2, color: '#06b6d4' },
  { id: 3, x: 70, y: 45, size: 5, duration: 6, delay: 0.5, color: '#2dd4bf' },
  { id: 4, x: 25, y: 60, size: 3, duration: 4, delay: 1.5, color: '#14b8a6' },
  { id: 5, x: 90, y: 70, size: 4, duration: 5, delay: 2.5, color: '#fbbf24' },
  { id: 6, x: 10, y: 85, size: 2, duration: 3, delay: 3, color: '#06b6d4' },
  { id: 7, x: 55, y: 30, size: 5, duration: 6, delay: 0.3, color: '#2dd4bf' },
  { id: 8, x: 35, y: 10, size: 3, duration: 4, delay: 1.8, color: '#14b8a6' },
  { id: 9, x: 80, y: 55, size: 4, duration: 5, delay: 2.2, color: '#fbbf24' },
  { id: 10, x: 5, y: 40, size: 2, duration: 3, delay: 3.5, color: '#06b6d4' },
  { id: 11, x: 60, y: 90, size: 5, duration: 6, delay: 0.8, color: '#2dd4bf' },
  { id: 12, x: 40, y: 50, size: 3, duration: 4, delay: 1.2, color: '#14b8a6' },
  { id: 13, x: 95, y: 25, size: 4, duration: 5, delay: 2.8, color: '#fbbf24' },
  { id: 14, x: 20, y: 75, size: 2, duration: 3, delay: 3.2, color: '#06b6d4' },
  { id: 15, x: 75, y: 5, size: 5, duration: 6, delay: 0.6, color: '#2dd4bf' },
  { id: 16, x: 50, y: 65, size: 3, duration: 4, delay: 1.6, color: '#14b8a6' },
  { id: 17, x: 30, y: 35, size: 4, duration: 5, delay: 2.4, color: '#fbbf24' },
  { id: 18, x: 65, y: 95, size: 2, duration: 3, delay: 3.8, color: '#06b6d4' },
  { id: 19, x: 12, y: 55, size: 5, duration: 6, delay: 0.2, color: '#2dd4bf' },
]

export default function ParticleBackground() {

  return (
    <div className="particles">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
            opacity: 0.6
          }}
        />
      ))}
    </div>
  )
}
