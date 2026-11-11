import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, fn, userEvent, within } from 'storybook/test'
import { EmptyState } from './EmptyState'

const meta = {
  title: 'Patrones/EmptyState',
  component: EmptyState,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: {
    title: 'Aún no hay sesiones esta semana',
    description: 'Cuando registres una, aparecerá aquí.',
    actionLabel: 'Registrar sesión',
    onAction: fn(),
  },
  decorators: [(Story) => <div className="w-96"><Story /></div>],
} satisfies Meta<typeof EmptyState>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const SinAccion: Story = {
  args: { title: 'Ningún ejercicio coincide', description: 'Prueba con otro nombre.', actionLabel: undefined },
}

/** Comprueba que la acción se puede pulsar y avisa. */
export const Interaccion: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole('heading', { name: 'Aún no hay sesiones esta semana' })).toBeVisible()
    await userEvent.click(canvas.getByRole('button', { name: 'Registrar sesión' }))
    await expect(args.onAction).toHaveBeenCalledOnce()
  },
}
