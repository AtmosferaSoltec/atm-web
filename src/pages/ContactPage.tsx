import { Owner, PageShell, Sec } from '../components/Legal'
import { site } from '../data/site'

export default function ContactPage() {
  const { whatsapp, email } = site.contact
  return (
    <PageShell
      eyebrow="Contacto"
      title={<>Hablemos de <span className="text-gradient-brand">tu proyecto.</span></>}
      intro="Escríbenos y cuéntanos qué necesitas. Te respondemos directamente."
    >
      <div className="rounded-3xl border border-line bg-card p-7 sm:p-9">
        <p className="mb-5 text-white/70">{site.legal.statement}</p>
        <div className="text-[15px] text-white/65 sm:text-base [&_a]:text-brand-cyan [&_a]:underline [&_strong]:text-white/90">
          <Owner />
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href={whatsapp} target="_blank" rel="noreferrer" className="btn-primary rounded-full px-8 py-3.5 text-center">
            Escribir por WhatsApp
          </a>
          <a href={`mailto:${email}`} className="btn-ghost rounded-full px-8 py-3.5 text-center text-white/85">
            Enviar un correo
          </a>
        </div>
      </div>
      <div className="mt-10">
        <Sec title="Datos personales">
          <p>
            Para consultas sobre tus datos personales o para solicitar su eliminación, revisa nuestra{' '}
            <a href="/privacy">Política de privacidad</a> y las <a href="/data-deletion">instrucciones de eliminación de datos</a>.
          </p>
        </Sec>
      </div>
    </PageShell>
  )
}
