import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

/**
 * El motor de animación vive en su propio chunk: se descarga en paralelo y no
 * bloquea la hidratación. Nada de lo que hay aquí es necesario para el primer
 * pintado (la entrada del hero es CSS).
 */
gsap.registerPlugin(ScrollTrigger, SplitText)

/** Sistema de movimiento: tres registros, no uno. El scroll va lineal (`none`). */
const ease = {
  /** Tipografía y trazos: entrada larga que frena tarde. */
  type: 'expo.out',
  /** Interfaz y elementos pequeños. */
  ui: 'power3.out',
} as const

export { ScrollTrigger, SplitText, ease, gsap }
