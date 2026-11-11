import type { CSSProperties, ReactNode } from 'react'

const paths = {
  arrow: 'M5 12h14M13 6l6 6-6 6',
  arrowUpRight: 'M7 17 17 7M8 7h9v9',
  arrowDown: 'M12 5v14M6 13l6 6 6-6',
  mail: 'M3 5h18v14H3zM3 7l9 6 9-6',
  check: 'M5 12.5l4.5 4.5L19 7.5',
} as const

export type IconName = keyof typeof paths

export function Icon({ name, className = 'size-5' }: { name: IconName; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d={paths[name]} />
    </svg>
  )
}

/** Botón-enlace. El relleno sube desde abajo al pasar el cursor. */
export function Button({
  href,
  children,
  variant = 'light',
  size,
  icon = 'arrow',
  external,
  className = '',
}: {
  href: string
  children: ReactNode
  variant?: 'light' | 'brand' | 'ghost'
  size?: 'sm'
  icon?: IconName | null
  external?: boolean
  className?: string
}) {
  return (
    <a
      href={href}
      className={`btn btn-${variant} ${size === 'sm' ? 'btn-sm' : ''} ${className}`}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
    >
      <span className="btn-fill" aria-hidden />
      <span>{children}</span>
      {icon && <Icon name={icon} className="btn-arrow" />}
    </a>
  )
}

/**
 * Cabecera de sección: índice + nombre en mono, filete que se traza y titular
 * a gran escala alineado a la izquierda.
 */
export function SectionHead({
  index,
  eyebrow,
  title,
  text,
  aside,
  as: Tag = 'h2',
}: {
  index?: string
  eyebrow: string
  title: ReactNode
  text?: ReactNode
  aside?: ReactNode
  as?: 'h1' | 'h2'
}) {
  return (
    <header>
      <div className="flex items-baseline justify-between gap-6 pb-4" data-fade>
        <p className="label label-dot">
          {index && <span className="text-white">{index}</span>}
          {index && <span className="mx-2 text-faint">/</span>}
          {eyebrow}
        </p>
        {aside && <p className="label hidden text-faint sm:block">{aside}</p>}
      </div>
      <span className="rule" data-draw aria-hidden />
      <div className="mt-10 grid gap-6 lg:mt-14 lg:grid-cols-12 lg:gap-8">
        <Tag className="title-xl lg:col-span-8" data-split>
          {title}
        </Tag>
        {text && (
          <p className="lede max-w-md lg:col-span-4 lg:self-end lg:pb-2" data-fade>
            {text}
          </p>
        )}
      </div>
    </header>
  )
}

/** Divide un texto en palabras enmascaradas para la entrada del hero (CSS puro). */
export function Words({ text, from = 0 }: { text: string; from?: number }) {
  return text.split(' ').map((word, i) => (
    <span key={i}>
      <span className="w">
        <span style={{ '--i': from + i } as CSSProperties}>{word}</span>
      </span>{' '}
    </span>
  ))
}
