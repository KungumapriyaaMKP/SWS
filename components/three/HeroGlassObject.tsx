'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Html } from '@react-three/drei';
import * as THREE from 'three';

interface HeroGlassObjectProps {
  scrollProgress?: number;
  mousePos?: { x: number; y: number };
}

export function HeroGlassObject({ scrollProgress = 0, mousePos = { x: 0, y: 0 } }: HeroGlassObjectProps) {
  const outerCoreRef = useRef<THREE.Group>(null);
  const innerMeshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  const cardSeparation = 1 + scrollProgress * 1.5;

  useFrame((state, delta) => {
    if (outerCoreRef.current) {
      const targetRotX = mousePos.y * 0.4 + scrollProgress * Math.PI * 0.5;
      const targetRotY = mousePos.x * 0.4 + state.clock.elapsedTime * 0.15;
      
      outerCoreRef.current.rotation.x = THREE.MathUtils.lerp(outerCoreRef.current.rotation.x, targetRotX, delta * 3);
      outerCoreRef.current.rotation.y = THREE.MathUtils.lerp(outerCoreRef.current.rotation.y, targetRotY, delta * 3);
      
      outerCoreRef.current.position.y = THREE.MathUtils.lerp(outerCoreRef.current.position.y, scrollProgress * 1.2, delta * 3);
      outerCoreRef.current.position.z = THREE.MathUtils.lerp(outerCoreRef.current.position.z, scrollProgress * 0.8, delta * 3);
    }

    if (innerMeshRef.current) {
      innerMeshRef.current.rotation.x += delta * 0.3;
      innerMeshRef.current.rotation.z += delta * 0.2;
    }

    if (ringRef.current) {
      ringRef.current.rotation.z -= delta * 0.4;
      ringRef.current.rotation.y += delta * 0.2;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.x += delta * 0.3;
      ring2Ref.current.rotation.z += delta * 0.5;
    }
  });

  const cardsData = [
    { label: 'WEBSITE DEVELOPMENT', pos: [-2.2, 1.5, 0.5] as [number, number, number] },
    { label: 'EXECUTIVE PORTFOLIOS', pos: [2.3, 1.4, -0.4] as [number, number, number] },
    { label: 'AI SOLUTIONS', pos: [-2.4, -0.3, 0.8] as [number, number, number] },
    { label: 'CUSTOM SOFTWARE', pos: [2.5, -0.5, -0.6] as [number, number, number] },
    { label: 'BUSINESS AUTOMATION', pos: [0, -2.1, 0.7] as [number, number, number] },
  ];

  return (
    <group ref={outerCoreRef}>
      {/* Sublime Champagne & Dusty Rose Point Lights */}
      <pointLight position={[0, 0, 0]} intensity={6} color="#B88FA5" distance={6} />
      <pointLight position={[2, 2, 2]} intensity={4} color="#9884B6" distance={6} />
      <pointLight position={[-2, -2, -1]} intensity={3} color="#7C9082" distance={5} />

      {/* Iridescent Silk Glass Crystal Core */}
      <Float speed={1.8} rotationIntensity={0.3} floatIntensity={0.5}>
        <mesh ref={innerMeshRef}>
          <icosahedronGeometry args={[1.4, 1]} />
          <meshPhysicalMaterial
            roughness={0.08}
            transmission={0.92}
            thickness={1.5}
            ior={1.48}
            reflectivity={0.9}
            clearcoat={1}
            clearcoatRoughness={0.08}
            color="#d8c3b0"
            emissive="#7a61a2"
            emissiveIntensity={0.2}
            transparent
            opacity={0.88}
          />
        </mesh>

        {/* Outer Faceted Champagne Wireframe */}
        <mesh>
          <icosahedronGeometry args={[1.42, 1]} />
          <meshStandardMaterial
            color="#b88fa5"
            wireframe
            transparent
            opacity={0.3}
            emissive="#9884b6"
            emissiveIntensity={0.4}
          />
        </mesh>

        {/* Orbiting Metallic Ring - Warm Champagne Gold */}
        <mesh ref={ringRef} rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[2.0, 0.02, 16, 100]} />
          <meshStandardMaterial
            color="#c5a059"
            metalness={0.9}
            roughness={0.12}
            emissive="#b88fa5"
            emissiveIntensity={0.3}
          />
        </mesh>

        {/* Orbiting Metallic Ring - Muted Lavender Accent */}
        <mesh ref={ring2Ref} rotation={[-Math.PI / 3, Math.PI / 6, 0]}>
          <torusGeometry args={[2.3, 0.015, 16, 100]} />
          <meshStandardMaterial
            color="#9884b6"
            metalness={0.85}
            roughness={0.15}
            emissive="#7c9082"
            emissiveIntensity={0.4}
          />
        </mesh>
      </Float>

      {/* Floating Translucent Silk Glass UI Fragments */}
      {cardsData.map((card, idx) => {
        const [x, y, z] = card.pos;
        const scaledX = x * cardSeparation;
        const scaledY = y * cardSeparation;
        const scaledZ = z * cardSeparation;

        return (
          <Float key={idx} speed={1.5 + idx * 0.3} rotationIntensity={0.2} floatIntensity={0.5}>
            <group position={[scaledX, scaledY, scaledZ]}>
              <Html transform distanceFactor={5} zIndexRange={[100, 0]} position={[0, 0, 0]}>
                <div className="px-4 py-2 rounded-xl glass-panel text-xs font-semibold tracking-wider text-ebony dark:text-silk-100 border border-luxury-champagne/30 shadow-glass-silk flex items-center gap-2 whitespace-nowrap backdrop-blur-md pointer-events-none select-none bg-white/80 dark:bg-ebony-light/80">
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
