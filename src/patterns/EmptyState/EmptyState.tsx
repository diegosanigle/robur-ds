import { Button } from '../../components/Button'

export interface EmptyStateProps {
  /** Qué habrá aquí. En neutro: nunca como un fallo de la persona. */
  title: string
  /** Una frase que dice cómo empezar. */
  description: string
  /** Texto del botón. Si no se pasa, no hay acción. */
  actionLabel?: string
  /** Se llama al pulsar el botón. */
  onAction?: () => void
}

export function EmptyState({ title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-2 px-5 py-8 text-center">
      <h2 className="text-h3 text-primary">{title}</h2>
      <p className="text-body text-secondary">{description}</p>
      {actionLabel ? (
        <div className="mt-4">
          <Button onClick={onAction}>{actionLabel}</Button>
        </div>
      ) : null}
    </div>
  )
}
