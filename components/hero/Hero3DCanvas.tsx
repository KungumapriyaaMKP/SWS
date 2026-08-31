'use client';

import { Canvas } from '@react-three/fiber';
import { Laptop3DObject } from '../three/Laptop3DObject';
import { Suspense, useState, useEffect, useRef } from 'react';

interface Hero3DCanvasProps {
  scrollProgress?: number;
}

export function Hero3DCanvas({ scrollProgress = 0 }: Hero3DCanvasProps) {
  const [mounted, setMounted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isVisible]);

  if (!mounted) {
    return <div ref={containerRef} className="w-full h-full min-h-[400px] md:min-h-[600px]" />;
  }

  return (
    <div ref={containerRef} className="w-full h-full min-h-[400px] md:min-h-[600px] relative pointer-events-auto flex items-center justify-center">
      {isVisible && (
        <Canvas
          camera={{ position: [0, 0, 6.2], fov: 45 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        >
          <Suspense fallback={null}>
            <Laptop3DObject scrollProgress={scrollProgress} mousePos={mousePos} />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
}
