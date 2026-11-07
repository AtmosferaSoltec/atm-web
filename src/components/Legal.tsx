import type { ReactNode } from 'react'
import { site } from '../data/site'
import Header from './Header'
import { Footer } from './Sections'
import { SectionHeader } from './ui'

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
  return (
    <>
      <Header />
      <main className="pt-32 pb-24 sm:pt-44 sm:pb-32">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <SectionHeader center={false} eyebrow={eyebrow} title={title} text={intro} />
          <div className="mt-12">{children}</div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export function Doc({ title, intro, children }: { title: string; intro?: string; children: ReactNode }) {
  return (
    <PageShell eyebrow="Legal" title={title} intro={intro}>
      <p className="mb-10 text-sm text-white/45">Última actualización: {site.legal.updated}</p>
      <div className="space-y-10">{children}</div>
    </PageShell>
  )
}

export function Sec({ n, title, children }: { n?: number; title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="text-xl font-semibold sm:text-2xl">{n ? `${n}. ` : ''}{title}</h2>
      <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-white/65 sm:text-base [&_a]:text-brand-cyan [&_a]:underline [&_li]:ml-5 [&_li]:list-disc [&_strong]:text-white/90">
        {children}
      </div>
    </section>
  )
}

export function Owner() {
  const { legal, contact, fullName, name } = site
  return (
    <ul className="!ml-0 space-y-1 [&_li]:!ml-0 [&_li]:list-none">
      <li><strong>Marca:</strong> {name} ({fullName})</li>
      <li><strong>Titular:</strong> {legal.owner}</li>
      <li><strong>RUC:</strong> {legal.ruc}</li>
      <li><strong>Dirección:</strong> {legal.address}</li>
      <li><strong>Teléfono / WhatsApp:</strong> {contact.phone}</li>
      <li><strong>Correo:</strong> <a href={`mailto:${contact.email}`}>{contact.email}</a></li>
    </ul>
  )
}
