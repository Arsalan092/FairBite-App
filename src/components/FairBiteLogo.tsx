import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'light' | 'dark';
  showSubtitle?: boolean;
}

export const FairBiteLogo: React.FC<LogoProps> = ({ 
  size = 'md', 
  variant = 'dark',
  showSubtitle = true 
}) => {
  const isDark = variant === 'dark';
  
  const iconSizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-13 h-13'
  };

  const titleSizeClasses = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl sm:text-4xl'
  };

  return (
    <div className="flex items-center gap-3 select-none group">
      {/* Artisanal Geometric Cloche & Leaf Emblem */}
      <div 
        className={`${iconSizeClasses[size]} rounded-2xl flex items-center justify-center shadow-md transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg relative overflow-hidden ${
          isDark 
            ? 'bg-[#3B0A14] border border-[#C9A227]/40 text-[#C9A227]' 
            : 'bg-[#C9A227] text-[#3B0A14] border border-amber-200/50'
        }`}
      >
        <svg 
          viewBox="0 0 40 40" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-3/4 h-3/4 transition-transform duration-300 group-hover:rotate-3"
        >
          {/* Subtle Outer Ring Accent */}
          <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" opacity="0.4" />
          
          {/* Cloche Dome & Steam Aroma Curves */}
          <path 
            d="M9 25C9 18.9249 13.9249 14 20 14C26.0751 14 31 18.9249 31 25H9Z" 
            fill="currentColor" 
            fillOpacity="0.18"
            stroke="currentColor" 
            strokeWidth="2.2" 
            strokeLinejoin="round" 
          />
          
          {/* Base Cloche Rim */}
          <path 
            d="M6 26.5C6 25.6716 6.67157 25 7.5 25H32.5C33.3284 25 34 25.6716 34 26.5C34 27.3284 33.3284 28 32.5 28H7.5C6.67157 28 6 27.3284 6 26.5Z" 
            fill="currentColor" 
          />

          {/* Crown Leaf / Fair 0% Balance Pin */}
          <path 
            d="M20 7C20 7 23 10 20 13C17 10 20 7 20 7Z" 
            fill="#3B8C5A" 
            stroke={isDark ? '#C9A227' : '#3B0A14'} 
            strokeWidth="1.2"
          />

          {/* Stylized 'F' Monogram Cut inside dome */}
          <path 
            d="M17 18.5H23.5M17 21.5H21.5M17 18.5V24.5" 
            stroke={isDark ? '#F8F1E4' : '#3B0A14'} 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>

        {/* Shimmer Accent */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
      </div>

      {/* Typography & Edition */}
      <div>
        <div className="flex items-center gap-1.5 leading-none">
          <span 
            className={`font-serif font-black tracking-tight uppercase ${titleSizeClasses[size]} ${
              isDark ? 'text-[#3B0A14]' : 'text-[#F8F1E4]'
            }`}
          >
            Fair<span className="text-[#C9A227]">Bite</span>
          </span>

          <span className="bg-[#3B8C5A] text-white text-[8px] sm:text-[9px] font-mono font-black px-1.5 py-0.5 rounded-full tracking-wider uppercase shadow-xs">
            0% Markup
          </span>
        </div>

        {showSubtitle && (
          <p 
            className={`text-[9px] font-bold uppercase tracking-[0.22em] mt-1 font-mono ${
              isDark ? 'text-[#6B5347]' : 'text-[#F8F1E4]/70'
            }`}
          >
            Jamshedpur Direct Kitchens
          </p>
        )}
      </div>
    </div>
  );
};
