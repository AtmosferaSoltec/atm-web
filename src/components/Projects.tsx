import { useRef } from 'react'
import { projects } from '../data/site'
import { MOTION_OK, useReveal, useMotion } from '../lib/motion'
import Horizon from './Horizon'
import { SectionHead } from './ui'

/**
 * Sistemas a medida: «el suelo». Se entra cruzando el horizonte, que se aplana
 * con el scroll, y cada sistema ocupa una fila a ancho completo.
 */
export default function Projects() {
  const ref = useRef<HTMLElement>(null)
  useReveal(ref)

  useMotion(ref, ({ gsap }) => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        gsap.to('.hz-scale', {
          scaleY: 0.004,
          transformOrigin: '50% 100%',
          ease: 'none',
          scrollTrigger: { trigger: '.crossing', start: 'top 85%', end: 'bottom 35%', scrub: true },
        })
        gsap.to('.hz-base', {
          opacity: 1,
          ease: 'power3.in',
          scrollTrigger: { trigger: '.crossing', start: 'top 85%', end: 'bottom 35%', scrub: true },
        })
        // Los numerales se mueven más despacio que su fila: profundidad sin distraer.
        gsap.utils.toArray<HTMLElement>('.ghost-num').forEach((el) => {
          gsap.fromTo(
            el,
            { yPercent: 28 },
            { yPercent: -28, ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } },
          )
        })
      })
    })

  return (
    <section ref={ref} id="proyectos" className="relative">
      <div className="crossing relative h-[clamp(9rem,26vw,20rem)]">
        <Horizon id="hz-ground" strata={false} className="top-0" />
      </div>

      <div className="bg-ink-deep pt-10 pb-24 sm:pb-36">
        <div className="wrap">
          <SectionHead
            index="04"
            eyebrow="Proyectos a medida"
            aside="En producción"
            title="Sistemas que ya están funcionando."
            text="Software hecho para negocios reales, de un viñedo a una empresa de reparto."
          />

          <ol className="rows mt-14 border-t border-line lg:mt-20">
            {projects.map((p, i) => (
              <li key={p.name} className="row overflow-clip border-b border-line">
                <article className="grid items-center gap-x-8 gap-y-5 py-9 sm:py-12 lg:grid-cols-12">
                  <div className="relative lg:col-span-7">
                    <span className="ghost-num pointer-events-none absolute -top-1 -right-2 lg:top-1/2 lg:-right-24 lg:-translate-y-1/2" aria-hidden>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="row-shift relative">
                      <p className={`label ${p.accent === 'green' ? '!text-green' : '!text-teal'}`} data-fade>
                        {p.type}
                      </p>
                      <h3 className="mt-3 text-[2.25rem] leading-none font-semibold tracking-[-0.04em] sm:text-6xl lg:text-7xl" data-split>
                        {p.name}
                      </h3>
                    </div>
                  </div>
                  <div className="lg:col-span-4 lg:col-start-9" data-fade>
                    <p className="text-[0.9688rem] leading-relaxed text-mute sm:text-base">{p.description}</p>
                    <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-1.5" aria-label="Alcance">
                      {p.tags.map((t) => (
                        <li key={t} className="label !text-[0.75rem] text-white/85">
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
                <span className="row-mark" aria-hidden />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
