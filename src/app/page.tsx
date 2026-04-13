import Navbar from '@/components/shared/Navbar'
import Hero from '@/components/ui/Hero'
import About from '@/components/ui/About'
import Projects from '@/components/ui/Projects'
import Experience from '@/components/ui/Experience'
import Skills from '@/components/ui/Skills'
import Contact from '@/components/ui/Contact'

export default function HomePage() {
  return (
    <main className="bg-[#0a0a0b] min-h-screen text-white">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
    </main>
  )
}
