export default function ErrorView({ message }: { message?: string }) {
  return (
    <div className="my-6 rounded-lg border border-red-300/60 bg-red-50 p-4 text-red-800 dark:border-red-900/60 dark:bg-red-950">
      <div className="font-semibold">Ошибка</div>
      <div className="text-sm opacity-90">{message ?? 'Что-то пошло не так'}</div>
    </div>
  )
}
