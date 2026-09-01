'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, useTexture } from '@react-three/drei';
import * as THREE from 'three';

interface Laptop3DObjectProps {
  scrollProgress?: number;
  mousePos?: { x: number; y: number };
}

export function Laptop3DObject({ scrollProgress = 0, mousePos = { x: 0, y: 0 } }: Laptop3DObjectProps) {
  const laptopGroupRef = useRef<THREE.Group>(null);
  
  // Load the user's authentic Crumbs & Coffee project showcase image texture
  const screenTexture = useTexture('/crumbs-and-coffee.png');

  useFrame((state, delta) => {
    if (laptopGroupRef.current) {
      // Natural 3/4 perspective matching user reference image
      const targetRotX = 0.25 + mousePos.y * 0.15 + scrollProgress * 0.15;
      const targetRotY = -0.42 + mousePos.x * 0.25 + Math.sin(state.clock.elapsedTime * 0.5) * 0.03;
      
      laptopGroupRef.current.rotation.x = THREE.MathUtils.lerp(laptopGroupRef.current.rotation.x, targetRotX, delta * 3);
      laptopGroupRef.current.rotation.y = THREE.MathUtils.lerp(laptopGroupRef.current.rotation.y, targetRotY, delta * 3);
      
      laptopGroupRef.current.position.y = THREE.MathUtils.lerp(laptopGroupRef.current.position.y, scrollProgress * 0.5, delta * 3);
    }
  });

  return (
    <group ref={laptopGroupRef} position={[0, -0.2, 0]} scale={[0.88, 0.88, 0.88]}>
      {/* Studio Lighting */}
      <ambientLight intensity={1.6} />
      <directionalLight position={[5, 8, 6]} intensity={3.0} color="#ffffff" />
      <pointLight position={[-4, 3, 2]} intensity={3.5} color="#D88EA8" distance={8} />
      <pointLight position={[4, -2, 2]} intensity={3.5} color="#9884B6" distance={8} />

      <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.2}>
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

          {/* Trackpad Border Frame */}
          <mesh position={[0, 0.074, 0.65]}>
            <boxGeometry args={[1.12, 0.002, 0.77]} />
            <meshBasicMaterial color="#D8C5E5" wireframe />
          </mesh>

          {/* Hinge Cylinders */}
          <mesh position={[-1.2, 0.08, -1.18]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.05, 0.05, 0.25, 16]} />
            <meshStandardMaterial color="#3B0764" />
          </mesh>
          <mesh position={[1.2, 0.08, -1.18]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.05, 0.05, 0.25, 16]} />
            <meshStandardMaterial color="#3B0764" />
          </mesh>
        </group>

        {/* ==================== 2. UPRIGHT DISPLAY LID WITH USER'S PROJECT SCREEN IMAGE ==================== */}
        <group position={[0, -0.42, -1.18]} rotation={[-0.55, 0, 0]}>
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

          {/* Crisp White Bezel Front Frame */}
          <mesh position={[0, 1.15, 0.042]}>
            <boxGeometry args={[3.54, 2.28, 0.005]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.1} />
          </mesh>

          {/* User's Project Screen Texture Plane (100% Native WebGL - Fixed to Lid Mesh) */}
          <mesh position={[0, 1.15, 0.046]}>
            <planeGeometry args={[3.38, 2.12]} />
            <meshBasicMaterial map={screenTexture} />
          </mesh>
        </group>
      </Float>
    </group>
  );
}
