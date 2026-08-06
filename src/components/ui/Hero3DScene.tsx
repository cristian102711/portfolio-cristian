'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

// ── 1. Digital Ocean Wave Terrain (Background Shader) ───────────────
function WaveTerrain() {
  const meshRef = useRef<THREE.Mesh>(null)

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uColorA: { value: new THREE.Color('#047857') },
    uColorB: { value: new THREE.Color('#0891b2') },
  }), [])

  const vertexShader = `
    uniform float uTime;
    uniform vec2 uMouse;
    varying vec2 vUv;
    varying float vElevation;

    void main() {
      vUv = uv;
      vec3 pos = position;

      float wave1 = sin(pos.x * 1.0 + uTime * 0.5) * 0.35;
      float wave2 = sin(pos.y * 0.7 + uTime * 0.35) * 0.25;
      float wave3 = cos(pos.x * 0.5 + pos.y * 0.8 + uTime * 0.3) * 0.3;
      float distToMouse = length(pos.xy - uMouse * 4.0);
      float mouseWave = sin(distToMouse * 1.4 - uTime * 1.8) * 0.2 * smoothstep(4.5, 0.0, distToMouse);

      float elevation = wave1 + wave2 + wave3 + mouseWave;
      pos.z = elevation;
      vElevation = elevation;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `

  const fragmentShader = `
    uniform vec3 uColorA;
    uniform vec3 uColorB;
    varying vec2 vUv;
    varying float vElevation;

    void main() {
      float mixFactor = clamp((vElevation + 0.8) * 0.6, 0.0, 1.0);
      vec3 color = mix(uColorA, uColorB, mixFactor);
      float glow = smoothstep(0.2, 0.7, vElevation) * 0.35;
      color += vec3(glow * 0.2, glow * 0.7, glow * 0.5);

      float edgeFade = smoothstep(0.0, 0.12, vUv.x) * smoothstep(1.0, 0.88, vUv.x) *
                       smoothstep(0.0, 0.12, vUv.y) * smoothstep(1.0, 0.88, vUv.y);

      gl_FragColor = vec4(color, edgeFade * 0.45);
    }
  `

  useFrame((state) => {
    if (!meshRef.current) return
    const material = meshRef.current.material as THREE.ShaderMaterial
    material.uniforms.uTime.value = state.clock.getElapsedTime()
    const target = material.uniforms.uMouse.value as THREE.Vector2
    target.x += (state.pointer.x - target.x) * 0.05
    target.y += (state.pointer.y - target.y) * 0.05
  })

  return (
    <mesh ref={meshRef} rotation={[-Math.PI * 0.38, 0, 0]} position={[0, -2.8, -3]}>
      <planeGeometry args={[22, 16, 110, 110]} />
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

// ── 2. Floating Crystal Data Island ("La Isla") ─────────────────────
function FloatingIsland() {
  const islandGroup = useRef<THREE.Group>(null)

  // Generate crystal shards procedurally around the island center
  const crystalShards = useMemo(() => {
    const shards = []
    const count = 18
    const colors = ['#10b981', '#06b6d4', '#34d399', '#22d3ee', '#059669']

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + (Math.random() * 0.4 - 0.2)
      const dist = 0.3 + Math.random() * 0.95
      const height = 0.8 + Math.random() * 1.6
      const radius = 0.12 + Math.random() * 0.18
      const tiltX = (Math.random() - 0.5) * 0.4
      const tiltZ = (Math.random() - 0.5) * 0.4

      shards.push({
        pos: [Math.cos(angle) * dist, height / 2 - 0.2, Math.sin(angle) * dist] as [number, number, number],
        rot: [tiltX, angle, tiltZ] as [number, number, number],
        args: [radius, height, 5] as [number, number, number],
        color: colors[i % colors.length],
      })
    }
    return shards
  }, [])

  useFrame((state) => {
    if (!islandGroup.current) return
    const time = state.clock.getElapsedTime()
    // Gentle island floating and mouse tilt
    islandGroup.current.rotation.y = time * 0.12 + state.pointer.x * 0.25
    islandGroup.current.rotation.x = Math.sin(time * 0.5) * 0.05 - state.pointer.y * 0.15
  })

  return (
    <Float speed={1.8} rotationIntensity={0.3} floatIntensity={0.6}>
      <group ref={islandGroup} position={[0, -0.2, -1.2]} scale={1.1}>
        {/* Main Base Rock Dodecahedron */}
        <mesh position={[0, -0.7, 0]} rotation={[0.4, 0.2, 0]}>
          <dodecahedronGeometry args={[1.35, 1]} />
          <meshStandardMaterial
            color="#0f172a"
            roughness={0.8}
            metalness={0.3}
            flatShading
          />
        </mesh>

        {/* Lower Under-Island Rock Spire */}
        <mesh position={[0, -1.5, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[1.1, 1.4, 6]} />
          <meshStandardMaterial
            color="#1e293b"
            roughness={0.7}
            metalness={0.4}
            flatShading
          />
        </mesh>

        {/* Central Giant Crystal Spire */}
        <mesh position={[0, 0.6, 0]}>
          <coneGeometry args={[0.32, 1.8, 6]} />
          <meshStandardMaterial
            color="#34d399"
            emissive="#059669"
            emissiveIntensity={0.6}
            roughness={0.15}
            metalness={0.85}
            flatShading
          />
        </mesh>

        {/* Surrounding Glowing Crystal Cluster */}
        {crystalShards.map((c, i) => (
          <mesh key={i} position={c.pos} rotation={c.rot}>
            <coneGeometry args={c.args} />
            <meshStandardMaterial
              color={c.color}
              emissive={c.color}
              emissiveIntensity={0.5}
              roughness={0.2}
              metalness={0.8}
              flatShading
            />
          </mesh>
        ))}

        {/* Island Core Point Light */}
        <pointLight position={[0, 0.4, 0]} intensity={3} color="#10b981" distance={5} />
      </group>
    </Float>
  )
}

// ── 3. Orbiting 3D Tech Emblems (React, Next.js, Node.js) ────────────

// 3D React Atom Emblem Coin
function ReactEmblem({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!groupRef.current) return
    const time = state.clock.getElapsedTime()
    groupRef.current.rotation.y = time * 0.8
    groupRef.current.rotation.x = Math.sin(time * 0.6) * 0.2
  })

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Coin Base Disc */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.7, 0.7, 0.12, 32]} />
        <meshStandardMaterial
          color="#0f172a"
          metalness={0.9}
          roughness={0.15}
        />
      </mesh>
      {/* Outer Cyan Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.68, 0.03, 16, 32]} />
        <meshStandardMaterial color="#22d3ee" emissive="#06b6d4" emissiveIntensity={0.8} />
      </mesh>
      {/* React Ellipse Ring 1 */}
      <mesh rotation={[0, 0, 0]}>
        <torusGeometry args={[0.42, 0.035, 16, 32]} />
        <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={0.9} />
      </mesh>
      {/* React Ellipse Ring 2 */}
      <mesh rotation={[0, 0, Math.PI / 3]}>
        <torusGeometry args={[0.42, 0.035, 16, 32]} />
        <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={0.9} />
      </mesh>
      {/* React Ellipse Ring 3 */}
      <mesh rotation={[0, 0, -Math.PI / 3]}>
        <torusGeometry args={[0.42, 0.035, 16, 32]} />
        <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={0.9} />
      </mesh>
      {/* React Core Sphere */}
      <mesh>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={1.2} />
      </mesh>
      <pointLight color="#22d3ee" intensity={2} distance={3} />
    </group>
  )
}

