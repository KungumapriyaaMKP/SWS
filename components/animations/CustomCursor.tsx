'use client';

import { useEffect, useState } from 'react';
import gsap from 'gsap';

export function CustomCursor() {
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Only initialize on non-touch devices
    const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    if (isTouchDevice) return;

    const cursor = document.getElementById('custom-cursor');
    const cursorDot = document.getElementById('custom-cursor-dot');
    if (!cursor || !cursorDot) return;

    const onMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: 'power2.out',
      });
      gsap.to(cursorDot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.05,
      });
    };

    const handlePointerOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest('[data-cursor]');
      if (interactive) {
        const type = interactive.getAttribute('data-cursor');
        if (type === 'project') {
          setCursorText('VIEW');
          setIsHovered(true);
        } else if (type === 'cta') {
          setCursorText('BUILD');
          setIsHovered(true);
        } else {
          setCursorText('');
          setIsHovered(true);
        }
      } else if (target.closest('a, button, [role="button"]')) {
        setCursorText('');
        setIsHovered(true);
      } else {
        setCursorText('');
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', handlePointerOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', handlePointerOver);
    };
  }, []);

  return (
    <>
      <div
        id="custom-cursor"
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none z-[9998] transition-all duration-300 flex items-center justify-center font-semibold text-[10px] tracking-widest text-white border border-purple-400/40 backdrop-blur-sm ${
          isHovered
            ? 'w-14 h-14 bg-purple-600/30 scale-110 shadow-violet-glow'
            : 'w-8 h-8 bg-white/5 scale-100 opacity-60'
        }`}
      >
        {cursorText}
      </div>
      <div
        id="custom-cursor-dot"
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-purple-400 pointer-events-none z-[9999]"
      />
    </>
  );
}
