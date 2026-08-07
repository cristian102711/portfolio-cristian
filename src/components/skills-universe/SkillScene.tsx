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
        rotX: 0,
        rotY: 0,
        rotZ: 0,
        spinX: 0,
        spinY: 0,
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
    this.particles.forEach((p) => {
      const angle = Math.random() * Math.PI * 2
      const speed = 5.0 + Math.random() * 3.0
      p.velocity.x += Math.cos(angle) * speed
      p.velocity.y += Math.sin(angle) * speed
      p.charge = 1.0
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
    // ── STEP 1: Impulso de Desorden Fluido y Dinámico ──
    this.particles.forEach((p, idx) => {
      // 1. Distancia 2D real entre el puntero y la esfera
      const dx = p.position.x - mouseWorld.x
      const dy = p.position.y - mouseWorld.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      const hitRadius = p.size * 1.4 + 1.2

      // 2. GOLPE / REPULSIÓN DINÁMICA DEL CURSOR
      if (dist < hitRadius && dist > 0.001) {
        const factor = Math.pow(1 - dist / hitRadius, 1.1)
        const pushX = dx / dist
        const pushY = dy / dist

        // Fuerza de impacto fluida y rápida
        const cueSpeed = pointerVel.length()
        const pushSpeed = Math.max(16.0, cueSpeed * 1.8)

        p.velocity.x += (pushX * pushSpeed + pointerVel.x * 0.5) * factor * dt * 12.0
        p.velocity.y += (pushY * pushSpeed + pointerVel.y * 0.5) * factor * dt * 12.0
        p.charge = 1.0
      }

      // 3. MOVIMIENTO FLUIDO MIENTRAS EL MOUSE ESTÁ DENTRO // REAGRUPAR AL SALIR
      if (isMouseOver) {
        // Flotación constante
        const time = t * 1.2 + idx * 0.7
        p.velocity.x += Math.cos(time * 0.9) * 0.8 * dt
        p.velocity.y += Math.sin(time * 1.1) * 0.8 * dt
      } else {
        // Al quitar el cursor de la sección: Reagrupar a la posición original
        const toHomeX = p.basePosition.x - p.position.x
        const toHomeY = p.basePosition.y - p.position.y
        const toHomeZ = p.basePosition.z - p.position.z

        p.velocity.x += toHomeX * 5.5 * dt
        p.velocity.y += toHomeY * 5.5 * dt
        p.velocity.z += toHomeZ * 5.5 * dt

        // Orientación frontal suave al regresar a la posición base
        p.rotX = THREE.MathUtils.lerp(p.rotX, 0, 0.08)
        p.rotY = THREE.MathUtils.lerp(p.rotY, 0, 0.08)
      }

      // 4. Fricción progresiva ágil (0.92)
      const friction = 0.92
      p.velocity.x *= friction
      p.velocity.y *= friction
      p.velocity.z *= 0.84

      // 5. Mover posición real X, Y, Z
      p.position.x += p.velocity.x * dt
      p.position.y += p.velocity.y * dt
      p.position.z += p.velocity.z * dt

      // 6. Rodamiento continuo más activo
      p.rotX += (-p.velocity.y * 0.7) * dt
      p.rotY += (p.velocity.x * 0.7) * dt

      // Rebotes en bordes del lienzo
      const maxX = Math.max(6.5, boundsX - p.size * 0.25)
      const maxY = Math.max(3.6, boundsY - p.size * 0.25)

      if (Math.abs(p.position.x) > maxX) {
        p.position.x = Math.sign(p.position.x) * maxX
        p.velocity.x *= -0.7
      }
      if (Math.abs(p.position.y) > maxY) {
        p.position.y = Math.sign(p.position.y) * maxY
        p.velocity.y *= -0.7
      }
    })

    // ── STEP 2: Colisiones Elásticas en Cadena entre Esferas (Físicas de Billar) ──
    for (let pass = 0; pass < 3; pass++) {
      for (let i = 0; i < this.particles.length; i++) {
        const pi = this.particles[i]
        for (let j = i + 1; j < this.particles.length; j++) {
          const pj = this.particles[j]

          const dx = pi.position.x - pj.position.x
          const dy = pi.position.y - pj.position.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          const minDist = (pi.size + pj.size) * 0.96

          if (dist < minDist && dist > 0.0001) {
            const overlap = minDist - dist
            const nx = dx / dist
            const ny = dy / dist

            // Separar esferas solapadas
            pi.position.x += nx * overlap * 0.5
            pi.position.y += ny * overlap * 0.5
            pj.position.x -= nx * overlap * 0.5
            pj.position.y -= ny * overlap * 0.5

            // Transferencia de impulso directo de golpe en cadena
            const vxRel = pi.velocity.x - pj.velocity.x
            const vyRel = pi.velocity.y - pj.velocity.y
            const velAlongNormal = vxRel * nx + vyRel * ny

            if (velAlongNormal < 0) {
              const restitution = 0.82 // Rebote elástico vivo estilo bola de billar real
              const impulse = -(1 + restitution) * velAlongNormal / 2

              pi.velocity.x += nx * impulse
              pi.velocity.y += ny * impulse
              pj.velocity.x -= nx * impulse
              pj.velocity.y -= ny * impulse
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

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.03)
    const t = state.clock.elapsedTime
    const viewport = state.viewport
    const pointer = state.pointer

    // Coordenadas 3D exactas del ratón en el plano Z=0 de las esferas
    const mouseWorld = new THREE.Vector3(
      (pointer.x * viewport.width) / 2,
      (pointer.y * viewport.height) / 2,
      0
    )

    // Vector de velocidad del cursor (palo de billar)
    const prevMouse = (state as unknown as { _prevMouse?: THREE.Vector3 })._prevMouse || mouseWorld.clone()
    const pointerVel = new THREE.Vector3().subVectors(mouseWorld, prevMouse).divideScalar(Math.max(0.001, dt))
    ;(state as unknown as { _prevMouse: THREE.Vector3 })._prevMouse = mouseWorld.clone()

    // Actualizar motor de física en cada frame
    engine.update(
      dt,
      t,
      mouseWorld,
      pointerVel,
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
