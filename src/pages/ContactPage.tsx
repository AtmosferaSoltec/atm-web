import { Owner, PageShell, Sec } from '../components/Legal'
import { Button } from '../components/ui'
import { site } from '../data/site'

export default function ContactPage() {
  const { whatsapp, email } = site.contact
  return (
    <PageShell
      eyebrow="Contacto"
      title={<>Hablemos de tu proyecto<span className="text-lime">.</span></>}
      intro="Escríbenos y cuéntanos qué necesitas. Te respondemos directamente."
    >
      <div className="border-t border-line-strong pt-7">
        <p className="mb-5 text-white/80">{site.legal.statement}</p>
        <div className="prose-legal">
          <Owner />
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href={whatsapp} variant="brand" icon="arrowUpRight" external>
            Escribir por WhatsApp
          </Button>
          <Button href={`mailto:${email}`} variant="ghost" icon="mail">
            Enviar un correo
          </Button>
        </div>
      </div>
      <div className="mt-12">
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
