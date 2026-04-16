import dynamic from 'next/dynamic'
import Navbar from '@/components/shared/Navbar'
import CustomCursor from '@/components/shared/CustomCursor'
import Hero from '@/components/ui/Hero'
import About from '@/components/ui/About'

// Secciones debajo del fold — carga diferida para mejor rendimiento inicial
const SectionSkeleton = () => (
  <div className="py-20 flex justify-center items-center">
    <div className="w-8 h-8 rounded-full border-2 border-violet-500/30 border-t-violet-500 animate-spin" />
  </div>
)

const Skills     = dynamic(() => import('@/components/ui/Skills'),     { loading: SectionSkeleton })
const Experience = dynamic(() => import('@/components/ui/Experience'), { loading: SectionSkeleton })
const Projects   = dynamic(() => import('@/components/ui/Projects'),   { loading: SectionSkeleton })
const Education  = dynamic(() => import('@/components/ui/Education'),  { loading: SectionSkeleton })
const Contact    = dynamic(() => import('@/components/ui/Contact'),    { loading: SectionSkeleton })

export default function HomePage() {
  return (
    <main className="min-h-screen text-[var(--foreground)] lg:[cursor:none]" style={{ background: 'var(--background)' }}>
      <CustomCursor />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Education />
      <Contact />
    </main>
  )
}
