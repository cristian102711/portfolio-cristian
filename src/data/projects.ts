export interface Project {
  id: string
  title: string
  period: string
  description: string
  tech: string[]
  image: string
  github: string
  demo: string
  type: 'mobile' | 'web' | 'game'
}

export interface Education {
  degree: string
  institution: string
  period: string
  description: string
  icon: string
}

export const projects: Project[] = [
  {
    id: '01',
    title: 'FullStack Developer & Architect (Práctica Profesional)',
    period: 'Feb 2026 – Abr 2026',
    description: 'SaaS de tarjetas digitales con QR dinámico, panel admin CRUD, motor de analíticas y autenticación por roles. Deployado en producción y aprobado por CEO.',
    tech: ['Next.js', 'MongoDB', 'JWT', 'TypeScript', 'Vercel'],
    image: '/images/project1.png',
    github: 'https://github.com/cristian102711/CardsVirtual',
    demo: '',
    type: 'web',
  },
  {
    id: '02',
    title: 'NeuroDesk',
    period: 'Ene 2026 – Mar 2026',
    description: 'Plataforma SaaS multi-herramienta de IA con chat, resúmenes y generador de imágenes. Monetización con Mercado Pago vía Webhooks y rate limiting.',
    tech: ['Next.js', 'PostgreSQL', 'Prisma', 'OpenAI'],
    image: '/images/project2.png',
    github: 'https://github.com/cristian102711/neurodesk',
    demo: 'https://neurodesk-cq3k.vercel.app/',
    type: 'web',
  },
  {
    id: '03',
    title: 'PowerPlay',
    period: 'Dic 2025 – Feb 2026',
    description: 'E-commerce con autenticación segura (Supabase), carrito asíncrono y UI glassmorphism. CI/CD integrado con GitHub y Vercel.',
    tech: ['React', 'Supabase', 'Vite', 'Tailwind'],
    image: '/images/project3.png',
    github: 'https://github.com/cristian102711/power-play-react',
    demo: 'https://power-play-react-psi.vercel.app/',
    type: 'web',
  },
  {
    id: '04',
    title: 'Sorteo San Valentín',
    period: 'Ene 2026 – Feb 2026',
    description: 'Sistema asíncrono dockerizado para alto volumen de concurrencia. Prueba técnica real para cargo Full Stack Developer (CTS Turismo).',
    tech: ['Django', 'Vue 3', 'Celery', 'Redis', 'Docker'],
    image: '/images/project4.png',
    github: 'https://github.com/cristian102711',
    demo: '#',
    type: 'web',
  },
]

export const education: Education[] = [
  {
    degree: 'Analista Programador Computacional',
    institution: 'Instituto Profesional Duoc UC, Sede Plaza Norte',
    period: 'Mar 2024 – 2026',
    description: 'Desarrollador Junior Full Stack egresado de Duoc UC. Rápido aprendizaje, trabajo en equipo y enfoque en entornos de producción.',
    icon: 'graduation',
  },
  {
    degree: 'Analista de Monitoreo y Soporte',
    institution: 'BS2',
    period: 'Oct 2025 – Dic 2025',
    description: 'Monitoreo de plataformas críticas bancarias (Dynatrace), análisis en Linux/Windows. Automatizó con Python reduciendo en 30% tiempos de atención.',
    icon: 'shield',
  },
  {
    degree: 'Certificaciones IT & Cloud',
    institution: 'Microsoft, Cisco, Python Institute',
    period: '2024 – 2025',
    description: 'PCEP (Python Certified Entry-Level Programmer), Microsoft Azure AI Fundamentals AI-900, y Cisco Cybersecurity Essentials.',
    icon: 'certificate',
  },
  {
    degree: 'Educación Media',
    institution: "Liceo Ingeniero Militar Juan Mackenna O'Reilly, Chile",
    period: '2015 – 2018',
    description: 'Estudiante de enseñanza media.',
    icon: 'backpack',
  },
]

export const skillGroups = [
  {
    category: 'Frontend',
    skills: ['NextJs', 'React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind', 'Vue'],
  },
  {
    category: 'Backend',
    skills: ['NodeJs', 'Express', 'Java', 'SpringBoot', 'Django', 'Python'],
  },
  {
    category: 'Data & Bases de Datos',
    skills: ['PostgreSQL', 'MongoDB', 'MySQL', 'DataSQL', 'Firebase', 'PowerBI'],
  },
  {
    category: 'DevOps & Herramientas',
    skills: ['Git', 'GitHub', 'GitHubActions', 'Docker', 'Vercel', 'Linux'],
  },
  {
    category: 'Mobile & APIs',
    skills: ['Flutter', 'Kotlin', 'Android', 'RestAPI', 'OpenAI'],
  },
]
