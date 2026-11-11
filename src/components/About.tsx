import { useRef } from 'react'
import { reasons, stats } from '../data/site'
import { MOTION_OK, useReveal, useMotion } from '../lib/motion'

/** Nosotros: un manifiesto que se ilumina al leerlo, cifras como cotas y cuatro razones. */
export default function About() {
  const ref = useRef<HTMLElement>(null)
  useReveal(ref)

  useMotion(ref, ({ gsap, SplitText, ease }) => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        // Las palabras del manifiesto se encienden con el avance del scroll.
        SplitText.create('.manifesto', {
          type: 'words',
          // Sigue siendo texto corriente para lectores de pantalla (sin aria-label en el <p>).
          aria: 'none',
          autoSplit: true,
          onSplit(self) {
            return gsap.fromTo(
              self.words,
              // El punto de partida ya cumple contraste AA: se atenúa, no se esconde.
              { opacity: 0.46 },
              {
                opacity: 1,
                ease: 'none',
                stagger: 0.1,
                scrollTrigger: { trigger: '.manifesto', start: 'top 82%', end: 'bottom 48%', scrub: 0.4 },
              },
            )
          },
        })

        // Conteo único de cada cifra al entrar.
        gsap.utils.toArray<HTMLElement>('.stat-value').forEach((el) => {
          const match = el.textContent?.match(/^(\d+)(.*)$/)
          if (!match) return
          const target = Number(match[1])
          const counter = { v: 0 }
          gsap.to(counter, {
            v: target,
            duration: 1.6,
            ease: ease.ui,
            snap: { v: 1 },
            scrollTrigger: { trigger: el, start: 'top 90%', once: true },
            onUpdate: () => {
              el.textContent = `${counter.v}${match[2]}`
            },
          })
        })
      })
    })

  return (
    <section ref={ref} id="nosotros" className="bg-ink-deep pb-24 sm:pb-36">
      <div className="wrap">
        <div className="flex items-baseline justify-between gap-6 pb-4" data-fade>
          <p className="label label-dot">
            <span className="text-white">05</span>
            <span className="mx-2 text-faint">/</span>Nosotros
          </p>
          <p className="label hidden text-faint sm:block">Atmósfera Soluciones Tecnológicas</p>
        </div>
        <span className="rule" data-draw aria-hidden />

        <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-12 lg:gap-8">
          <h2 className="title-lg lg:col-span-4" data-split>
            Un equipo pequeño, hecho para ti.
          </h2>
          <p className="manifesto text-[1.625rem] leading-[1.22] font-medium tracking-[-0.03em] sm:text-4xl lg:col-span-8 lg:text-[2.75rem]">
            Somos Atmósfera Soluciones Tecnológicas. Creemos que el buen software se nota en lo simple: que funcione, que sea
            claro y que lo quieras usar.
          </p>
        </div>

        <dl className="mt-16 grid grid-cols-2 gap-x-6 gap-y-10 lg:mt-24 lg:grid-cols-4 lg:gap-x-8">
          {stats.map((s) => (
            <div key={s.label} className="stat flex flex-col" data-fade>
              <dt className="label order-2 mt-3 max-w-[14rem]">{s.label}</dt>
              <dd className="stat-value text-5xl font-semibold tracking-[-0.05em] tabular-nums sm:text-7xl">{s.value}</dd>
            </div>
          ))}
        </dl>

        <ol className="mt-16 grid border-t border-line sm:grid-cols-2 lg:mt-24">
          {reasons.map((r, i) => (
            <li
              key={r.title}
              className="border-b border-line py-7 sm:py-9 sm:odd:border-r sm:odd:pr-10 sm:even:pl-10"
              data-fade
            >
              <span className="label text-faint">0{i + 1}</span>
              <h3 className="mt-3 text-xl font-semibold sm:text-2xl">{r.title}</h3>
              <p className="mt-2 max-w-md text-[0.9688rem] leading-relaxed text-mute">{r.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
