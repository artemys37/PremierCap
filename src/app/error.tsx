"use client";

export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="mx-auto max-w-xl rounded-2xl border border-rose-200 bg-white p-8 text-center shadow-sm">
      <h1 className="text-lg font-semibold text-slate-900">Une erreur est survenue</h1>
      <p className="mt-2 text-sm text-slate-600">
        La page n&apos;a pas pu être affichée. Aucune candidature n&apos;a été envoyée.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-5 rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800"
      >
        Réessayer
      </button>
    </div>
  );
}
