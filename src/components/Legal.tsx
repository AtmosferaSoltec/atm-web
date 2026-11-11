import { useRef, type ReactNode } from 'react'
import { site } from '../data/site'
import { useReveal } from '../lib/motion'
import Shell from './Shell'
import { SectionHead } from './ui'

export function PageShell({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string
  title: ReactNode
  intro?: string
  children: ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)
  useReveal(ref)
  return (
    <Shell>
      <div ref={ref} className="wrap pt-32 pb-24 sm:pt-44 sm:pb-32">
        <SectionHead as="h1" eyebrow={eyebrow} title={title} text={intro} />
        <div className="mt-14 lg:mt-20 lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-8 lg:col-start-5">{children}</div>
        </div>
      </div>
    </Shell>
  )
}

export function Doc({ title, intro, children }: { title: string; intro?: string; children: ReactNode }) {
  return (
    <PageShell eyebrow="Legal" title={title} intro={intro}>
      <p className="label mb-10">Última actualización: {site.legal.updated}</p>
      <div className="space-y-10">{children}</div>
    </PageShell>
  )
}

export function Sec({ n, title, children }: { n?: number; title: string; children: ReactNode }) {
  return (
    <section className="border-t border-line pt-6">
      <h2 className="flex gap-4 text-xl font-semibold sm:text-2xl">
        {n ? <span className="label pt-2 text-faint">{String(n).padStart(2, '0')}</span> : null}
        <span>{title}</span>
      </h2>
      <div className={`prose-legal mt-3 ${n ? 'sm:pl-10' : ''}`}>{children}</div>
    </section>
  )
}

export function Owner() {
  const { legal, contact, fullName, name } = site
  return (
    <ul className="space-y-1 [&_li]:!ml-0 [&_li]:!list-none">
      <li><strong>Marca:</strong> {name} ({fullName})</li>
      <li><strong>Titular:</strong> {legal.owner}</li>
      <li><strong>RUC:</strong> {legal.ruc}</li>
      <li><strong>Dirección:</strong> {legal.address}</li>
      <li><strong>Teléfono / WhatsApp:</strong> {contact.phone}</li>
      <li><strong>Correo:</strong> <a href={`mailto:${contact.email}`}>{contact.email}</a></li>
    </ul>
  )
}
