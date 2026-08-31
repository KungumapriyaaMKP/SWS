'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Html } from '@react-three/drei';
import * as THREE from 'three';

interface Laptop3DObjectProps {
  scrollProgress?: number;
  mousePos?: { x: number; y: number };
}

export function Laptop3DObject({ scrollProgress = 0, mousePos = { x: 0, y: 0 } }: Laptop3DObjectProps) {
  const laptopGroupRef = useRef<THREE.Group>(null);

  const cardSeparation = 1 + scrollProgress * 1.3;

  useFrame((state, delta) => {
    if (laptopGroupRef.current) {
      // Natural laptop presentation angle: tilted slightly up & turned 20 deg left
      const targetRotX = 0.25 + mousePos.y * 0.25 + scrollProgress * 0.3;
      const targetRotY = -0.35 + mousePos.x * 0.35 + state.clock.elapsedTime * 0.08;
      
      laptopGroupRef.current.rotation.x = THREE.MathUtils.lerp(laptopGroupRef.current.rotation.x, targetRotX, delta * 3);
      laptopGroupRef.current.rotation.y = THREE.MathUtils.lerp(laptopGroupRef.current.rotation.y, targetRotY, delta * 3);
      
      laptopGroupRef.current.position.y = THREE.MathUtils.lerp(laptopGroupRef.current.position.y, scrollProgress * 1.0 - 0.2, delta * 3);
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
    <group ref={laptopGroupRef} position={[0, -0.3, 0]} scale={[1.05, 1.05, 1.05]}>
      {/* Studio Lighting */}
      <ambientLight intensity={0.9} />
      <pointLight position={[0, 4, 3]} intensity={6} color="#ffffff" distance={8} />
      <pointLight position={[3, 2, 2]} intensity={4} color="#b88fa5" distance={7} />
      <pointLight position={[-3, -1, 1]} intensity={4} color="#9884b6" distance={7} />

      <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.3}>
        {/* ==================== 1. LAPTOP BASE (KEYBOARD CHASSIS) ==================== */}
        <group position={[0, -0.6, 0]}>
          {/* Main Aluminum Body Base */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[3.6, 0.12, 2.4]} />
            <meshPhysicalMaterial
              color="#2a2436"
              metalness={0.85}
              roughness={0.2}
              clearcoat={0.6}
            />
          </mesh>

          {/* Chrome Trim Border */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[3.62, 0.124, 2.42]} />
            <meshStandardMaterial color="#b88fa5" wireframe transparent opacity={0.25} />
          </mesh>

          {/* Keyboard Recess Bed */}
          <mesh position={[0, 0.062, -0.35]}>
            <boxGeometry args={[3.1, 0.005, 1.3]} />
            <meshStandardMaterial color="#16131d" roughness={0.6} />
          </mesh>

          {/* Individual Keyboard Key Matrix */}
          <mesh position={[0, 0.07, -0.35]}>
            <boxGeometry args={[3.0, 0.01, 1.2]} />
            <meshStandardMaterial color="#2d263a" roughness={0.4} />
          </mesh>

          {/* Trackpad */}
          <mesh position={[0, 0.062, 0.65]}>
            <boxGeometry args={[1.1, 0.005, 0.75]} />
            <meshPhysicalMaterial
              color="#352e44"
              metalness={0.7}
              roughness={0.25}
            />
          </mesh>

          {/* Front Notch Lip */}
          <mesh position={[0, 0.02, 1.2]}>
            <boxGeometry args={[0.5, 0.04, 0.02]} />
            <meshStandardMaterial color="#b88fa5" />
          </mesh>
        </group>

        {/* ==================== 2. LAPTOP DISPLAY LID (UPRIGHT SCREEN) ==================== */}
        {/* Hinge point at back of base */}
        <group position={[0, -0.54, -1.18]} rotation={[-1.75, 0, 0]}>
          {/* Display Lid Back Shell */}
          <mesh position={[0, 1.15, 0]}>
            <boxGeometry args={[3.6, 2.3, 0.08]} />
            <meshPhysicalMaterial
              color="#1e1929"
              metalness={0.9}
              roughness={0.15}
              clearcoat={0.8}
            />
          </mesh>

          {/* Glass Display Front Bezel Frame */}
          <mesh position={[0, 1.15, 0.042]}>
            <boxGeometry args={[3.52, 2.22, 0.005]} />
            <meshStandardMaterial color="#0c0914" roughness={0.1} />
          </mesh>

          {/* Illuminated Screen Surface */}
          <mesh position={[0, 1.18, 0.046]}>
            <planeGeometry args={[3.36, 2.06]} />
            <meshBasicMaterial color="#16131d" />
          </mesh>

          {/* Laptop Screen HTML Interface */}
          <Html
            transform
            distanceFactor={2.7}
            position={[0, 1.18, 0.048]}
            zIndexRange={[100, 0]}
          >
            <div className="w-[660px] h-[415px] rounded-lg bg-gradient-to-br from-[#16131D] via-[#1E192B] to-[#0A0810] border border-purple-500/30 p-6 flex flex-col justify-between text-white select-none overflow-hidden shadow-2xl">
              {/* Header Bar */}
              <div className="flex items-center justify-between border-b border-purple-500/20 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/90" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/90" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/90" />
                  <span className="text-[11px] font-mono text-purple-300 ml-2 tracking-widest uppercase">
                    sumya-web-studio.com
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-md bg-purple-500/20 text-purple-300 border border-purple-400/30 font-bold">
                  LIVE STUDIO PLATFORM
                </span>
              </div>

              {/* Showcase inside Screen */}
              <div className="my-auto space-y-3 px-2">
                <h3 className="font-serif text-3xl font-bold tracking-tight text-white leading-tight">
                  WE BUILD DIGITAL EXPERIENCES THAT <span className="text-gradient-hero italic font-normal">GROW BUSINESSES.</span>
                </h3>
                <p className="text-xs text-zinc-300 max-w-lg leading-relaxed font-medium">
                  Websites, Executive Portfolios, AI Solutions and Custom Software engineered for ambitious businesses.
                </p>

                <div className="flex items-center gap-3 pt-2">
                  <div className="px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-[11px] font-bold text-white shadow-rose-glow">
                    Start a Project →
                  </div>
                  <div className="px-4 py-1.5 rounded-full bg-white/10 text-[11px] font-bold text-zinc-200 border border-white/20">
                    Explore Our Work
                  </div>
                </div>
              </div>

              {/* Footer status bar */}
              <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 border-t border-purple-500/20 pt-2.5">
                <span className="flex items-center gap-1.5 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
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
                <div className="px-4 py-2 rounded-xl glass-panel text-xs font-bold tracking-wider text-ebony dark:text-silk-100 border border-luxury-champagne/30 shadow-glass-silk flex items-center gap-2 whitespace-nowrap backdrop-blur-md pointer-events-none select-none bg-white/85 dark:bg-ebony-light/85">
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
