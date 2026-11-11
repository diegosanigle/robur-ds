import { Card } from '../../components/Card'
import { StatCard } from '../../components/StatCard'
import { Tabs } from '../../components/Tabs'
import { EmptyState } from '../../patterns/EmptyState'

const PERIODS = [
  { value: 'semana', label: 'Semana' },
  { value: 'mes', label: 'Mes' },
  { value: 'ano', label: 'Año' },
]

export interface HistoryProps {
  /** Periodo que se está viendo. */
  period: string
  /** Se llama con el periodo elegido. */
  onPeriodChange: (period: string) => void
  /** Las tres cifras del periodo, ya formateadas. */
  summary: { sessions: string; volume: string; maxWeight: string }
  /** Las sesiones del periodo, de la más reciente a la más antigua. */
  sessions: { id: string; date: string; dayType: string; detail: string }[]
  /** Se llama al pulsar la acción del estado vacío. */
  onLogSession: () => void
}

export function History({ period, onPeriodChange, summary, sessions, onLogSession }: HistoryProps) {
  return (
    <main className="mx-auto flex max-w-120 flex-col gap-8 px-5 py-6">
      <h1 className="text-h1 text-primary">Historial</h1>
      <Tabs label="Periodo" tabs={PERIODS} value={period} onChange={onPeriodChange}>
        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <StatCard variant="inverse" label="Sesiones" value={summary.sessions} />
            </div>
            <StatCard label="Volumen" value={summary.volume} unit="kg" />
            <StatCard label="Peso máximo" value={summary.maxWeight} unit="kg" />
          </div>
          {sessions.length ? (
            <ul className="flex flex-col gap-4">
              {sessions.map((session) => (
                <li key={session.id}>
                  <Card>
                    <p className="text-label uppercase text-tertiary">{session.date}</p>
                    <p className="mt-1 text-title">{session.dayType}</p>
                    <p className="text-sm text-secondary">{session.detail}</p>
                  </Card>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState
              title="Aún no hay sesiones en este periodo"
              description="Cuando registres una, aparecerá aquí."
              actionLabel="Registrar sesión"
              onAction={onLogSession}
            />
          )}
        </div>
      </Tabs>
    </main>
  )
}
