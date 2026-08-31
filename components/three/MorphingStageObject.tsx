'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

interface MorphingStageObjectProps {
  activeStage: number; // 0: IDEA, 1: DESIGN, 2: BUILD, 3: LAUNCH, 4: GROW
}

export function MorphingStageObject({ activeStage }: MorphingStageObjectProps) {
  const groupRef = useRef<THREE.Group>(null);
  const meshCoreRef = useRef<THREE.Mesh>(null);
  const outerWireRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  // Stage configurations
  const stageConfigs = [
    { scale: 0.9, color: '#6366F1', emissive: '#3730A3', wireframe: true, wireOpacity: 0.6, rotationSpeed: 0.4 },  // IDEA
    { scale: 1.1, color: '#A855F7', emissive: '#6B21A8', wireframe: false, wireOpacity: 0.3, rotationSpeed: 0.7 }, // DESIGN
    { scale: 1.3, color: '#7C3AED', emissive: '#581C87', wireframe: false, wireOpacity: 0.4, rotationSpeed: 1.0 }, // BUILD
    { scale: 1.45, color: '#C084FC', emissive: '#7E22CE', wireframe: false, wireOpacity: 0.2, rotationSpeed: 1.3 },// LAUNCH
    { scale: 1.6, color: '#E0E7FF', emissive: '#6366F1', wireframe: false, wireOpacity: 0.5, rotationSpeed: 1.6 }, // GROW
  ];

  const config = stageConfigs[Math.min(Math.max(activeStage, 0), 4)];

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Lerp scale to stage
      groupRef.current.scale.lerp(new THREE.Vector3(config.scale, config.scale, config.scale), delta * 4);
      groupRef.current.rotation.y += delta * config.rotationSpeed * 0.5;
    }

    if (meshCoreRef.current) {
      meshCoreRef.current.rotation.x += delta * 0.3;
    }

    if (outerWireRef.current) {
      outerWireRef.current.rotation.z -= delta * 0.4;
    }

    if (ringRef.current) {
      ringRef.current.rotation.x += delta * 0.5;
      ringRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.5} />
      <pointLight position={[2, 3, 2]} intensity={6} color={config.color} />
      <pointLight position={[-2, -2, -2]} intensity={4} color="#6366F1" />

      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        {/* Core Geometry - Faceted Octahedron / TorusKnot */}
        <mesh ref={meshCoreRef}>
          <octahedronGeometry args={[1.2, 2]} />
          <meshPhysicalMaterial
            color={config.color}
            emissive={config.emissive}
            emissiveIntensity={0.4 + activeStage * 0.15}
            roughness={0.1}
            transmission={0.85}
            thickness={1.2}
            clearcoat={1}
            transparent
            opacity={0.9}
          />
        </mesh>

        {/* Outer Facet Layer */}
        <mesh ref={outerWireRef}>
          <icosahedronGeometry args={[1.35, 1]} />
          <meshStandardMaterial
            color={config.color}
            wireframe
            transparent
            opacity={config.wireOpacity}
            emissive={config.emissive}
            emissiveIntensity={0.5}
          />
        </mesh>

        {/* Dynamic Halo Ring */}
        <mesh ref={ringRef}>
          <torusGeometry args={[1.7, 0.02, 16, 80]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive={config.color}
            emissiveIntensity={0.8}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      </Float>
    </group>
  );
}
