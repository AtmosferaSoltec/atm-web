import { useRef, useState } from 'react'
import { stack } from '../data/site'
import { MOTION_OK, useReveal, useMotion } from '../lib/motion'

/** Separación vertical entre planos del diagrama (en unidades del viewBox). */
const GAP = 78
const RHOMBUS = 'M210 0 L420 96 L210 192 L0 96 Z'

/**
 * Diagrama de capas del stack. Los estratos abstractos del hero se resuelven
 * aquí en capas con nombre: una vista explosionada que se abre con el scroll.
 */
export default function Stack() {
  const ref = useRef<HTMLElement>(null)
  const [active, setActive] = useState<number | null>(null)
  useReveal(ref)

  useMotion(ref, ({ gsap }) => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        const planes = gsap.utils.toArray<SVGGElement>('.plane')
        // Los planos parten apilados y se separan a su posición a medida que entra la sección.
        gsap.from(planes, {
          y: (_, el: SVGGElement) => -Number(el.dataset.i) * (GAP - 16),
          ease: 'none',
          scrollTrigger: { trigger: '.stack-figure', start: 'top 92%', end: 'center 52%', scrub: 0.6 },
        })
        gsap.from('.stack-guide', {
          opacity: 0,
          ease: 'none',
          scrollTrigger: { trigger: '.stack-figure', start: 'top 60%', end: 'center 50%', scrub: true },
        })
      })
    })

  const n = stack.length
  const height = 192 + GAP * (n - 1)

  return (
    <section ref={ref} id="stack" className="relative bg-ink-deep pt-20 pb-24 sm:pt-28 sm:pb-36">
      <div className="wrap">
        <div className="flex items-baseline justify-between gap-6 pb-4" data-fade>
          <p className="label label-dot">
            <span className="text-white">01</span>
            <span className="mx-2 text-faint">/</span>Stack
          </p>
          <p className="label hidden text-faint sm:block">Vista explosionada · {n} capas</p>
        </div>
        <span className="rule" data-draw aria-hidden />

        <div className="mt-12 grid items-center gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <h2 className="title-lg max-w-sm" data-split>
              Cada sistema, capa por capa.
            </h2>

            <svg
              className="stack-figure mt-12 w-full max-w-[26rem] overflow-visible lg:mt-16"
              viewBox={`-10 -10 440 ${height + 20}`}
              role="img"
              aria-label={`Diagrama de ${n} capas: ${stack.map((l) => l.name).join(', ')}`}
            >
              <defs>
                <linearGradient id="plane-top" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0" stopColor="#15cfb3" />
                  <stop offset="1" stopColor="#7de34c" />
                </linearGradient>
              </defs>
              {/* Guías verticales: las aristas que unen los planos. */}
              <g className="stack-guide" stroke="rgb(255 255 255 / 0.16)" strokeDasharray="2 5">
                {[0, 210, 420].map((x) => (
                  <path key={x} d={`M${x} ${x === 210 ? 192 : 96} v${GAP * (n - 1)}`} style={{ vectorEffect: 'non-scaling-stroke' }} />
                ))}
              </g>
              {/* Se pintan de abajo arriba para que la capa superior quede encima. */}
              {stack
                .map((layer, i) => ({ layer, i }))
                .reverse()
                .map(({ layer, i }) => (
                  <g key={layer.level} transform={`translate(0 ${i * GAP})`}>
                    <g className="plane" data-i={i} data-active={active === i}>
                      <path
                        className="plane-face"
                        d={RHOMBUS}
                        style={i === 0 && active === null ? { stroke: 'url(#plane-top)' } : undefined}
                      />
                      <text
                        x="210"
                        y="101"
                        textAnchor="middle"
                        fontFamily="var(--font-mono)"
                        fontSize="13"
                        letterSpacing="1.4"
                        fill={active === i ? '#fff' : 'rgb(255 255 255 / 0.55)'}
                      >
                        {layer.level}
                      </text>
                    </g>
                  </g>
                ))}
            </svg>
          </div>

          <ol
            className="stack-list lg:col-span-7"
            data-hot={active !== null}
            onPointerLeave={() => setActive(null)}
          >
            {stack.map((layer, i) => (
              <li
                key={layer.level}
                className="stack-row relative grid gap-x-6 gap-y-3 border-t border-line py-6 last:border-b sm:grid-cols-[3rem_1fr] sm:py-7"
                data-active={active === i}
                onPointerEnter={() => setActive(i)}
                data-fade
              >
                <span className="stack-mark absolute inset-x-0 -top-px h-px bg-(image:--gradient-brand)" aria-hidden />
                <span className="label pt-1.5 text-white/75">{layer.level}</span>
                <div className="stack-name">
                  <h3 className="text-2xl font-semibold sm:text-[1.75rem]">{layer.name}</h3>
                  <p className="mt-1.5 text-sm text-mute sm:text-base">{layer.role}</p>
                  <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5" aria-label={`Tecnologías de ${layer.name}`}>
                    {layer.tech.map((t) => (
                      <li key={t} className="label !text-[0.75rem] text-white/85">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
