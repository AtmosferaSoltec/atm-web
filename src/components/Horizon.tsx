import type { CSSProperties } from 'react'

/**
 * El Horizonte: la firma gráfica de Atmósfera. Un arco fino con la luz del
 * isotipo y, debajo, los estratos del sistema. Es SVG puro (sin canvas).
 *
 * El lienzo se estira al ancho disponible (`preserveAspectRatio="none"`), por
 * eso los trazos no escalan y las etiquetas viven fuera, en HTML.
 */

const W = 1440
const H = 400
const END_Y = 150
const CTRL_Y = -50

/** Desplazamiento de cada estrato bajo la línea del horizonte. */
const STRATA = [52, 110, 172, 240]

const arc = (off = 0) => `M-20 ${END_Y + off} Q${W / 2} ${CTRL_Y + off * 1.25} ${W + 20} ${END_Y + off}`

/** Punto sobre el arco principal (Bézier cuadrática) para las marcas de cota. */
function pointAt(t: number) {
  const x0 = -20
  const x2 = W + 20
  const x = (1 - t) ** 2 * x0 + 2 * (1 - t) * t * (W / 2) + t ** 2 * x2
  const y = (1 - t) ** 2 * END_Y + 2 * (1 - t) * t * CTRL_Y + t ** 2 * END_Y
  return { x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 }
}

const TICKS = Array.from({ length: 23 }, (_, i) => pointAt((i + 1) / 24))

const strataLabels = ['Interfaz', 'Lógica', 'Datos', 'Infraestructura'] as const

export default function Horizon({
  id,
  intro = false,
  labels = false,
  strata = true,
  className = '',
}: {
  /** Único por instancia: nombra el degradado del trazo. */
  id: string
  /** Activa la entrada coreografiada (solo en el hero). */
  intro?: boolean
  labels?: boolean
  strata?: boolean
  className?: string
}) {
  return (
    <div className={`horizon ${className}`} aria-hidden="true">
      <div className={`hz-scale h-full ${intro ? 'horizon-intro' : ''}`}>
        <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
          <defs>
            <linearGradient id={id} gradientUnits="userSpaceOnUse" x1="0" x2={W} y1="0" y2="0">
              <stop offset="0" stopColor="#15cfb3" stopOpacity="0" />
              <stop offset="0.22" stopColor="#15cfb3" />
              <stop offset="0.48" stopColor="#7de34c" />
              <stop offset="0.56" stopColor="#c6f103" />
              <stop offset="0.64" stopColor="#7de34c" />
              <stop offset="1" stopColor="#7de34c" stopOpacity="0" />
            </linearGradient>
          </defs>

          <path className="hz-ground" d={`${arc()} L${W + 20} ${H + 2} L-20 ${H + 2} Z`} />

          {strata &&
            STRATA.map((off, i) => (
              <path
                key={off}
                className="hz-stratum"
                d={arc(off)}
               
                style={{ '--i': STRATA.length - i, opacity: 1 - i * 0.16 } as CSSProperties}
              />
            ))}

          {TICKS.map((p, i) => (
            <path
              key={i}
              className="hz-tick"
              d={`M${p.x} ${p.y + 6} v${i % 4 === 3 ? 16 : 8}`}
              style={{ '--i': i } as CSSProperties}
            />
          ))}

          <path className="hz-glow" d={arc()} stroke={`url(#${id})`} style={{ '--i': 5 } as CSSProperties} />
          <path className="hz-line" d={arc()} stroke={`url(#${id})`} style={{ '--i': 5 } as CSSProperties} />
        </svg>
      </div>

      {/* Cuando el arco se aplana con el scroll, este filete toma su lugar. */}
      <span className="hz-base" />

      {labels && (
        <div className="hz-labels absolute inset-0 hidden sm:block">
          {strataLabels.map((name, i) => (
            <span
              key={name}
              className="label hz-label"
              style={{ top: `${((END_Y + STRATA[i]) / H) * 100}%`, '--i': 4 + i * 2 } as CSSProperties}
            >
              <span className="mr-2 text-white/75">L{strataLabels.length - i}</span>
              {name}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
