import { Link } from 'react-router-dom'
import { GRADUATE_INFO, EVENT_INFO } from '../pages/homepage.constants'

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 bg-slate-950/60 backdrop-blur-md p-6">
      <div className="container-custom px-4 sm:px-6 py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr] md:items-start">
          {/* Address Section */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-white mb-3">📍 Địa Chỉ</h3>
            <p className="text-slate-300 max-w-md md:max-w-lg">
              {GRADUATE_INFO.university}
            </p>
            <p className="text-teal-400 font-medium mt-2 text-sm">
              {EVENT_INFO.address}
            </p>
            <a
              href={EVENT_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Xem trên Google Maps
            </a>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h4 className="text-sm uppercase tracking-[0.25em] text-slate-400 mb-4">
              Truy cập nhanh
            </h4>
            <div className="flex flex-wrap md:flex-col gap-4 md:gap-3 justify-center md:justify-start">
              <Link to="/" className="text-slate-300 hover:text-teal-400 transition-colors">
                Trang Chủ
              </Link>
              <Link to="/map" className="text-slate-300 hover:text-teal-400 transition-colors">
                Bản Đồ
              </Link>
              <a
                href="https://360.hcmute.edu.vn/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-teal-400 transition-colors"
              >
                Tour 360°
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-teal-500/50 to-transparent my-10" />

        {/* Copyright */}
        <div className="text-center">
          <p className="text-slate-500 text-sm">
            Made with ❤️ by {GRADUATE_INFO.name}
          </p>
          <p className="text-slate-600 text-xs mt-2">
            © 2026 Graduation Invitation
          </p>
        </div>
      </div>
    </footer>
  )
}
