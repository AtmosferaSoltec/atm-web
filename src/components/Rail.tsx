import { useEffect, useState } from 'react'

const layers = [
  { id: 'inicio', label: 'Horizonte' },
  { id: 'stack', label: 'Stack' },
  { id: 'productos', label: 'Productos' },
  { id: 'servicios', label: 'Servicios' },
  { id: 'proyectos', label: 'A medida' },
  { id: 'nosotros', label: 'Nosotros' },
  { id: 'contacto', label: 'Contacto' },
] as const

/** Riel de capas: indica en qué capa de la página estás y permite saltar a otra. */
export default function Rail() {
  const [active, setActive] = useState<string>(layers[0].id)

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id)
      },
      // Una franja fina en el centro de la pantalla decide la capa activa.
      { rootMargin: '-50% 0px -50% 0px' },
    )
    for (const l of layers) {
      const el = document.getElementById(l.id)
      if (el) io.observe(el)
    }
    return () => io.disconnect()
  }, [])

  return (
    <nav className="rail" aria-label="Capas de la página">
      {layers.map((l, i) => (
        <a key={l.id} href={`#${l.id}`} aria-current={active === l.id ? 'true' : undefined}>
          <span className="label !text-current">
            {String(i).padStart(2, '0')} {l.label}
          </span>
          <i aria-hidden />
        </a>
      ))}
    </nav>
  )
}