// 3D Next.js Emblem Coin
function NextjsEmblem({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!groupRef.current) return
    const time = state.clock.getElapsedTime()
    groupRef.current.rotation.y = -time * 0.7
    groupRef.current.rotation.z = Math.cos(time * 0.5) * 0.15
  })

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Coin Base Disc */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.65, 0.65, 0.12, 32]} />
        <meshStandardMaterial
          color="#090d16"
          metalness={0.95}
          roughness={0.1}
        />
      </mesh>
      {/* Outer White Glow Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.63, 0.03, 16, 32]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.9} />
      </mesh>
      {/* Next "N" Slash Bar 1 */}
      <mesh position={[-0.12, 0, 0.08]} rotation={[0, 0, -0.35]}>
        <boxGeometry args={[0.1, 0.65, 0.05]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1} />
      </mesh>
      {/* Next "N" Slash Bar 2 */}
      <mesh position={[0.12, 0, 0.08]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.09, 0.65, 0.05]} />
        <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={0.9} />
      </mesh>
      <pointLight color="#ffffff" intensity={1.8} distance={3} />
    </group>
  )
}

// 3D Node.js Emblem Hexagon Coin
function NodejsEmblem({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!groupRef.current) return
    const time = state.clock.getElapsedTime()
    groupRef.current.rotation.y = time * 0.6
    groupRef.current.rotation.x = Math.sin(time * 0.4) * 0.2
  })

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Hexagonal Base Disc */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.62, 0.62, 0.12, 6]} />
        <meshStandardMaterial
          color="#052e16"
          metalness={0.85}
          roughness={0.2}
        />
      </mesh>
      {/* Outer Green Glow Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.6, 0.6, 0.14, 6]} />
        <meshStandardMaterial color="#22c55e" wireframe emissive="#22c55e" emissiveIntensity={0.8} />
      </mesh>
      {/* Node Core Sphere */}
      <mesh position={[0, 0, 0.08]}>
        <dodecahedronGeometry args={[0.24, 0]} />
        <meshStandardMaterial color="#4ade80" emissive="#22c55e" emissiveIntensity={1.2} flatShading />
      </mesh>
      <pointLight color="#22c55e" intensity={2} distance={3} />
    </group>
  )
}

