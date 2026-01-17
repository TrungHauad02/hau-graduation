interface PhotoGalleryProps {
  images: string[];
  className?: string;
}

export default function PhotoGallery({ images, className = '' }: PhotoGalleryProps) {
  return (
    <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5 ${className}`}>
      {images.map((image, index) => (
        <div
          key={index}
          className="group relative aspect-[3/4] overflow-hidden rounded-2xl cursor-pointer"
          style={{
            animationDelay: `${index * 100}ms`,
          }}
        >
          {/* Gradient border effect */}
          <div className="absolute -inset-[2px] bg-gradient-to-br from-amber-400 via-teal-400 to-cyan-400 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[1px]" />
          
          {/* Inner container */}
          <div className="absolute inset-[2px] rounded-2xl overflow-hidden bg-slate-900">
            {/* Image */}
            <img
              src={image}
              alt={`Photo ${index + 1}`}
              className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-110"
            />
            
            {/* Shine effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-x-[-100%] group-hover:translate-x-[100%] transform" 
              style={{ transition: 'transform 0.8s ease-out, opacity 0.3s' }}
            />
            
            {/* Bottom gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Floating particles effect */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:translate-y-0 translate-y-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
          
          {/* Corner decorations */}
          <div className="absolute top-3 left-3 w-4 h-4 border-l-2 border-t-2 border-amber-400/0 group-hover:border-amber-400 transition-all duration-300 rounded-tl-sm" />
          <div className="absolute top-3 right-3 w-4 h-4 border-r-2 border-t-2 border-teal-400/0 group-hover:border-teal-400 transition-all duration-300 rounded-tr-sm" />
          <div className="absolute bottom-3 left-3 w-4 h-4 border-l-2 border-b-2 border-cyan-400/0 group-hover:border-cyan-400 transition-all duration-300 rounded-bl-sm" />
          <div className="absolute bottom-3 right-3 w-4 h-4 border-r-2 border-b-2 border-amber-400/0 group-hover:border-amber-400 transition-all duration-300 rounded-br-sm" />
        </div>
      ))}
    </div>
  );
}
