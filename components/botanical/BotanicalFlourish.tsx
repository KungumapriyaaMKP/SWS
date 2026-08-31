'use client';

interface BotanicalFlourishProps {
  className?: string;
  variant?: 'divider' | 'corner' | 'badge';
}

export function BotanicalFlourish({ className = '', variant = 'divider' }: BotanicalFlourishProps) {
  if (variant === 'badge') {
    return (
      <span className={`inline-flex items-center gap-1 text-[#4A6B53] dark:text-[#7C9082] ${className}`}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 2C12 2 3 9 3 17C3 21 7 22 12 22C17 22 21 21 21 17C21 9 12 2 12 2Z"
            fill="#4A6B53"
            fillOpacity="0.3"
            stroke="#4A6B53"
            strokeWidth="1.5"
          />
          <path d="M12 2V22" stroke="#4A6B53" strokeWidth="1.2" />
        </svg>
      </span>
    );
  }

  if (variant === 'corner') {
    return (
      <div className={`pointer-events-none opacity-40 ${className}`}>
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Botanical Corner Vine */}
          <path
            d="M5 5C20 5 35 15 45 30C52 40 55 55 55 55"
            stroke="#4A6B53"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* Leaves along vine */}
          <path
            d="M15 10C15 10 22 7 25 12C28 17 21 18 15 10Z"
            fill="#4A6B53"
            fillOpacity="0.4"
            stroke="#4A6B53"
            strokeWidth="1"
          />
          <path
            d="M30 20C30 20 38 18 40 24C42 30 34 30 30 20Z"
            fill="#7C9082"
            fillOpacity="0.4"
            stroke="#7C9082"
            strokeWidth="1"
          />
          {/* Small lotus bloom */}
          <circle cx="48" cy="38" r="4" fill="#D88EA8" fillOpacity="0.6" />
        </svg>
      </div>
    );
  }

  // Default: Botanical Section Divider Line with Lotus Center
  return (
    <div className={`flex items-center justify-center gap-4 my-8 opacity-60 ${className}`}>
      <div className="h-[1px] w-20 bg-gradient-to-r from-transparent via-[#4A6B53] to-[#4A6B53]" />
      
      {/* Central Lotus & Leaves Motif */}
      <div className="flex items-center gap-1.5 text-[#4A6B53] dark:text-[#7C9082]">
        {/* Left Leaf */}
        <svg width="14" height="18" viewBox="0 0 14 18" fill="none">
          <path d="M14 9C14 9 7 1 1 1C1 8 8 16 14 9Z" fill="#4A6B53" fillOpacity="0.4" stroke="#4A6B53" strokeWidth="1" />
        </svg>

        {/* Center Lotus Bloom */}
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 3C12 3 8 8 8 13C8 16.5 9.5 18 12 18C14.5 18 16 16.5 16 13C16 8 12 3 12 3Z"
            fill="#D88EA8"
            fillOpacity="0.6"
            stroke="#C87A9A"
            strokeWidth="1"
          />
          <path
            d="M12 8C9.5 8 5 10.5 5 14.5C5 17.5 7.5 19 10.5 19C11.5 19 12 18.5 12 18.5C12 18.5 12.5 19 13.5 19C16.5 19 19 17.5 19 14.5C19 10.5 14.5 8 12 8Z"
            fill="#B88FA5"
            fillOpacity="0.4"
          />
        </svg>

        {/* Right Leaf */}
        <svg width="14" height="18" viewBox="0 0 14 18" fill="none">
          <path d="M0 9C0 9 7 1 13 1C13 8 6 16 0 9Z" fill="#4A6B53" fillOpacity="0.4" stroke="#4A6B53" strokeWidth="1" />
        </svg>
      </div>

      <div className="h-[1px] w-20 bg-gradient-to-l from-transparent via-[#4A6B53] to-[#4A6B53]" />
    </div>
  );
}