// ── 4. Main Orbit Controller ─────────────────────────────────────────
function OrbitingEmblems() {
  const orbitGroup = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!orbitGroup.current) return
    const time = state.clock.getElapsedTime()
    // Orbital rotation around the central crystal island
    orbitGroup.current.rotation.y = time * 0.22 + state.pointer.x * 0.2
    orbitGroup.current.position.y = Math.sin(time * 0.4) * 0.15
  })

  return (
    <group ref={orbitGroup} position={[0, 0, -1]}>
      {/* Left Top: React Emblem */}
      <Float speed={2} floatIntensity={0.5}>
        <ReactEmblem position={[-2.7, 0.8, 0.5]} scale={0.9} />
      </Float>

      {/* Right Top: Next.js Emblem */}
      <Float speed={2.2} floatIntensity={0.6}>
        <NextjsEmblem position={[2.6, 0.6, 0.2]} scale={0.85} />
      </Float>

      {/* Right Bottom: Node.js Emblem */}
      <Float speed={1.9} floatIntensity={0.4}>
        <NodejsEmblem position={[2.4, -1.0, 0.8]} scale={0.85} />
      </Float>

      {/* Left Bottom: Secondary React Emblem */}
      <Float speed={2.1} floatIntensity={0.5}>
        <ReactEmblem position={[-2.5, -1.1, -0.4]} scale={0.75} />
      </Float>
    </group>
  )
}

// ── 5. Ambient Particle Nebula ───────────────────────────────────────
function ParticleNebula() {
  const pointsRef = useRef<THREE.Points>(null)
  const count = 160

  const [positions] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 16
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8 - 1
    }
    return [pos]
  }, [])

  useFrame((state) => {
    if (!pointsRef.current) return
    const time = state.clock.getElapsedTime()
    pointsRef.current.rotation.y = time * 0.02
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#34d399"
        size={0.05}
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  )
}

// ── 6. Root 3D Scene Export ──────────────────────────────────────────
export default function Hero3DScene() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-90 dark:opacity-95 transition-opacity duration-1000">
      <Canvas
        camera={{ position: [0, 0.4, 6.2], fov: 52 }}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
      >
        {/* Lights & Atmosphere */}
        <ambientLight intensity={0.7} />
        <directionalLight position={[6, 8, 5]} intensity={1.5} color="#34d399" />
        <directionalLight position={[-6, -4, -3]} intensity={0.8} color="#06b6d4" />
        <pointLight position={[0, 4, 3]} intensity={1.8} color="#10b981" />

        {/* 3D Elements */}
        <WaveTerrain />
        <FloatingIsland />
        <OrbitingEmblems />
        <ParticleNebula />
      </Canvas>
    </div>
  )
}
