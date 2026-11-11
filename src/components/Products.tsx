import { useRef, useState, type CSSProperties } from 'react'
import { products, site } from '../data/site'
import { MOTION_OK, useReveal, useMotion } from '../lib/motion'
import Mockup from './Mockups'
import { Button, Icon, SectionHead } from './ui'

const statusDot = {
  Disponible: 'bg-lime',
  'En desarrollo': 'bg-amber-300',
  Prototipo: 'bg-white/50',
} as const

/** Mismas condiciones que el modo fijado en CSS (index.css). */
const PINNED = `(min-width: 1024px) and (min-height: 700px) and ${MOTION_OK}`
const STACKED = `(max-width: 1023px) and ${MOTION_OK}, (max-height: 699px) and ${MOTION_OK}`

const ask = (name: string) => `${site.contact.whatsapp}?text=${encodeURIComponent(`Hola, quiero saber más sobre ${name}.`)}`

/**
 * Showcase de productos.
 *
 * El marcado es siempre una lista vertical de artículos (así se lee sin JS, en
 * móvil y con movimiento reducido). En escritorio, CSS la convierte en un
 * escenario fijado donde el scroll decide qué producto está activo.
 */
export default function Products() {
  const ref = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const n = products.length
  useReveal(ref)

  useMotion(ref, ({ gsap, ScrollTrigger, ease }) => {
      const mm = gsap.matchMedia()

      mm.add(PINNED, () => {
        ScrollTrigger.create({
          trigger: track.current,
          start: 'top top',
          end: 'bottom bottom',
          onUpdate: (self) => setActive(Math.min(n - 1, Math.floor(self.progress * n))),
        })
        return () => setActive(0)
      })

      mm.add(STACKED, () => {
        gsap.utils.toArray<HTMLElement>('.product').forEach((el) => {
          const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 78%', once: true } })
          tl.from(el.querySelectorAll('.ch'), { yPercent: 150, duration: 1, ease: ease.type, stagger: 0.03 })
            .from(el.querySelectorAll('.p-in'), { autoAlpha: 0, y: 20, duration: 0.8, ease: ease.ui, stagger: 0.06 }, 0.2)
            .from(el.querySelector('.product-visual'), { clipPath: 'inset(100% 0% 0% 0%)', y: 40, duration: 1.2, ease: ease.type }, 0.15)
        })
      })
    })

  const goTo = (i: number) => {
    const el = track.current
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY
    window.scrollTo({ top: top + ((el.offsetHeight - window.innerHeight) * (i + 0.5)) / n, behavior: 'smooth' })
  }

  return (
    <section ref={ref} id="productos" className="relative pt-24 sm:pt-36">
      <div className="wrap pb-12 lg:pb-0">
        <SectionHead
          index="02"
          eyebrow="Productos propios"
          aside={`${n} productos`}
          title="Apps que construimos y usamos."
          text="Además de proyectos a medida, desarrollamos nuestros propios productos. Cada uno nace de un problema real."
        />
      </div>

      <div ref={track} className="showcase" style={{ '--n': n } as CSSProperties}>
        <div className="showcase-stage">
          <div className="wrap">
            {products.map((p, i) => (
              <article
                key={p.id}
                className="product"
                data-active={i === active}
                data-past={i < active}
                style={{ zIndex: i + 1 }}
                aria-labelledby={`product-${p.id}`}
              >
                <div className="min-w-0">
                  <p className="label p-in flex items-center gap-3" style={{ '--o': 0 } as CSSProperties}>
                    <span className="text-white">
                      {String(i + 1).padStart(2, '0')}
                      <span className="mx-1.5 text-faint">/</span>
                      {String(n).padStart(2, '0')}
                    </span>
                    <img src={p.logo} alt="" width="48" height="24" className="h-6 w-auto max-w-20 object-contain" loading="lazy" />
                    <span style={{ color: p.colors.accent }}>{p.kicker}</span>
                  </p>

                  <h3 id={`product-${p.id}`} className="product-name mt-4" aria-label={p.name}>
                    {Array.from(p.name).map((ch, k) => (
                      <span key={k} className="ch-mask" aria-hidden>
                        <span className="ch" style={{ '--i': k } as CSSProperties}>
                          {ch}
                        </span>
                      </span>
                    ))}
                  </h3>

                  <p className="p-in mt-6 max-w-lg text-xl leading-snug font-medium tracking-tight sm:text-2xl" style={{ '--o': 1 } as CSSProperties}>
                    {p.headline}
                  </p>
                  <p className="p-in mt-3 max-w-lg text-[0.9688rem] leading-relaxed text-mute" style={{ '--o': 2 } as CSSProperties}>
                    {p.description}
                  </p>

                  <ul className="p-in mt-6 max-w-lg" style={{ '--o': 3 } as CSSProperties}>
                    {p.features.map((f) => (
                      <li key={f} className="flex gap-3 border-t border-line py-2.5 text-sm text-white/85 last:border-b">
                        <Icon name="check" className="mt-0.5 size-4 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="p-in mt-6 flex flex-wrap items-center gap-x-6 gap-y-4" style={{ '--o': 4 } as CSSProperties}>
                    <Button href={ask(p.name)} variant="ghost" size="sm" icon="arrowUpRight" external>
                      Consultar por {p.name}
                    </Button>
                    <p className="label flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="flex items-center gap-2 text-white">
                        <span className={`size-1.5 rounded-full ${statusDot[p.status]}`} aria-hidden />
                        {p.status}
                      </span>
                      <span className="text-faint">{p.platforms.join(' · ')}</span>
                    </p>
                  </div>
                </div>

                <div className="product-visual lg:pr-7 lg:pl-6">
                  <Mockup id={p.id} from={p.colors.from} to={p.colors.to} />
                </div>
              </article>
            ))}

            <div className="showcase-nav" role="group" aria-label="Ir a un producto">
              {products.map((p, i) => (
                <button
                  key={p.id}
                  type="button"
                  className="label"
                  aria-current={i === active ? 'true' : undefined}
                  style={{ '--c': p.colors.accent } as CSSProperties}
                  onClick={() => goTo(i)}
                >
                  <span className="mr-2 text-faint">{String(i + 1).padStart(2, '0')}</span>
                  {p.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
