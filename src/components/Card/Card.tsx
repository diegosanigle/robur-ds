import type { ReactNode } from 'react'

export interface CardProps {
  /** `surface` es la tarjeta normal; `inverse` es la destacada oscura, máximo una por pantalla. */
  variant?: 'surface' | 'inverse'
  /** Espacio interior: `md` son 20 px y `lg` son 24 px, para la tarjeta destacada. */
  padding?: 'md' | 'lg'
  children: ReactNode
}

const VARIANTS = {
  surface: 'bg-surface text-primary',
  inverse: 'bg-inverse text-on-inverse',
}

const PADDINGS = { md: 'p-5', lg: 'p-6' }

export function Card({ variant = 'surface', padding = 'md', children }: CardProps) {
  return <div className={`rounded-lg ${PADDINGS[padding]} ${VARIANTS[variant]}`}>{children}</div>
}
