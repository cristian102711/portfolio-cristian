import type { Metadata } from 'next'
import { Space_Grotesk, Geist } from 'next/font/google'
import './globals.css'
import { PortfolioProvider } from '@/context/PortfolioContext'
import { ThemeProvider } from 'next-themes'
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
  display: 'swap',
})

export const metadata: Metadata = {
  // ── SEO Base ────────────────────────────────────────────────────────
  title: 'Cristian Velásquez | Full Stack Developer & Analista Programador',
  description:
    'Desarrollador Full Stack egresado de Duoc UC con experiencia real en producción. Construyo sistemas web y móviles escalables con Next.js, React, Node.js, Java y Flutter. Disponible para nuevos proyectos en Chile.',
  keywords: [
    'Full Stack Developer', 'Analista Programador', 'Cristian Velásquez',
    'Next.js', 'React', 'Node.js', 'Java', 'Spring Boot', 'Flutter', 'Firebase',
    'Desarrollador Chile', 'portfolio programador', 'Duoc UC', 'Santiago',
  ],
  authors: [{ name: 'Cristian Velásquez', url: 'https://github.com/cristian102711' }],
  creator: 'Cristian Velásquez',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://portfolio-cristian.vercel.app' },

  // ── Open Graph (LinkedIn, Facebook, WhatsApp) ────────────────────────
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    url: 'https://portfolio-cristian.vercel.app',
    siteName: 'Portfolio — Cristian Velásquez',
    title: 'Cristian Velásquez | Full Stack Developer',
    description:
      'Desarrollador apasionado por construir productos digitales que resuelven problemas reales. Experiencia en Next.js, React, Node.js, Java y Flutter. Disponible para trabajar.',
    images: [
      {
        url: '/images/og-preview.png',
        width: 1200,
        height: 630,
        alt: 'Cristian Velásquez — Full Stack Developer Portfolio',
      },
    ],
  },

  // ── Twitter / X Card ────────────────────────────────────────────────
  twitter: {
    card: 'summary_large_image',
    title: 'Cristian Velásquez | Full Stack Developer',
    description:
      'Analista Programador con experiencia real en producción. Next.js · React · Node.js · Java · Flutter.',
    images: ['/images/og-preview.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={cn("font-sans", geist.variable)} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme') || 'dark';
                if (theme === 'light' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: light)').matches)) {
                  document.documentElement.classList.remove('dark');
                } else {
                  document.documentElement.classList.add('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="antialiased font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="theme"
        >
          <PortfolioProvider>{children}</PortfolioProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
