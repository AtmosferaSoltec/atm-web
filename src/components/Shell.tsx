import { useEffect, type ReactNode } from 'react'
import { loadMotion } from '../lib/motion'
import Footer from './Footer'
import Header from './Header'

/**
 * Marco común de todas las páginas. Su efecto corre después de los de sus hijos,
 * así que cuando marca el documento como `ready` las animaciones ya fijaron su
 * estado inicial y el contenido reservado puede mostrarse sin parpadeo.
 */
export default function Shell({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Este `then` se encola después de los de las secciones hijas: para entonces
    // cada animación ya fijó su estado inicial.
    loadMotion().then(({ ScrollTrigger }) => {
      document.documentElement.classList.add('ready')
      // Las fuentes pueden mover el layout: se recalculan las posiciones de scroll.
      document.fonts?.ready.then(() => ScrollTrigger.refresh())
    })
  }, [])

  return (
    <>
      <a
        href="#contenido"
        className="btn btn-light btn-sm fixed top-3 left-3 z-[60] -translate-y-[200%] focus-visible:translate-y-0"
      >
        Saltar al contenido
      </a>
      <Header />
      <main id="contenido">{children}</main>
      <Footer />
    </>
  )
}
