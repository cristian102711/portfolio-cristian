/** ────────────────────────────────────────────────────────────────
 *  SkillSphere — Esfera física con calcomanía de logo y respuesta electromagnética
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
  charge: number
  hovered: boolean
  mass: number
  rotX: number
  rotY: number
  rotZ: number
  spinX: number
  spinY: number
}

function usePrintedTexture(logoUrl: string, text: string, textColor: string, size = 1024): THREE.Texture | null {
  const [texture, setTexture] = useState<THREE.Texture | null>(null)

  useEffect(() => {
    let active = true
    const img = new Image()
    img.crossOrigin = 'anonymous'

    img.onload = () => {
      if (!active) return
      const canvas = document.createElement('canvas')
      canvas.width = size
      canvas.height = size
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      ctx.clearRect(0, 0, size, size)

      // 1. Logo SVG
      const logoScale = 0.58
      const logoSize = size * logoScale
      const scale = Math.min(logoSize / img.width, logoSize / img.height)
      const w = img.width * scale
      const h = img.height * scale
      const x = (size - w) / 2
      const y = (size * 0.35) - h / 2

      ctx.drawImage(img, x, y, w, h)

      // 2. Texto
      ctx.font = 'bold 130px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
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
    return () => {
      active = false
    }
  }, [logoUrl, text, textColor, size])

  return texture
}

interface SkillSphereProps {
  skill: SkillData
  particleState: ParticleState
  onHoverChange?: (hovered: boolean) => void
  onClick?: () => void
}

export default function SkillSphere({ skill, particleState, onHoverChange, onClick }: SkillSphereProps) {
  const groupRef = useRef<THREE.Group>(null)
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const clickBoost = useRef(1.0)

  const finalTextColor = useMemo(() => {
    const lower = skill.color.toLowerCase()
    if (lower === '#ffffff' || lower === '#e8e8e8') {
      return '#111827'
    }
    return skill.color
  }, [skill.color])

  const printedTexture = usePrintedTexture(skill.logo, skill.name, finalTextColor)
  const currentScale = useRef(skill.size)

  useFrame(() => {
    if (!groupRef.current || !meshRef.current) return

    const p = particleState

    // 1. Actualizar posición del grupo directamente en la referencia
    groupRef.current.position.set(p.position.x, p.position.y, p.position.z)

    // 2. Actualizar rotación del mesh directamente en la referencia
    meshRef.current.rotation.x = p.rotX || 0
    meshRef.current.rotation.y = p.rotY || 0
    meshRef.current.rotation.z = p.rotZ || 0

    // Disminuir impulso de click hacia 1.0 gradualmente
    clickBoost.current = THREE.MathUtils.lerp(clickBoost.current, 1.0, 0.1)

    // 3. Escala reactiva con rebote elástico al click, hover y carga electromagnética
    const targetScale = hovered
      ? skill.size * 1.30 * clickBoost.current
      : skill.size * clickBoost.current * (1 + p.charge * 0.15)

    currentScale.current += (targetScale - currentScale.current) * 0.18
    meshRef.current.scale.setScalar(currentScale.current)
  })

  // Material de emisión según hover o pulso magnético
  const activeIntensity = hovered ? 0.55 : Math.min(0.60, particleState.charge * 0.6)

  return (
    <group ref={groupRef}>
      <mesh
        ref={meshRef}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHovered(true)
          onHoverChange?.(true)
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => {
          setHovered(false)
          onHoverChange?.(false)
          document.body.style.cursor = 'auto'
        }}
        onClick={(e) => {
          e.stopPropagation()
          clickBoost.current = 1.45 // Impulso pop instantáneo al click
          onClick?.()
        }}
      >
        <sphereGeometry args={[1, 64, 64]} />

        {/* Material cerámico brillante blanco con respuesta de carga */}
        <meshPhysicalMaterial
          color="#ffffff"
          roughness={0.10}
          metalness={0.05}
          clearcoat={1.0}
          clearcoatRoughness={0.02}
          envMapIntensity={1.8}
          emissive={hovered || particleState.charge > 0.05 ? skill.color : '#000000'}
          emissiveIntensity={activeIntensity}
        />

        {/* Calcomanía frontal */}
        {printedTexture && (
          <Decal
            position={[0, 0, 0.95]}
            rotation={[0, 0, 0]}
            scale={[1.75, 1.75, 1.75]}
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
            scale={[1.75, 1.75, 1.75]}
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

      </mesh>
    </group>
  )
}
