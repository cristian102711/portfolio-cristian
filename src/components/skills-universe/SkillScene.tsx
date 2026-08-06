/** ────────────────────────────────────────────────────────────────
 *  SkillScene — Escena 3D fluida con física electromagnética y
 *  ordenamiento automático por colisión esférica
 * ──────────────────────────────────────────────────────────────── */

'use client'

import { useRef, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import * as THREE from 'three'
import SkillSphere, { type ParticleState } from './SkillSphere'
import { skills, type SkillData } from '@/data/skills-data'

/** Motor físico encapsulado en una clase para cero violaciones de react-hooks/immutability y refs */
export class PhysicsEngine {
  particles: ParticleState[]

  constructor(skillsData: SkillData[]) {
    this.particles = skillsData.map((s, idx) => {
      // Direcciones radiales bien distribuidas para que cada esfera viaje a su propia zona
      const angle = (idx / skillsData.length) * Math.PI * 2 + (idx * 0.7)
      const initialSpeed = 1.8 + (idx % 3) * 0.5
      return {
        position: new THREE.Vector3(...s.position),
        velocity: new THREE.Vector3(Math.cos(angle) * initialSpeed, Math.sin(angle) * initialSpeed, 0),
        basePosition: new THREE.Vector3(...s.position),
        size: s.size,
        charge: 0,
        hovered: false,
        mass: Math.pow(s.size, 2.0),
      }
    })
  }

  setHovered(index: number, hovered: boolean) {
    if (this.particles[index]) {
      this.particles[index].hovered = hovered
    }
  }

  blast() {
    this.particles.forEach((p, idx) => {
      const angle = (idx / this.particles.length) * Math.PI * 2 + (Math.sin(idx * 3) * 0.5)
      const force = 8 + Math.cos(idx * 3) * 4
      p.velocity.x += Math.cos(angle) * force
      p.velocity.y += Math.sin(angle) * force
      p.charge = 1.0
    })
  }

  scatter() {
    this.particles.forEach((p, idx) => {
      const angle = (idx / this.particles.length) * Math.PI * 2 + (Math.sin(idx * 3.5) * 0.8)
      const force = 4.0 + (idx % 4) * 1.2
      p.velocity.x += Math.cos(angle) * force
      p.velocity.y += Math.sin(angle) * force
      p.charge = 0.8
    })
  }

  clickImpulse(clickedIdx: number) {
    const clicked = this.particles[clickedIdx]
    if (!clicked) return

    clicked.charge = 1.0

    this.particles.forEach((p, idx) => {
      if (idx === clickedIdx) {
        p.velocity.z += 3.5
        return
      }

      const dx = p.position.x - clicked.position.x
      const dy = p.position.y - clicked.position.y
      const dist = Math.sqrt(dx * dx + dy * dy) || 0.001

      const hitRadius = 5.5
      if (dist < hitRadius) {
        const factor = 1 - dist / hitRadius
        const pushX = dx / dist
        const pushY = dy / dist
        p.velocity.x += pushX * factor * 16.0
        p.velocity.y += pushY * factor * 16.0
        p.charge = Math.min(1.0, p.charge + factor * 0.8)
      }
    })
  }

  update(
    dt: number,
    t: number,
    mouseWorld: THREE.Vector3,
    pointerVel: THREE.Vector3,
    magneticPower: number,
    boundsX: number,
    boundsY: number,
    isMouseOver: boolean
  ) {
    // ── STEP 1: Movimiento y Magnetismo Restaurador al Centro ──
    this.particles.forEach((p, idx) => {
      if (isMouseOver) {
        // ── CURSOR EN LA SECCIÓN: Se desordenan y se mueven por distintas partes de la sección ──

        // 1. Repulsión suave del cursor al tocar una esfera
        const dx = p.position.x - mouseWorld.x
        const dy = p.position.y - mouseWorld.y
        const dist2D = Math.sqrt(dx * dx + dy * dy)
        const hitRadius = p.size + 1.6

        if (dist2D < hitRadius && dist2D > 0.001) {
          const hitFactor = 1 - dist2D / hitRadius
          const pushX = dx / dist2D
          const pushY = dy / dist2D
          p.velocity.x += pushX * hitFactor * 16.0 * dt
          p.velocity.y += pushY * hitFactor * 16.0 * dt
          p.charge = Math.min(1.0, p.charge + hitFactor * 0.5)
        }

        // 2. Movimiento de deriva suave para que floten por distintas partes de la sección
        const driftAngle = t * (0.7 + idx * 0.07) + idx * 2.1
        const driftX = Math.cos(driftAngle) * 1.8 + Math.sin(driftAngle * 1.2) * 1.2
        const driftY = Math.sin(driftAngle * 0.9) * 1.8 + Math.cos(driftAngle * 0.8) * 1.2

        p.velocity.x += driftX * dt
        p.velocity.y += driftY * dt

        // Mantenerlas dentro de límites aceptables sin que se escapen
        const distFromHome = p.position.distanceTo(p.basePosition)
        if (distFromHome > 3.5) {
          const toHomeX = p.basePosition.x - p.position.x
          const toHomeY = p.basePosition.y - p.position.y
          p.velocity.x += toHomeX * 0.6 * dt
          p.velocity.y += toHomeY * 0.6 * dt
        }

      } else {
        // ── CURSOR FUERA: Magnetismo elegante que reúne las esferas en su diseño base ──
        const toHomeX = p.basePosition.x - p.position.x
        const toHomeY = p.basePosition.y - p.position.y
        const toHomeZ = p.basePosition.z - p.position.z

        p.velocity.x += toHomeX * 5.5 * dt
        p.velocity.y += toHomeY * 5.5 * dt
        p.velocity.z += toHomeZ * 5.5 * dt
      }

      // Límite de velocidad
      const MAX_SPEED = isMouseOver ? 2.0 : 4.0
      const currentSpeed = p.velocity.length()
      if (currentSpeed > MAX_SPEED) {
        p.velocity.multiplyScalar(MAX_SPEED / currentSpeed)
      }

      // Amortiguación de fricción
      const friction = isMouseOver ? 0.95 : 0.85
      p.velocity.x *= friction
      p.velocity.y *= friction
      p.velocity.z *= 0.80
      p.charge *= 0.90

      // Avanzar posición real X, Y, Z
      p.position.x += p.velocity.x * dt
      p.position.y += p.velocity.y * dt
      p.position.z += p.velocity.z * dt

      // PAREDES INVISIBLES DE LA SECCIÓN
      const maxX = Math.max(5.8, boundsX - p.size * 0.4)
      const maxY = Math.max(3.2, boundsY - p.size * 0.4)

      if (Math.abs(p.position.x) > maxX) {
        p.position.x = Math.sign(p.position.x) * maxX
        p.velocity.x *= -0.5
      }
      if (Math.abs(p.position.y) > maxY) {
        p.position.y = Math.sign(p.position.y) * maxY
        p.velocity.y *= -0.5
      }
      if (Math.abs(p.position.z) > 0.6) {
        p.position.z = Math.sign(p.position.z) * 0.6
        p.velocity.z *= -0.3
      }
    })

    // ── STEP 2: Choque Elástico Físico entre Esferas (Física de Billar) ──
    for (let pass = 0; pass < 3; pass++) {
      for (let i = 0; i < this.particles.length; i++) {
        const pi = this.particles[i]
        for (let j = i + 1; j < this.particles.length; j++) {
          const pj = this.particles[j]

          const dir = new THREE.Vector3().subVectors(pi.position, pj.position)
          dir.z *= 0.2
          const dist = dir.length()
          const minDist = (pi.size + pj.size) * 0.96

          if (dist < minDist && dist > 0.0001) {
            const overlap = minDist - dist
            const normal = dir.normalize()

            const totalMass = pi.mass + pj.mass
            const ratioI = pj.mass / totalMass
            const ratioJ = pi.mass / totalMass

            // Desplazamiento suave para evitar solapamiento
            pi.position.addScaledVector(normal, overlap * ratioI * 0.6)
            pj.position.addScaledVector(normal, -overlap * ratioJ * 0.6)

            const relVel = new THREE.Vector3().subVectors(pi.velocity, pj.velocity)
            const velAlongNormal = relVel.dot(normal)

            if (velAlongNormal < 0) {
              const restitution = 0.40 // Rebote suave y acolchado
              const impulseScalar = -(1 + restitution) * velAlongNormal / (1 / pi.mass + 1 / pj.mass)

              pi.velocity.addScaledVector(normal, impulseScalar / pi.mass)
              pj.velocity.addScaledVector(normal, -impulseScalar / pj.mass)

              pi.charge = Math.min(1.0, pi.charge + 0.15)
              pj.charge = Math.min(1.0, pj.charge + 0.15)
            }
          }
        }
      }
    }
  }
}

interface ShockwaveEffect {
  id: number
  position: THREE.Vector3
  color: string
}

function ShockwaveRing({ position, color }: { position: THREE.Vector3; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const matRef = useRef<THREE.MeshBasicMaterial>(null)

  useFrame((_, delta) => {
    if (!meshRef.current || !matRef.current) return
    const dt = Math.min(delta, 0.03)

    meshRef.current.scale.addScalar(dt * 14.0)
    matRef.current.opacity -= dt * 2.5
  })

  return (
    <mesh ref={meshRef} position={position} scale={0.5}>
      <ringGeometry args={[0.8, 1.1, 48]} />
      <meshBasicMaterial
        ref={matRef}
        color={color}
        transparent
        opacity={1.0}
        side={THREE.DoubleSide}
        toneMapped={false}
      />
    </mesh>
  )
}

interface SkillSceneProps {
  blastTrigger?: number
  magneticPower?: number
  isMouseOver?: boolean
}

export default function SkillScene({
  blastTrigger = 0,
  magneticPower = 1.0,
  isMouseOver = false,
}: SkillSceneProps) {
  const sceneGroupRef = useRef<THREE.Group>(null)
  const prevTrigger = useRef(blastTrigger)
  const [shockwaves, setShockwaves] = useState<ShockwaveEffect[]>([])

  // Instancia única del motor físico
  const [engine] = useState(() => new PhysicsEngine(skills))

  const prevMouseOver = useRef(isMouseOver)

  // Disparar dispersión automática al entrar el cursor a la sección
  useEffect(() => {
    if (isMouseOver && !prevMouseOver.current) {
      engine.scatter()
    }
    prevMouseOver.current = isMouseOver
  }, [isMouseOver, engine])

  // Disparar pulso electromagnético expansivo cuando cambia blastTrigger
  useEffect(() => {
    if (blastTrigger > 0 && blastTrigger !== prevTrigger.current) {
      prevTrigger.current = blastTrigger
      engine.blast()
    }
  }, [blastTrigger, engine])

  const handleSphereClick = (index: number) => {
    const skill = skills[index]
    const particle = engine.particles[index]
    if (!skill || !particle) return

    // Disparar onda de repulsión física
    engine.clickImpulse(index)

    // Crear anillo 3D animado expansivo del color de la tecnología
    const newWave: ShockwaveEffect = {
      id: Date.now() + Math.random(),
      position: particle.position.clone(),
      color: skill.color,
    }

    setShockwaves((prev) => [...prev.slice(-5), newWave])
  }

  useFrame((state) => {
    const dt = Math.min(state.clock.getDelta(), 0.03)
    const t = state.clock.elapsedTime
    const viewport = state.viewport
    const pointer = state.pointer

    // Posición exacta del mouse en el plano 3D del mundo (Z=0)
    const mouseWorld = new THREE.Vector3(
      (pointer.x * viewport.width) / 2,
      (pointer.y * viewport.height) / 2,
      0
    )

    // Inclinación Parallax sutil de toda la escena
    if (sceneGroupRef.current) {
      sceneGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        sceneGroupRef.current.rotation.y,
        isMouseOver ? pointer.x * 0.12 : 0,
        0.05
      )
      sceneGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        sceneGroupRef.current.rotation.x,
        isMouseOver ? -pointer.y * 0.10 : 0,
        0.05
      )
    }

    // Actualizar simulador físico usando isMouseOver real del contenedor
    engine.update(
      dt,
      t,
      mouseWorld,
      new THREE.Vector3(0, 0, 0),
      magneticPower,
      viewport.width / 2,
      viewport.height / 2,
      isMouseOver
    )
  })

  return (
    <group ref={sceneGroupRef}>
      {/* ── Iluminación Escénica de Estudio Limpia ── */}
      <ambientLight intensity={0.7} color="#ffffff" />
      <directionalLight position={[8, 10, 6]} intensity={1.5} color="#ffffff" />
      <directionalLight position={[-8, 3, 5]} intensity={0.8} color="#e0f2fe" />
      <directionalLight position={[0, -8, 4]} intensity={0.4} color="#f3e8ff" />

      <Environment preset="studio" backgroundIntensity={0} />

      {/* Anillos 3D Expansivos al Click */}
      {shockwaves.map((wave) => (
        <ShockwaveRing key={wave.id} position={wave.position} color={wave.color} />
      ))}

      {/* Renderizado de Esferas Físicas */}
      {skills.map((skill, idx) => (
        <SkillSphere
          key={skill.id}
          skill={skill}
          particleState={engine.particles[idx]}
          onHoverChange={(hovered) => engine.setHovered(idx, hovered)}
        />
      ))}
    </group>
  )
}
