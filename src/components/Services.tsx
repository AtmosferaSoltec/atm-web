import { useRef } from 'react'
import { services } from '../data/site'
import { useReveal } from '../lib/motion'
import { SectionHead } from './ui'

/** Servicios como índice editorial: un momento de calma, sin tarjetas ni iconos. */
export default function Services() {
  const ref = useRef<HTMLElement>(null)
  useReveal(ref)

  return (
    <section ref={ref} id="servicios" className="py-24 sm:py-36">
      <div className="wrap">
        <SectionHead
          index="03"
          eyebrow="Servicios"
          aside={`${services.length} disciplinas`}
          title="Todo lo que necesita tu idea."
          text="Del primer boceto al sistema en producción, con soporte después."
        />

        <ol className="rows mt-14 border-t border-line lg:mt-20">
          {services.map((s, i) => (
            <li key={s.title} className="row border-b border-line" data-fade>
              <div className="grid items-baseline gap-x-8 gap-y-2 py-6 sm:grid-cols-12 sm:py-8">
                <span className="label text-faint sm:col-span-1">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="row-shift text-[1.75rem] leading-tight font-semibold tracking-tight sm:col-span-6 sm:text-4xl lg:text-[2.75rem]">
                  {s.title}
                </h3>
                <p className="text-[0.9688rem] leading-relaxed text-mute sm:col-span-5 sm:text-base lg:col-span-4 lg:col-start-9">
                  {s.text}
                </p>
              </div>
              <span className="row-mark" aria-hidden />
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
