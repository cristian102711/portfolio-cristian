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
  { id: 'react',       name: 'React',       color: '#00d8ff', logo: '/logos/react.svg',       position: [-4.8,  2.5,  0.2], size: 1.35 },
  { id: 'nextjs',      name: 'Next.js',     color: '#111111', logo: '/logos/nextjs.svg',      position: [-1.8,  2.8, -0.4], size: 1.45 },
  { id: 'docker',      name: 'Docker',      color: '#0db7ed', logo: '/logos/docker.svg',      position: [ 1.4,  2.6,  0.3], size: 1.35 },
  { id: 'aws',         name: 'AWS',         color: '#ff9900', logo: '/logos/aws.svg',         position: [ 4.6,  2.4, -0.3], size: 1.30 },

  // Región Media Superior (TypeScript, Java, Spring Boot, Azure)
  { id: 'typescript',  name: 'TypeScript',  color: '#007acc', logo: '/logos/typescript.svg',  position: [-3.4,  1.1,  0.6], size: 1.35 },
  { id: 'java',        name: 'Java',        color: '#f89820', logo: '/logos/java.svg',        position: [-0.4,  1.2, -0.2], size: 1.50 },
  { id: 'springboot',  name: 'Spring',      color: '#3f9a2e', logo: '/logos/springboot.svg',  position: [ 2.6,  1.1,  0.5], size: 1.35 },
  { id: 'azure',       name: 'Azure',       color: '#0089d6', logo: '/logos/azure.svg',       position: [ 5.4,  0.8, -0.2], size: 1.20 },

  // Región Media Inferior (JavaScript, Node.js, Python, PostgreSQL)
  { id: 'javascript',  name: 'JavaScript',  color: '#f7df1e', logo: '/logos/javascript.svg',  position: [-5.2, -0.4, -0.3], size: 1.35 },
  { id: 'nodejs',      name: 'Node.js',     color: '#39af31', logo: '/logos/nodejs.svg',      position: [-2.2, -0.4,  0.7], size: 1.50 },
  { id: 'python',      name: 'Python',      color: '#306998', logo: '/logos/python.svg',      position: [ 0.8, -0.6, -0.5], size: 1.40 },
  { id: 'postgresql',  name: 'PostgreSQL',  color: '#336791', logo: '/logos/postgresql.svg',  position: [ 3.8, -0.5,  0.4], size: 1.35 },

  // Región Inferior (.NET, C#, MongoDB, Tailwind CSS)
  { id: 'dotnet',      name: '.NET',        color: '#512bd4', logo: '/logos/dotnet.svg',      position: [-3.8, -1.9,  0.2], size: 1.30 },
  { id: 'csharp',      name: 'C#',          color: '#953dac', logo: '/logos/csharp.svg',      position: [-0.8, -2.1, -0.3], size: 1.35 },
  { id: 'mongodb',     name: 'MongoDB',     color: '#13aa52', logo: '/logos/mongodb.svg',     position: [ 2.2, -2.0,  0.3], size: 1.30 },
  { id: 'tailwindcss', name: 'Tailwind',    color: '#38bdf8', logo: '/logos/tailwindcss.svg', position: [ 5.0, -1.9, -0.5], size: 1.15 },

  // Región Base Externa (Firebase, Git, GitHub, SQL)
  { id: 'firebase',    name: 'Firebase',    color: '#ffcb2b', logo: '/logos/firebase.svg',    position: [-2.6, -3.2, -0.2], size: 1.20 },
  { id: 'git',         name: 'Git',         color: '#f05032', logo: '/logos/git.svg',         position: [ 0.4, -3.3,  0.2], size: 1.15 },
  { id: 'github',      name: 'GitHub',      color: '#24292e', logo: '/logos/github.svg',      position: [ 3.4, -3.2, -0.4], size: 1.15 },
  { id: 'sql',         name: 'SQL',         color: '#e28743', logo: '/logos/sql.svg',         position: [-5.4, -3.0,  0.5], size: 1.10 },
]
