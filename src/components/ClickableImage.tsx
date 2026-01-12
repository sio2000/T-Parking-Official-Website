import { motion } from 'framer-motion';

interface ClickableImageProps {
  src: string;
  alt: string;
  onClick: () => void;
  variant?: 'default' | 'no-border';
  className?: string;
}

export default function ClickableImage({ src, alt, onClick, variant = 'default', className = '' }: ClickableImageProps) {
  // Mobile-first: no borders, padding, or backgrounds
  const baseClasses = "w-full h-auto object-contain transition-all duration-300";
  // Increased mobile sizes for better readability
  const mobileClasses = "max-h-[450px] sm:max-h-[500px] rounded-xl sm:rounded-2xl";
  // No borders, padding, or backgrounds on any screen size
  const noStyleClasses = "bg-transparent p-0 border-0 shadow-none";
  const desktopClasses = "md:max-h-[48rem] md:max-w-[36rem]";
  
  const imageClasses = `${baseClasses} ${mobileClasses} ${noStyleClasses} ${desktopClasses} ${className}`;

  return (
    <motion.div
      className="relative group cursor-pointer w-full"
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
    >
      <img
        src={src}
        alt={alt}
        className={imageClasses}
      />
      {/* Fullscreen Indicator Overlay - Only visible on hover/desktop */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/0 md:group-hover:bg-black/10 transition-all duration-300 rounded-xl sm:rounded-2xl pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileHover={{ opacity: 1, scale: 1 }}
          className="bg-white/90 backdrop-blur-sm rounded-full p-2 md:p-3 shadow-lg border-2 border-blue-500 hidden md:block"
        >
          <svg
            className="w-5 h-5 md:w-6 md:h-6 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
            />
          </svg>
        </motion.div>
      </div>
      {/* Subtle hint text - Desktop only */}
      <div className="absolute bottom-2 right-2 bg-blue-600/90 text-white text-xs px-2 py-1 rounded-lg opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm pointer-events-none hidden md:block">
        Click για fullscreen
      </div>
    </motion.div>
  );
}
