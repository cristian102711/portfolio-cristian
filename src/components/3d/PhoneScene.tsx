'use client'

import { Suspense, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Environment, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'
import { usePortfolio } from '@/context/PortfolioContext'

// iPhone-style phone model built with primitives
function IPhoneModel() {
  const groupRef = useRef<THREE.Group>(null)
  const screenRef = useRef<THREE.Mesh>(null)
  const { activeProject } = usePortfolio()
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.getElapsedTime()
    // Gentle floating rotation
    groupRef.current.rotation.y = Math.sin(t * 0.35) * 0.25
    groupRef.current.rotation.x = Math.cos(t * 0.2) * 0.07
    // Slight zoom on hover
    const targetScale = hovered ? 1.08 : 1
    groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.05)

    // Screen color pulse based on active project
    if (screenRef.current) {
      const mat = screenRef.current.material as THREE.MeshStandardMaterial
      const hue = activeProject ? 0.75 : 0.65 + Math.sin(t * 0.4) * 0.04
      mat.emissive.setHSL(hue, 0.9, 0.15)
    }
  })

  return (
    <group
      ref={groupRef}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      {/* ── Body ─────────────────────────────────────────── */}
      <RoundedBox args={[1.15, 2.35, 0.11]} radius={0.12} smoothness={2}>
        <meshStandardMaterial
          color="#1c1c1e"
          metalness={0.9}
          roughness={0.1}
          envMapIntensity={1}
        />
      </RoundedBox>

      {/* ── Side frame (titanium-like ring) ──────────────── */}
      <RoundedBox args={[1.21, 2.41, 0.09]} radius={0.12} smoothness={2}>
        <meshStandardMaterial
          color="#4c4c54"
          metalness={0.95}
          roughness={0.05}
          envMapIntensity={1.5}
        />
      </RoundedBox>

      {/* ── Screen background ────────────────────────────── */}
      <mesh position={[0, 0, 0.057]}>
        <planeGeometry args={[0.96, 2.05]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* ── Screen glow / display ─────────────────────────── */}
      <mesh ref={screenRef} position={[0, 0, 0.058]}>
        <planeGeometry args={[0.94, 2.03]} />
        <meshStandardMaterial
          color="#07071a"
          emissive="#1a0a50"
          emissiveIntensity={1}
          roughness={0.6}
        />
      </mesh>

      {/* ── Screen inner UI lines (decorative) ───────────── */}
      {[-0.6, -0.2, 0.2, 0.6].map((y, i) => (
        <mesh key={i} position={[0, y, 0.062]}>
          <planeGeometry args={[0.7, 0.003]} />
          <meshStandardMaterial color="#7c5cf2" transparent opacity={0.3} />
        </mesh>
      ))}
      {/* App icon grid on screen */}
      {[[-0.28, 0.55], [0, 0.55], [0.28, 0.55],
        [-0.28, 0.2], [0, 0.2], [0.28, 0.2],
        [-0.28, -0.15], [0, -0.15], [0.28, -0.15]].map(([x, y], i) => (
        <mesh key={`icon-${i}`} position={[x, y, 0.062]}>
          <planeGeometry args={[0.16, 0.16]} />
          <meshStandardMaterial
            color={new THREE.Color().setHSL((i * 0.11) % 1, 0.8, 0.35)}
            emissive={new THREE.Color().setHSL((i * 0.11) % 1, 0.9, 0.15)}
            emissiveIntensity={1}
            roughness={0.3}
          />
        </mesh>
      ))}

      {/* ── Dynamic Island (notch pill) ───────────────────── */}
      <mesh position={[0, 1.0, 0.062]}>
        <capsuleGeometry args={[0.055, 0.22, 4, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* ── Home indicator bar ────────────────────────────── */}
      <mesh position={[0, -0.92, 0.062]}>
        <planeGeometry args={[0.28, 0.015]} />
        <meshStandardMaterial color="#8888aa" transparent opacity={0.6} />
      </mesh>

      {/* ── Volume buttons (left) ─────────────────────────── */}
      {[0.6, 0.33].map((y, i) => (
        <mesh key={`vol-${i}`} position={[-0.615, y, 0]}>
          <boxGeometry args={[0.038, 0.2, 0.08]} />
          <meshStandardMaterial color="#3a3a3c" metalness={0.8} roughness={0.2} />
        </mesh>
      ))}
      {/* Silent toggle */}
      <mesh position={[-0.615, 0.9, 0]}>
        <boxGeometry args={[0.038, 0.13, 0.08]} />
        <meshStandardMaterial color="#3a3a3c" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* ── Power button (right) ──────────────────────────── */}
      <mesh position={[0.615, 0.42, 0]}>
        <boxGeometry args={[0.038, 0.26, 0.08]} />
        <meshStandardMaterial color="#3a3a3c" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* ── Rear camera bump ──────────────────────────────── */}
      <mesh position={[-0.24, 0.72, -0.07]}>
        <RoundedBox args={[0.44, 0.44, 0.06]} radius={0.1} smoothness={2}>
          <meshStandardMaterial color="#111114" metalness={0.9} roughness={0.1} />
        </RoundedBox>
      </mesh>
      {/* Camera lenses */}
      {[[-0.32, 0.8], [-0.16, 0.8], [-0.32, 0.64], [-0.16, 0.64]].map(([x, y], i) => (
        <mesh key={`lens-${i}`} position={[x, y, -0.045]}>
          <cylinderGeometry args={[0.07, 0.07, 0.04, 32]} />
          <meshStandardMaterial color="#090910" metalness={1} roughness={0} />
        </mesh>
      ))}
      {/* Flash */}
      <mesh position={[-0.08, 0.72, -0.045]}>
        <cylinderGeometry args={[0.04, 0.04, 0.03, 24]} />
        <meshStandardMaterial color="#ffe066" emissive="#ffcc00" emissiveIntensity={0.4} />
      </mesh>

      {/* ── Apple logo on back ───────────────────────────── */}
      <mesh position={[0.1, -0.1, -0.058]}>
        <planeGeometry args={[0.12, 0.14]} />
        <meshStandardMaterial color="#2c2c2e" metalness={1} roughness={0.05} />
      </mesh>

      {/* ── Screen reflection glass overlay ──────────────── */}
      <mesh position={[0, 0, 0.065]}>
        <planeGeometry args={[0.94, 2.03]} />
        <meshStandardMaterial
          color="#8899ff"
          transparent
          opacity={0.04}
          metalness={0.8}
          roughness={0}
        />
      </mesh>
    </group>
  )
}

function ParticleField() {
  const count = 50
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 14
    positions[i * 3 + 1] = (Math.random() - 0.5) * 14
    positions[i * 3 + 2] = (Math.random() - 0.5) * 8
    const col = new THREE.Color().setHSL(0.7 + Math.random() * 0.15, 0.9, 0.6)
    colors[i * 3] = col.r
    colors[i * 3 + 1] = col.g
    colors[i * 3 + 2] = col.b
  }

  const ref = useRef<THREE.Points>(null)
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.04
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.022} vertexColors transparent opacity={0.7} sizeAttenuation />
    </points>
  )
}

export default function PhoneScene() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 38 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <pointLight position={[3, 5, 4]} intensity={5} color="#7c5cf2" />
          <pointLight position={[-4, -2, 3]} intensity={3} color="#06b6d4" />

          <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.4}>
            <IPhoneModel />
          </Float>

          <ParticleField />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  )
}
