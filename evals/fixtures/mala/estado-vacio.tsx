export function EmptyWeek({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="flex flex-col items-center rounded-2xl bg-gray-50 p-8 text-center">
      <span className="text-4xl">😴</span>
      <h2 className="mt-4 text-lg font-semibold text-gray-900">¡Todavía no has entrenado esta semana!</h2>
      <p className="mt-1 text-sm text-gray-500">Te faltan 3 sesiones para cumplir tu objetivo.</p>
      <button onClick={onAdd} className="mt-6 rounded-full bg-[#FF3B00] px-6 py-3 text-white">
        Empezar ahora
      </button>
    </div>
  )
}
