import { Doc, Owner, Sec } from '../components/Legal'
import { site } from '../data/site'

export default function Privacy() {
  const { email } = site.contact
  return (
    <Doc
      title="Política de privacidad"
      intro="Cómo Atmósfera trata tus datos personales, conforme a la Ley N.° 29733, Ley de Protección de Datos Personales del Perú, y su reglamento."
    >
      <Sec n={1} title="Responsable del tratamiento">
        <p>{site.legal.statement}</p>
        <Owner />
      </Sec>
      <Sec n={2} title="Alcance">
        <p>
          Esta política aplica al sitio web atmosferast.com y a los sistemas y aplicaciones de Atmósfera, incluidos los servicios de
          mensajería conectados a WhatsApp Business Platform, Facebook Messenger e Instagram de Meta Platforms, Inc.
        </p>
      </Sec>
      <Sec n={3} title="Datos que recopilamos">
        <ul>
          <li>Datos de contacto: nombre, teléfono y correo electrónico.</li>
          <li>Contenido de los mensajes que los usuarios envían a los negocios clientes por WhatsApp, Messenger o Instagram.</li>
          <li>Identificadores de esas plataformas (por ejemplo, número de WhatsApp o identificador de usuario).</li>
          <li>Datos de citas, reservas y pedidos.</li>
          <li>Datos técnicos de uso: dirección IP, navegador y cookies.</li>
        </ul>
      </Sec>
      <Sec n={4} title="Finalidad">
        <p>
          Usamos los datos para responder consultas, gestionar citas, reservas y pedidos, brindar atención automatizada mediante asistentes
          de inteligencia artificial y atención humana, y dar soporte y mejorar el servicio.{' '}
          <strong>No vendemos datos personales.</strong>
        </p>
      </Sec>
      <Sec n={5} title="Uso de inteligencia artificial">
        <p>
          Los mensajes pueden ser procesados por proveedores de modelos de inteligencia artificial (por ejemplo Google, OpenAI o
          Anthropic) únicamente para generar respuestas. No se utilizan con fines publicitarios.
        </p>
      </Sec>
      <Sec n={6} title="Encargados y terceros">
        <p>Para prestar el servicio compartimos datos, en la medida necesaria, con:</p>
        <ul>
          <li>Meta Platforms (WhatsApp, Messenger e Instagram).</li>
          <li>Proveedores de modelos de inteligencia artificial.</li>
          <li>Proveedores de hosting y de base de datos.</li>
        </ul>
        <p>Esto puede implicar transferencia internacional de datos personales a países distintos del Perú.</p>
      </Sec>
      <Sec n={7} title="Datos de Meta">
        <p>
          El uso de los datos obtenidos de las plataformas de Meta cumple los Términos de la Plataforma de Meta y las políticas de WhatsApp
          Business.
        </p>
      </Sec>
      <Sec n={8} title="Conservación">
        <p>
          Conservamos los datos mientras dure la relación de servicio o lo exija la ley; después los eliminamos o anonimizamos.
        </p>
      </Sec>
      <Sec n={9} title="Derechos ARCO">
        <p>
          Puedes ejercer tus derechos de acceso, rectificación, cancelación y oposición escribiendo a{' '}
          <a href={`mailto:${email}`}>{email}</a>, indicando tu nombre, el medio por el que nos contactaste (número de teléfono o usuario) y
          el derecho que deseas ejercer. Responderemos en los plazos que establece la ley (hasta 20 días hábiles para el derecho de
          acceso e información y hasta 10 días hábiles para los demás). Para solicitar la eliminación de tus datos, sigue las{' '}
          <a href="/data-deletion">instrucciones de eliminación de datos</a>.
        </p>
        <p>
          Si consideras que no atendimos tu solicitud, puedes acudir a la Autoridad Nacional de Protección de Datos Personales del Perú.
        </p>
      </Sec>
      <Sec n={10} title="Seguridad">
        <p>
          Aplicamos medidas técnicas y organizativas razonables para proteger los datos contra acceso no autorizado, pérdida o alteración,
          como conexiones cifradas y control de acceso.
        </p>
      </Sec>
      <Sec n={11} title="Cookies">
        <p>
          El sitio puede usar cookies y tecnologías similares para su funcionamiento y para medir su uso. Puedes bloquearlas o eliminarlas
          desde la configuración de tu navegador; algunas funciones podrían verse afectadas.
        </p>
      </Sec>
      <Sec n={12} title="Menores de edad">
        <p>El servicio no está dirigido a menores de 18 años y no recopilamos sus datos de forma intencional.</p>
      </Sec>
      <Sec n={13} title="Cambios a la política">
        <p>
          Podemos actualizar esta política. Publicaremos la versión vigente en esta página con su fecha de «Última actualización».
        </p>
      </Sec>
      <Sec n={14} title="Contacto">
        <p>
          Para cualquier consulta sobre privacidad escribe a <a href={`mailto:${email}`}>{email}</a> o llama al {site.contact.phone}.
        </p>
      </Sec>
    </Doc>
  )
}
