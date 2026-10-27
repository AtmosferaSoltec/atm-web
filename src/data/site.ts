export const site = {
  name: 'Atmósfera',
  fullName: 'Atmósfera Soluciones Tecnológicas',
  tagline: 'Tu sistema, a tu medida.',
  contact: {
    email: 'atmosfera-soltec@gmail.com',
    phone: '+51 908 069 776',
    whatsapp: 'https://wa.me/51908069776',
    instagram: '@atmosfera.soltec',
    instagramUrl: 'https://instagram.com/atmosfera.soltec',
    tiktok: '@atmosfera.soltec',
    tiktokUrl: 'https://tiktok.com/@atmosfera.soltec',
  },
  nav: [
    { label: 'Productos', href: '#productos' },
    { label: 'Servicios', href: '#servicios' },
    { label: 'A medida', href: '#proyectos' },
    { label: 'Nosotros', href: '#nosotros' },
    { label: 'Contacto', href: '#contacto' },
  ],
} as const

export type ProductId = 'orbita' | 'nova' | 'iris' | 'pulso'

export interface Product {
  id: ProductId
  name: string
  logo: string
  kicker: string
  headline: string
  description: string
  features: string[]
  platforms: string[]
  status: 'Disponible' | 'En desarrollo' | 'Prototipo'
  /** Colores del producto: [inicio, fin] del degradado y acento de texto. */
  colors: { from: string; to: string; accent: string }
}

export const products: Product[] = [
  {
    id: 'orbita',
    name: 'Órbita',
    logo: '/orbita-logo.svg',
    kicker: 'Finanzas personales',
    headline: 'Todo tu dinero girando en una sola órbita.',
    description:
      'Cuentas, gastos, tarjetas, recibos por honorarios y préstamos en un solo lugar. Disponible en Android, iOS y web con la misma cuenta.',
    features: [
      'Recibos por honorarios contra el tope anual, con XML y PDF',
      'Préstamos y servicios compartidos con quién debe qué mes',
      'Cuentas, tarjetas de crédito y reportes en PDF',
    ],
    platforms: ['Android', 'iOS', 'Web'],
    status: 'Disponible',
    colors: { from: '#2563eb', to: '#67e8f9', accent: '#67e8f9' },
  },
  {
    id: 'nova',
    name: 'Nova',
    logo: '/nova.svg',
    kicker: 'Libro de cuentas personal',
    headline: 'Cuentas claras con la gente que te rodea.',
    description:
      'Lleva lo que te deben, lo que debes, tus juntas y las suscripciones compartidas. Cada contacto puede revisar su saldo desde un enlace.',
    features: [
      'Cuenta corriente con cargos, pagos y compensaciones',
      'Juntas y deudas con cronograma de cuotas',
      'Enlace público y revocable para que cada quien vea su saldo',
    ],
    platforms: ['PWA', 'Web'],
    status: 'En desarrollo',
    colors: { from: '#6366f1', to: '#a855f7', accent: '#c4a1ff' },
  },
  {
    id: 'iris',
    name: 'Iris',
    logo: '/iris-logo.svg',
    kicker: 'Para iglesias',
    headline: 'La letra correcta, en la pantalla correcta.',
    description:
      'Administra letras, música, multimedia y los bloques de cada servicio desde la web, y proyecta desde el iPad o Windows sin depender de internet.',
    features: [
      'Biblioteca de letras con vista previa tal como se ve en el TV',
      'Servicios con bloques de tiempo y responsables',
      'Una sola cuenta en web, iPad y Windows',
    ],
    platforms: ['Web', 'iPad', 'Windows'],
    status: 'Disponible',
    colors: { from: '#ff9d2e', to: '#ffc766', accent: '#ffb547' },
  },
  {
    id: 'pulso',
    name: 'Pulso',
    logo: '/logo-mark.svg',
    kicker: 'Gimnasios',
    headline: 'El pulso de tu gimnasio, sede por sede.',
    description:
      'Membresías, renovaciones, control de acceso y métricas para gimnasios con una o varias sedes, con la marca de cada cliente.',
    features: [
      'Membresías con renovaciones y avisos por WhatsApp',
      'Control de acceso con registro en vivo',
      'Multisede y marca propia por gimnasio',
    ],
    platforms: ['Web'],
    status: 'Prototipo',
    colors: { from: '#178e91', to: '#5fd1c4', accent: '#5fd1c4' },
  },
]

export interface Project {
  name: string
  type: string
  description: string
  tags: string[]
  accent: 'cyan' | 'green'
}

export const projects: Project[] = [
  {
    name: 'La Vendimia',
    type: 'Sistema comercial para viñedos',
    description:
      'Ventas, comprobantes válidos ante SUNAT, guías de remisión con despachos parciales, catálogo y cartera de clientes para un viñedo en Ica.',
    tags: ['Web', 'SUNAT', 'Guías de remisión'],
    accent: 'green',
  },
  {
    name: 'Olympus Courier',
    type: 'Operación de reparto',
    description:
      'Clientes, repartos, vehículos y facturación electrónica integrada, con panel web de administración y app Android para repartidores.',
    tags: ['Web', 'Android', 'Facturación electrónica'],
    accent: 'cyan',
  },
  {
    name: 'Sistema hotelero',
    type: 'Gestión multihotel',
    description:
      'Reservas, calendario de habitaciones, desayunos del restaurante, finanzas y estadísticas para varios hoteles desde un mismo lugar.',
    tags: ['Web', 'Multihotel', 'Finanzas'],
    accent: 'cyan',
  },
  {
    name: 'Festiva',
    type: 'Descubrimiento de eventos',
    description:
      'App pública para un cliente en Noruega: eventos cercanos por geolocalización, perfiles de organizadores, categorías y notificaciones.',
    tags: ['Web', 'Mobile', 'Noruega'],
    accent: 'green',
  },
]

export const services = [
  { title: 'Apps móviles', text: 'Android e iOS con una experiencia nativa y fluida.', icon: 'phone' },
  { title: 'Sistemas web', text: 'Paneles, plataformas y portales rápidos y seguros.', icon: 'globe' },
  { title: 'Backend y APIs', text: 'Servicios robustos, documentados e integrables.', icon: 'server' },
  { title: 'Facturación electrónica', text: 'Integración con SUNAT: comprobantes y guías de remisión.', icon: 'receipt' },
  { title: 'Diseño UI/UX', text: 'Interfaces claras que tu equipo quiere usar.', icon: 'pen' },
  { title: 'Soporte continuo', text: 'Mantenimiento y evolución con respuesta directa.', icon: 'life' },
] as const

export const reasons = [
  { title: 'Hecho a tu medida', text: 'Nada de plantillas: el sistema se adapta a cómo trabaja tu negocio.' },
  { title: 'Productos propios', text: 'Construimos y operamos nuestras propias apps, así que sabemos lo que cuesta mantenerlas.' },
  { title: 'Trato directo', text: 'Hablas con quien escribe el código, sin intermediarios ni tickets perdidos.' },
  { title: 'Tecnología moderna', text: 'TypeScript, Go, NestJS, Flutter y PostgreSQL, desplegados con CI/CD.' },
]

export const stats = [
  { value: '4', label: 'productos propios' },
  { value: '9+', label: 'sistemas entregados y en marcha' },
  { value: '3', label: 'plataformas: web, móvil y escritorio' },
  { value: '100%', label: 'a medida' },
]
