'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Html } from '@react-three/drei';
import * as THREE from 'three';

interface Laptop3DObjectProps {
  scrollProgress?: number;
  mousePos?: { x: number; y: number };
}

export function Laptop3DObject({ scrollProgress = 0, mousePos = { x: 0, y: 0 } }: Laptop3DObjectProps) {
  const laptopGroupRef = useRef<THREE.Group>(null);

  // Generate crisp native WebGL screen texture (Guaranteed 100% attached to lid)
  const screenTexture = useMemo(() => {
    if (typeof window === 'undefined') return null;

    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 640;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      // Soft Pastel Lilac Studio Background Gradient
      const grad = ctx.createLinearGradient(0, 0, 1024, 640);
      grad.addColorStop(0, '#FAF5FC');
      grad.addColorStop(0.5, '#F4EBF8');
      grad.addColorStop(1, '#EAE0F2');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1024, 640);

      // Outer Border Line
      ctx.strokeStyle = 'rgba(152, 132, 182, 0.4)';
      ctx.lineWidth = 6;
      ctx.strokeRect(10, 10, 1004, 620);

      // Top Browser Bar
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.fillRect(20, 20, 984, 50);

      // Browser Dots
      ctx.fillStyle = '#EC4899';
      ctx.beginPath();
      ctx.arc(50, 45, 8, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#F59E0B';
      ctx.beginPath();
      ctx.arc(75, 45, 8, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#10B981';
      ctx.beginPath();
      ctx.arc(100, 45, 8, 0, Math.PI * 2);
      ctx.fill();

      // Browser URL Text
      ctx.fillStyle = '#3B0764';
      ctx.font = 'bold 16px sans-serif';
      ctx.fillText('sumya-web-studio.com', 130, 50);

      // Live Badge Right
      ctx.fillStyle = '#9333EA';
      ctx.fillRect(800, 32, 180, 26);
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText('LIVE STUDIO PLATFORM', 812, 50);

      // Brand Pill Badge Center
      ctx.fillStyle = 'rgba(147, 51, 234, 0.12)';
      ctx.fillRect(380, 110, 260, 36);
      ctx.fillStyle = '#3B0764';
      ctx.font = 'bold 14px sans-serif';
      ctx.fillText('🌸 SUMYA WEB STUDIO', 420, 133);

      // Main Headline Text
      ctx.fillStyle = '#16131D';
      ctx.font = 'bold 36px Georgia, serif';
      ctx.textAlign = 'center';
      ctx.fillText('WE BUILD DIGITAL EXPERIENCES', 512, 220);

      ctx.fillStyle = '#3B0764';
      ctx.font = 'italic bold 42px Georgia, serif';
      ctx.fillText('THAT GROW BUSINESSES.', 512, 280);

      // Subtitle
      ctx.fillStyle = '#5A5468';
      ctx.font = '500 20px sans-serif';
      ctx.fillText('Websites • Executive Portfolios • AI Solutions • Custom Software', 512, 340);

      // Primary CTA Button
      ctx.fillStyle = '#3B0764';
      ctx.fillRect(352, 400, 150, 48);
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 15px sans-serif';
      ctx.fillText('Start a Project →', 427, 430);

      // Secondary CTA Button
      ctx.strokeStyle = '#3B0764';
      ctx.lineWidth = 2;
      ctx.strokeRect(522, 400, 150, 48);
      ctx.fillStyle = '#16131D';
      ctx.font = 'bold 15px sans-serif';
      ctx.fillText('Explore Work', 597, 430);

      // Bottom Status Line
      ctx.strokeStyle = 'rgba(152, 132, 182, 0.3)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(40, 570);
      ctx.lineTo(984, 570);
      ctx.stroke();

      ctx.fillStyle = '#10B981';
      ctx.beginPath();
      ctx.arc(60, 595, 6, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#3B0764';
      ctx.font = 'bold 14px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('SYSTEM ACTIVE: 60 FPS', 78, 600);

      ctx.textAlign = 'right';
      ctx.fillText('SUMYA WEB STUDIO © 2026', 984, 600);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);

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
      {/* Studio Lighting */}
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

        {/* ==================== 2. UPRIGHT DISPLAY LID WITH NATIVE CANVAS TEXTURE ==================== */}
        <group position={[0, -0.42, -1.18]} rotation={[-1.57, 0, 0]}>
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

          {/* Screen Display Plane (100% Native WebGL - Fixed to Lid Mesh) */}
          <mesh position={[0, 1.15, 0.046]}>
            <planeGeometry args={[3.38, 2.12]} />
            {screenTexture ? (
              <meshBasicMaterial map={screenTexture} />
            ) : (
              <meshBasicMaterial color="#FAF5FC" />
            )}
          </mesh>
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
