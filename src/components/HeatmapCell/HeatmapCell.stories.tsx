import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, within } from 'storybook/test'
import { HeatmapCell } from './HeatmapCell'

const meta = {
  title: 'Componentes/HeatmapCell',
  component: HeatmapCell,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: { week: 14, sessions: 3 },
  decorators: [(Story) => <div className="grid w-64 grid-cols-7 gap-1"><Story /></div>],
} satisfies Meta<typeof HeatmapCell>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const SinSesiones: Story = { args: { sessions: 0 } }

export const Rest: Story = { args: { rest: true, sessions: 0 } }

export const Current: Story = { args: { current: true } }

/** Los cinco niveles, el descanso y la semana en curso. Comprueba que cada celda dice su dato en texto. */
export const Niveles: Story = {
  render: () => (
    <>
      {[0, 1, 2, 3, 4].map((sessions) => (
        <HeatmapCell key={sessions} week={10 + sessions} sessions={sessions} />
      ))}
      <HeatmapCell week={15} sessions={0} rest />
      <HeatmapCell week={16} sessions={2} current />
    </>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole('button', { name: 'Semana 11, 1 sesión' })).toBeVisible()
    await expect(canvas.getByRole('button', { name: 'Semana 15, descanso' })).toBeVisible()
    await expect(canvas.getByRole('button', { name: 'Semana 16, 2 sesiones, semana actual' })).toBeVisible()
  },
}
