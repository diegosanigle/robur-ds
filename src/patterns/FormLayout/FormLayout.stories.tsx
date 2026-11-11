import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, fn, userEvent, within } from 'storybook/test'
import { Input } from '../../components/Input'
import { FormLayout } from './FormLayout'

const meta = {
  title: 'Patrones/FormLayout',
  component: FormLayout,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: {
    title: 'Nuevo ejercicio',
    submitLabel: 'Guardar ejercicio',
    cancelLabel: 'Cancelar',
    onSubmit: fn(),
    onCancel: fn(),
    children: (
      <>
        <Input label="Nombre" placeholder="Press de hombro" />
        <Input label="Series" numeric placeholder="0" />
        <Input label="Repeticiones" numeric placeholder="0" />
      </>
    ),
  },
  decorators: [(Story) => <div className="w-96"><Story /></div>],
} satisfies Meta<typeof FormLayout>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const ConError: Story = {
  args: {
    children: (
      <>
        <Input label="Nombre" error="Escribe un nombre para el ejercicio." />
        <Input label="Series" numeric defaultValue="3" />
      </>
    ),
  },
}

export const Enviando: Story = { args: { submitting: true } }

/** Comprueba que el formulario se envía con la tecla Intro desde un campo. */
export const Interaccion: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    await userEvent.type(canvas.getByLabelText('Nombre'), 'Sentadilla{Enter}')
    await expect(args.onSubmit).toHaveBeenCalledOnce()
  },
}
