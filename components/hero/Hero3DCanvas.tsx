'use client';

import { Canvas } from '@react-three/fiber';
import { Laptop3DObject } from '../three/Laptop3DObject';
import { Suspense, useState, useEffect, useRef } from 'react';

interface Hero3DCanvasProps {
  scrollProgress?: number;
}

export function Hero3DCanvas({ scrollProgress = 0 }: Hero3DCanvasProps) {
  const [mounted, setMounted] = useState(false);
  const mousePosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (!mounted) {
    return <div className="w-full h-full min-h-[400px] md:min-h-[500px] lg:min-h-[580px]" />;
  }

  return (
    <div className="w-full h-full min-h-[400px] md:min-h-[500px] lg:min-h-[580px] relative pointer-events-auto flex items-center justify-center z-10">
      <Canvas
        camera={{ position: [0, 0, 9.2], fov: 38 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <Laptop3DObject scrollProgress={scrollProgress} mousePosRef={mousePosRef} />
      </Canvas>
    </div>
  );
}
