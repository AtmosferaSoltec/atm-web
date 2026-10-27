import { products } from '../data/site'
import Mockup from './Mockups'
import { Icon, Reveal, SectionHeader } from './ui'

const statusStyle = {
  Disponible: 'border-emerald-400/30 text-emerald-300',
  'En desarrollo': 'border-amber-300/30 text-amber-200',
  Prototipo: 'border-white/20 text-white/60',
} as const

export default function Products() {
  return (
    <section id="productos" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-page px-5 sm:px-8">
        <SectionHeader
          eyebrow="Productos propios"
          title={<>Apps que <span className="text-gradient-brand">construimos y usamos.</span></>}
          text="Además de proyectos a medida, desarrollamos nuestros propios productos. Cada uno nace de un problema real."
        />

        <div className="mt-20 space-y-28 sm:mt-28 sm:space-y-40">
          {products.map((p, i) => (
            <article key={p.id} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
              <Reveal className={i % 2 ? 'lg:order-2' : ''}>
                <div className="flex items-center gap-4">
                  <span
                    className="grid size-14 place-items-center rounded-2xl p-2.5 ring-1 ring-white/10"
                    style={{ background: `linear-gradient(135deg, ${p.colors.from}22, ${p.colors.to}11)` }}
                  >
                    <img src={p.logo} alt="" className="max-h-full max-w-full object-contain" />
                  </span>
                  <div>
                    <h3 className="text-2xl font-bold">{p.name}</h3>
                    <p className="text-sm" style={{ color: p.colors.accent }}>{p.kicker}</p>
                  </div>
                  <span className={`ml-auto rounded-full border px-3 py-1 text-xs ${statusStyle[p.status]}`}>{p.status}</span>
                </div>

                <h4 className="mt-7 text-3xl leading-tight font-bold sm:text-4xl">{p.headline}</h4>
                <p className="mt-4 text-base leading-relaxed text-white/60 sm:text-lg">{p.description}</p>

                <ul className="mt-7 space-y-3">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-3 text-sm text-white/75 sm:text-base">
                      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full" style={{ background: `${p.colors.from}33`, color: p.colors.accent }}>
                        <Icon name="check" className="size-3.5" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-7 flex flex-wrap gap-2">
                  {p.platforms.map((pl) => (
                    <span key={pl} className="rounded-full bg-white/[0.06] px-3 py-1 text-xs text-white/65">{pl}</span>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.1} className={i % 2 ? 'lg:order-1' : ''}>
                <Mockup id={p.id} from={p.colors.from} to={p.colors.to} />
              </Reveal>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
