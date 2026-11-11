# Atmósfera — sitio web

Landing y páginas legales de Atmósfera Soluciones Tecnológicas.
React 19 + Vite 8 + Tailwind 4, prerenderizado a HTML estático y servido con nginx.

## Comandos

```bash
pnpm install
pnpm dev        # desarrollo en http://localhost:5173
pnpm build      # typecheck + build + prerender de todas las rutas en dist/
pnpm preview    # sirve dist/ (el resultado real: HTML prerenderizado + hidratación)
pnpm lint
```

`pnpm dev` renderiza en cliente; para ver exactamente lo que recibe un visitante
(HTML completo antes de que cargue el JS) usa `pnpm build && pnpm preview`.

## Cómo está armado

- `src/data/site.ts`: todo el contenido (productos, proyectos, servicios, capas del stack, datos legales).
- `src/routes.tsx`: rutas y sus metadatos. `scripts/prerender.mjs` genera un `.html` por ruta, el sitemap y `robots.txt`.
- `src/pages/`: una página por ruta. `Home.tsx` ordena las secciones.
- `src/components/`: una sección por archivo (`Hero`, `Stack`, `Products`, `Services`, `Projects`, `About`, `Contact`), más `Shell` (marco común), `Header`, `Footer`, `Rail` (navegación lateral por capas) y `Horizon` (el arco, firma gráfica del sitio).
- `src/index.css`: tokens de diseño y piezas reutilizables (`.btn`, `.label`, `.rule`, `.link`…).
- `src/lib/motion.ts` y `src/lib/gsap.ts`: sistema de animación.

## Reglas del sistema de animación

1. **El contenido nunca depende del JS.** El HTML prerenderizado es visible tal cual. La entrada del hero es CSS puro.
2. **GSAP va en un chunk diferido** (`src/lib/gsap.ts`) que se carga después de hidratar. Los componentes lo usan con `useMotion(ref, ({ gsap }) => …)`.
3. **Todo se crea dentro de `gsap.matchMedia()` con `MOTION_OK`.** Con `prefers-reduced-motion` no se crea ninguna animación.
4. **Entradas declarativas** con `useReveal(ref)`: `data-split` (titular por líneas), `data-draw` (filete que se traza), `data-fade` (elemento menor).
5. **El showcase de productos** es una lista vertical en el marcado; CSS la convierte en escenario fijado solo en escritorio, con JS y sin movimiento reducido.

## Despliegue

`Dockerfile` + `deploy/`: la imagen se construye en GitHub Actions y nginx sirve `dist/`.
