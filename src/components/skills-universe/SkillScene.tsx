/** ────────────────────────────────────────────────────────────────
 *  SkillScene — Escena 3D fluida con física electromagnética y
 *  ordenamiento automático por colisión esférica
 * ──────────────────────────────────────────────────────────────── */

'use client'

import { useMemo, useRef, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import * as THREE from 'three'
import SkillSphere, { type ParticleState } from './SkillSphere'
import { skills, type SkillData } from '@/data/skills-data'

/** Función pura determinista para generar parámetros de flotación por índice */
function getDriftParams(idx: number) {
  const s1 = Math.sin(idx * 13.37 + 1.23) * 43758.5453
  const s2 = Math.sin(idx * 73.11 + 4.56) * 43758.5453
  const s3 = Math.sin(idx * 41.92 + 7.89) * 43758.5453
  const f1 = Math.abs(s1 - Math.floor(s1))
  const f2 = Math.abs(s2 - Math.floor(s2))
  const f3 = Math.abs(s3 - Math.floor(s3))

  return {
    phaseX: f1 * Math.PI * 2,
    phaseY: f2 * Math.PI * 2,
    phaseZ: f3 * Math.PI * 2,
    speedX: 0.35 + f1 * 0.3,
    speedY: 0.30 + f2 * 0.3,
    speedZ: 0.25 + f3 * 0.2,
  }
}

/** Motor físico encapsulado en una clase para cero violaciones de react-hooks/immutability y refs */
export class PhysicsEngine {
  particles: ParticleState[]

  constructor(skillsData: SkillData[]) {
    this.particles = skillsData.map((s) => ({
      position: new THREE.Vector3(...s.position),
      velocity: new THREE.Vector3(0, 0, 0),
      basePosition: new THREE.Vector3(...s.position),
      size: s.size,
      charge: 0,
      hovered: false,
      mass: Math.pow(s.size, 2.2),
    }))
  }

  setHovered(index: number, hovered: boolean) {
    if (this.particles[index]) {
      this.particles[index].hovered = hovered
    }
  }

  blast() {
    this.particles.forEach((p, idx) => {
      const angle = (idx / this.particles.length) * Math.PI * 2 + (Math.sin(idx) * 0.5)
      const force = 12 + Math.cos(idx * 3) * 6
      p.velocity.x += Math.cos(angle) * force
      p.velocity.y += Math.sin(angle) * force
      p.velocity.z += (Math.sin(idx * 2) - 0.5) * force * 0.8
      p.charge = 1.0
    })
  }

  update(
    dt: number,
    t: number,
    ray: THREE.Ray,
    magneticPower: number,
    driftParams: ReturnType<typeof getDriftParams>[]
  ) {
    // ── STEP 1: Fuerza Repulsiva Electromagnética + Resorte Restaurador (Auto-ordenado) ──
    this.particles.forEach((p, idx) => {
      const pDrift = driftParams[idx]

      // Movimiento de flotación continua
      const floatDrift = new THREE.Vector3(
        Math.sin(t * pDrift.speedX + pDrift.phaseX) * 0.38,
        Math.sin(t * pDrift.speedY + pDrift.phaseY) * 0.38,
        Math.cos(t * pDrift.speedZ + pDrift.phaseZ) * 0.22
      )

      // Posición base organizada con flotación natural
      const targetHome = p.basePosition.clone().add(floatDrift)

      // Fuerza de Resorte Magnético hacia su base organizada (Auto-Ordenamiento)
      const toHome = new THREE.Vector3().subVectors(targetHome, p.position)
      const springForce = toHome.multiplyScalar(4.8)
      p.velocity.addScaledVector(springForce, dt)

      // Repulsión Electromagnética del Cursor (Desordena al pasar el mouse)
      const distToRay = ray.distanceToPoint(p.position)
      const magneticRadius = 3.3

      if (distToRay < magneticRadius && distToRay > 0.01) {
        const closestPoint = new THREE.Vector3()
        ray.closestPointToPoint(p.position, closestPoint)

        const pushDir = new THREE.Vector3().subVectors(p.position, closestPoint)
        if (pushDir.lengthSq() < 0.0001) {
          pushDir.set(Math.sin(idx), Math.cos(idx), 0.5)
        }

        const normPush = pushDir.normalize()

        // Fuerza radial de repulsión
        const repulsionFactor = Math.pow(1 - distToRay / magneticRadius, 1.6)
        const pushForce = normPush.clone().multiplyScalar(repulsionFactor * 32.0 * magneticPower)

        // Vórtice electromagnético de dispersión en 3D
        const spinVector = new THREE.Vector3(-normPush.y, normPush.x, Math.sin(t * 3 + idx))
          .multiplyScalar(repulsionFactor * 14.0 * magneticPower)

        p.velocity.addScaledVector(pushForce.add(spinVector), dt)

        // Inducir carga de brillo electromagnético
        p.charge = Math.min(1.0, p.charge + repulsionFactor * 0.5)
      }

      // Disipación gradual de carga y fricción fluida de movimiento
      p.charge *= 0.94
      p.velocity.multiplyScalar(0.93)
    })

    // ── STEP 2: Motor de Colisión Físico Esfera contra Esfera (3 Pasadas) ──
    for (let pass = 0; pass < 3; pass++) {
      for (let i = 0; i < this.particles.length; i++) {
        const pi = this.particles[i]
        for (let j = i + 1; j < this.particles.length; j++) {
          const pj = this.particles[j]

          const dir = new THREE.Vector3().subVectors(pi.position, pj.position)
          const dist = dir.length()
          const minDist = (pi.size + pj.size) * 1.02

          if (dist < minDist && dist > 0.0001) {
            const overlap = minDist - dist
            const normal = dir.normalize()

            // Masa acumulada para reparto de impulso
            const totalMass = pi.mass + pj.mass
            const ratioI = pj.mass / totalMass
            const ratioJ = pi.mass / totalMass

            // Corrección de superposición (separación limpia)
            pi.position.addScaledVector(normal, overlap * ratioI)
            pj.position.addScaledVector(normal, -overlap * ratioJ)

            // Intercambio de momento elástico en la colisión
            const relVel = new THREE.Vector3().subVectors(pi.velocity, pj.velocity)
            const velAlongNormal = relVel.dot(normal)

            if (velAlongNormal < 0) {
              const restitution = 0.72 // Coeficiente de rebote vivo y natural
              const impulseScalar = -(1 + restitution) * velAlongNormal / (1 / pi.mass + 1 / pj.mass)

              pi.velocity.addScaledVector(normal, impulseScalar / pi.mass)
              pj.velocity.addScaledVector(normal, -impulseScalar / pj.mass)

              // Carga magnética por colisión
              pi.charge = Math.min(1.0, pi.charge + 0.18)
              pj.charge = Math.min(1.0, pj.charge + 0.18)
            }
          }
        }
      }
    }

    // ── STEP 3: Integración de Posición y Paredes Bounding Box ──
    this.particles.forEach((p) => {
      p.position.addScaledVector(p.velocity, dt)

      // Contención flexible en 3D
      if (Math.abs(p.position.x) > 7.5) {
        p.position.x = Math.sign(p.position.x) * 7.5
        p.velocity.x *= -0.6
      }
      if (Math.abs(p.position.y) > 4.5) {
        p.position.y = Math.sign(p.position.y) * 4.5
        p.velocity.y *= -0.6
      }
      if (Math.abs(p.position.z) > 2.5) {
        p.position.z = Math.sign(p.position.z) * 2.5
        p.velocity.z *= -0.6
      }
    })
  }
}

interface SkillSceneProps {
  blastTrigger?: number
  magneticPower?: number
}

export default function SkillScene({ blastTrigger = 0, magneticPower = 1.0 }: SkillSceneProps) {
  const lightRef = useRef<THREE.PointLight>(null)
  const prevTrigger = useRef(blastTrigger)

  // Instancia única del motor físico
  const [engine] = useState(() => new PhysicsEngine(skills))

  // Parámetros de deriva calculados de forma determinista
  const driftParams = useMemo(() => {
    return skills.map((_, idx) => getDriftParams(idx))
  }, [])

  // Disparar pulso electromagnético expansivo cuando cambia blastTrigger
  useEffect(() => {
    if (blastTrigger > 0 && blastTrigger !== prevTrigger.current) {
      prevTrigger.current = blastTrigger
      engine.blast()
    }
  }, [blastTrigger, engine])

  useFrame((state) => {
    const dt = Math.min(state.clock.getDelta(), 0.03)
    const t = state.clock.elapsedTime
    const ray = state.raycaster.ray

    // Mover luz electromagnética guía en la escena según el cursor
    if (lightRef.current) {
      const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)
      const targetPoint = new THREE.Vector3()
      if (ray.intersectPlane(plane, targetPoint)) {
        lightRef.current.position.lerp(targetPoint, 0.2)
      }
    }

    // Actualizar simulador físico
    engine.update(dt, t, ray, magneticPower, driftParams)
  })

  return (
    <>
      {/* ── Iluminación Escénica ── */}
      <ambientLight intensity={0.6} color="#ede9fe" />
      <directionalLight position={[8, 10, 6]} intensity={1.3} color="#ffffff" />
      <directionalLight position={[-8, 3, 5]} intensity={0.6} color="#a5f3fc" />
      <directionalLight position={[0, -8, 4]} intensity={0.3} color="#c084fc" />

      {/* Luz electromagnética móvil que sigue al cursor */}
      <pointLight
        ref={lightRef}
        color="#38bdf8"
        intensity={1.5}
        distance={6}
        decay={2}
      />

      <Environment preset="studio" backgroundIntensity={0} />

      {/* Controles de cámara con órbita suave */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={false}
        maxPolarAngle={Math.PI * 0.62}
        minPolarAngle={Math.PI * 0.38}
        maxAzimuthAngle={Math.PI * 0.25}
        minAzimuthAngle={-Math.PI * 0.25}
        rotateSpeed={0.35}
        dampingFactor={0.05}
        enableDamping
      />

      {/* Renderizado de Esferas */}
      {skills.map((skill, idx) => (
        <SkillSphere
          key={skill.id}
          skill={skill}
          particleState={engine.particles[idx]}
          onHoverChange={(hovered) => engine.setHovered(idx, hovered)}
        />
      ))}
    </>
  )
}
