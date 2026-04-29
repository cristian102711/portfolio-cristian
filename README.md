# Cristian Velásquez — Portfolio Personal

![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-06B6D4?style=flat-square&logo=tailwindcss)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.x-EE4B96?style=flat-square&logo=framer)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?style=flat-square&logo=vercel)

> Portafolio profesional de Cristian Velásquez — Analista Programador & Full Stack Developer. Construido con Next.js App Router, animaciones avanzadas con Framer Motion, modo oscuro/claro y diseño premium.

---

## Vista previa

![Preview del portafolio](public/images/profile.jpg)

🔗 **Producción:** [cristian-velasquez.vercel.app](https://cristian-velasquez.vercel.app) _(actualizar con URL real)_

---

## Stack tecnológico

| Categoría | Tecnología |
|---|---|
| Framework | Next.js 16 (App Router) |
| Lenguaje | TypeScript 5 |
| Estilos | Tailwind CSS v4 |
| Animaciones | Framer Motion 12 |
| Fuentes | Google Fonts — Outfit |
| Iconos | Lucide React |
| Deploy | Vercel |

---

## Estructura del proyecto

```
portfolio-cristian_velasquez/
├── public/
│   ├── cv/              # CV descargable en PDF
│   └── images/          # Foto de perfil y assets
├── scripts/
│   └── clean-dev.ps1    # Script para arranque limpio (Windows)
├── src/
│   ├── app/
│   │   ├── globals.css  # Sistema de diseño: tokens, utilidades, keyframes
│   │   ├── layout.tsx   # Root layout: fuentes, metadata, providers
│   │   └── page.tsx     # Página principal — composición de secciones
│   ├── components/
│   │   ├── shared/      # Componentes globales reutilizables
│   │   │   ├── Navbar.tsx
│   │   │   ├── CustomCursor.tsx
│   │   │   └── ThemeToggle.tsx
│   │   └── ui/          # Secciones del portafolio + primitivos UI
│   │       ├── Hero.tsx
│   │       ├── About.tsx
│   │       ├── Projects.tsx
│   │       ├── Education.tsx
│   │       ├── Experience.tsx
│   │       ├── Skills.tsx
│   │       ├── Contact.tsx
│   │       ├── TiltCard.tsx
│   │       ├── button.tsx
│   │       ├── badge.tsx
│   │       └── card.tsx
│   ├── context/
│   │   └── PortfolioContext.tsx  # Estado global del portafolio
│   ├── data/
│   │   └── projects.ts  # Datos de proyectos, educación y experiencia
│   └── lib/
│       └── utils.ts     # Utilidades compartidas (cn, clsx)
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

---

## Instalación y uso

```bash
# 1. Clonar el repositorio
git clone https://github.com/cristian102711/portfolio-cristian.git
cd portfolio-cristian

# 2. Instalar dependencias
npm install

# 3. Arrancar el servidor de desarrollo (limpio, sin conflictos de puerto)
npm run dev:clean

# 4. O simplemente
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run dev:clean` | Limpia puertos y caché antes de arrancar |
| `npm run build` | Build de producción |
| `npm run start` | Servidor de producción |
| `npm run lint` | Linter ESLint |

---

## Variables de entorno

Este proyecto actualmente no requiere variables de entorno para funcionar en desarrollo. Si en el futuro se integran servicios externos (formulario de contacto, analytics, etc.), crear un archivo `.env.local`:

```bash
# Ejemplo — copiar este archivo como .env.local
# NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
# NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
# NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

---

## Características

- ✅ **Modo oscuro / claro** con transición suave y persistencia
- ✅ **Animaciones scroll-triggered** con Framer Motion (fade-in, slide-up, stagger)
- ✅ **Efecto 3D tilt** en tarjetas de proyectos
- ✅ **Cursor personalizado** con efecto de seguimiento fluido
- ✅ **Barra de progreso de scroll** en la navegación
- ✅ **Fuente tipográfica Outfit** — geométrica, moderna, no genérica
- ✅ **Bento Grid** en sección About con foto circular animada
- ✅ **Descarga de CV** desde el portafolio
- ✅ **Responsive** — mobile, tablet y desktop
- ✅ **Accesibilidad** — Skip links, ARIA labels, focus rings
- ✅ **TypeScript estricto** — build limpio sin errores
- ✅ **Tailwind v4** con clases canónicas actualizadas

---

## Despliegue

El proyecto está configurado para desplegarse automáticamente en **Vercel** desde la rama `main`.

```bash
# Deploy manual
npx vercel --prod
```

---

## Licencia

MIT © 2026 Cristian Velásquez
