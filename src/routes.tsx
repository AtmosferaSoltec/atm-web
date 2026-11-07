import type { ComponentType } from 'react'
import ContactPage from './pages/ContactPage'
import DataDeletion from './pages/DataDeletion'
import Home from './pages/Home'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'

export interface Route {
  path: string
  title: string
  description: string
  component: ComponentType
}

export const routes: Route[] = [
  {
    path: '/',
    title: 'Desarrollo de software a medida en Perú | Atmósfera',
    description: 'Desarrollamos software a medida, apps móviles y sistemas web con facturación electrónica SUNAT. Para todo el Perú y el extranjero. Cotiza gratis.',
    component: Home,
  },
  {
    path: '/contact',
    title: 'Contacto · Atmósfera',
    description: 'Datos de contacto de Atmósfera, marca de Joel Joas Maldonado Fernández (RUC 10744555189): dirección, teléfono y correo.',
    component: ContactPage,
  },
  {
    path: '/privacy',
    title: 'Política de privacidad · Atmósfera',
    description: 'Política de privacidad de Atmósfera conforme a la Ley N.° 29733: datos que tratamos, finalidades, derechos ARCO y uso de WhatsApp, Messenger e Instagram.',
    component: Privacy,
  },
  {
    path: '/terms',
    title: 'Términos y condiciones · Atmósfera',
    description: 'Términos y condiciones de uso del sitio y los servicios de Atmósfera: software a medida y productos propios.',
    component: Terms,
  },
  {
    path: '/data-deletion',
    title: 'Eliminación de datos · Atmósfera',
    description: 'Instrucciones para solicitar la eliminación de tus datos personales tratados por Atmósfera a través de WhatsApp, Messenger e Instagram.',
    component: DataDeletion,
  },
]

export function findRoute(pathname: string): Route {
  const clean = pathname.replace(/\/+$/, '').replace(/\.html$/, '') || '/'
  return routes.find((r) => r.path === clean) ?? routes[0]
}
