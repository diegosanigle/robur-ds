import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, fn, userEvent, within } from 'storybook/test'
import { History } from './History'

const SESSIONS = [
  { id: '1', date: 'Lun 9 nov', dayType: 'Empuje', detail: '5 ejercicios · 1.240 kg' },
  { id: '2', date: 'Mié 4 nov', dayType: 'Pierna', detail: '4 ejercicios · 1.860 kg' },
  { id: '3', date: 'Lun 2 nov', dayType: 'Tirón', detail: '5 ejercicios · 980 kg' },
]

const meta = {
  title: 'Pantallas/Historial',
  component: History,
  parameters: { layout: 'fullscreen' },
  args: {
    period: 'mes',
    onPeriodChange: fn(),
    onLogSession: fn(),
    summary: { sessions: '3', volume: '4.080', maxWeight: '62,5' },
    sessions: SESSIONS,
  },
} satisfies Meta<typeof History>

export default meta
type Story = StoryObj<typeof meta>

export const ConSesiones: Story = {}

export const SinSesiones: Story = {
  args: { period: 'semana', summary: { sessions: '0', volume: '0', maxWeight: '0' }, sessions: [] },
}

/** Comprueba que se puede cambiar de periodo y que un periodo sin sesiones ofrece registrar una. */
export const CambioDePeriodo: Story = {
  render: function Render(args) {
    const [period, setPeriod] = useState('mes')
    const empty = period === 'semana'
    return (
      <History
        {...args}
        period={period}
        onPeriodChange={setPeriod}
        sessions={empty ? [] : SESSIONS}
        summary={empty ? { sessions: '0', volume: '0', maxWeight: '0' } : args.summary}
      />
    )
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('tab', { name: 'Semana' }))
    await userEvent.click(canvas.getByRole('button', { name: 'Registrar sesión' }))
    await expect(args.onLogSession).toHaveBeenCalledOnce()
  },
}
