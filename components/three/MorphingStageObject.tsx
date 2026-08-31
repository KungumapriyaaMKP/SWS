'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Html } from '@react-three/drei';
import * as THREE from 'three';

interface MorphingStageObjectProps {
  activeStage: number; // 0: STAGE 01 (IDEA), 1: STAGE 02 (STRATEGY), 2: STAGE 03 (DESIGN & DEV), 3: STAGE 04 (AI & LAUNCH), 4: STAGE 05 (GROWTH)
}

export function MorphingStageObject({ activeStage }: MorphingStageObjectProps) {
  const groupRef = useRef<THREE.Group>(null);
  const lotusCoreRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const outerRingRef = useRef<THREE.Mesh>(null);

  // Stage details related to Sumya Web Studio
  const stagesInfo = [
    { title: 'STAGE 01: IDEA & STRATEGY', desc: 'Transforming vision into digital blueprint' },
    { title: 'STAGE 02: UX & ARCHITECTURE', desc: 'Crafting high-conversion user journeys' },
    { title: 'STAGE 03: STUDIO ENGINEERING', desc: 'Building sub-second fast web products' },
    { title: 'STAGE 04: AI & CLOUD DEPLOY', desc: 'Integrating smart agents & live hosting' },
    { title: 'STAGE 05: SCALE & REVENUE IMPACT', desc: 'Driving continuous business growth' },
  ];

  const currentInfo = stagesInfo[Math.min(Math.max(activeStage, 0), 4)];
  const targetScale = 1.0 + activeStage * 0.12;

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Lerp scale
      groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 4);
      groupRef.current.rotation.y += delta * 0.4;
    }

    if (lotusCoreRef.current) {
      lotusCoreRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.8) * 0.1;
      lotusCoreRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.6) * 0.08;
    }

    if (ringRef.current) {
      ringRef.current.rotation.x += delta * 0.6;
      ringRef.current.rotation.y += delta * 0.4;
    }

    if (outerRingRef.current) {
      outerRingRef.current.rotation.z -= delta * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Studio Lighting */}
      <ambientLight intensity={1.5} />
      <directionalLight position={[4, 6, 4]} intensity={2.5} color="#FFFFFF" />
      <pointLight position={[-3, 2, 3]} intensity={3.5} color="#3B0764" />
      <pointLight position={[3, -2, 2]} intensity={3.0} color="#10B981" />

      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.4}>
        {/* ==================== 3D SUMYA LOTUS FLOWER EMBLEM ==================== */}
        <group ref={lotusCoreRef} position={[0, 0, 0]}>
          {/* Central Radiant Lotus Sphere Core */}
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[0.55, 32, 32]} />
            <meshPhysicalMaterial
              color="#3B0764"
              emissive="#3B0764"
              emissiveIntensity={0.6}
              roughness={0.1}
              metalness={0.2}
              clearcoat={1}
            />
          </mesh>

          {/* Inner Layer Lotus Petals (8 Petals) */}
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i / 8) * Math.PI * 2;
            const petalOpenAngle = 0.4 + activeStage * 0.1; // Petals bloom wider as stages progress
            return (
              <group key={`inner-${i}`} rotation={[0, angle, 0]}>
                <mesh
                  position={[0, 0.4, 0.45]}
                  rotation={[petalOpenAngle, 0, 0]}
                >
                  <coneGeometry args={[0.3, 0.85, 4]} />
                  <meshPhysicalMaterial
                    color="#701548"
                    emissive="#3B0764"
                    emissiveIntensity={0.3}
                    roughness={0.2}
                    transmission={0.4}
                    transparent
                    opacity={0.9}
                  />
                </mesh>
              </group>
            );
          })}

          {/* Outer Layer Lotus Petals (12 Petals) */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i / 12) * Math.PI * 2 + Math.PI / 12;
            const outerOpenAngle = 0.75 + activeStage * 0.12;
            return (
              <group key={`outer-${i}`} rotation={[0, angle, 0]}>
                <mesh
                  position={[0, 0.25, 0.7]}
                  rotation={[outerOpenAngle, 0, 0]}
                >
                  <coneGeometry args={[0.35, 1.0, 4]} />
                  <meshPhysicalMaterial
                    color="#1A4331"
                    emissive="#10B981"
                    emissiveIntensity={0.2}
                    roughness={0.3}
                    transmission={0.3}
                    transparent
                    opacity={0.85}
                  />
                </mesh>
              </group>
            );
          })}
        </group>

        {/* Inner Glowing Orbit Ring */}
        <mesh ref={ringRef}>
          <torusGeometry args={[1.5, 0.025, 16, 100]} />
          <meshStandardMaterial
            color="#3B0764"
            emissive="#3B0764"
            emissiveIntensity={0.9}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>

        {/* Outer Orbit Wireframe Ring */}
        <mesh ref={outerRingRef}>
          <torusGeometry args={[1.85, 0.015, 16, 80]} />
          <meshStandardMaterial
            color="#10B981"
            emissive="#10B981"
            emissiveIntensity={0.7}
            wireframe
          />
        </mesh>
      </Float>

      {/* Floating Interactive Studio Info Card below the 3D Lotus */}
      <Html position={[0, -2.1, 0]} center transform distanceFactor={6} zIndexRange={[100, 0]}>
        <div className="px-5 py-3 glass-panel border-2 border-purple-900/30 bg-white/95 shadow-xl flex flex-col items-center text-center whitespace-nowrap pointer-events-none select-none min-w-[260px]">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            <span className="text-[11px] font-extrabold tracking-widest text-[#3B0764] uppercase">
              {currentInfo.title}
            </span>
          </div>
          <span className="text-xs font-semibold text-purple-950">
            {currentInfo.desc}
          </span>
        </div>
      </Html>
    </group>
  );
}
