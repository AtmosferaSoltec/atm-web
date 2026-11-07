import { Doc, Owner, Sec } from '../components/Legal'
import { site } from '../data/site'

export default function Terms() {
  return (
    <Doc
      title="Términos y condiciones"
      intro="Condiciones que rigen el uso del sitio atmosferast.com y de los servicios de Atmósfera."
    >
      <Sec n={1} title="Titular">
        <p>{site.legal.statement}</p>
        <Owner />
      </Sec>
      <Sec n={2} title="Descripción del servicio">
        <p>
          Atmósfera ofrece desarrollo de software a medida (aplicaciones web y móviles, sistemas, APIs, facturación electrónica, diseño
          UI/UX y soporte) y productos propios como <strong>Órbita</strong>, <strong>Nova</strong> e <strong>Iris</strong>. Las
          condiciones específicas de cada proyecto se acuerdan por escrito con cada cliente.
        </p>
      </Sec>
      <Sec n={3} title="Aceptación">
        <p>Al usar este sitio o nuestros servicios aceptas estos términos. Si no estás de acuerdo, te pedimos no utilizarlos.</p>
      </Sec>
      <Sec n={4} title="Responsabilidades">
        <p>
          Nos comprometemos a prestar los servicios con diligencia profesional. El cliente se compromete a entregar información veraz, a
          contar con las autorizaciones necesarias sobre los datos y contenidos que nos proporcione, y a cumplir la normativa aplicable en su
          actividad, incluida la relativa al envío de mensajes a sus propios clientes.
        </p>
      </Sec>
      <Sec n={5} title="Uso aceptable">
        <p>Está prohibido:</p>
        <ul>
          <li>Usar el sitio o los servicios para fines ilícitos, fraudulentos o que vulneren derechos de terceros.</li>
          <li>Enviar spam, mensajes no solicitados o contenido que infrinja las políticas de WhatsApp, Messenger o Instagram.</li>
          <li>Intentar acceder sin autorización a sistemas, cuentas o datos, o interrumpir el funcionamiento del servicio.</li>
        </ul>
      </Sec>
      <Sec n={6} title="Propiedad intelectual">
        <p>
          La marca Atmósfera, los logotipos, textos, diseños y el software de nuestros productos son propiedad de su titular y están
          protegidos por la legislación peruana. No se otorga licencia alguna salvo la necesaria para usar el servicio contratado. Los
          derechos sobre el software a medida se rigen por lo pactado en cada proyecto.
        </p>
      </Sec>
      <Sec n={7} title="Protección de datos">
        <p>
          El tratamiento de datos personales se describe en la <a href="/privacy">Política de privacidad</a>. Puedes solicitar la
          eliminación de tus datos en <a href="/data-deletion">Eliminación de datos</a>.
        </p>
      </Sec>
      <Sec n={8} title="Limitación de responsabilidad">
        <p>
          El sitio y los servicios se ofrecen «tal cual». En la medida permitida por la ley, no respondemos por daños indirectos, lucro
          cesante o pérdidas derivadas de interrupciones de servicios de terceros (como Meta, proveedores de nube o de inteligencia
          artificial), de caso fortuito o fuerza mayor, ni del uso indebido del servicio por parte del cliente. Nuestra responsabilidad total
          se limita al monto efectivamente pagado por el servicio en cuestión.
        </p>
      </Sec>
      <Sec n={9} title="Modificaciones">
        <p>Podemos actualizar estos términos; la versión vigente será la publicada en esta página, con su fecha de actualización.</p>
      </Sec>
      <Sec n={10} title="Ley aplicable y jurisdicción">
        <p>
          Estos términos se rigen por las leyes de la República del Perú. Cualquier controversia se someterá a los jueces y tribunales
          competentes de Chincha, Ica, Perú, sin perjuicio de los derechos que la ley reconozca al consumidor.
        </p>
      </Sec>
      <Sec n={11} title="Contacto">
        <p>
          Para cualquier consulta escribe a <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a> o al {site.contact.phone}.
        </p>
      </Sec>
    </Doc>
  )
}
