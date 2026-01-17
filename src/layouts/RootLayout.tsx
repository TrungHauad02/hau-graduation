import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import AppRoutes from '../routes/AppRoutes'
import ParticleBackground from '../components/ParticleBackground'
import Footer from '../components/Footer'

const navItems = [
  { path: '/', label: 'Trang Chủ' },
  { path: '/map', label: 'Bản Đồ' },
]

export default function RootLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 relative overflow-x-hidden">
      <ParticleBackground />
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-dark shadow-lg shadow-black/20 border-b border-white/10 backdrop-blur-md p-3">
        <div className="container-custom py-8 md:py-10 px-4 sm:px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center gap-3 group"
            >
              <span className="text-3xl group-hover:animate-bounce transition-transform">🎓</span>
              <div className="hidden sm:flex flex-col">
                <span className="text-xl font-bold gradient-text-gold tracking-wide">
                  Lễ Tốt Nghiệp
                </span>
                <span className="text-xs text-slate-400">HCMUTE 2026</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-5 py-3 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 ${
                    location.pathname === item.path
                      ? 'bg-teal-500/20 text-teal-400 shadow-lg shadow-teal-500/20'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <a
                href="https://360.hcmute.edu.vn/"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-3 px-5 py-3 rounded-full text-sm font-semibold bg-gradient-to-r from-teal-500 to-amber-400 text-white hover:from-teal-400 hover:to-amber-300 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-teal-500/30"
              >
                🌐 Tour 360°
              </a>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2.5 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Navigation */}
          <div 
            className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
              isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <nav className="mt-4 pb-4 border-t border-white/10 pt-5">
              <div className="flex flex-col gap-2">
                {navItems.map((item, index) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`px-4 py-3.5 rounded-xl text-base font-medium transition-all duration-300 ${
                      location.pathname === item.path
                        ? 'bg-teal-500/20 text-teal-400'
                        : 'text-slate-300 hover:text-white hover:bg-white/10'
                    }`}
                    style={{ 
                      transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : '0ms',
                      transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(-20px)',
                      opacity: isMobileMenuOpen ? 1 : 0
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
                <a
                  href="https://360.hcmute.edu.vn/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-3.5 rounded-xl text-base font-semibold bg-gradient-to-r from-teal-500 to-amber-400 text-white text-center mt-2 hover:shadow-lg hover:shadow-teal-500/30 transition-all"
                  style={{ 
                    transitionDelay: isMobileMenuOpen ? `${navItems.length * 50}ms` : '0ms',
                    transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(-20px)',
                    opacity: isMobileMenuOpen ? 1 : 0
                  }}
                >
                  🌐 Tour 360°
                </a>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 pt-32 md:pt-36">
        <AppRoutes />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
