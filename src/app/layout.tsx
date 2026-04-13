import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { PortfolioProvider } from '@/context/PortfolioContext'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Cristian Velásquez | Analista Programador Full Stack',
  description:
    'Portfolio personal de Cristian Velásquez — Analista Programador Full Stack. Desarrollo de apps móviles con Flutter, APIs con Java Spring Boot, y aplicaciones web modernas con Next.js.',
  keywords: [
    'portfolio', 'desarrollador', 'Flutter', 'Java', 'Spring Boot',
    'Firebase', 'fullstack', 'Cristian Velásquez', 'Analista Programador', 'Chile',
  ],
  authors: [{ name: 'Cristian Velásquez' }],
  openGraph: {
    title: 'Cristian Velásquez | Analista Programador Full Stack',
    description: 'Apps móviles, sistemas web y experiencias digitales. Java · Spring Boot · Flutter · Firebase.',
    type: 'website',
    url: 'https://cristian-velasquez.vercel.app',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cristian Velásquez | Full Stack Developer',
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="antialiased font-sans">
        <PortfolioProvider>{children}</PortfolioProvider>
      </body>
    </html>
  )
}
