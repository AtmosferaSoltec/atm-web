import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import { findRoute } from './routes'

const Page = findRoute(window.location.pathname).component
const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <Page />
  </StrictMode>
)

// En producción el HTML ya viene prerenderizado (scripts/prerender.mjs): se
// hidrata en lugar de volver a renderizar. En `vite dev` el contenedor llega vacío.
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
