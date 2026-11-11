import { useEffect, type RefObject } from 'react'

export type Motion = typeof import('./gsap')

/** Toda animación se crea dentro de esta media query: con movimiento reducido no existe. */
export const MOTION_OK = '(prefers-reduced-motion: no-preference)'
export const FINE_POINTER = '(hover: hover) and (pointer: fine)'

let engine: Promise<Motion> | undefined
/** Carga (una sola vez) el chunk de animación. */
export const loadMotion = () => (engine ??= import('./gsap'))

/**
 * Ejecuta `setup` con el motor de animación cuando esté disponible, dentro de un
 * contexto de GSAP acotado a `scope`: los selectores de texto solo ven ese
 * subárbol y todo se revierte al desmontar.
 */
export function useMotion(scope: RefObject<HTMLElement | null>, setup: (m: Motion) => void) {
  useEffect(() => {
    let ctx: { revert(): void } | undefined
    let cancelled = false
    loadMotion().then((m) => {
      if (cancelled || !scope.current) return
      ctx = m.gsap.context(() => setup(m), scope.current)
    })
    return () => {
      cancelled = true
      ctx?.revert()
    }
    // `setup` se lee una vez por montaje: las animaciones no dependen de props.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scope])
}

/**
 * Entradas declarativas para una sección. Dentro de `scope`:
 * - `data-split`: titular que sube línea a línea tras una máscara.
 * - `data-draw`: filete que se traza de izquierda a derecha.
 * - `data-fade`: elemento menor que se asienta; los vecinos entran escalonados.
 */
export function useReveal(scope: RefObject<HTMLElement | null>) {
  useMotion(scope, ({ gsap, ScrollTrigger, SplitText, ease }) => {
    const root = scope.current!
    const mm = gsap.matchMedia()
    mm.add(MOTION_OK, () => {
      root.querySelectorAll<HTMLElement>('[data-split]').forEach((el) => {
        gsap.set(el, { autoAlpha: 0 })
        SplitText.create(el, {
          type: 'lines',
          mask: 'lines',
          linesClass: 'split-line',
          autoSplit: true,
          onSplit(self) {
            gsap.set(el, { autoAlpha: 1 })
            return gsap.from(self.lines, {
              yPercent: 112,
              duration: 1.15,
              ease: ease.type,
              stagger: 0.09,
              scrollTrigger: { trigger: el, start: 'top 88%', once: true },
            })
          },
        })
      })

      root.querySelectorAll<HTMLElement>('[data-draw]').forEach((el) => {
        gsap.from(el, {
          scaleX: 0,
          duration: 1.4,
          ease: ease.type,
          scrollTrigger: { trigger: el, start: 'top 92%', once: true },
        })
      })

      const fades = Array.from(root.querySelectorAll<HTMLElement>('[data-fade]'))
      if (fades.length) {
        gsap.set(fades, { autoAlpha: 0, y: 18 })
        ScrollTrigger.batch(fades, {
          start: 'top 90%',
          once: true,
          onEnter: (els) => gsap.to(els, { autoAlpha: 1, y: 0, duration: 0.9, ease: ease.ui, stagger: 0.07, overwrite: true }),
        })
      }
    })
  })
}
