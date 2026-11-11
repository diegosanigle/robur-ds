import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, fn, userEvent, waitFor, within } from 'storybook/test'
import { Button } from '../Button'
import { Sheet } from './Sheet'

const meta = {
  title: 'Componentes/Sheet',
  component: Sheet,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  args: {
    open: true,
    onClose: fn(),
    title: 'Semana 14',
    children: <p className="text-body">Tres sesiones: empuje, tirón y pierna.</p>,
  },
  decorators: [(Story) => <div className="min-h-80 p-5"><Story /></div>],
} satisfies Meta<typeof Sheet>

export default meta
type Story = StoryObj<typeof meta>

export const Open: Story = {}

/** Comprueba el ciclo completo: se abre desde un botón, se cierra y el foco vuelve al botón que la abrió. */
export const Interaccion: Story = {
  args: { open: false },
  render: function Render(args) {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button onClick={() => setOpen(true)}>Ver semana</Button>
        <Sheet {...args} open={open} onClose={() => setOpen(false)} />
      </>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole('button', { name: 'Ver semana' })
    await userEvent.click(trigger)
    const sheet = canvas.getByRole('dialog', { name: 'Semana 14' })
    await expect(sheet).toBeVisible()
    await userEvent.click(canvas.getByRole('button', { name: 'Cerrar' }))
    await waitFor(() => expect(sheet).not.toBeVisible())
    await expect(trigger).toHaveFocus()
  },
}
