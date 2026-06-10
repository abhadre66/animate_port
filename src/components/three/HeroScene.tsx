"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import ParticleField from "./ParticleField";

function CameraRig() {
  const { camera, mouse } = useThree();
  const target = useRef(new THREE.Vector3(0, 0, 0));

  useFrame(() => {
    target.current.x = THREE.MathUtils.lerp(target.current.x, mouse.x * 0.6, 0.03);
    target.current.y = THREE.MathUtils.lerp(target.current.y, mouse.y * 0.4, 0.03);
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, target.current.x, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, target.current.y, 0.05);
    camera.lookAt(0, 0, -4);
  });

  return null;
}

function GlowSphere() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.position.y = Math.sin(t * 0.4) * 0.2;
    ref.current.rotation.y = t * 0.1;
  });

  return (
    <mesh ref={ref} position={[0, 0, -5]}>
      <sphereGeometry args={[1.1, 64, 64]} />
      <meshStandardMaterial
        color="#7c5cff"
        emissive="#7c5cff"
        emissiveIntensity={1.2}
        roughness={0.2}
        metalness={0.8}
        transparent
        opacity={0.35}
      />
    </mesh>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 1], fov: 55 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={2} color="#5ce1ff" />
      <pointLight position={[-5, -3, -2]} intensity={1.5} color="#7c5cff" />
      <ParticleField />
      <GlowSphere />
      <CameraRig />
    </Canvas>
  );
}
