import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button, Card, Checkbox, Chip, ExerciseRow, HeatmapCell, Input, StatCard, Tabs } from '..'

const meta = {
  title: 'Resumen/Todos los componentes',
  parameters: { layout: 'fullscreen' },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const noop = () => {}

function Sampler() {
  return (
    <div className="flex flex-col gap-4 bg-page p-5 text-primary">
      <h2 className="text-h2">Tu semana</h2>
      <Tabs label="Periodo" value="semana" onChange={noop} tabs={[{ value: 'semana', label: 'Semana' }, { value: 'mes', label: 'Mes' }]} />
      <div className="grid grid-cols-2 gap-4">
        <StatCard label="Sesiones" value="3" />
        <StatCard variant="inverse" label="Volumen" value="2.480" unit="kg" />
        <StatCard variant="inverse" series="secondary" label="Peso máximo" value="62,5" unit="kg" />
        <Card>
          <p className="text-title">Descanso</p>
          <p className="text-sm text-tertiary">Sin sesiones previstas.</p>
        </Card>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {[0, 1, 2, 3, 4].map((sessions) => (
          <HeatmapCell key={sessions} week={10 + sessions} sessions={sessions} />
        ))}
        <HeatmapCell week={15} sessions={0} rest />
        <HeatmapCell week={16} sessions={2} current />
      </div>
      <div className="flex gap-2">
        <Chip selected>Empuje</Chip>
        <Chip>Tirón</Chip>
        <Chip variant="accent">Nuevo</Chip>
      </div>
      <ExerciseRow name="Press de hombro" target="3 series × 12 reps" completed onCompletedChange={noop}>
        <Input numeric label="Series" defaultValue="3" />
        <Input numeric label="Reps" defaultValue="12" />
        <Input numeric label="Peso (kg)" defaultValue="20" />
      </ExerciseRow>
      <Checkbox label="Plancha" hint="60 s" />
      <Input label="Notas" hint="Opcional." placeholder="Cómo te has sentido" />
      <Input label="Nombre" error="Escribe un nombre para el ejercicio." />
      <div className="flex flex-wrap gap-2">
        <Button>Guardar sesión</Button>
        <Button variant="secondary">Cancelar</Button>
        <Button variant="danger">Borrar sesión</Button>
      </div>
    </div>
  )
}

/**
 * Todos los componentes en los dos temas a la vez.
 * Sirve para ver el sistema de un vistazo y para que los tests de accesibilidad cubran también el tema oscuro.
 */
export const ClaroYOscuro: Story = {
  render: () => (
    <div className="grid md:grid-cols-2">
      <div data-theme="light">
        <Sampler />
      </div>
      <div data-theme="dark">
        <Sampler />
      </div>
    </div>
  ),
}
