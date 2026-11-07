import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { findRoute } from './routes'

const Page = findRoute(window.location.pathname).component

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Page />
  </StrictMode>,
)
