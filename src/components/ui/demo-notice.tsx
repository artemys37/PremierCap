import type { ReactNode } from "react";

export function DemoNotice({ children }: { children?: ReactNode }) {
  return (
    <div
      role="note"
      className="mb-6 flex flex-col gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 sm:flex-row sm:items-center sm:justify-between"
    >
      <p>
        <span className="font-semibold">Données de démonstration.</span>{" "}
        {children ?? "Les informations affichées sont fictives et ne proviennent d'aucun candidat réel."}
      </p>
      <span className="inline-flex w-fit shrink-0 rounded-full bg-amber-200 px-2.5 py-0.5 text-xs font-semibold text-amber-900">
        Aucune donnée réelle
      </span>
    </div>
  );
}
