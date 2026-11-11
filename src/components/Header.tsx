import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { site } from '../data/site'
import { Button } from './ui'

export default function Header() {
  const [solid, setSolid] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const lastY = useRef(0)
  const toggleRef = useRef<HTMLButtonElement>(null)

  // Fondo al despegar del tope; se retira al bajar y vuelve al subir.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setSolid(y > 24)
      const delta = y - lastY.current
      if (Math.abs(delta) > 6) {
        setHidden(delta > 0 && y > 480)
        lastY.current = y
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Menú abierto: bloquea el scroll del documento y se cierra con Escape.
  useEffect(() => {
    if (!open) return
    const root = document.documentElement
    const prev = root.style.overflow
    root.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      root.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  // Al pasar a escritorio con el menú abierto, se cierra.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const onChange = () => mq.matches && setOpen(false)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return (
    <>
      <header className="site-header" data-solid={solid || open} data-hidden={hidden && !open}>
        <div className="wrap flex h-full items-center justify-between gap-6">
          <a href="/" aria-label="Atmósfera, inicio" className="shrink-0">
            <img src="/logo-full.svg" alt="Atmósfera" width="134" height="32" className="h-7 w-auto sm:h-8" />
          </a>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Principal">
            {site.nav.map((item) => (
              <a key={item.href} href={item.href} className="link text-sm text-mute hover:text-white">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button href="/contact" size="sm" className="hidden sm:inline-flex">
              Hablemos
            </Button>
            <button
              ref={toggleRef}
              type="button"
              className="-mr-2 grid size-11 place-items-center lg:hidden"
              aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={open}
              aria-controls="menu"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="relative block h-2.5 w-6" aria-hidden>
                <span
                  className={`absolute left-0 h-px w-6 bg-white transition-transform duration-500 ease-(--ease-type) ${open ? 'top-1/2 rotate-45' : 'top-0'}`}
                />
                <span
                  className={`absolute left-0 h-px w-6 bg-white transition-transform duration-500 ease-(--ease-type) ${open ? 'top-1/2 -rotate-45' : 'top-full'}`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div id="menu" className="menu lg:hidden" data-open={open} inert={!open}>
        <nav aria-label="Móvil" className="flex flex-col">
          {site.nav.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="menu-item"
              style={{ '--i': i } as CSSProperties}
            >
              <span className="label w-6 shrink-0 text-faint">0{i + 1}</span>
              {item.label}
            </a>
          ))}
        </nav>
        <div
          className="menu-item mt-auto !border-0 !text-base !font-normal !tracking-normal"
          style={{ '--i': site.nav.length + 1 } as CSSProperties}
        >
          <div className="flex w-full flex-col gap-4">
            <Button href={site.contact.whatsapp} variant="brand" external className="w-full">
              Escribir por WhatsApp
            </Button>
            <p className="label flex flex-wrap gap-x-5 gap-y-2">
              {site.socials.map((s) => (
                <a key={s.name} href={s.url} target="_blank" rel="noreferrer" className="hover:text-white">
                  {s.name} ↗
                </a>
              ))}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
