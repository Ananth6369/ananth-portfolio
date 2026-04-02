"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Float, Html } from "@react-three/drei";
import { useRef, useMemo, type ReactNode } from "react";
import * as THREE from "three";
import {
  ShieldCheck,
  Cpu,
  BrainCircuit,
  GlobeLock,
  PenTool,
  CodeSquare,
} from "lucide-react";

const skills = [
  { name: "Testing", icon: ShieldCheck, color: "#5271ff", position: [-4, 2, -2] },
  { name: "Automation", icon: Cpu, color: "#9d4edd", position: [4, 1.5, -3] },
  { name: "AI", icon: BrainCircuit, color: "#00f0ff", position: [-3, -2, -1] },
  { name: "DevOps", icon: GlobeLock, color: "#ff0055", position: [3, -2, -2] },
  { name: "UI/UX", icon: PenTool, color: "#ffaa00", position: [-5, 0, -4] },
  { name: "Development", icon: CodeSquare, color: "#00ffaa", position: [5, 0, -1] },
];

function FloatingElement({ skill, index }: { skill: any, index: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3 + index) * 0.2;
      meshRef.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.3 + index) * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1} position={skill.position as [number, number, number]}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[0.6, 1]} />
        <meshStandardMaterial 
          color={skill.color} 
          wireframe 
          emissive={skill.color}
          emissiveIntensity={0.5}
        />
        <Html center distanceFactor={10} zIndexRange={[100, 0]}>
          <div className="flex flex-col items-center justify-center p-2 glass-panel rounded-xl text-white backdrop-blur-md border border-white/10 transition-transform hover:scale-110">
            <skill.icon size={24} color={skill.color} className="drop-shadow-md" />
            <span className="mt-2 text-xs font-semibold tracking-wider uppercase text-glow" style={{ textShadow: `0 0 10px ${skill.color}` }}>
              {skill.name}
            </span>
          </div>
        </Html>
      </mesh>
    </Float>
  );
}

function Particles() {
  const count = 300;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      arr[i] = (Math.random() - 0.5) * 30;
    }
    return arr;
  }, []);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.02) * 0.2;
    }
  });

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, [positions]);

  return (
    <points ref={pointsRef} geometry={geo}>
      <pointsMaterial size={0.05} color="#5271ff" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

function CameraRig({ children }: { children: ReactNode }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, (state.pointer.x * Math.PI) / 10, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, (state.pointer.y * Math.PI) / 10, 0.05);
    }
  });

  return <group ref={groupRef}>{children}</group>;
}

export default function Scene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <color attach="background" args={['#030305']} />
        
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#5271ff" />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#9d4edd" />
        
        <CameraRig>
          <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
          <Particles />
          {skills.map((skill, index) => (
            <FloatingElement key={skill.name} skill={skill} index={index} />
          ))}
        </CameraRig>
        
        <fog attach="fog" args={['#030305', 5, 20]} />
      </Canvas>
    </div>
  );
}
