import { Card } from '../Card'

export interface StatCardProps {
  /** Qué mide la cifra. */
  label: string
  /** La cifra, ya formateada. */
  value: string
  /** Unidad, junto a la cifra y más pequeña. */
  unit?: string
  /** `surface` es la tarjeta normal; `inverse` es la destacada oscura, máximo una por pantalla. */
  variant?: 'surface' | 'inverse'
  /** Color de la cifra en la variante `inverse`: serie principal o segunda serie. */
  series?: 'primary' | 'secondary'
}

const SERIES = { primary: 'text-data-1', secondary: 'text-data-2' }

export function StatCard({ label, value, unit, variant = 'surface', series = 'primary' }: StatCardProps) {
  const inverse = variant === 'inverse'
  return (
    <Card variant={variant}>
      <p className={`text-label uppercase ${inverse ? 'text-on-inverse-muted' : 'text-tertiary'}`}>{label}</p>
      <p className={`mt-2 text-h1 tabular-nums ${inverse ? SERIES[series] : ''}`}>
        {value}
        {unit ? <span className={`ml-1 text-title ${inverse ? 'text-on-inverse-muted' : 'text-tertiary'}`}>{unit}</span> : null}
      </p>
    </Card>
  )
}
