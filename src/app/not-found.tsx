import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Erreur 404</p>
      <h1 className="mt-2 text-lg font-semibold text-slate-900">Page introuvable</h1>
      <p className="mt-2 text-sm text-slate-600">
        Cette page n&apos;existe pas ou a été déplacée.
      </p>
      <Link
        href="/dashboard"
        className="mt-5 inline-flex rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800"
      >
        Retour au tableau de bord
      </Link>
    </div>
  );
}
