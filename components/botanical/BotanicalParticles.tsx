'use client';

import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  duration: number;
  delay: number;
  type: 'leaf' | 'petal' | 'flower';
}

export function BotanicalParticles() {
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setMounted(true);
    // Generate random floating leaves and petals
    const generated: Particle[] = Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      x: Math.random() * 95,
      y: Math.random() * 95,
      size: Math.floor(Math.random() * 16) + 16,
      rotation: Math.floor(Math.random() * 360),
      duration: Math.floor(Math.random() * 15) + 18,
      delay: Math.random() * 5,
      type: i % 3 === 0 ? 'flower' : i % 2 === 0 ? 'leaf' : 'petal',
    }));
    setParticles(generated);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute animate-botanical-drift opacity-30 dark:opacity-20"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            transform: `rotate(${p.rotation}deg)`,
          }}
        >
          {p.type === 'leaf' && (
            <svg
              width={p.size}
              height={p.size * 1.4}
              viewBox="0 0 24 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-[#4A6B53] dark:text-[#7C9082]"
            >
              <path
                d="M12 2C12 2 2 10 2 20C2 26 6.5 32 12 32C17.5 32 22 26 22 20C22 10 12 2 12 2Z"
                fill="currentColor"
                fillOpacity="0.4"
                stroke="currentColor"
                strokeWidth="1.2"
              />
              <path d="M12 2V32" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
              <path d="M12 12L17 17" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
              <path d="M12 18L7 23" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
            </svg>
          )}

          {p.type === 'petal' && (
            <svg
              width={p.size}
              height={p.size}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-[#D88EA8] dark:text-[#C8A2C8]"
            >
              <path
                d="M12 2C16 8 20 12 20 16C20 20 16.5 22 12 22C7.5 22 4 20 4 16C4 12 8 8 12 2Z"
                fill="currentColor"
                fillOpacity="0.4"
                stroke="currentColor"
                strokeWidth="1"
              />
            </svg>
          )}

          {p.type === 'flower' && (
            <svg
              width={p.size * 1.2}
              height={p.size * 1.2}
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-[#C87A9A] dark:text-[#B88FA5]"
            >
              {/* Central Lotus Flower Silhouette */}
              <path
                d="M16 4C16 4 11 11 11 17C11 21 13 23 16 23C19 23 21 21 21 17C21 11 16 4 16 4Z"
                fill="currentColor"
                fillOpacity="0.5"
              />
              <path
                d="M16 11C13 11 7 14 7 19C7 23 10 25 14 25C15.5 25 16 24.5 16 24.5C16 24.5 16.5 25 18 25C22 25 25 23 25 19C25 14 19 11 16 11Z"
                fill="currentColor"
                fillOpacity="0.3"
              />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
}
