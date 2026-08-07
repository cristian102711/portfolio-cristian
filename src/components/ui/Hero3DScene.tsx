'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// ── Digital Ocean Wave Terrain — Ultra-smooth GLSL Shader ────────────
function WaveTerrain() {
  const meshRef = useRef<THREE.Mesh>(null)

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uColorA: { value: new THREE.Color('#059669') },
    uColorB: { value: new THREE.Color('#06b6d4') },
  }), [])

  const vertexShader = `
    uniform float uTime;
    uniform vec2 uMouse;
    varying vec2 vUv;
    varying float vElevation;

    void main() {
      vUv = uv;
      vec3 pos = position;

      // Multi-layered wave animation
      float wave1 = sin(pos.x * 1.2 + uTime * 0.6) * 0.4;
      float wave2 = sin(pos.y * 0.8 + uTime * 0.4) * 0.3;
      float wave3 = cos(pos.x * 0.6 + pos.y * 0.9 + uTime * 0.35) * 0.35;
      float wave4 = sin(pos.x * 2.0 + pos.y * 1.5 + uTime * 0.8) * 0.12;

      // Mouse ripple influence
      float distToMouse = length(pos.xy - uMouse * 5.0);
      float mouseWave = sin(distToMouse * 1.5 - uTime * 2.0) * 0.25 * smoothstep(5.0, 0.0, distToMouse);

      float elevation = wave1 + wave2 + wave3 + wave4 + mouseWave;
      pos.z = elevation;

      vElevation = elevation;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `

  const fragmentShader = `
    uniform vec3 uColorA;
    uniform vec3 uColorB;
    uniform float uTime;
    varying vec2 vUv;
    varying float vElevation;

    void main() {
      // Color gradient based on elevation + position
      float mixFactor = (vElevation + 1.0) * 0.5;
      mixFactor = clamp(mixFactor, 0.0, 1.0);
      vec3 color = mix(uColorA, uColorB, mixFactor + vUv.x * 0.3);

      // Glow on peaks
      float glow = smoothstep(0.3, 0.8, vElevation) * 0.4;
      color += vec3(glow * 0.3, glow * 0.8, glow * 0.6);

      // Edge fade
      float edgeFade = smoothstep(0.0, 0.15, vUv.x) * smoothstep(1.0, 0.85, vUv.x) *
                       smoothstep(0.0, 0.15, vUv.y) * smoothstep(1.0, 0.85, vUv.y);

      gl_FragColor = vec4(color, edgeFade * 0.55);
    }
  `

  useFrame((state) => {
    if (!meshRef.current) return
    const material = meshRef.current.material as THREE.ShaderMaterial
    material.uniforms.uTime.value = state.clock.getElapsedTime()

    // Smooth mouse tracking
    const target = material.uniforms.uMouse.value as THREE.Vector2
    target.x += (state.pointer.x - target.x) * 0.08
    target.y += (state.pointer.y - target.y) * 0.08
  })

  return (
    <mesh ref={meshRef} rotation={[-Math.PI * 0.38, 0, 0]} position={[0, -1.5, -2]}>
      <planeGeometry args={[18, 14, 128, 128]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
        wireframe
      />
    </mesh>
  )
}

// ── Floating glowing particles above the terrain ────────────────────
function FloatingParticles() {
  const pointsRef = useRef<THREE.Points>(null)
  const count = 100

  const [positions] = useMemo(() => {
    const pos = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16
      pos[i * 3 + 1] = Math.random() * 4 - 1
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2
    }
    return [pos]
  }, [])

  useFrame((state) => {
    if (!pointsRef.current) return
    const time = state.clock.getElapsedTime()
    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute
    const arr = posAttr.array as Float32Array

    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += Math.sin(time + i) * 0.002
    }
    posAttr.needsUpdate = true
    pointsRef.current.rotation.y = time * 0.015
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#34d399"
        size={0.06}
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  )
}

export default function Hero3DScene() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-85 dark:opacity-95 transition-opacity duration-1000">
      <Canvas
        camera={{ position: [0, 2, 6], fov: 50 }}
        gl={{ antialias: false, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
      >
        <WaveTerrain />
        <FloatingParticles />
      </Canvas>
    </div>
  )
}
