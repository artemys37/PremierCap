import type { Metadata } from "next";
import { DemoNotice } from "@/components/ui/demo-notice";
import { PageHeader } from "@/components/ui/page-header";
import { SectionCard } from "@/components/ui/section-card";
import { StatCard } from "@/components/ui/stat-card";
import { demoSourceStats, demoStats } from "@/lib/demo/data";

export const metadata: Metadata = { title: "Statistiques" };

const SECTIONS = [
  "Volumes par source et par campagne",
  "Réponses, entretiens, refus et délais",
  "Données manquantes et dénominateurs affichés",
  "Export CSV/JSON (Sprint 12)",
];

export default function StatistiquesPage() {
  const totals = demoSourceStats.reduce(
    (accumulator, source) => ({
      offers: accumulator.offers + source.offers,
      applications: accumulator.applications + source.applications,
      replies: accumulator.replies + source.replies,
      interviews: accumulator.interviews + source.interviews,
    }),
    { offers: 0, applications: 0, replies: 0, interviews: 0 },
  );

  return (
    <div>
      <PageHeader
        title="Statistiques"
        description="Mesures descriptives uniquement. Aucune causalité n'est déduite et aucun résultat n'est garanti."
      />

      <DemoNotice>
        Les chiffres ci-dessous sont fictifs et servent à valider la mise en page du Sprint 1.
      </DemoNotice>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {demoStats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <SectionCard
          title="Par source"
          description="Chaque ligne affiche ses propres dénominateurs. Les sources de démonstration ne sont pas des données réelles."
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-sm">
              <caption className="sr-only">Statistiques de démonstration par source</caption>
              <thead>
                <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
                  <th scope="col" className="pb-2 pr-3 font-semibold">Source</th>
                  <th scope="col" className="pb-2 pr-3 text-right font-semibold">Offres</th>
                  <th scope="col" className="pb-2 pr-3 text-right font-semibold">Candidatures</th>
                  <th scope="col" className="pb-2 pr-3 text-right font-semibold">Réponses</th>
                  <th scope="col" className="pb-2 text-right font-semibold">Entretiens</th>
                </tr>
              </thead>
              <tbody>
                {demoSourceStats.map((source) => (
                  <tr key={source.source} className="border-b border-slate-100 last:border-0">
                    <td className="py-2.5 pr-3 font-medium text-slate-800">{source.source}</td>
                    <td className="py-2.5 pr-3 text-right text-slate-600">{source.offers}</td>
                    <td className="py-2.5 pr-3 text-right text-slate-600">{source.applications}</td>
                    <td className="py-2.5 pr-3 text-right text-slate-600">{source.replies}</td>
                    <td className="py-2.5 text-right text-slate-600">{source.interviews}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="text-sm font-semibold text-slate-900">
                  <th scope="row" className="pt-3 text-left">Total démo</th>
                  <td className="pt-3 text-right">{totals.offers}</td>
                  <td className="pt-3 text-right">{totals.applications}</td>
                  <td className="pt-3 text-right">{totals.replies}</td>
                  <td className="pt-3 text-right">{totals.interviews}</td>
                </tr>
              </tfoot>
            </table>
          </div>
          <p className="mt-4 text-xs text-slate-500">
            Taux de réponse global : {totals.replies} réponses sur {totals.applications} candidatures
            envoyées, soit {Math.round((totals.replies / totals.applications) * 100)} %. Ce taux ne
            mesure ni la qualité d&apos;une candidature ni une probabilité de recrutement.
          </p>
        </SectionCard>

        <SectionCard title="À venir" description="Ces blocs seront alimentés par des calculs testés.">
          <ul className="space-y-2 text-sm text-slate-600">
            {SECTIONS.map((section) => (
              <li key={section} className="flex items-start gap-2 rounded-lg border border-slate-200 px-3 py-2">
                <span aria-hidden="true" className="mt-0.5 text-slate-400">•</span>
                {section}
              </li>
            ))}
          </ul>
          <div className="mt-4 rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-500">
            Les périodes sélectionnables et les taux par campagne seront ajoutés au Sprint 12.
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
