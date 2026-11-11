import { useRef } from 'react'
import { site } from '../data/site'
import { FINE_POINTER, MOTION_OK, useReveal, useMotion } from '../lib/motion'
import Horizon from './Horizon'
import { Button } from './ui'

/** Cierre: el horizonte regresa completo y el titular ocupa la pantalla. */
export default function Contact() {
  const ref = useRef<HTMLElement>(null)
  const { email, phone, whatsapp, instagram, instagramUrl, tiktok, tiktokUrl } = site.contact
  useReveal(ref)

  useMotion(ref, ({ gsap }) => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        // El horizonte asciende desde plano: el recorrido inverso al del hero.
        gsap.from('.hz-scale', {
          scaleY: 0,
          transformOrigin: '50% 100%',
          ease: 'none',
          scrollTrigger: { trigger: ref.current, start: 'top 70%', end: 'bottom bottom', scrub: 0.5 },
        })
      })
      mm.add(`${MOTION_OK} and ${FINE_POINTER}`, () => {
        // Botón magnético: se deja atraer unos píxeles por el cursor.
        const zone = ref.current?.querySelector<HTMLElement>('.magnet')
        const target = zone?.firstElementChild as HTMLElement | null
        if (!zone || !target) return
        const x = gsap.quickTo(target, 'x', { duration: 0.6, ease: 'power3.out' })
        const y = gsap.quickTo(target, 'y', { duration: 0.6, ease: 'power3.out' })
        const onMove = (e: PointerEvent) => {
          const r = zone.getBoundingClientRect()
          x((e.clientX - (r.left + r.width / 2)) * 0.28)
          y((e.clientY - (r.top + r.height / 2)) * 0.36)
        }
        const onLeave = () => {
          x(0)
          y(0)
        }
        zone.addEventListener('pointermove', onMove)
        zone.addEventListener('pointerleave', onLeave)
        return () => {
          zone.removeEventListener('pointermove', onMove)
          zone.removeEventListener('pointerleave', onLeave)
        }
      })
    })

  return (
    <section ref={ref} id="contacto" className="relative isolate overflow-clip pt-24 sm:pt-36">
      <div className="wrap relative z-10">
        <div className="flex items-baseline justify-between gap-6 pb-4" data-fade>
          <p className="label label-dot">
            <span className="text-white">06</span>
            <span className="mx-2 text-faint">/</span>Contacto
          </p>
          <p className="label hidden text-faint sm:block">Respuesta directa</p>
        </div>
        <span className="rule" data-draw aria-hidden />

        <h2 className="mt-12 text-[clamp(2.75rem,9.6vw,9.5rem)] leading-[0.94] font-extrabold tracking-[-0.05em] lg:mt-16" data-split>
          ¿Tienes una idea? Hagámosla real<span className="text-lime">.</span>
        </h2>

        <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-12 lg:gap-8">
          <p className="lede max-w-md lg:col-span-5" data-fade>
            Escríbenos y cuéntanos qué necesitas. Te respondemos directamente, sin vueltas.
          </p>
          <div className="lg:col-span-7" data-fade>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <span className="magnet inline-flex sm:-m-5 sm:p-5">
                <Button href={whatsapp} variant="brand" icon="arrowUpRight" external className="w-full sm:w-auto">
                  Escribir por WhatsApp
                </Button>
              </span>
              <Button href={`mailto:${email}`} variant="ghost" icon="mail" className="w-full sm:w-auto">
                {email}
              </Button>
            </div>
            <p className="label mt-8 flex flex-wrap gap-x-6 gap-y-2">
              <a className="link hover:text-white" href={`tel:${phone.replace(/\s/g, '')}`}>
                {phone}
              </a>
              <a className="link hover:text-white" href={instagramUrl} target="_blank" rel="noreferrer">
                Instagram {instagram}
              </a>
              <a className="link hover:text-white" href={tiktokUrl} target="_blank" rel="noreferrer">
                TikTok {tiktok}
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="relative mt-16 h-[clamp(11rem,30vw,22rem)] sm:mt-24">
        <Horizon id="hz-close" className="top-0" />
      </div>
    </section>
  )
}
