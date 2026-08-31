'use client';

import type React from 'react';
import { useEffect, useRef, useState, useCallback } from 'react';

interface Pixel {
  id: number;
  x: number;
  y: number;
  opacity: number;
  age: number;
  color: string;
}

const COLORS = ['#B88FA5', '#9884B6', '#7C9082', '#D4C3B3', '#A58AA8'];
const PIXEL_SIZE = 10;
const TRAIL_LENGTH = 35;
const FADE_SPEED = 0.035;

export function PixelCursorTrail() {
  const [mounted, setMounted] = useState(false);
  const [pixels, setPixels] = useState<Pixel[]>([]);
  const pixelIdRef = useRef(0);
  const lastPositionRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>();

  useEffect(() => {
    setMounted(true);
  }, []);

  const createPixel = useCallback((x: number, y: number) => {
    const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)];
    return {
      id: pixelIdRef.current++,
      x,
      y,
      opacity: 0.9,
      age: 0,
      color: randomColor,
    };
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const handleWindowMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      const dx = x - lastPositionRef.current.x;
      const dy = y - lastPositionRef.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > PIXEL_SIZE) {
        const newPixel = createPixel(x, y);
        setPixels((prev) => [...prev.slice(-TRAIL_LENGTH), newPixel]);
        lastPositionRef.current = { x, y };
      }
    };

    window.addEventListener('mousemove', handleWindowMouseMove);
    return () => window.removeEventListener('mousemove', handleWindowMouseMove);
  }, [mounted, createPixel]);

  useEffect(() => {
    const animate = () => {
      setPixels((prev) =>
        prev
          .map((pixel) => ({
            ...pixel,
            opacity: pixel.opacity - FADE_SPEED,
            age: pixel.age + 1,
          }))
          .filter((pixel) => pixel.opacity > 0)
      );
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 w-screen h-screen pointer-events-none z-[9999] overflow-hidden">
      {pixels.map((pixel) => {
        const sizeMultiplier = Math.max(0.25, 1 - pixel.age / 80);
        const currentSize = PIXEL_SIZE * sizeMultiplier;

        return (
          <div
            key={pixel.id}
            className="absolute rounded-sm pointer-events-none shadow-xs"
            style={{
              left: pixel.x - currentSize / 2,
              top: pixel.y - currentSize / 2,
              width: currentSize,
              height: currentSize,
              backgroundColor: pixel.color,
              opacity: pixel.opacity,
              transition: 'width 0.08s ease-out, height 0.08s ease-out',
            }}
          />
        );
      })}
    </div>
  );
}
