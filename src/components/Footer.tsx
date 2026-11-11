import { site } from '../data/site'

const legalLinks = [
  { label: 'Política de privacidad', href: '/privacy' },
  { label: 'Términos y condiciones', href: '/terms' },
  { label: 'Eliminación de datos', href: '/data-deletion' },
  { label: 'Contacto', href: '/contact' },
]

export default function Footer() {
  const { legal, contact, nav } = site
  return (
    <footer className="bg-ink-deep">
      <div className="wrap pt-14 pb-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <a href="/" aria-label="Atmósfera, inicio" className="inline-block">
              <img src="/logo-full.svg" alt="Atmósfera" width="118" height="28" className="h-7 w-auto" loading="lazy" />
            </a>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-white/80">{legal.statement}</p>
            <address className="mt-3 max-w-md text-sm leading-relaxed text-mute not-italic">
              {legal.address}
              <br />
              Teléfono / WhatsApp:{' '}
              <a className="link hover:text-white" href={`tel:${contact.phone.replace(/\s/g, '')}`}>
                {contact.phone}
              </a>
              <br />
              Correo:{' '}
              <a className="link hover:text-white" href={`mailto:${contact.email}`}>
                {contact.email}
              </a>
            </address>
          </div>

          <nav aria-label="Secciones" className="lg:col-span-3">
            <p className="label text-faint">Sitio</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {nav.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="link text-white/80 hover:text-white">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Legal" className="lg:col-span-3">
            <p className="label text-faint">Legal</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {legalLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="link text-white/80 hover:text-white">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="label">© {new Date().getFullYear()} Atmósfera. Todos los derechos reservados.</p>
          <a href="#top" className="label link hover:text-white">
            Volver arriba ↑
          </a>
        </div>
      </div>
    </footer>
  )
}
