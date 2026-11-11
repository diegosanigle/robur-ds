import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, fn, userEvent, within } from 'storybook/test'
import { Tabs } from './Tabs'

const TABS = [
  { value: 'semana', label: 'Semana' },
  { value: 'mes', label: 'Mes' },
  { value: 'ano', label: 'Año' },
]

const meta = {
  title: 'Componentes/Tabs',
  component: Tabs,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: { label: 'Periodo', tabs: TABS, value: 'semana', onChange: fn() },
  decorators: [(Story) => <div className="w-80"><Story /></div>],
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const DosPestanas: Story = { args: { tabs: TABS.slice(0, 2) } }

export const ConContenido: Story = { args: { children: <p className="text-body">Tres sesiones esta semana.</p> } }

/** Comprueba el uso con teclado: la flecha derecha pasa a la pestaña siguiente y le da el foco. */
export const Interaccion: Story = {
  render: function Render(args) {
    const [value, setValue] = useState('semana')
    return (
      <Tabs {...args} value={value} onChange={setValue}>
        <p className="text-body">Periodo: {value}</p>
      </Tabs>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('tab', { name: 'Semana' }))
    await userEvent.keyboard('{ArrowRight}')
    const mes = canvas.getByRole('tab', { name: 'Mes' })
    await expect(mes).toHaveAttribute('aria-selected', 'true')
    await expect(mes).toHaveFocus()
    await expect(canvas.getByRole('tabpanel')).toHaveTextContent('Periodo: mes')
  },
}
