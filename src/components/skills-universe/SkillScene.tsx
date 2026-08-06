/** ────────────────────────────────────────────────────────────────
 *  SkillScene — Escena 3D fluida con resolutor físico de colisión y arrastre natural
 *
 *  Características del Motor de Física:
 *  - Colisiones elásticas suaves de esfera a esfera (rebotan al chocar).
 *  - Movimiento suave de deriva y caminata natural por cada esfera.
 *  - Empujes/Patadas suaves del mouse basados en distancia perpendicular al rayo.
 *  - Fuerza de resorte hacia su base original para mantener la formación organizada.
 *  - Límites de pantalla (bounding box) para evitar que salgan del viewport.
 *  - autoRotate desactivado para un control de órbita manual y natural.
 * ──────────────────────────────────────────────────────────────── */

'use client'

import { useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import * as THREE from 'three'
import SkillSphere, { type ParticleState } from './SkillSphere'
import { skills } from '@/data/skills-data'

export default function SkillScene() {
  // Inicializar estados físicos persistentes para las 20 esferas
  const particles = useMemo<ParticleState[]>(() => {
    return skills.map((s) => ({
      position: new THREE.Vector3(...s.position),
      velocity: new THREE.Vector3(0, 0, 0),
      basePosition: new THREE.Vector3(...s.position),
      size: s.size,
      hovered: false,
    }))
  }, [])

  // Semillas de flotación para que la deriva natural parezca orgánica y fluida
  const driftParams = useMemo(() => {
    return skills.map(() => ({
      phaseX: Math.random() * Math.PI * 2,
      phaseY: Math.random() * Math.PI * 2,
      phaseZ: Math.random() * Math.PI * 2,
      speedX: 0.35 + Math.random() * 0.3,
      speedY: 0.30 + Math.random() * 0.3,
      speedZ: 0.25 + Math.random() * 0.2,
    }))
  }, [])

  useFrame((state) => {
    const dt = Math.min(state.clock.getDelta(), 0.03)
    const t = state.clock.elapsedTime
    const ray = state.raycaster.ray

    // ── 1. Actualizar Velocidades: Deriva + Fuerza Resorte + Repulsión Mouse ──
    particles.forEach((p, idx) => {
      const pDrift = driftParams[idx]

      // Deriva de flotación continua y suave
      const floatDrift = new THREE.Vector3(
        Math.sin(t * pDrift.speedX + pDrift.phaseX) * 0.45,
        Math.sin(t * pDrift.speedY + pDrift.phaseY) * 0.45,
        Math.cos(t * pDrift.speedZ + pDrift.phaseZ) * 0.25
      )

      // Posición de destino (base + deriva)
      const targetHome = p.basePosition.clone().add(floatDrift)

      // Fuerza de resorte suave para jalar la esfera de vuelta a su posición de destino
      const toHome = new THREE.Vector3().subVectors(targetHome, p.position)
      const springForce = toHome.multiplyScalar(4.2)
      p.velocity.addScaledVector(springForce, dt)

      // Repulsión magnética del mouse (desplazamiento suave de la pelota)
      const distToRay = ray.distanceToPoint(p.position)
      const repulsionRadius = 2.8

      if (distToRay < repulsionRadius && distToRay > 0.01) {
        const closestPoint = new THREE.Vector3()
        ray.closestPointToPoint(p.position, closestPoint)

        const pushDir = new THREE.Vector3().subVectors(p.position, closestPoint)
        const pushFactor = Math.pow(1 - distToRay / repulsionRadius, 1.8)
        const pushForce = pushDir.normalize().multiplyScalar(pushFactor * 24.0)

        p.velocity.addScaledVector(pushForce, dt)
      }

      // Amortiguación líquida suave (fricción para estabilizar el movimiento)
      p.velocity.multiplyScalar(0.925)
    })

    // ── 2. Resolutor Físico de Colisión Esfera contra Esfera (2 pasadas) ──
    for (let pass = 0; pass < 2; pass++) {
      for (let i = 0; i < particles.length; i++) {
        const pi = particles[i]
        for (let j = i + 1; j < particles.length; j++) {
          const pj = particles[j]

          const dir = new THREE.Vector3().subVectors(pi.position, pj.position)
          const dist = dir.length()
          const minDist = (pi.size + pj.size) * 1.02

          if (dist < minDist && dist > 0.001) {
            const overlap = minDist - dist
            const normal = dir.normalize()

            // Corrección de posición (empuje mutuo hacia afuera)
            pi.position.addScaledVector(normal, overlap * 0.5)
            pj.position.addScaledVector(normal, -overlap * 0.5)

            // Intercambio de momento elástico acolchado
            const relVel = new THREE.Vector3().subVectors(pi.velocity, pj.velocity)
            const velAlongNormal = relVel.dot(normal)

            if (velAlongNormal < 0) {
              const restitution = 0.5 // Coeficiente de rebote suave
              const impulse = -(1 + restitution) * velAlongNormal / 2
              pi.velocity.addScaledVector(normal, impulse)
              pj.velocity.addScaledVector(normal, -impulse)
            }
          }
        }
      }
    }

    // ── 3. Integración de Posición y Límites de la Pantalla ──
    particles.forEach((p) => {
      p.position.addScaledVector(p.velocity, dt)

      // Límites rígidos del contenedor en 3D
      p.position.x = THREE.MathUtils.clamp(p.position.x, -7.2, 7.2)
      p.position.y = THREE.MathUtils.clamp(p.position.y, -4.2, 4.2)
      p.position.z = THREE.MathUtils.clamp(p.position.z, -2.2, 2.2)
    })
  })

  return (
    <>
      {/* ── Configuración de Iluminación 3D ───────────────────── */}
      <ambientLight intensity={0.55} color="#e8e0ff" />
      <directionalLight position={[6, 8, 5]} intensity={1.2} color="#ffffff" />
      <directionalLight position={[-6, 2, 4]} intensity={0.5} color="#b8c8ff" />
      <directionalLight position={[0, 4, -6]} intensity={0.4} color="#d0c0ff" />
      <directionalLight position={[0, -6, 3]} intensity={0.2} color="#f0e8ff" />

      {/* Mapa de entorno para brillos realistas */}
      <Environment preset="studio" backgroundIntensity={0} />

      {/* Controles de cámara táctil/mouse */}
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
          particleState={particles[idx]}
        />
      ))}
    </>
  )
}
