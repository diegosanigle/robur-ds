import { Button, Input } from './index'

/** Página de prueba local. El escaparate real del sistema es Storybook. */
export default function App() {
  return (
    <main className="mx-auto flex max-w-sm flex-col gap-4 p-5">
      <h1 className="text-2xl font-extrabold tracking-tight">Robur DS</h1>
      <Input label="Peso (kg)" numeric placeholder="0" />
      <Button fullWidth>Guardar sesión</Button>
    </main>
  )
}
