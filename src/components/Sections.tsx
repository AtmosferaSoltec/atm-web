import { projects, reasons, services, site, stats } from '../data/site'
import { Icon, Reveal, SectionHeader } from './ui'

const tech = ['TypeScript', 'React', 'Next.js', 'NestJS', 'Go', 'Flutter', 'SvelteKit', 'PostgreSQL', 'Docker', 'Prisma', 'Tailwind', 'SUNAT']

export function Marquee() {
  const items = [...tech, ...tech]
  return (
    <div className="relative overflow-hidden border-y border-line py-5 [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]" aria-hidden>
      <div className="flex w-max animate-marquee gap-12">
        {items.map((t, i) => (
          <span key={i} className="flex items-center gap-12 text-sm font-medium tracking-wide whitespace-nowrap text-white/35">
            {t}
            <span className="size-1 rounded-full bg-brand-cyan/60" />
          </span>
        ))}
      </div>
    </div>
  )
}

export function Services() {
  return (
    <section id="servicios" className="py-24 sm:py-32">
      <div className="mx-auto max-w-page px-5 sm:px-8">
        <SectionHeader
          eyebrow="Servicios"
          title={<>Todo lo que necesita tu <span className="text-gradient-brand">idea.</span></>}
          text="Del primer boceto al sistema en producción, con soporte después."
        />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 0.08}>
              <div className="group relative h-full overflow-hidden rounded-3xl border border-line bg-card p-7 transition-colors hover:bg-card-hover">
                <div className="absolute -top-16 -right-16 size-40 rounded-full bg-brand-cyan/0 blur-3xl transition-all duration-500 group-hover:bg-brand-cyan/20" />
                <span className="grid size-11 place-items-center rounded-xl bg-white/[0.05] text-brand-cyan ring-1 ring-white/10">
                  <Icon name={s.icon} />
                </span>
                <h3 className="mt-6 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Projects() {
  return (
    <section id="proyectos" className="relative py-24 sm:py-32">
      <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <div className="mx-auto max-w-page px-5 sm:px-8">
        <SectionHeader
          eyebrow="Proyectos a medida"
          title={<>Sistemas que ya <span className="text-gradient-brand">están funcionando.</span></>}
          text="Software hecho para negocios reales, de un viñedo a una empresa de reparto."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {projects.map((p, i) => {
            const c = p.accent === 'green' ? 'text-brand-green border-brand-green/25' : 'text-brand-cyan border-brand-cyan/25'
            return (
              <Reveal key={p.name} delay={(i % 2) * 0.1}>
                <div className="group relative h-full overflow-hidden rounded-3xl border border-line bg-card p-8 transition-all duration-300 hover:-translate-y-1 hover:border-white/20">
                  <span
                    aria-hidden
                    className="absolute -right-6 -bottom-10 text-[9rem] leading-none font-black tracking-tighter text-white/[0.025] select-none"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className={`text-xs font-medium tracking-wider uppercase ${p.accent === 'green' ? 'text-brand-green' : 'text-brand-cyan'}`}>{p.type}</p>
                  <h3 className="mt-3 text-2xl font-bold">{p.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/60 sm:text-base">{p.description}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span key={t} className={`rounded-full border px-3 py-1 text-xs ${c}`}>{t}</span>
                    ))}
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function About() {
  return (
    <section id="nosotros" className="py-24 sm:py-32">
      <div className="mx-auto max-w-page px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div>
            <SectionHeader
              center={false}
              eyebrow="Nosotros"
              title={<>Un equipo pequeño, <span className="text-gradient-brand">hecho para ti.</span></>}
              text="Somos Atmósfera Soluciones Tecnológicas. Creemos que el buen software se nota en lo simple: que funcione, que sea claro y que lo quieras usar."
            />
            <Reveal delay={0.1} className="mt-10 grid grid-cols-2 gap-4">
              {stats.map((s) => (
                <div key={s.label} className="rounded-2xl border border-line bg-card p-5">
                  <p className="text-gradient-brand text-3xl font-extrabold sm:text-4xl">{s.value}</p>
                  <p className="mt-1 text-xs text-white/50 sm:text-sm">{s.label}</p>
                </div>
              ))}
            </Reveal>
          </div>

          <div className="space-y-4">
            {reasons.map((r, i) => (
              <Reveal key={r.title} delay={i * 0.07}>
                <div className="flex gap-5 rounded-3xl border border-line bg-card p-6 transition-colors hover:bg-card-hover">
                  <span className="text-gradient-brand text-2xl font-black tabular-nums">0{i + 1}</span>
                  <div>
                    <h3 className="text-lg font-semibold">{r.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/55">{r.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function Contact() {
  const { email, phone, whatsapp, instagram, instagramUrl, tiktok, tiktokUrl } = site.contact
  return (
    <section id="contacto" className="px-5 pb-24 sm:px-8 sm:pb-32">
      <Reveal>
        <div className="relative mx-auto max-w-page overflow-hidden rounded-[2rem] border border-line bg-card px-6 py-16 text-center sm:px-16 sm:py-24">
          <div className="bg-grid" />
          <div aria-hidden className="absolute -bottom-40 left-1/2 h-80 w-[640px] max-w-full -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgb(198_241_3/0.22),rgb(0_203_199/0.14)_50%,transparent_75%)] blur-3xl" />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-3xl font-bold sm:text-5xl">
              ¿Tienes una idea? <span className="text-gradient-brand">Hagámosla real.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-white/60 sm:text-lg">
              Escríbenos y cuéntanos qué necesitas. Te respondemos directamente, sin vueltas.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href={whatsapp} target="_blank" rel="noreferrer" className="btn-primary w-full rounded-full px-8 py-3.5 sm:w-auto">
                Escribir por WhatsApp
              </a>
              <a href={`mailto:${email}`} className="btn-ghost inline-flex w-full items-center justify-center gap-2 rounded-full px-8 py-3.5 text-white/85 sm:w-auto">
                <Icon name="mail" className="size-4" /> {email}
              </a>
            </div>
            <p className="mt-6 text-sm text-white/40">
              {phone} · <a className="hover:text-white" href={instagramUrl} target="_blank" rel="noreferrer">Instagram {instagram}</a> ·{' '}
              <a className="hover:text-white" href={tiktokUrl} target="_blank" rel="noreferrer">TikTok {tiktok}</a>
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-page flex-col items-center justify-between gap-5 px-5 py-10 sm:flex-row sm:px-8">
        <img src="/logo-full.svg" alt="Atmósfera" className="h-6 w-auto opacity-80" />
        <p className="text-center text-sm text-white/40">
          © {new Date().getFullYear()} {site.fullName}. Todos los derechos reservados.
        </p>
        <a href="#inicio" className="text-sm text-white/50 hover:text-white">Volver arriba ↑</a>
      </div>
    </footer>
  )
}
