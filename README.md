# PetGuard - Landing Page

## Contextualización
PetGuard es un innovador sistema de monitoreo de salud inteligente para mascotas. Esta Landing Page tiene como objetivo presentar de manera atractiva e interactiva las características principales de PetGuard, desde su collar inteligente (Hardware Premium) hasta la plataforma de monitoreo en vivo (Live Dashboard), su aplicación móvil y la integración con centros veterinarios. Diseñada para generar impacto, la página explica cómo el ecosistema de PetGuard ayuda a los dueños a cuidar mejor a sus mascotas mediante métricas avanzadas y alertas de salud en tiempo real.

## Características
- **Animaciones Fluidas y Avanzadas:** Secuencias de desplazamiento interactivas, botones reactivos y cursores personalizados en forma de huella para mejorar el *engagement* del usuario.
- **Showcase de Hardware:** Presentación inmersiva del collar inteligente detallando características premium (GPS, monitoreo de signos vitales, batería de larga duración).
- **Demostración de Software:** Vistas previas de la plataforma y del Dashboard en vivo para el monitoreo preciso de mascotas.
- **Responsive Design:** Adaptabilidad total a dispositivos móviles, tablets y computadoras de escritorio.
- **Secciones Modulares:** Incluye apartados de "Cómo Funciona", "Características", "Testimonios", "Clínicas Veterinarias", y "Planes de Precios".

## Tecnologías Utilizadas
El proyecto está desarrollado utilizando un stack moderno, ágil y enfocado en el alto rendimiento visual:

- **[Next.js (v14)](https://nextjs.org/):** Framework de React utilizado para el SSR (Server-Side Rendering) y ruteo estructurado, permitiendo una carga rápida, rutas limpias y mejor SEO.
- **[React (v18)](https://react.dev/):** Biblioteca principal para construir la interfaz de usuario mediante un árbol de componentes encapsulados y reutilizables.
- **[Tailwind CSS (v3.4)](https://tailwindcss.com/):** Framework de utilidades CSS para estilizar de forma rápida, creando diseños modernos, limpios y responsivos directamente en las clases de los componentes.
- **[Framer Motion (v11)](https://www.framer.com/motion/):** Librería clave para las micro-interacciones, transiciones de componentes fluidas y animaciones interactivas basadas en el evento de *scroll* (desplazamiento).
- **[Anime.js (v4)](https://animejs.com/):** Utilizada para programar animaciones matemáticas complejas y coreografías visuales específicas en componentes dinámicos.
- **[Lucide React](https://lucide.dev/):** Conjunto de íconos SVG ligeros y altamente personalizables para mejorar el lenguaje visual de la página.
- **TypeScript:** Añade tipado estático a JavaScript, lo que ayuda a evitar fallos en tiempo de ejecución, facilitando que el código sea escalable, documentado y fácil de mantener.

## Estructura del Proyecto
```text
LandingPage_PetGuard/
├── public/                 # Recursos estáticos (Imágenes, videos y frames de animaciones)
├── src/
│   ├── app/                # Rutas y layouts principales de Next.js (App Router)
│   │   ├── globals.css     # Estilos globales y personalización de utilidades de Tailwind
│   │   ├── layout.tsx      # Estructura principal y configuración base (SEO, tipografías)
│   │   └── page.tsx        # Página de inicio (Landing Page)
│   └── components/         # Componentes reutilizables de UI
│       ├── ui/             # Componentes atómicos (Botones con partículas, etc.)
│       ├── Hero.tsx        # Sección de Portada inicial
│       ├── HardwarePremium.tsx # Sección del diseño del Collar
│       ├── LiveDashboard.tsx   # Simulación de plataforma en vivo
│       ├── MobileApp.tsx       # Sección descriptiva de la App
│       ├── Pricing.tsx         # Planes, suscripciones y precios
│       └── ...
├── tailwind.config.ts      # Configuración de los temas, colores y extensiones de Tailwind
├── next.config.mjs         # Configuración del ecosistema Next.js
└── package.json            # Gestión de dependencias y scripts de inicialización
```

## Instalación
Para ejecutar este proyecto en tu entorno local, asegúrate de tener instalado [Node.js](https://nodejs.org/) y sigue estos pasos:

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/NicolasPonceH/LandingPage_PetGuard.git
   cd LandingPage_PetGuard
   ```

2. **Instalar las dependencias**
   ```bash
   npm install
   ```

3. **Ejecutar el servidor de desarrollo**
   ```bash
   npm run dev
   ```

4. **Visualizar la aplicación**
   Abre [http://localhost:3000](http://localhost:3000) en tu navegador para interactuar con la página localmente.

## Objetivos del Proyecto
- Proveer una experiencia digital envolvente que eduque a dueños de mascotas y clínicas veterinarias sobre la viabilidad y tecnología de PetGuard.
- Demostrar el valor del ecosistema IoT (Internet of Things) para mascotas con una narrativa visual fuerte e impactante (*storytelling*).
- Establecer un diseño premium de "estado del arte" para fomentar confianza en el consumidor y lograr una alta tasa de conversión.

## Accesibilidad
- **Semántica HTML:** Uso correcto de etiquetas estructurales (`<header>`, `<main>`, `<section>`, etc.) para tecnologías de asistencia y Screen Readers.
- **Contraste de Colores:** Diseñado teniendo en cuenta combinaciones estéticas que a su vez aseguran la legibilidad de la información siguiendo las directrices WCAG.
- **Interactividad Adaptable:** Las animaciones complejas están programadas de forma tal que no entorpecen la navegación principal, asegurando fluidez en todos los dispositivos.

## Autor
**Nicolás Ponce**
- [GitHub](https://github.com/NicolasPonceH)

---
*Documentación creada para el proyecto Landing Page de PetGuard.*
