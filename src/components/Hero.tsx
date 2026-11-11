import { useRef, type CSSProperties } from 'react'
import { site } from '../data/site'
import { FINE_POINTER, MOTION_OK, useMotion } from '../lib/motion'
import Horizon from './Horizon'
import { Button, Icon, Words } from './ui'

const lines = ['Apps móviles', 'Sistemas web', 'SaaS', 'Facturación SUNAT']

const d = (s: number) => ({ '--d': `${s}s` }) as CSSProperties

/**
 * Hero «Horizonte».
 *
 * La entrada (palabras, cota, trazos) es CSS puro: arranca en el primer pintado
 * y el H1 no espera al bundle. GSAP solo añade lo que depende de la interacción:
 * la luz que sigue al cursor y el horizonte que se aplana al hacer scroll hasta
 * convertirse en el filete de la sección siguiente.
 */
export default function Hero() {
  const ref = useRef<HTMLElement>(null)

  useMotion(ref, ({ gsap }) => {
      const root = ref.current
      if (!root) return
      const mm = gsap.matchMedia()

      mm.add(MOTION_OK, () => {
        // Cruce del horizonte: el arco se aplana contra su base mientras el hero se va.
        // No llega a cero: queda un filete de luz que hace de borde de la sección siguiente.
        gsap.to('.hz-scale', {
          scaleY: 0.004,
          transformOrigin: '50% 100%',
          ease: 'none',
          scrollTrigger: { trigger: root, start: 'top top', end: 'bottom 30%', scrub: true },
        })
        gsap.to('.hz-base', {
          opacity: 1,
          ease: 'power3.in',
          scrollTrigger: { trigger: root, start: 'top top', end: 'bottom 30%', scrub: true },
        })
        gsap.to('.hz-labels', {
          autoAlpha: 0,
          ease: 'none',
          scrollTrigger: { trigger: root, start: 'top top', end: '25% top', scrub: true },
        })
        gsap.to('.hero-copy', {
          yPercent: -14,
          autoAlpha: 0,
          ease: 'none',
          scrollTrigger: { trigger: root, start: '8% top', end: '62% top', scrub: true },
        })
      })

      mm.add(`${MOTION_OK} and ${FINE_POINTER}`, () => {
        // El punto de luz recorre el arco con el cursor; los estratos se separan en profundidad.
        const gradient = root.querySelector('linearGradient')
        const strata = gsap.utils.toArray<SVGPathElement>('.hz-stratum')
        const shift = { x: 0 }
        const light = gsap.quickTo(shift, 'x', {
          duration: 1.2,
          ease: 'power3.out',
          onUpdate: () => gradient?.setAttribute('gradientTransform', `translate(${shift.x.toFixed(1)} 0)`),
        })
        const depth = strata.map((el, i) => gsap.quickTo(el, 'y', { duration: 1 + i * 0.18, ease: 'power3.out' }))

        const onMove = (e: PointerEvent) => {
          const r = root.getBoundingClientRect()
          const nx = (e.clientX - r.left) / r.width - 0.5
          const ny = (e.clientY - r.top) / r.height - 0.5
          light(nx * 620)
          depth.forEach((to, i) => to(ny * (i + 1) * 9))
        }
        const onLeave = () => {
          light(0)
          depth.forEach((to) => to(0))
        }
        root.addEventListener('pointermove', onMove)
        root.addEventListener('pointerleave', onLeave)
        return () => {
          root.removeEventListener('pointermove', onMove)
          root.removeEventListener('pointerleave', onLeave)
        }
      })
    })

  return (
    <section ref={ref} id="inicio" className="hero">
      <div className="hero-copy wrap relative z-10">
        <p className="label label-dot hero-in" style={d(0.1)}>
          {site.fullName}
        </p>

        <div className="mt-6 grid gap-10 sm:mt-8 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-9">
            <h1 className="hero-title">
              <Words text="Software que se siente" />
              <span className="measure">
                <Words text="a tu" from={4} />
                <span className="w">
                  <span style={{ '--i': 6 } as CSSProperties}>
                    medida<span className="text-lime">.</span>
                  </span>
                </span>
                <span className="cota" aria-hidden>
                  <span>{site.measure}</span>
                </span>
              </span>
            </h1>

            <p className="lede hero-in mt-11 max-w-xl sm:mt-12" style={d(0.75)}>
              Desarrollo de software a medida para todo el Perú: apps móviles, sistemas web y facturación electrónica SUNAT para
              que tu negocio funcione mejor.
            </p>

            <div className="hero-in mt-8 flex flex-col gap-3 sm:flex-row" style={d(0.9)}>
              <Button href="#contacto">Cuéntanos tu idea</Button>
              <Button href="#productos" variant="ghost" icon="arrowDown">
                Ver productos
              </Button>
            </div>
          </div>

          <ul className="hero-in hidden max-w-xl gap-x-8 self-end pb-1 md:grid md:grid-cols-2 lg:col-span-3 lg:block" style={d(1.05)} aria-label="Qué construimos">
            {lines.map((line, i) => (
              <li key={line} className="flex items-baseline gap-4 border-t border-line py-2.5 lg:last:border-b">
                <span className="label text-faint">0{i + 1}</span>
                <span className="text-sm text-white/85">{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-(--hz-h)">
        <Horizon id="hz-hero" intro labels className="top-0" />
        <div className="wrap hero-in absolute inset-x-0 bottom-5 z-10 flex items-end justify-between gap-6" style={d(1.5)}>
          <a href="#productos" className="group flex items-center gap-3 text-sm text-mute hover:text-white">
            <span className="label rounded-full bg-lime px-2 py-0.5 !text-[#0c0d0e]">Nuevo</span>
            <span className="link">Conoce Órbita, Nova e Iris</span>
            <Icon name="arrow" className="size-4 transition-transform duration-500 ease-(--ease-type) group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  )
}
