import type { Meta, StoryObj } from '@storybook/react-vite'
import history from '../../metrics/history.json'
import metrics from '../../metrics/latest.json'
import { Card, StatCard } from '..'

const meta = {
  title: 'Datos/Métricas',
  parameters: { layout: 'padded' },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="flex flex-col gap-4">
    <h2 className="text-h3 text-primary">{title}</h2>
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">{children}</div>
  </section>
)

const number = (value: number | null | undefined) => (value === null || value === undefined ? '—' : value.toLocaleString('es-ES'))

/** La última medición del sistema. Se actualiza con `npm run metrics`; ningún número se escribe a mano. */
export const Resumen: Story = {
  render: () => (
    <div className="flex max-w-240 flex-col gap-8">
      <p className="text-sm text-tertiary">Medición del {metrics.date}</p>
      <Section title="Tamaño del sistema">
        <StatCard variant="inverse" label="Componentes" value={number(metrics.system.components)} />
        <StatCard label="Patrones" value={number(metrics.system.patterns)} />
        <StatCard label="Tokens semánticos" value={number(metrics.system.semanticTokens)} />
        <StatCard label="Stories con test" value={number(metrics.system.stories)} />
      </Section>
      <Section title="Coherencia">
        <StatCard label="Piezas con contrato" value={number(metrics.coverage.contracts)} unit="%" />
        <StatCard label="Props documentadas" value={number(metrics.coverage.documentedProps)} unit="%" />
        <StatCard label="Paridad con Figma" value={number(metrics.coverage.figmaParity)} unit="%" />
        <StatCard label="Antigüedad de la foto de Figma" value={number(metrics.coverage.figmaSnapshotAgeDays)} unit="días" />
      </Section>
      <Section title="Accesibilidad">
        <StatCard label="Parejas de contraste comprobadas" value={number(metrics.accessibility.contrastPairs)} />
        <StatCard label="Margen de la pareja más justa" value={number(metrics.accessibility.tightestPair.margin)} unit="×" />
      </Section>
      <Section title="Evals: ¿usa bien el agente el sistema?">
        {metrics.evals ? (
          Object.entries(metrics.evals)
            .filter(([, value]) => typeof value === 'object')
            .map(([name, value]) => <StatCard key={name} label={name} value={number((value as { rate: number }).rate)} unit="%" />)
        ) : (
          <div className="col-span-2">
            <Card>
              <p className="text-title">Aún no se han ejecutado</p>
              <p className="text-sm text-secondary">Se ejecutan con npm run evals y aparecen aquí en la siguiente medición.</p>
            </Card>
          </div>
        )}
      </Section>
      {metrics.app ? (
        <Section title="La app: interfaz que sigue fuera del sistema">
          <StatCard label="Ficheros que usan el sistema" value={`${number(metrics.app.filesUsingSystem)} de ${number(metrics.app.files)}`} />
          <StatCard label="Controles dibujados a mano" value={number(metrics.app.rawControls)} />
          <StatCard label="Clases fuera del sistema" value={number(metrics.app.classesOutsideSystem)} />
          <StatCard label="Colores y valores a mano" value={number(metrics.app.hexColors + metrics.app.arbitraryValues)} />
        </Section>
      ) : null}
      <section className="flex flex-col gap-4">
        <h2 className="text-h3 text-primary">Historial</h2>
        <Card>
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-tertiary">
                <th className="pb-2 font-semibold">Fecha</th>
                <th className="pb-2 font-semibold">Componentes</th>
                <th className="pb-2 font-semibold">Stories</th>
                <th className="pb-2 font-semibold">Paridad</th>
                <th className="pb-2 font-semibold">Evals con MCP</th>
                <th className="pb-2 font-semibold">Controles a mano en la app</th>
              </tr>
            </thead>
            <tbody className="tabular-nums">
              {history.map((row) => (
                <tr key={row.date}>
                  <td className="py-1">{row.date}</td>
                  <td>{number(row.components)}</td>
                  <td>{number(row.stories)}</td>
                  <td>{number(row.figmaParity)} %</td>
                  <td>{row.evalsWithMcp === null ? '—' : `${row.evalsWithMcp} %`}</td>
                  <td>{number(row.appRawControls)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </section>
    </div>
  ),
}
