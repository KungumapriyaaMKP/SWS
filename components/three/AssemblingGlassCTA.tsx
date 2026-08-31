'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

interface AssemblingGlassCTAProps {
  assembleProgress?: number; // 0 (dispersed) -> 1 (fully merged & glowing)
}

export function AssemblingGlassCTA({ assembleProgress = 0 }: AssemblingGlassCTAProps) {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  // Generate 8 fragment initial positions
  const fragmentOffsets = useMemo(() => {
    return [
      new THREE.Vector3(-2.5, 2.0, 1.2),
      new THREE.Vector3(2.8, -1.8, -1.5),
      new THREE.Vector3(-3.0, -1.5, 1.8),
      new THREE.Vector3(2.2, 2.2, -1.2),
      new THREE.Vector3(-1.8, -2.2, -1.0),
      new THREE.Vector3(2.0, -2.5, 1.5),
      new THREE.Vector3(-2.2, 2.5, -1.8),
      new THREE.Vector3(2.6, 1.8, 1.4),
    ];
  }, []);

  const fragmentRefs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame((state, delta) => {
    const progress = Math.min(Math.max(assembleProgress, 0), 1);
    const inverse = 1 - progress;

    if (groupRef.current) {
      groupRef.current.rotation.y += delta * (0.2 + progress * 0.4);
    }

    // Move fragments toward target position (0,0,0) as progress -> 1
    fragmentOffsets.forEach((initialPos, idx) => {
      const mesh = fragmentRefs.current[idx];
      if (mesh) {
        mesh.position.x = THREE.MathUtils.lerp(mesh.position.x, initialPos.x * inverse, delta * 3);
        mesh.position.y = THREE.MathUtils.lerp(mesh.position.y, initialPos.y * inverse, delta * 3);
        mesh.position.z = THREE.MathUtils.lerp(mesh.position.z, initialPos.z * inverse, delta * 3);
        
        mesh.rotation.x += delta * (0.5 * inverse);
        mesh.rotation.y += delta * (0.6 * inverse);
      }
    });

    if (coreRef.current) {
      const scale = 0.5 + progress * 0.9;
      coreRef.current.scale.set(scale, scale, scale);
      coreRef.current.rotation.x += delta * 0.4;
      coreRef.current.rotation.z += delta * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      <pointLight position={[0, 0, 0]} intensity={4 + assembleProgress * 8} color="#7C3AED" distance={6} />
      <pointLight position={[2, 2, 2]} intensity={3} color="#A855F7" distance={5} />

      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.4}>
        {/* Central Core Crystal */}
        <mesh ref={coreRef}>
          <dodecahedronGeometry args={[1.2, 0]} />
          <meshPhysicalMaterial
            color="#a78bfa"
            emissive="#7c3aed"
            emissiveIntensity={0.2 + assembleProgress * 0.8}
            roughness={0.08}
            transmission={0.9}
            thickness={1.5}
            clearcoat={1}
            transparent
            opacity={0.3 + assembleProgress * 0.65}
          />
        </mesh>

        {/* Outer Assembling Fragments */}
        {fragmentOffsets.map((pos, idx) => (
          <mesh
            key={idx}
            ref={(el) => {
              fragmentRefs.current[idx] = el;
            }}
            position={[pos.x, pos.y, pos.z]}
          >
            <tetrahedronGeometry args={[0.5, 0]} />
            <meshStandardMaterial
              color="#c084fc"
              emissive="#6366f1"
              emissiveIntensity={0.4}
              metalness={0.8}
              roughness={0.2}
              transparent
              opacity={0.8}
            />
          </mesh>
        ))}
      </Float>
    </group>
  );
}
