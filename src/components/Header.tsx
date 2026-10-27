import { useEffect, useState } from 'react'
import { site } from '../data/site'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open ? 'border-b border-line bg-brand-dark/80 backdrop-blur-xl' : ''
      }`}
    >
      <div className="mx-auto flex h-16 max-w-page items-center justify-between px-5 sm:h-[72px] sm:px-8">
        <a href="#inicio" aria-label="Atmósfera, inicio">
          <img src="/logo-full.svg" alt="Atmósfera" className="h-7 w-auto sm:h-8" />
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Principal">
          {site.nav.map((item) => (
            <a key={item.href} href={item.href} className="text-sm text-white/65 transition-colors hover:text-white">
              {item.label}
            </a>
          ))}
        </nav>

        <a href="#contacto" className="btn-primary hidden rounded-full px-5 py-2.5 text-sm md:inline-block">
          Hablemos
        </a>

        <button
          type="button"
          className="grid size-10 place-items-center rounded-lg md:hidden"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block h-3.5 w-5">
            <span className={`absolute left-0 h-0.5 w-5 bg-white transition-all ${open ? 'top-1.5 rotate-45' : 'top-0'}`} />
            <span className={`absolute top-1.5 left-0 h-0.5 w-5 bg-white transition-opacity ${open ? 'opacity-0' : ''}`} />
            <span className={`absolute left-0 h-0.5 w-5 bg-white transition-all ${open ? 'top-1.5 -rotate-45' : 'top-3'}`} />
          </span>
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-line px-5 pt-3 pb-6 md:hidden" aria-label="Móvil">
          {site.nav.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 text-lg text-white/80">
              {item.label}
            </a>
          ))}
          <a href="#contacto" onClick={() => setOpen(false)} className="btn-primary mt-3 rounded-full px-5 py-3 text-center">
            Hablemos
          </a>
        </nav>
      )}
    </header>
  )
}
