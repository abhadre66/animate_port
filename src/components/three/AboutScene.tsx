"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function MorphShape() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);
  const { mouse } = useThree();

  useFrame((state, delta) => {
    if (!meshRef.current || !wireRef.current) return;
    meshRef.current.rotation.x += delta * 0.15;
    meshRef.current.rotation.y += delta * 0.2;
    wireRef.current.rotation.x = meshRef.current.rotation.x * -1.4;
    wireRef.current.rotation.y = meshRef.current.rotation.y * -1.4;

    const targetX = mouse.y * 0.3;
    const targetY = mouse.x * 0.3;
    meshRef.current.rotation.x += (targetX - meshRef.current.rotation.x) * 0.02;
    meshRef.current.rotation.y += (targetY - meshRef.current.rotation.y) * 0.02;
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.4, 1]} />
        <meshStandardMaterial
          color="#7c5cff"
          emissive="#5ce1ff"
          emissiveIntensity={0.3}
          roughness={0.15}
          metalness={0.9}
          wireframe={false}
          transparent
          opacity={0.55}
        />
      </mesh>
      <mesh ref={wireRef} scale={1.4}>
        <icosahedronGeometry args={[1.4, 0]} />
        <meshBasicMaterial color="#a78bfa" wireframe transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

export default function AboutScene() {
  return (
    <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }} dpr={[1, 1.5]} gl={{ alpha: true }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[3, 3, 3]} intensity={2} color="#5ce1ff" />
      <pointLight position={[-3, -2, -2]} intensity={1.5} color="#7c5cff" />
      <MorphShape />
    </Canvas>
  );
}
