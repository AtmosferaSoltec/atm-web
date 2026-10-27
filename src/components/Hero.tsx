import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { products, site } from '../data/site'
import { Icon } from './ui'

const chips = ['Apps móviles', 'Sistemas web', 'SaaS', 'Facturación SUNAT']

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const orbY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 160])
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section ref={ref} id="inicio" className="relative isolate overflow-hidden pt-32 pb-20 sm:pt-44 sm:pb-32">
      <div className="bg-grid" />

      {/* Resplandor de marca */}
      <motion.div style={{ y: orbY }} aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 flex justify-center">
        <div className="h-[520px] w-[900px] max-w-full -translate-y-1/3 rounded-full bg-[radial-gradient(ellipse_at_center,rgb(198_241_3/0.16),rgb(0_203_199/0.12)_45%,transparent_72%)] blur-3xl" />
      </motion.div>

      {/* Marca gigante de fondo */}
      <img
        src="/logo-mark.svg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute top-24 -right-40 -z-10 w-[640px] rotate-6 opacity-[0.045] select-none sm:right-[-6rem] sm:w-[820px]"
      />

      <motion.div style={{ opacity: fade }} className="mx-auto max-w-page px-5 text-center sm:px-8">
        <motion.a
          href="#productos"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass group inline-flex items-center gap-2.5 rounded-full py-1.5 pr-4 pl-1.5 text-sm text-white/75 transition-colors hover:text-white"
        >
          <span className="btn-primary rounded-full px-2.5 py-0.5 text-xs">Nuevo</span>
          Conoce Órbita, Nova e Iris
          <Icon name="arrow" className="size-4 transition-transform group-hover:translate-x-0.5" />
        </motion.a>

        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-8 max-w-4xl text-[2.6rem] leading-[1.04] font-extrabold sm:text-7xl lg:text-[5.5rem]"
        >
          Software que se siente <span className="text-gradient-brand">a tu medida.</span>
        </motion.h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/60 sm:text-xl"
        >
          Diseñamos y construimos apps móviles, sistemas web y productos propios para que tu negocio —o tu día a día— funcione mejor.
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <a href="#contacto" className="btn-primary w-full rounded-full px-8 py-3.5 text-base sm:w-auto">
            Cuéntanos tu idea
          </a>
          <a href="#productos" className="btn-ghost w-full rounded-full px-8 py-3.5 text-base text-white/85 sm:w-auto">
            Ver productos
          </a>
        </motion.div>

        <motion.ul
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mt-8 flex flex-wrap justify-center gap-2"
        >
          {chips.map((c) => (
            <li key={c} className="rounded-full border border-line px-3 py-1 text-xs text-white/50">
              {c}
            </li>
          ))}
        </motion.ul>
      </motion.div>

      {/* Logos de productos orbitando */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.9 }}
        className="mx-auto mt-20 flex max-w-3xl items-center justify-center gap-4 px-5 sm:mt-28 sm:gap-8"
      >
        {products.slice(0, 3).map((p, i) => (
          <div
            key={p.id}
            className={`glass grid aspect-square w-20 place-items-center rounded-3xl p-3.5 sm:w-28 sm:p-5 ${i % 2 ? 'animate-float-slow' : 'animate-float'}`}
            style={{ boxShadow: `0 20px 60px -20px ${p.colors.from}88` }}
          >
            <img src={p.logo} alt={p.name} className="max-h-full max-w-full object-contain" />
          </div>
        ))}
      </motion.div>
      <p className="sr-only">{site.fullName}</p>
    </section>
  )
}
