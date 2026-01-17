import { useState, useEffect, lazy, Suspense } from 'react'
import Background3D from '../components/animations/Background3D'
import FloatingElement from '../components/animations/FloatingElement'
import FadeInSection from '../components/animations/FadeInSection'
import GraduationCap from '../components/GraduationCap'
import GradientButton from '../components/GradientButton'

// Lazy load the 3D viewer for better performance
const Model3DViewer = lazy(() => import('../components/animations/Model3DViewer'))

const MODEL_PATH_LEFT = '/aqua-anime-chibi-model/source/testupload.glb'
const MODEL_PATH_RIGHT = '/pantagruel__anime_chibi_model.glb'

import {
  GRADUATE_INFO,
  EVENT_INFO,
  INVITATION_LETTER,
  THANK_YOU_MESSAGE,
} from './homepage.constants'

export default function HomePage() {
  return (
    <div className="relative">
      {/* FIXED 3D Model - Sticky on LEFT side, always visible */}
      <div className="fixed left-0 top-0 h-screen w-[350px] z-10">
        <div className="absolute inset-0 flex items-center justify-center opacity-60">
          <Suspense fallback={null}>
            <Model3DViewer 
              modelPath={MODEL_PATH_LEFT}
              scale={1.2}
              autoRotate={false}
              playAnimation={true}
              cameraPosition={[0, 0, 8]}
              interactive={true}
            />
          </Suspense>
        </div>
      </div>

      {/* FIXED 3D Model - Sticky on RIGHT side, hidden on mobile */}
      <div className="fixed right-0 top-0 h-screen w-[350px] z-10 hidden md:block">
        <div className="absolute inset-0 flex items-center justify-center opacity-60">
          <Suspense fallback={null}>
            <Model3DViewer 
              modelPath={MODEL_PATH_RIGHT}
              scale={1.2}
              autoRotate={false}
              playAnimation={true}
              cameraPosition={[0, 0, 8]}
              interactive={true}
            />
          </Suspense>
        </div>
      </div>

      {/* Background gradient orbs - Fixed */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <Background3D
          intensity={40}
          className="absolute top-[20%] left-[20%]"
        >
          <div className="w-64 h-64 bg-teal-500/5 rounded-full blur-3xl" />
        </Background3D>

        <Background3D
          intensity={-50}
          className="absolute bottom-[30%] right-[20%]"
        >
          <div className="w-80 h-80 bg-amber-500/5 rounded-full blur-3xl" />
        </Background3D>

        <Background3D intensity={35} className="absolute top-[50%] left-[30%]">
          <div className="w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl" />
        </Background3D>
      </div>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 py-16 overflow-hidden">
        {/* Floating emojis */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <Background3D intensity={30} className="absolute top-20 left-[45%]">
            <FloatingElement duration={4} distance={20}>
              <span className="text-4xl opacity-15">✨</span>
            </FloatingElement>
          </Background3D>

          <Background3D intensity={-25} className="absolute bottom-[40%] left-[40%]">
            <FloatingElement duration={5} delay={1} distance={15}>
              <span className="text-3xl opacity-15">🎓</span>
            </FloatingElement>
          </Background3D>
        </div>

        {/* Main Content - Static, easy to read */}
        <FadeInSection delay={100} direction="up">
          <FloatingElement duration={5} distance={8}>
            <GraduationCap
              size={120}
              className="mx-auto drop-shadow-2xl mb-8"
            />
          </FloatingElement>
        </FadeInSection>

        <FadeInSection delay={200} direction="up">
          <p className="text-teal-400 text-sm md:text-base tracking-[0.3em] uppercase font-medium mb-4">
            Thư Mời Tham Dự
          </p>
        </FadeInSection>

        <FadeInSection delay={400} direction="up">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-4 bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300 bg-clip-text text-transparent">
            Lễ Tốt Nghiệp
          </h1>
        </FadeInSection>

        <FadeInSection delay={600} direction="up">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-amber-500/50" />
            <p className="text-2xl md:text-3xl lg:text-4xl font-serif text-white">
              {GRADUATE_INFO.name}
            </p>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-amber-500/50" />
          </div>
        </FadeInSection>

        <FadeInSection delay={800} direction="up">
          <p className="text-slate-400 text-base md:text-lg max-w-xl mx-auto">
            {GRADUATE_INFO.university}
          </p>
        </FadeInSection>

        {/* Scroll indicator */}
        <FadeInSection delay={1200} direction="up" className="mt-16">
          <div className="flex flex-col items-center gap-2 animate-bounce">
            <span className="text-slate-500 text-sm">
              Cuộn xuống xem tiếp nè
            </span>
            <div className="w-6 h-10 rounded-full border-2 border-slate-600 flex justify-center pt-2">
              <div className="w-1.5 h-2.5 bg-teal-500 rounded-full" />
            </div>
          </div>
        </FadeInSection>
      </section>

      {/* INVITATION LETTER SECTION */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 pointer-events-none">
          <Background3D intensity={25} className="absolute top-[40%] right-[5%]">
            <div className="w-48 h-48 bg-amber-500/5 rounded-full blur-3xl" />
          </Background3D>
        </div>

        <FadeInSection delay={100} direction="up">
          <div className="text-center mb-12">
            <p className="text-teal-400 text-sm tracking-[0.2em] uppercase mb-3">
              Thư Mời
            </p>
            <h2 className="text-3xl md:text-4xl font-serif text-white">
              Hé lô anh em
            </h2>
          </div>
        </FadeInSection>

        <FadeInSection delay={200} direction="up">
          <div className="relative max-w-3xl mx-auto p-8 md:p-12 bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-amber-500/20">
            {/* Decorative corners */}
            <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-amber-500/50" />
            <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-amber-500/50" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-amber-500/50" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-amber-500/50" />

            {/* Letter header */}
            <div className="flex justify-center mb-8">
              <div className="flex items-center gap-4">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-amber-500/50" />
                <span className="text-3xl">🎓</span>
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-amber-500/50" />
              </div>
            </div>

            {/* Greeting */}
            <p className="text-xl md:text-2xl text-amber-400 font-serif italic mb-6">
              {INVITATION_LETTER.greeting}
            </p>

            {/* Paragraphs */}
            <div className="space-y-5 mb-8">
              {INVITATION_LETTER.paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-slate-300 text-base md:text-lg leading-relaxed first-letter:text-2xl first-letter:text-amber-400 first-letter:font-serif"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Closing */}
            <div className="text-right mt-10">
              <p className="text-slate-400 italic mb-3">
                {INVITATION_LETTER.closing}
              </p>
              <p className="text-2xl md:text-3xl font-serif bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 bg-clip-text text-transparent font-bold">
                {GRADUATE_INFO.name}
              </p>
            </div>

            {/* Decorative seal */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-lg border-2 border-amber-400/50">
                <span className="text-white text-xl">✦</span>
              </div>
            </div>
          </div>
        </FadeInSection>
      </section>

      {/* COUNTDOWN SECTION */}
      <section className="relative py-16 px-4 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 pointer-events-none">
          <Background3D intensity={25} className="absolute top-[40%] right-[15%]">
            <div className="w-48 h-48 bg-teal-500/5 rounded-full blur-3xl" />
          </Background3D>
        </div>

        <FadeInSection delay={100} direction="up">
          <div className="text-center mb-10">
            <FloatingElement duration={5} distance={5}>
              <span className="text-4xl mb-4 block">⏳</span>
            </FloatingElement>
            <p className="text-slate-400 text-sm tracking-[0.2em] uppercase mb-2">
              Đếm Ngược
            </p>
            <h2 className="text-2xl md:text-3xl font-serif text-white">
              Đến Ngày Nhận Bằng Nè
            </h2>
          </div>
        </FadeInSection>

        <FadeInSection delay={200} direction="up">
          <CountdownDisplay />
        </FadeInSection>
      </section>

      {/* EVENT DETAILS SECTION */}
      <section className="relative py-16 px-4 max-w-5xl mx-auto overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 pointer-events-none">
          <Background3D intensity={30} className="absolute top-[50%] left-[20%]">
            <div className="w-56 h-56 bg-cyan-500/5 rounded-full blur-3xl" />
          </Background3D>
        </div>

        <FadeInSection delay={100} direction="up">
          <div className="text-center mb-10">
            <p className="text-teal-400 text-sm tracking-[0.2em] uppercase mb-3">
              Chi Tiết Sự Kiện
            </p>
            <h2 className="text-3xl md:text-4xl font-serif text-white">
              Thông Tin Buổi Lễ
            </h2>
          </div>
        </FadeInSection>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: "📅", label: "Ngày", value: EVENT_INFO.dateString },
            { icon: "⏰", label: "Thời gian", value: EVENT_INFO.time },
            { icon: "📍", label: "Địa điểm", value: EVENT_INFO.venue },
            { icon: "👔", label: "Trang phục", value: EVENT_INFO.dressCode },
          ].map((detail, index) => (
            <FadeInSection
              key={detail.label}
              delay={150 + index * 100}
              direction="up"
            >
              <div className="p-5 text-center h-full bg-slate-900/50 backdrop-blur-sm rounded-xl border border-teal-500/20 hover:border-teal-500/40 transition-colors">
                <div className="text-3xl mb-3">{detail.icon}</div>
                <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">
                  {detail.label}
                </p>
                <p className="text-white font-medium text-sm">{detail.value}</p>
              </div>
            </FadeInSection>
          ))}
        </div>

        {/* Address */}
        <FadeInSection delay={550} direction="up">
          <div className="mt-4 p-5 text-center bg-slate-900/50 backdrop-blur-sm rounded-xl border border-teal-500/20">
            <div className="text-2xl mb-2">🗺️</div>
            <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">
              Địa chỉ
            </p>
            <p className="text-teal-400 font-medium text-sm">
              {EVENT_INFO.address}
            </p>
          </div>
        </FadeInSection>

        {/* Action buttons */}
        <FadeInSection delay={650} direction="up" className="mt-10">
          <div className="flex flex-wrap justify-center gap-4">
            <GradientButton href={EVENT_INFO.googleMapsUrl}>
              📍 Xem Google Maps
            </GradientButton>
            <GradientButton href={EVENT_INFO.tour360Url} variant="secondary">
              🌐 Tour 360°
            </GradientButton>
          </div>
        </FadeInSection>
      </section>

      {/* THANK YOU SECTION */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 pointer-events-none">
          <Background3D intensity={35} className="absolute top-[20%] left-[25%]">
            <div className="w-72 h-72 bg-teal-500/5 rounded-full blur-3xl" />
          </Background3D>
          <Background3D intensity={-40} className="absolute bottom-[20%] right-[20%]">
            <div className="w-64 h-64 bg-amber-500/5 rounded-full blur-3xl" />
          </Background3D>
        </div>

        <FadeInSection delay={100} direction="up">
          <div className="relative max-w-4xl mx-auto">
            <div className="p-8 md:p-12 bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-teal-500/20">
              <div className="text-center">
                <span className="text-5xl mb-6 block">💝</span>
                <h2 className="text-3xl md:text-4xl font-serif mb-8 bg-gradient-to-r from-teal-400 via-cyan-300 to-teal-400 bg-clip-text text-transparent">
                  {THANK_YOU_MESSAGE.title}
                </h2>

                <div className="space-y-5 mb-10">
                  {THANK_YOU_MESSAGE.content.map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-slate-300 text-base md:text-lg leading-relaxed"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                <div className="relative px-8 py-4">
                  <span className="absolute -left-2 top-0 text-4xl text-amber-500/30">
                    "
                  </span>
                  <p className="text-amber-400/80 italic text-base md:text-lg">
                    {THANK_YOU_MESSAGE.quote}
                  </p>
                  <span className="absolute -right-2 bottom-0 text-4xl text-amber-500/30">
                    "
                  </span>
                </div>

                <div className="flex justify-center gap-3 mt-8">
                  <span className="w-2 h-2 rounded-full bg-teal-500/50" />
                  <span className="w-2 h-2 rounded-full bg-amber-500/50" />
                  <span className="w-2 h-2 rounded-full bg-cyan-500/50" />
                </div>
              </div>
            </div>
          </div>
        </FadeInSection>
      </section>

      {/* FINAL GREETING SECTION */}
      <section className="relative py-16 px-4 text-center overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 pointer-events-none">
          <Background3D intensity={30} className="absolute top-[40%] left-[30%]">
            <div className="w-64 h-64 bg-teal-500/5 rounded-full blur-3xl" />
          </Background3D>
        </div>

        <FadeInSection delay={100} direction="up">
          <div className="max-w-2xl mx-auto">
            <FloatingElement duration={4} distance={8}>
              <span className="text-5xl mb-6 block">🎓</span>
            </FloatingElement>
            <p className="text-xl md:text-2xl font-serif text-slate-300 mb-4">
              Hẹn gặp ae tại buổi lễ!
            </p>
            <p className="text-3xl md:text-4xl font-serif bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 bg-clip-text text-transparent font-bold">
              {GRADUATE_INFO.name}
            </p>

            <div className="flex items-center justify-center gap-3 mt-8">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-teal-500/50" />
              <span className="text-teal-500">✦</span>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-teal-500/50" />
            </div>
          </div>
        </FadeInSection>
      </section>

      {/* MAP NAVIGATION SECTION */}
      <section className="relative py-16 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <Background3D intensity={25} className="absolute top-[30%] right-[25%]">
            <div className="w-56 h-56 bg-cyan-500/5 rounded-full blur-3xl" />
          </Background3D>
        </div>

        <FadeInSection delay={100} direction="up">
          <div className="max-w-2xl mx-auto">
            <FloatingElement duration={4} distance={8}>
              <span className="text-5xl mb-6 block">🗺️</span>
            </FloatingElement>
            <p className="text-xl md:text-2xl font-serif text-slate-300 mb-4">
              Xem bản đồ chi tiết đến địa điểm
            </p>
            <p className="text-slate-400 text-base mb-8">
              Nhấn vào nút bên dưới để xem hướng dẫn đường đi nhé!
            </p>
            <a
              href="/map"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-white font-medium rounded-xl transition-all duration-300 shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 hover:scale-105"
            >
              <span>📍</span>
              <span>Xem Bản Đồ</span>
            </a>
          </div>
        </FadeInSection>
      </section>
    </div>
  );
}

/* COUNTDOWN DISPLAY COMPONENT */
function CountdownDisplay() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const targetDate = new Date(EVENT_INFO.date).getTime()

    const updateCountdown = () => {
      const now = Date.now()
      const difference = targetDate - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        })
      }
    }

    updateCountdown()
    const timer = setInterval(updateCountdown, 1000)
    return () => clearInterval(timer)
  }, [])

  const units = [
    { label: 'Ngày', value: timeLeft.days },
    { label: 'Giờ', value: timeLeft.hours },
    { label: 'Phút', value: timeLeft.minutes },
    { label: 'Giây', value: timeLeft.seconds },
  ]

  return (
    <div className="flex justify-center gap-3 md:gap-5">
      {units.map((unit) => (
        <div
          key={unit.label}
          className="p-4 md:p-6 min-w-[70px] md:min-w-[90px] text-center bg-slate-900/50 backdrop-blur-sm rounded-xl border border-teal-500/20"
        >
          <span className="block text-2xl md:text-4xl font-bold bg-gradient-to-b from-white to-slate-300 bg-clip-text text-transparent tabular-nums">
            {String(unit.value).padStart(2, '0')}
          </span>
          <span className="text-xs md:text-sm text-slate-500 uppercase tracking-wider mt-1 block">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  )
}
