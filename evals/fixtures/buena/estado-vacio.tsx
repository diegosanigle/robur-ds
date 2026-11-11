import { EmptyState } from 'robur-ds'

export function EmptyWeek({ onAdd }: { onAdd: () => void }) {
  return (
    <EmptyState
      title="Aún no hay sesiones esta semana"
      description="Cuando registres una, aparecerá aquí."
      actionLabel="Registrar sesión"
      onAction={onAdd}
    />
  )
}
