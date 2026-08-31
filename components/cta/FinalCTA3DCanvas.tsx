'use client';

import { Canvas } from '@react-three/fiber';
import { AssemblingGlassCTA } from '../three/AssemblingGlassCTA';
import { Suspense, useState, useEffect, useRef } from 'react';

interface FinalCTA3DCanvasProps {
  assembleProgress: number;
}

export function FinalCTA3DCanvas({ assembleProgress }: FinalCTA3DCanvasProps) {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
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

  if (!mounted) {
    return <div ref={containerRef} className="w-full h-full min-h-[350px]" />;
  }

  return (
    <div ref={containerRef} className="w-full h-full min-h-[350px] relative pointer-events-auto">
      {isVisible && (
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        >
          <Suspense fallback={null}>
            <AssemblingGlassCTA assembleProgress={assembleProgress} />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
}
