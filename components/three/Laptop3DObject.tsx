'use client';

import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Html } from '@react-three/drei';
import * as THREE from 'three';

interface Laptop3DObjectProps {
  scrollProgress?: number;
  mousePos?: { x: number; y: number };
}

export function Laptop3DObject({ scrollProgress = 0, mousePos = { x: 0, y: 0 } }: Laptop3DObjectProps) {
  const laptopGroupRef = useRef<THREE.Group>(null);
  const lidRef = useRef<THREE.Group>(null);

  const cardSeparation = 1 + scrollProgress * 1.3;

  useFrame((state, delta) => {
    if (laptopGroupRef.current) {
      // Natural 3/4 perspective matching user reference image
      const targetRotX = 0.22 + mousePos.y * 0.2 + scrollProgress * 0.2;
      const targetRotY = -0.45 + mousePos.x * 0.3 + Math.sin(state.clock.elapsedTime * 0.5) * 0.04;
      
      laptopGroupRef.current.rotation.x = THREE.MathUtils.lerp(laptopGroupRef.current.rotation.x, targetRotX, delta * 3);
      laptopGroupRef.current.rotation.y = THREE.MathUtils.lerp(laptopGroupRef.current.rotation.y, targetRotY, delta * 3);
      
      laptopGroupRef.current.position.y = THREE.MathUtils.lerp(laptopGroupRef.current.position.y, scrollProgress * 0.6, delta * 3);
    }
  });

  const cardsData = [
    { label: 'WEBSITE DEVELOPMENT', pos: [-2.6, 1.8, 0.5] as [number, number, number] },
    { label: 'EXECUTIVE PORTFOLIOS', pos: [2.6, 1.7, -0.4] as [number, number, number] },
    { label: 'AI SOLUTIONS', pos: [-2.8, -0.5, 0.8] as [number, number, number] },
    { label: 'CUSTOM SOFTWARE', pos: [2.8, -0.6, -0.5] as [number, number, number] },
    { label: 'BUSINESS AUTOMATION', pos: [0, -2.4, 0.8] as [number, number, number] },
  ];

  return (
    <group ref={laptopGroupRef} position={[0, -0.1, 0]} scale={[1.15, 1.15, 1.15]}>
      {/* Studio Ambient & Directional Lighting */}
      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 8, 6]} intensity={2.8} color="#ffffff" />
      <pointLight position={[-4, 3, 2]} intensity={3.5} color="#D88EA8" distance={8} />
      <pointLight position={[4, -2, 2]} intensity={3.5} color="#9884B6" distance={8} />

      <Float speed={1.2} rotationIntensity={0.12} floatIntensity={0.25}>
        {/* ==================== 1. SOFT PASTEL LILAC LAPTOP BASE ==================== */}
        <group position={[0, -0.5, 0]}>
          {/* Main Bottom Body Chassis */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[3.6, 0.14, 2.4]} />
            <meshPhysicalMaterial
              color="#F3EBF7"
              roughness={0.2}
              metalness={0.1}
              clearcoat={0.6}
            />
          </mesh>

          {/* Front Opening Notch Lip */}
          <mesh position={[0, 0.02, 1.2]}>
            <boxGeometry args={[0.6, 0.04, 0.02]} />
            <meshStandardMaterial color="#E3D0EB" roughness={0.3} />
          </mesh>

          {/* Keyboard Bed Recess */}
          <mesh position={[0, 0.072, -0.3]}>
            <boxGeometry args={[3.2, 0.005, 1.35]} />
            <meshStandardMaterial color="#EAE0F2" roughness={0.4} />
          </mesh>

          {/* Individual White Key Caps Grid */}
          {Array.from({ length: 5 }).map((_, row) =>
            Array.from({ length: 14 }).map((_, col) => (
              <mesh
                key={`${row}-${col}`}
                position={[-1.4 + col * 0.215, 0.08, -0.85 + row * 0.25]}
              >
                <boxGeometry args={[0.18, 0.015, 0.2]} />
                <meshStandardMaterial color="#FFFFFF" roughness={0.25} />
              </mesh>
            ))
          )}

          {/* Trackpad */}
          <mesh position={[0, 0.072, 0.65]}>
            <boxGeometry args={[1.1, 0.005, 0.75]} />
            <meshPhysicalMaterial
              color="#FAF5FC"
              roughness={0.2}
              metalness={0.05}
            />
          </mesh>

          {/* Trackpad Subtle Border Frame */}
          <mesh position={[0, 0.074, 0.65]}>
            <boxGeometry args={[1.12, 0.002, 0.77]} />
            <meshBasicMaterial color="#D8C5E5" wireframe />
          </mesh>

          {/* Hinge Cylinders */}
          <mesh position={[-1.2, 0.08, -1.18]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.05, 0.05, 0.25, 16]} />
            <meshStandardMaterial color="#7A61A2" />
          </mesh>
          <mesh position={[1.2, 0.08, -1.18]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.05, 0.05, 0.25, 16]} />
            <meshStandardMaterial color="#7A61A2" />
          </mesh>
        </group>

        {/* ==================== 2. UPRIGHT DISPLAY LID (UPRIGHT OPEN ANGLE) ==================== */}
        <group ref={lidRef} position={[0, -0.42, -1.18]} rotation={[-1.57, 0, 0]}>
          {/* Lid Back Shell */}
          <mesh position={[0, 1.15, 0]}>
            <boxGeometry args={[3.6, 2.35, 0.08]} />
            <meshPhysicalMaterial
              color="#F3EBF7"
              roughness={0.2}
              metalness={0.1}
              clearcoat={0.8}
            />
          </mesh>

          {/* White Front Bezel Frame */}
          <mesh position={[0, 1.15, 0.042]}>
            <boxGeometry args={[3.54, 2.28, 0.005]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.1} />
          </mesh>

          {/* Inner Screen Display Base */}
          <mesh position={[0, 1.15, 0.046]}>
            <planeGeometry args={[3.38, 2.12]} />
            <meshBasicMaterial color="#FAF5FC" />
          </mesh>

          {/* Live Studio Interface Display on Screen */}
          <Html
            transform
            distanceFactor={2.7}
            position={[0, 1.15, 0.048]}
            zIndexRange={[100, 0]}
          >
            <div className="w-[660px] h-[415px] rounded-lg bg-gradient-to-br from-[#FAF5FC] via-[#F4EBF8] to-[#EAE0F2] border-2 border-purple-300 p-6 flex flex-col justify-between text-purple-950 select-none overflow-hidden shadow-2xl">
              {/* Top Browser Bar */}
              <div className="flex items-center justify-between border-b border-purple-300/40 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  <span className="text-[11px] font-mono text-purple-800 ml-2 tracking-widest uppercase font-bold">
                    sumya-web-studio.com
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-md bg-purple-500/15 text-purple-900 border border-purple-400/40 font-bold">
                  LIVE STUDIO PLATFORM
                </span>
              </div>

              {/* Aesthetic Landscape Showcase inside Screen */}
              <div className="my-auto space-y-3 px-2 text-center">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-400/40 text-[10px] font-bold text-purple-900 uppercase tracking-widest">
                  🌸 SUMYA WEB STUDIO
                </div>
                <h3 className="font-serif text-3xl font-bold tracking-tight text-purple-950 leading-tight">
                  DIGITAL PRODUCTS BUILT TO <br />
                  <span className="text-gradient-hero italic font-normal">MOVE BUSINESSES FORWARD.</span>
                </h3>
                <p className="text-xs text-purple-900/80 max-w-md mx-auto leading-relaxed font-semibold">
                  Websites • Executive Portfolios • AI Solutions • Custom Software
                </p>
              </div>

              {/* Bottom Status */}
              <div className="flex items-center justify-between text-[10px] font-mono text-purple-800 border-t border-purple-300/40 pt-2.5 font-bold">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  SYSTEM ACTIVE: 60 FPS
                </span>
                <span>SUMYA WEB STUDIO © 2026</span>
              </div>
            </div>
          </Html>
        </group>
      </Float>

      {/* Floating Translucent Glass UI Fragments around Laptop */}
      {cardsData.map((card, idx) => {
        const [x, y, z] = card.pos;
        const scaledX = x * cardSeparation;
        const scaledY = y * cardSeparation;
        const scaledZ = z * cardSeparation;

        return (
          <Float key={idx} speed={1.5 + idx * 0.3} rotationIntensity={0.2} floatIntensity={0.5}>
            <group position={[scaledX, scaledY, scaledZ]}>
              <Html transform distanceFactor={5} zIndexRange={[100, 0]} position={[0, 0, 0]}>
                <div className="px-4 py-2 glass-panel text-xs font-bold tracking-wider text-ebony dark:text-silk-100 border border-luxury-champagne/30 shadow-glass-silk flex items-center gap-2 whitespace-nowrap backdrop-blur-md pointer-events-none select-none bg-white/85 dark:bg-ebony-light/85">
                  <span className="w-2 h-2 rounded-full bg-luxury-dustyrose animate-pulse" />
                  {card.label}
                </div>
              </Html>
            </group>
          </Float>
        );
      })}
    </group>
  );
}
