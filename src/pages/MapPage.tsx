import { Suspense, lazy } from 'react'
import FadeInSection from '../components/animations/FadeInSection'
import Tilt3DCard from '../components/animations/Tilt3DCard'
import Background3D from '../components/animations/Background3D'
import Card from '../components/Card'
import GradientButton from '../components/GradientButton'
import { GRADUATE_INFO, EVENT_INFO } from './homepage.constants'

// Lazy load the 3D viewer for better performance
const Model3DViewer = lazy(() => import('../components/animations/Model3DViewer'))

const MODEL_PATH_LEFT = '/aqua-anime-chibi-model/source/testupload.glb'
const MODEL_PATH_RIGHT = '/pantagruel__anime_chibi_model.glb'

interface Location {
  id: string
  name: string
  description: string
  icon: string
  color: 'amber' | 'pink' | 'purple' | 'none'
  tips: string[]
}

const locations: Location[] = [
  {
    id: "main-hall",
    name: "Hội Trường Lớn",
    description: "Nơi diễn ra lễ tốt nghiệp chính thức.",
    icon: "🎓",
    color: "amber",
    tips: ["Nằm ở thư viện khu A sau lưng tòa nhà chính"],
  },
  {
    id: "parking",
    name: "Bãi Đỗ Xe",
    description: "Khu vực đỗ xe miễn phí dành cho khách.",
    icon: "🅿️",
    color: "pink",
    tips: [
      "Bãi giữ xe khu A: Đi vào cổng chính rẻ phải",
      "Bãi giữ xe khu E: Trên đường Võ Văn Ngân, cổng vào kế bên quán cà phê LastMinutes.",
      "Bãi giữ xe khu B,C: Trên đường Lê Văn Chí bên phải trường, kế bên cổng vào Ký túc xá.",
      "Bãi giữ xe CoopMart: Hơi xa, bên kia đường của ngã tư Thủ Đức.",
    ],
  },
  {
    id: "canteen",
    name: "Căn Tin",
    description: "Khu vực ăn uống.",
    icon: "🍽️",
    color: "purple",
    tips: [
      "Nằm ở bên trái tòa trung tâm.",
      "Từ cổng chính đi vào sẽ nằm trên đường bên trái.",
      "Đối diện cổng trường có FamilyMart nhá.",
    ],
  },
  {
    id: "toilet",
    name: "Khu Nhà Vệ Sinh",
    description: "Tòa nhà nào cũng sẽ có nhà vệ sinh nhá.",
    icon: " 🚻",
    color: "amber",
    tips: [
      "Trong tòa nhà trung tâm thì bên trái + bên phải tòa nhà ở tầng nào cũng có nvs.",
      "Trong thư viện khu A thì bên phải thư viện tầng 1 là nvs Nam, tầng 2 là là nvs Nữ.",
    ],
  },
];

export default function MapPage() {
  return (
    <div className="relative">
      {/* FIXED 3D Model - Sticky on LEFT side, hidden on mobile (shown on desktop) */}
      <div className="fixed left-0 top-0 h-screen w-[350px] z-10 hidden md:block">
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

      {/* FIXED 3D Model - Sticky on RIGHT side, shown on mobile (model 2), shown on desktop */}
      {/* On mobile: smaller size to allow scrolling */}
      <div className="fixed right-0 top-0 h-screen w-[150px] md:w-[350px] z-10">
        <div className="absolute inset-0 flex items-center justify-center opacity-40 md:opacity-60">
          <Suspense fallback={null}>
            <Model3DViewer 
              modelPath={MODEL_PATH_RIGHT}
              scale={1.2}
              autoRotate={false}
              playAnimation={true}
              cameraPosition={[0, 0, 10]}
              interactive={true}
            />
          </Suspense>
        </div>
      </div>

      {/* Background gradient orbs - Fixed */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <Background3D intensity={40} className="absolute top-[15%] left-[25%]">
          <div className="w-72 h-72 bg-teal-500/5 rounded-full blur-3xl" />
        </Background3D>

        <Background3D intensity={-45} className="absolute bottom-[25%] right-[20%]">
          <div className="w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl" />
        </Background3D>

        <Background3D intensity={30} className="absolute top-[50%] right-[30%]">
          <div className="w-56 h-56 bg-amber-500/5 rounded-full blur-3xl" />
        </Background3D>
      </div>

      <div className="container-custom py-12 space-y-16">
      <FadeInSection direction="up" className="text-center">
        <p className="text-teal-400 text-sm tracking-[0.2em] uppercase mb-3">
          Hướng Dẫn
        </p>
        <h1 className="text-3xl md:text-4xl font-serif text-white mb-4">
          Bản Đồ Hướng Dẫn
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Tìm đường đến các địa điểm quan trọng trong khuôn viên trường
        </p>
      </FadeInSection>

      <FadeInSection direction="up" delay={100}>
        <Tilt3DCard
          className="max-w-2xl mx-auto"
          glowColor="rgba(251, 191, 36, 0.2)"
        >
          <Card className="text-center p-6" glow="amber">
            <div className="text-4xl mb-4">🏫</div>
            <h3 className="text-xl font-bold text-white mb-2">
              {GRADUATE_INFO.university}
            </h3>
            <p className="text-teal-400 font-medium">{EVENT_INFO.address}</p>
          </Card>
        </Tilt3DCard>
      </FadeInSection>

      <FadeInSection direction="up" delay={150}>
        <div className="rounded-2xl overflow-hidden glass border border-white/10 max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-teal-900/50 to-cyan-900/50 p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="text-6xl">🌐</div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Khám Phá Với Tour 360°
                </h3>
                <p className="text-slate-300 mb-4">
                  Trải nghiệm không gian trường học qua công nghệ thực tế ảo!
                </p>
                <p className="text-slate-300 mb-4">
                  Web 360 này là dự án của trường, không phải của tui đâu =)))
                </p>
                <GradientButton href={EVENT_INFO.tour360Url}>
                  Bắt Đầu Tour Ngay
                </GradientButton>
              </div>
            </div>
          </div>
        </div>
      </FadeInSection>

      <section>
        <FadeInSection direction="up" className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">
            Các Địa Điểm Quan Trọng
          </h2>
        </FadeInSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {locations.map((location, index) => (
            <FadeInSection key={location.id} direction="up" delay={index * 100}>
              <Tilt3DCard className="h-full" intensity={6}>
                <Card glow={location.color} className="h-full group">
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                    {location.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {location.name}
                  </h3>
                  <p className="text-slate-400 text-sm mb-4">
                    {location.description}
                  </p>
                  <ul className="space-y-1">
                    {location.tips.map((tip, i) => (
                      <li
                        key={i}
                        className="text-xs text-slate-500 flex items-start gap-2"
                      >
                        <span className="text-teal-500">•</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </Card>
              </Tilt3DCard>
            </FadeInSection>
          ))}
        </div>
      </section>

      <FadeInSection direction="up" className="text-center">
        <p className="text-slate-400 mb-6">Cần chỉ đường chi tiết?</p>
        <div className="flex flex-wrap gap-4 justify-center">
          <GradientButton href={EVENT_INFO.googleMapsUrl} size="lg">
            📍 Mở Google Maps
          </GradientButton>
          <GradientButton
            href={EVENT_INFO.tour360Url}
            variant="secondary"
            size="lg"
          >
            🌐 Tour 360°
          </GradientButton>
        </div>
      </FadeInSection>
      </div>
    </div>
  );
}