export default function Loading() {
  return (
    <div aria-busy="true" aria-live="polite" className="space-y-6">
      <span className="sr-only">Chargement de la page…</span>
      <div className="space-y-3">
        <div className="h-7 w-56 animate-pulse rounded-lg bg-slate-200" />
        <div className="h-4 w-full max-w-xl animate-pulse rounded bg-slate-200" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="h-32 animate-pulse rounded-2xl bg-slate-200" />
        ))}
      </div>
      <div className="h-72 animate-pulse rounded-2xl bg-slate-200" />
    </div>
  );
}
