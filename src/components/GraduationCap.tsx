interface GraduationCapProps {
  className?: string
  size?: number
}

export default function GraduationCap({ className = '', size = 120 }: GraduationCapProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Graduation Cap Base */}
      <defs>
        <linearGradient id="capGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#14b8a6" />
          <stop offset="50%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="50%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
      </defs>
      
      {/* Cap top (mortarboard) */}
      <polygon
        points="50,20 90,40 50,60 10,40"
        fill="url(#capGradient)"
        className="drop-shadow-lg"
      />
      
      {/* Cap base/rim */}
      <ellipse
        cx="50"
        cy="55"
        rx="25"
        ry="8"
        fill="#1e293b"
        stroke="url(#goldGradient)"
        strokeWidth="2"
      />
      
      {/* Cap body */}
      <path
        d="M25 55 L25 70 Q50 85 75 70 L75 55"
        fill="#1e293b"
        stroke="url(#goldGradient)"
        strokeWidth="1"
      />
      
      {/* Button on top */}
      <circle
        cx="50"
        cy="40"
        r="4"
        fill="url(#goldGradient)"
        className="animate-pulse"
      />
      
      {/* Tassel string */}
      <path
        d="M50 40 Q60 50 65 65 Q68 75 70 85"
        stroke="url(#goldGradient)"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      
      {/* Tassel end */}
      <ellipse
        cx="70"
        cy="88"
        rx="4"
        ry="6"
        fill="url(#goldGradient)"
      />
      
      {/* Sparkles */}
      <circle cx="20" cy="25" r="2" fill="#fbbf24" className="animate-pulse" />
      <circle cx="80" cy="30" r="1.5" fill="#14b8a6" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
      <circle cx="85" cy="55" r="1" fill="#06b6d4" className="animate-pulse" style={{ animationDelay: '1s' }} />
      <circle cx="15" cy="50" r="1.5" fill="#2dd4bf" className="animate-pulse" style={{ animationDelay: '0.7s' }} />
    </svg>
  )
}
