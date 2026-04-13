'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Send, CheckCircle2 } from 'lucide-react'
import { FiGithub } from 'react-icons/fi'
import { FaLinkedinIn } from 'react-icons/fa'

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('submitting')
    const formData = new FormData(e.currentTarget)
    
    // Web3Forms API
    formData.append("access_key", "9f9c4d88-0b1e-49de-b0e5-85d55c46d1db")

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      })
      if (response.ok) {
        setStatus('success')
        ;(e.target as HTMLFormElement).reset()
        setTimeout(() => setStatus('idle'), 5000)
      } else {
        setStatus('idle')
        alert("Hubo un error al enviar el mensaje. Inténtalo de nuevo.")
      }
    } catch (err) {
      console.error(err)
      setStatus('idle')
    }
  }

  return (
    <section id="contact" className="relative py-24 px-6">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-violet-500/40" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-violet-600/6 blur-[120px] pointer-events-none will-change-transform transform-gpu" />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs uppercase tracking-[4px] text-violet-400 font-medium">
            Contacto
          </span>
          <h2 className="mt-3 text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            ¿Tienes un{' '}
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              proyecto
            </span>
            ?
          </h2>
          <p className="text-zinc-400 text-lg mb-12 max-w-xl mx-auto leading-relaxed">
            Estoy disponible para oportunidades freelance, trabajo remoto o
            posiciones full-time. Me encantaría hablar sobre cómo puedo ayudar a
            tu equipo.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="glass-card p-8 mb-8 text-left relative overflow-hidden"
        >
          <form className="flex flex-col gap-5 relative z-10" onSubmit={handleSubmit}>
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="contact-name" className="text-xs text-zinc-400 uppercase tracking-wider">
                  Nombre
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  placeholder="Tu nombre"
                  className="bg-zinc-900/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/30 transition-all"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="contact-email" className="text-xs text-zinc-400 uppercase tracking-wider">
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  placeholder="tu@email.com"
                  className="bg-zinc-900/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/30 transition-all"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="contact-message" className="text-xs text-zinc-400 uppercase tracking-wider">
                Mensaje
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={4}
                placeholder="Cuéntame sobre tu proyecto..."
                className="bg-zinc-900/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/30 transition-all resize-none"
              />
            </div>
            <motion.button
              type="submit"
              disabled={status !== 'idle'}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold py-3.5 rounded-xl hover:shadow-lg hover:shadow-violet-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {status === 'submitting' ? (
                <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              ) : status === 'success' ? (
                <>
                  <CheckCircle2 size={18} className="text-green-300" />
                  Mensaje Enviado
                </>
              ) : (
                <>
                  <Send size={16} />
                  Enviar Mensaje
                </>
              )}
            </motion.button>
          </form>
          
          {/* Success overlay glow */}
          {status === 'success' && (
            <div className="absolute inset-0 bg-green-500/5 transition-opacity" />
          )}
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center justify-center gap-4 flex-wrap"
        >
          <motion.a
            href="https://github.com/cristian102711"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 text-zinc-400 hover:text-white hover:border-violet-500/40 hover:bg-violet-500/5 text-sm transition-all"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <FiGithub size={16} />
            cristian102711
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/cristian-carlos-velasquez-cornejo"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 text-zinc-400 hover:text-white hover:border-sky-500/40 hover:bg-sky-500/5 text-sm transition-all"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <FaLinkedinIn size={16} />
            LinkedIn
          </motion.a>
          <motion.a
            href="mailto:tu@email.com"
            aria-label="Email"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 text-zinc-400 hover:text-white hover:border-emerald-500/40 hover:bg-emerald-500/5 text-sm transition-all"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <Mail size={16} />
            Email
          </motion.a>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="max-w-6xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-zinc-600">
        <span>© 2025 · Cristian Velásquez — Analista Programador</span>
        <span>Construido con Next.js · Three.js · Framer Motion</span>
      </div>
    </section>
  )
}
