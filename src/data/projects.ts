export interface Project {
  id: string
  title: string
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
    title: 'CardsVirtual',
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
    icon: '🎓',
  },
  {
    degree: 'Desarrollador Web Junior',
    institution: 'Awna Digital SpA',
    period: 'Feb 2026 – Abr 2026',
    description: 'Desarrolló plataforma SaaS CardsVirtual. Migró infraestructura (resolviendo WSOD), y colaboró en sitios corporativos documentando procesos.',
    icon: '💼',
  },
  {
    degree: 'Analista de Monitoreo y Soporte',
    institution: 'BS2',
    period: 'Oct 2025 – Dic 2025',
    description: 'Monitoreo de plataformas críticas bancarias (Dynatrace), análisis en Linux/Windows. Automatizó con Python reduciendo en 30% tiempos de atención.',
    icon: '🛡️',
  },
  {
    degree: 'Certificaciones IT & Cloud',
    institution: 'Microsoft, Cisco, Python Institute',
    period: '2024 – 2025',
    description: 'PCEP (Python Certified Entry-Level Programmer), Microsoft Azure AI Fundamentals AI-900, y Cisco Cybersecurity Essentials.',
    icon: '📜',
  },
]

export const skillGroups = [
  {
    category: 'Frontend',
    skills: ['NextJs', 'React', 'TypeScript', 'Tailwind', 'Vue'],
  },
  {
    category: 'Backend',
    skills: ['NodeJs', 'Django', 'Python'],
  },
  {
    category: 'Bases de Datos',
    skills: ['MongoDB', 'PostgreSQL', 'MySQL', 'Firebase'],
  },
  {
    category: 'DevOps & DevOps',
    skills: ['Docker', 'Vercel', 'Git', 'Linux'],
  },
  {
    category: 'Mobile & APIs',
    skills: ['Flutter', 'Android', 'OpenAI'],
  },
]
