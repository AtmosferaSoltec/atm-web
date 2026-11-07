import { Doc, Sec } from '../components/Legal'
import { site } from '../data/site'

export default function DataDeletion() {
  const { email } = site.contact
  return (
    <Doc
      title="Eliminación de datos"
      intro="Cómo solicitar la eliminación de los datos personales que Atmósfera trata a través de WhatsApp, Facebook Messenger e Instagram."
    >
      <Sec title="Quién trata tus datos">
        <p>{site.legal.statement}</p>
      </Sec>
      <Sec title="Cómo solicitar la eliminación, paso a paso">
        <ol className="space-y-3 [&_li]:list-decimal">
          <li>
            Envía un correo a <a href={`mailto:${email}?subject=Eliminaci%C3%B3n%20de%20datos`}>{email}</a> con el asunto{' '}
            <strong>«Eliminación de datos»</strong>.
          </li>
          <li>
            En el mensaje indica el <strong>número de teléfono</strong> (WhatsApp) o el <strong>usuario de Facebook o Instagram</strong> con
            el que nos escribiste, para poder ubicar tus datos.
          </li>
          <li>Podemos pedirte datos adicionales únicamente para verificar que la solicitud proviene de ti.</li>
          <li>
            Atenderemos tu solicitud en un plazo máximo de <strong>30 días</strong> y te enviaremos una <strong>confirmación por correo</strong>{' '}
            cuando los datos hayan sido eliminados.
          </li>
        </ol>
      </Sec>
      <Sec title="Quitar el acceso de la app desde Facebook">
        <p>
          También puedes retirar el acceso de la app directamente desde Facebook: ve a <strong>Configuración &gt; Apps y sitios web</strong>,
          selecciona la app de Atmósfera y elige <strong>Quitar</strong>. Esto revoca los permisos otorgados; para eliminar además los datos
          ya almacenados, envíanos la solicitud por correo como se indica arriba.
        </p>
      </Sec>
      <Sec title="Qué ocurre con tus datos">
        <p>
          Eliminaremos o anonimizaremos los datos personales asociados a tu solicitud, salvo aquellos que debamos conservar por obligación
          legal. Más detalles en nuestra <a href="/privacy">Política de privacidad</a>.
        </p>
      </Sec>
    </Doc>
  )
}
