import type { Meta, StoryObj } from '@storybook/react-vite'
import { Card } from './Card'

const meta = {
  title: 'Componentes/Card',
  component: Card,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: {
    children: (
      <>
        <p className="text-title">Tu semana</p>
        <p className="text-sm">Tres sesiones completadas.</p>
      </>
    ),
  },
  decorators: [(Story) => <div className="w-80"><Story /></div>],
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Surface: Story = {}

export const Inverse: Story = { args: { variant: 'inverse' } }

export const PaddingLg: Story = { args: { padding: 'lg' } }
