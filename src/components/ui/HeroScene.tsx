'use client'

import React, { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Html } from '@react-three/drei'

function RotatingTorus() {
  const ref = useRef<any>()
  useFrame((state, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.6
  })
  return (
    <mesh ref={ref} rotation={[0.4, 0, 0]}>
      <torusGeometry args={[1.2, 0.4, 32, 64]} />
      <meshStandardMaterial color="#a78bfa" metalness={0.6} roughness={0.2} />
    </mesh>
  )
}

export default function HeroScene() {
  return (
    <div className="w-full h-64 md:h-96 rounded-2xl overflow-hidden bg-white/5 border border-white/5 shadow-lg">
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 4.5], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <Suspense fallback={null}>
          <RotatingTorus />
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>
      <div className="absolute inset-0 flex items-end justify-center pb-3 pointer-events-none">
        <div className="bg-black/30 text-xs text-white/80 px-3 py-1 rounded-full">3D preview (WebGL)</div>
      </div>
    </div>
  )
}
