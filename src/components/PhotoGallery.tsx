import { useState, useRef, useEffect } from 'react';

interface PhotoGalleryProps {
  images: string[];
  className?: string;
}

export default function PhotoGallery({ images, className = '' }: PhotoGalleryProps) {
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const currentRotationRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const itemCount = images.length;
  const anglePerItem = 360 / itemCount;
  const radius = 180; // Distance from center

  // Auto-rotate when not dragging
  useEffect(() => {
    if (isDragging) return;
    
    const interval = setInterval(() => {
      setRotation(prev => prev + 0.3);
    }, 50);
    
    return () => clearInterval(interval);
  }, [isDragging]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    startXRef.current = e.touches[0].clientX;
    currentRotationRef.current = rotation;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const deltaX = e.touches[0].clientX - startXRef.current;
    const newRotation = currentRotationRef.current + deltaX * 0.5;
    setRotation(newRotation);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    startXRef.current = e.clientX;
    currentRotationRef.current = rotation;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startXRef.current;
    const newRotation = currentRotationRef.current + deltaX * 0.5;
    setRotation(newRotation);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Decorative frame corners - hidden on mobile */}
      <div className="absolute -inset-6 md:-inset-8 pointer-events-none hidden md:block">
        <div className="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 border-amber-500/40 rounded-tl-3xl" />
        <div className="absolute top-0 right-0 w-20 h-20 border-r-2 border-t-2 border-teal-500/40 rounded-tr-3xl" />
        <div className="absolute bottom-0 left-0 w-20 h-20 border-l-2 border-b-2 border-teal-500/40 rounded-bl-3xl" />
        <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-amber-500/40 rounded-br-3xl" />
      </div>

      {/* MOBILE LAYOUT - 3D Carousel */}
      <div className="md:hidden">
        <div 
          ref={containerRef}
          className="relative h-[400px] w-full cursor-grab active:cursor-grabbing"
          style={{ perspective: '1000px' }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* 3D Carousel container */}
          <div 
            className="absolute left-1/2 top-1/2 w-[200px] h-[280px]"
            style={{
              transformStyle: 'preserve-3d',
              transform: `translateX(-50%) translateY(-50%) rotateY(${rotation}deg)`,
              transition: isDragging ? 'none' : 'transform 0.1s ease-out',
            }}
          >
            {images.map((image, index) => {
              const itemRotation = index * anglePerItem;
              return (
                <div
                  key={index}
                  className="absolute w-full h-full"
                  style={{
                    transform: `rotateY(${itemRotation}deg) translateZ(${radius}px)`,
                    backfaceVisibility: 'hidden',
                  }}
                >
                  <div className="w-full h-full bg-white p-2 rounded-xl shadow-2xl shadow-slate-900/80">
                    <img 
                      src={image} 
                      alt={`Kỷ niệm ${index + 1}`} 
                      className="w-full h-full object-cover rounded-lg"
                      draggable={false}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Reflection/glow effect */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[250px] h-20 bg-gradient-to-t from-amber-500/10 to-transparent blur-2xl rounded-full" />
        </div>

        {/* Swipe hint */}
        <div className="flex justify-center items-center gap-2 mt-2 text-slate-500 text-sm">
          <span>←</span>
          <span>Vuốt để xoay</span>
          <span>→</span>
        </div>
      </div>

      {/* DESKTOP LAYOUT - Scattered Polaroid style */}
      <div className="hidden md:flex flex-col gap-6">
        {/* Top row - 3 images */}
        <div className="flex gap-4 justify-center items-end">
          {/* Image 1 - tilted left */}
          <div 
            className="group relative w-[30%] aspect-[3/4] transform -rotate-3 hover:rotate-0 hover:scale-105 transition-all duration-500 ease-out"
            style={{ animation: 'floatIn 0.6s ease-out forwards', animationDelay: '0ms', opacity: 0 }}
          >
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-amber-400/20 to-teal-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative h-full bg-white p-2 rounded-xl shadow-2xl shadow-slate-900/50">
              <img src={images[0]} alt="Kỷ niệm 1" className="w-full h-full object-cover rounded-lg" />
            </div>
          </div>

          {/* Image 2 - center, larger */}
          <div 
            className="group relative w-[35%] aspect-[3/4] transform hover:scale-105 transition-all duration-500 ease-out z-10"
            style={{ animation: 'floatIn 0.6s ease-out forwards', animationDelay: '100ms', opacity: 0 }}
          >
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-amber-400/30 to-cyan-400/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative h-full bg-white p-2 rounded-xl shadow-2xl shadow-slate-900/50">
              <img src={images[1]} alt="Kỷ niệm 2" className="w-full h-full object-cover rounded-lg" />
            </div>
          </div>

          {/* Image 3 - tilted right */}
          <div 
            className="group relative w-[30%] aspect-[3/4] transform rotate-3 hover:rotate-0 hover:scale-105 transition-all duration-500 ease-out"
            style={{ animation: 'floatIn 0.6s ease-out forwards', animationDelay: '200ms', opacity: 0 }}
          >
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-teal-400/20 to-cyan-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative h-full bg-white p-2 rounded-xl shadow-2xl shadow-slate-900/50">
              <img src={images[2]} alt="Kỷ niệm 3" className="w-full h-full object-cover rounded-lg" />
            </div>
          </div>
        </div>

        {/* Bottom row - 2 images centered */}
        <div className="flex gap-6 justify-center items-start">
          {/* Image 4 - tilted */}
          <div 
            className="group relative w-[32%] aspect-[4/3] transform rotate-2 hover:rotate-0 hover:scale-105 transition-all duration-500 ease-out"
            style={{ animation: 'floatIn 0.6s ease-out forwards', animationDelay: '300ms', opacity: 0 }}
          >
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-400/20 to-amber-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative h-full bg-white p-2 rounded-xl shadow-2xl shadow-slate-900/50">
              <img src={images[3]} alt="Kỷ niệm 4" className="w-full h-full object-cover rounded-lg" />
            </div>
          </div>

          {/* Image 5 - tilted opposite */}
          <div 
            className="group relative w-[32%] aspect-[4/3] transform -rotate-2 hover:rotate-0 hover:scale-105 transition-all duration-500 ease-out"
            style={{ animation: 'floatIn 0.6s ease-out forwards', animationDelay: '400ms', opacity: 0 }}
          >
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-amber-400/20 to-teal-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative h-full bg-white p-2 rounded-xl shadow-2xl shadow-slate-900/50">
              <img src={images[4]} alt="Kỷ niệm 5" className="w-full h-full object-cover rounded-lg" />
            </div>
          </div>
        </div>
      </div>

      {/* Floating decorative sparkles - hidden on mobile */}
      <div className="hidden md:block">
        <div className="absolute -top-4 left-1/3 text-amber-400/30 text-xl animate-pulse">✦</div>
        <div className="absolute -top-2 right-1/4 text-teal-400/30 text-sm animate-pulse" style={{ animationDelay: '300ms' }}>✦</div>
        <div className="absolute -bottom-4 left-1/4 text-cyan-400/30 text-lg animate-pulse" style={{ animationDelay: '600ms' }}>✦</div>
        <div className="absolute -bottom-2 right-1/3 text-amber-400/30 text-xl animate-pulse" style={{ animationDelay: '900ms' }}>✦</div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes floatIn {
          from {
            opacity: 0;
            transform: translateY(30px) rotate(0deg);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Hide scrollbar for webkit browsers */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
