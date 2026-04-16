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
  title: 'Cristian Velásquez | Analista Programador Full Stack',
  description:
    'Portfolio personal de Cristian Velásquez — Analista Programador Full Stack. Desarrollo de apps móviles con Flutter, APIs con Java Spring Boot, y aplicaciones web modernas con Next.js.',
  keywords: [
    'portfolio', 'desarrollador', 'Flutter', 'Java', 'Spring Boot',
    'Firebase', 'fullstack', 'Cristian Velásquez', 'Analista Programador', 'Chile',
  ],
  authors: [{ name: 'Cristian Velásquez' }],
  viewport: 'width=device-width, initial-scale=1',
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
