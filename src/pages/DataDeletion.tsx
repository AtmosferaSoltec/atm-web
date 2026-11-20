import { Doc, Sec } from '../components/Legal'
import { site } from '../data/site'

const apps = ['Pulso', 'Órbita', 'Nova', 'Olympus']

export default function DataDeletion() {
  const { email } = site.contact
  const mailto = `mailto:${email}?subject=Eliminaci%C3%B3n%20de%20datos`
  return (
    <Doc
      title="Eliminación de datos"
      intro="Cómo solicitar la eliminación de tu cuenta y de los datos personales que Atmósfera trata a través de sus aplicaciones (Pulso, Órbita, Nova y Olympus) y de WhatsApp, Facebook Messenger e Instagram."
    >
      <Sec title="Quién trata tus datos">
        <p>{site.legal.statement}</p>
        <p>
          Esta página aplica a las aplicaciones de Atmósfera: <strong>{apps.join(', ')}</strong>. Si usas una aplicación de un negocio
          cliente nuestro (por ejemplo, el personal de un gimnasio que usa Pulso), ese negocio es quien administra tu cuenta y los datos
          de su operación; igual puedes escribirnos y gestionaremos tu solicitud con él.
        </p>
      </Sec>
      <Sec title="Cómo solicitar la eliminación, paso a paso">
        <ol className="space-y-3 [&_li]:list-decimal">
          <li>
            Envía un correo a <a href={mailto}>{email}</a> con el asunto <strong>«Eliminación de datos»</strong>.
          </li>
          <li>
            Indica en el mensaje <strong>la aplicación</strong> (por ejemplo, Pulso), tu <strong>nombre</strong> y el{' '}
            <strong>documento o correo</strong> con el que inicias sesión. Si nos escribiste por WhatsApp, Messenger o Instagram, indica tu
            número de teléfono o tu usuario.
          </li>
          <li>Podemos pedirte datos adicionales únicamente para verificar que la solicitud proviene de ti.</li>
          <li>
            Atenderemos tu solicitud en un plazo máximo de <strong>30 días</strong> y te enviaremos una{' '}
            <strong>confirmación por correo</strong> cuando los datos hayan sido eliminados.
          </li>
        </ol>
      </Sec>
      <Sec title="Qué datos se eliminan">
        <ul className="space-y-2 [&_li]:list-disc">
          <li>Tu cuenta de acceso: nombre, número de documento, correo, teléfono y contraseña.</li>
          <li>Tus sesiones activas y los accesos que tuvieras a cada aplicación.</li>
          <li>Los mensajes y datos de contacto que nos enviaste por WhatsApp, Messenger o Instagram.</li>
        </ul>
      </Sec>
      <Sec title="Qué datos se conservan y por cuánto tiempo">
        <p>
          Conservamos únicamente lo que debemos guardar por obligación legal o que pertenece al negocio cliente: registros de ventas,
          membresías, pagos y comprobantes. Se mantienen por el plazo que exija la normativa tributaria y contable del Perú y después se
          eliminan o se anonimizan. Cuando conservamos un registro, retiramos de él los datos que te identifican siempre que la ley lo
          permita.
        </p>
      </Sec>
      <Sec title="Quitar el acceso de la app desde Facebook">
        <p>
          También puedes retirar el acceso de la app directamente desde Facebook: ve a <strong>Configuración &gt; Apps y sitios web</strong>,
          selecciona la app de Atmósfera y elige <strong>Quitar</strong>. Esto revoca los permisos otorgados; para eliminar además los datos
          ya almacenados, envíanos la solicitud por correo como se indica arriba. Más detalles en nuestra{' '}
          <a href="/privacy">Política de privacidad</a>.
        </p>
      </Sec>
    </Doc>
  )
}
