'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Frown, Meh, Smile, Laugh, Heart } from 'lucide-react';

interface RatingInteractionProps {
  onChange?: (rating: number) => void;
  className?: string;
}

const ratingData = [
  {
    icon: Frown,
    label: 'Terrible',
    activeBg: 'bg-rose-50 dark:bg-rose-950/40',
    border: 'border-rose-500',
    text: 'text-rose-600 dark:text-rose-400',
    glow: 'shadow-rose-500/30',
  },
  {
    icon: Meh,
    label: 'Poor',
    activeBg: 'bg-orange-50 dark:bg-orange-950/40',
    border: 'border-orange-500',
    text: 'text-orange-600 dark:text-orange-400',
    glow: 'shadow-orange-500/30',
  },
  {
    icon: Smile,
    label: 'Okay',
    activeBg: 'bg-yellow-50 dark:bg-yellow-950/40',
    border: 'border-amber-500',
    text: 'text-amber-600 dark:text-amber-400',
    glow: 'shadow-amber-500/30',
  },
  {
    icon: Laugh,
    label: 'Good',
    activeBg: 'bg-purple-50 dark:bg-purple-950/40',
    border: 'border-purple-500',
    text: 'text-purple-600 dark:text-purple-300',
    glow: 'shadow-purple-500/30',
  },
  {
    icon: Heart,
    label: 'Amazing',
    activeBg: 'bg-pink-50 dark:bg-pink-950/40',
    border: 'border-pink-500',
    text: 'text-pink-600 dark:text-pink-400',
    glow: 'shadow-pink-500/40',
  },
];

export function RatingInteraction({ onChange, className }: RatingInteractionProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleClick = (value: number) => {
    setRating(value);
    onChange?.(value);
  };

  const displayRating = hoverRating || rating;

  return (
    <div className={cn('flex flex-col items-center justify-center gap-4 w-full', className)}>
      {/* Reaction Icon Buttons */}
      <div className="flex items-center justify-center gap-3 sm:gap-4">
        {ratingData.map((item, i) => {
          const value = i + 1;
          const isActive = value <= displayRating;
          const isSelected = value === displayRating;
          const Icon = item.icon;

          return (
            <button
              key={value}
              onClick={() => handleClick(value)}
              onMouseEnter={() => setHoverRating(value)}
              onMouseLeave={() => setHoverRating(0)}
              className="group relative focus:outline-none cursor-pointer"
              aria-label={`Rate ${value}: ${item.label}`}
            >
              <div
                className={cn(
                  'relative flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-none border-2 transition-all duration-300 ease-out shadow-md',
                  isSelected
                    ? `${item.activeBg} ${item.border} ${item.glow} scale-110 shadow-xl`
                    : isActive
                    ? `${item.activeBg} ${item.border} opacity-90 scale-105`
                    : 'bg-white dark:bg-[#130E26] border-purple-900/20 dark:border-purple-500/30 group-hover:scale-105 group-hover:border-purple-500 group-hover:bg-purple-50/40 dark:group-hover:bg-white/10'
                )}
              >
                <Icon
                  className={cn(
                    'w-7 h-7 sm:w-8 sm:h-8 transition-all duration-300 ease-out',
                    isActive
                      ? item.text
                      : 'text-purple-900/60 dark:text-purple-300/60 group-hover:text-purple-950 dark:group-hover:text-white'
                  )}
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* Centered Wording */}
      <div className="relative h-8 w-full max-w-sm flex items-center justify-center text-center">
        {/* Default "RATE YOUR EXPERIENCE" text */}
        <div
          className={cn(
            'absolute inset-0 flex items-center justify-center transition-all duration-300 ease-out whitespace-nowrap',
            displayRating > 0 ? 'opacity-0 blur-sm scale-95' : 'opacity-100 blur-0 scale-100'
          )}
        >
          <span className="text-xs sm:text-sm font-extrabold tracking-widest text-purple-950 dark:text-purple-200 uppercase">
            RATE YOUR EXPERIENCE
          </span>
        </div>

        {/* Rating labels */}
        {ratingData.map((item, i) => (
          <div
            key={i}
            className={cn(
              'absolute inset-0 flex items-center justify-center transition-all duration-300 ease-out whitespace-nowrap',
              displayRating === i + 1 ? 'opacity-100 blur-0 scale-100' : 'opacity-0 blur-sm scale-105'
            )}
          >
            <span
              className={cn(
                'text-xs sm:text-sm font-extrabold tracking-widest uppercase px-4 py-1 border rounded-none shadow-sm',
                item.activeBg,
                item.border,
                item.text
              )}
            >
              {item.label} ({i + 1}/5)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
