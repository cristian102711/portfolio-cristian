/** ────────────────────────────────────────────────────────────────
 *  Datos de Habilidades (Skills) — Distribución orgánica para
 *  cubrir la sección del viewport de forma equilibrada.
 * ──────────────────────────────────────────────────────────────── */

export interface SkillData {
  id: string
  name: string
  color: string
  logo: string
  position: [number, number, number]
  size: number
}

export const skills: SkillData[] = [
  // Región Superior (React, Next.js, Docker, AWS)
  { id: 'react',       name: 'React',       color: '#00d8ff', logo: '/logos/react.svg',       position: [-5.2,  2.7,  0.2], size: 1.55 },
  { id: 'nextjs',      name: 'Next.js',     color: '#111111', logo: '/logos/nextjs.svg',      position: [-1.9,  3.0, -0.4], size: 1.65 },
  { id: 'docker',      name: 'Docker',      color: '#0db7ed', logo: '/logos/docker.svg',      position: [ 1.6,  2.8,  0.3], size: 1.55 },
  { id: 'aws',         name: 'AWS',         color: '#ff9900', logo: '/logos/aws.svg',         position: [ 5.2,  2.6, -0.3], size: 1.45 },

  // Región Media Superior (TypeScript, Java, Spring Boot, Azure)
  { id: 'typescript',  name: 'TypeScript',  color: '#007acc', logo: '/logos/typescript.svg',  position: [-3.8,  1.2,  0.6], size: 1.55 },
  { id: 'java',        name: 'Java',        color: '#f89820', logo: '/logos/java.svg',        position: [-0.4,  1.3, -0.2], size: 1.70 },
  { id: 'springboot',  name: 'Spring',      color: '#3f9a2e', logo: '/logos/springboot.svg',  position: [ 3.0,  1.2,  0.5], size: 1.55 },
  { id: 'azure',       name: 'Azure',       color: '#0089d6', logo: '/logos/azure.svg',       position: [ 6.0,  0.9, -0.2], size: 1.35 },

  // Región Media Inferior (JavaScript, Node.js, Python, PostgreSQL)
  { id: 'javascript',  name: 'JavaScript',  color: '#f7df1e', logo: '/logos/javascript.svg',  position: [-5.8, -0.5, -0.3], size: 1.55 },
  { id: 'nodejs',      name: 'Node.js',     color: '#39af31', logo: '/logos/nodejs.svg',      position: [-2.4, -0.5,  0.7], size: 1.70 },
  { id: 'python',      name: 'Python',      color: '#306998', logo: '/logos/python.svg',      position: [ 0.9, -0.7, -0.5], size: 1.60 },
  { id: 'postgresql',  name: 'PostgreSQL',  color: '#336791', logo: '/logos/postgresql.svg',  position: [ 4.2, -0.6,  0.4], size: 1.55 },

  // Región Inferior (.NET, C#, MongoDB, Tailwind CSS)
  { id: 'dotnet',      name: '.NET',        color: '#512bd4', logo: '/logos/dotnet.svg',      position: [-4.2, -2.1,  0.2], size: 1.50 },
  { id: 'csharp',      name: 'C#',          color: '#953dac', logo: '/logos/csharp.svg',      position: [-0.9, -2.3, -0.3], size: 1.55 },
  { id: 'mongodb',     name: 'MongoDB',     color: '#13aa52', logo: '/logos/mongodb.svg',     position: [ 2.5, -2.2,  0.3], size: 1.50 },
  { id: 'tailwindcss', name: 'Tailwind',    color: '#38bdf8', logo: '/logos/tailwindcss.svg', position: [ 5.6, -2.1, -0.5], size: 1.35 },

  // Región Base Externa (Firebase, Git, GitHub, SQL)
  { id: 'firebase',    name: 'Firebase',    color: '#ffcb2b', logo: '/logos/firebase.svg',    position: [-2.8, -3.5, -0.2], size: 1.35 },
  { id: 'git',         name: 'Git',         color: '#f05032', logo: '/logos/git.svg',         position: [ 0.4, -3.6,  0.2], size: 1.30 },
  { id: 'github',      name: 'GitHub',      color: '#24292e', logo: '/logos/github.svg',      position: [ 3.7, -3.5, -0.4], size: 1.30 },
  { id: 'sql',         name: 'SQL',         color: '#e28743', logo: '/logos/sql.svg',         position: [-6.0, -3.3,  0.5], size: 1.25 },
]
