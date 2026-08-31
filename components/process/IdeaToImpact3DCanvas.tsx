'use client';

import { Canvas } from '@react-three/fiber';
import { MorphingStageObject } from '../three/MorphingStageObject';
import { Suspense, useState, useEffect, useRef } from 'react';

interface IdeaToImpact3DCanvasProps {
  activeStage: number;
}

export function IdeaToImpact3DCanvas({ activeStage }: IdeaToImpact3DCanvasProps) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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

  return (
    <div ref={containerRef} className="w-full h-full min-h-[350px] md:min-h-[480px] relative pointer-events-auto">
      {isVisible && (
        <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        >
          <Suspense fallback={null}>
            <MorphingStageObject activeStage={activeStage} />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
}
