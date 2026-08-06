/** ────────────────────────────────────────────────────────────────
 *  SkillSphere — Esfera blanca brillante con calcomanía doble de logo y texto
 *
 *  Características:
 *  - Aspecto premium de cerámica/vidrio blanco brillante según la referencia.
 *  - Material físico (MeshPhysicalMaterial) con alto brillo (clearcoat) y rugosidad baja.
 *  - Rotación 3D física en sus ejes X/Y/Z proporcional a la velocidad lineal.
 *  - Calcomanías dobles (frontal y posterior) para mantener visibilidad al rotar.
 *  - Resorte rotacional de auto-alineación suave para regresar el logo de frente al reposar.
 * ──────────────────────────────────────────────────────────────── */

'use client'

import { useRef, useState, useEffect, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Decal } from '@react-three/drei'
import * as THREE from 'three'
import type { SkillData } from '@/data/skills-data'

export interface ParticleState {
  position: THREE.Vector3
  velocity: THREE.Vector3
  basePosition: THREE.Vector3
  size: number
  hovered: boolean
}

/** 
 * Crea una textura de lienzo de alta resolución que combina el logo SVG y el texto centrado.
 * Renderiza con los colores de marca puros del desarrollador.
 */
function usePrintedTexture(logoUrl: string, text: string, textColor: string, size = 1024): THREE.Texture | null {
  const [texture, setTexture] = useState<THREE.Texture | null>(null)

  useEffect(() => {
    const img = new Image()
    img.crossOrigin = 'anonymous'

    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = size
      canvas.height = size
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      ctx.clearRect(0, 0, size, size)

      // 1. Dibujar el Logo SVG (optimizado para mayor tamaño)
      const logoScale = 0.56
      const logoSize = size * logoScale
      const scale = Math.min(logoSize / img.width, logoSize / img.height)
      const w = img.width * scale
      const h = img.height * scale
      const x = (size - w) / 2
      const y = (size * 0.35) - h / 2

      ctx.drawImage(img, x, y, w, h)

      // 2. Dibujar el Nombre Tecnológico (tamaño de fuente maximizado, negrita y centrado)
      ctx.font = 'bold 125px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      ctx.fillStyle = textColor
      const textY = size * 0.74
      ctx.fillText(text, size / 2, textY)

      const tex = new THREE.CanvasTexture(canvas)
      tex.needsUpdate = true
      tex.colorSpace = THREE.SRGBColorSpace
      tex.minFilter = THREE.LinearMipmapLinearFilter
      tex.magFilter = THREE.LinearFilter
      setTexture(tex)
    }

    img.src = logoUrl
  }, [logoUrl, text, textColor, size])

  return texture
}

interface SkillSphereProps {
  skill: SkillData
  particleState: ParticleState
}

export default function SkillSphere({ skill, particleState }: SkillSphereProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  // Selección dinámica de color de texto para alta visibilidad
  const finalTextColor = useMemo(() => {
    const lower = skill.color.toLowerCase()
    if (lower === '#ffffff' || lower === '#e8e8e8') {
      return '#111827'
    }
    return skill.color
  }, [skill.color])

  const printedTexture = usePrintedTexture(skill.logo, skill.name, finalTextColor)
  const currentScale = useRef(skill.size)

  useEffect(() => {
    particleState.hovered = hovered
  }, [hovered, particleState])

  useFrame((_, delta) => {
    if (!meshRef.current) return

    const dt = Math.min(delta, 0.03)

    // 1. Actualizar posición desde el motor de física
    meshRef.current.position.copy(particleState.position)

    // 2. Movimiento de rotación 3D basado en la velocidad lineal
    const vx = particleState.velocity.x
    const vy = particleState.velocity.y
    const vz = particleState.velocity.z
    const speed = Math.sqrt(vx * vx + vy * vy + vz * vz)

    if (speed > 0.02) {
      // Rotar la esfera en ejes perpendiculares al vector de velocidad (rodamiento real)
      meshRef.current.rotation.x -= vy * dt * 1.6
      meshRef.current.rotation.y += vx * dt * 1.6
      meshRef.current.rotation.z -= (vx - vy) * dt * 0.4
    } else {
      // Resorte rotacional para realinear la calcomanía frontal al reposar
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, 0, 0.06)
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, 0, 0.06)
      meshRef.current.rotation.z = THREE.MathUtils.lerp(meshRef.current.rotation.z, 0, 0.06)
    }

    // 3. Animación de escala al pasar el cursor (hover)
    const targetScale = hovered ? skill.size * 1.12 : skill.size
    currentScale.current += (targetScale - currentScale.current) * 0.1
    meshRef.current.scale.setScalar(currentScale.current)
  })

  return (
    <mesh
      ref={meshRef}
      onPointerOver={(e) => {
        e.stopPropagation()
        setHovered(true)
        document.body.style.cursor = 'pointer'
      }}
      onPointerOut={() => {
        setHovered(false)
        document.body.style.cursor = 'auto'
      }}
    >
      <sphereGeometry args={[1, 64, 64]} />

      {/* Material cerámico brillante blanco premium */}
      <meshPhysicalMaterial
        color="#ffffff"
        roughness={0.12}
        metalness={0.05}
        clearcoat={1.0}
        clearcoatRoughness={0.03}
        envMapIntensity={1.8}
        emissive={hovered ? skill.color : '#000000'}
        emissiveIntensity={hovered ? 0.12 : 0}
      />

      {/* Calcomanía frontal */}
      {printedTexture && (
        <Decal
          position={[0, 0, 0.95]}
          rotation={[0, 0, 0]}
          scale={[1.65, 1.65, 1.65]}
        >
          <meshBasicMaterial
            map={printedTexture}
            transparent
            polygonOffset
            polygonOffsetFactor={-10}
            toneMapped={false}
          />
        </Decal>
      )}

      {/* Calcomanía posterior */}
      {printedTexture && (
        <Decal
          position={[0, 0, -0.95]}
          rotation={[0, Math.PI, 0]}
          scale={[1.65, 1.65, 1.65]}
        >
          <meshBasicMaterial
            map={printedTexture}
            transparent
            polygonOffset
            polygonOffsetFactor={-10}
            toneMapped={false}
          />
        </Decal>
      )}

      {/* Brillo suave de marca al hacer hover */}
      {hovered && (
        <pointLight color={skill.color} intensity={0.7} distance={3.5} decay={2} />
      )}
    </mesh>
  )
}
