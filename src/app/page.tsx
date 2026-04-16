import dynamic from 'next/dynamic'
import Navbar from '@/components/shared/Navbar'
import Hero from '@/components/ui/Hero'
import About from '@/components/ui/About'
import Experience from '@/components/ui/Experience'
import Education from '@/components/ui/Education'
import Contact from '@/components/ui/Contact'

const Projects = dynamic(() => import('@/components/ui/Projects'), {
  loading: () => <div className="py-20 text-center text-zinc-400">Cargando proyectos...</div>
})
const Skills = dynamic(() => import('@/components/ui/Skills'), {
  loading: () => <div className="py-20 text-center text-zinc-400">Cargando skills...</div>
})

export default function HomePage() {
  return (
    <main className="bg-[#0a0a0b] min-h-screen text-white">
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
