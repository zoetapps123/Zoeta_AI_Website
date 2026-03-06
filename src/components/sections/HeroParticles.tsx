"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Particles() {
  const meshRef = useRef<THREE.Points>(null);
  const count = 1200;

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 3 + Math.random() * 5;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      sz[i] = Math.random() * 0.5 + 0.1;
    }
    return [pos, sz];
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = clock.elapsedTime * 0.015;
    meshRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.01) * 0.08;
  });

  const geometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geom.setAttribute("size", new THREE.Float32BufferAttribute(sizes, 1));
    return geom;
  }, [positions, sizes]);

  const material = useMemo(
    () =>
      new THREE.PointsMaterial({
        size: 0.04,
        color: new THREE.Color("#818CF8"),
        transparent: true,
        opacity: 0.5,
        sizeAttenuation: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    []
  );

  return <points ref={meshRef} geometry={geometry} material={material} />;
}

export default function HeroParticles() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: false }}
        style={{ background: "transparent" }}
      >
        <Particles />
      </Canvas>
    </div>
  );
}
