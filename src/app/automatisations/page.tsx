import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { DemoNotice } from "@/components/ui/demo-notice";
import { EmptyState } from "@/components/ui/empty-state";
import { PageHeader } from "@/components/ui/page-header";
import { SectionCard } from "@/components/ui/section-card";
import { demoAutomation } from "@/lib/demo/data";

export const metadata: Metadata = { title: "Automatisations" };

const RULES = [
  { label: "Plafond quotidien", value: `${demoAutomation.dailyLimit} candidatures` },
  { label: "Délai minimum entre deux envois", value: `${demoAutomation.minDelayHours} h` },
  { label: "Horaires autorisés", value: demoAutomation.window },
  { label: "Seuil de matching", value: `${demoAutomation.matchThreshold}/100` },
  { label: "Maximum de relances", value: `${demoAutomation.maxFollowUps}` },
];

export default function AutomatisationsPage() {
  return (
    <div>
      <PageHeader
        title="Automatisations"
        description="Mode automatique désactivé par défaut. Toute activation exige des règles visibles, un test contrôlé et une validation explicite."
        actions={<ButtonLink href="/candidatures" variant="secondary">Voir les candidatures</ButtonLink>}
      />

      <DemoNotice>
        Cette page présente des règles fictives. Aucune automatisation n&apos;est active et aucun envoi
        ne peut être déclenché depuis cette version.
      </DemoNotice>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-semibold text-slate-900">Envoi automatique</h2>
              <Badge tone="danger">Désactivé</Badge>
            </div>
            <p className="mt-1 max-w-2xl text-sm text-slate-600">
              Par défaut, chaque candidature doit être relue et validée manuellement. L&apos;activation
              ne sera possible qu&apos;après connexion d&apos;une adresse contrôlée et test d&apos;envoi (Sprint 10).
            </p>
          </div>
          <button
            type="button"
            disabled
            className="inline-flex cursor-not-allowed items-center justify-center rounded-lg bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-500"
            title="Disponible au Sprint 10"
          >
            Activer (Sprint 10)
          </button>
        </div>
      </section>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <SectionCard
          title="Conditions à remplir"
          description="L'activation reste bloquée tant qu'une condition n'est pas satisfaite."
        >
          <ul className="space-y-2">
            {demoAutomation.requirements.map((requirement) => (
              <li
                key={requirement.label}
                className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 px-3 py-2 text-sm"
              >
                <span className="text-slate-700">{requirement.label}</span>
                <Badge tone={requirement.done ? "success" : "warning"}>
                  {requirement.done ? "Validé" : "À faire"}
                </Badge>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard
          title="Règles configurées"
          description="Valeurs de démonstration, contrôlées côté serveur avant chaque envoi."
        >
          <dl className="divide-y divide-slate-100">
            {RULES.map((rule) => (
              <div key={rule.label} className="flex items-center justify-between gap-3 py-2.5 text-sm">
                <dt className="text-slate-600">{rule.label}</dt>
                <dd className="font-medium text-slate-900">{rule.value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-4 rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-500">
            Domaines exclus : {demoAutomation.excludedDomains.join(", ")}
          </div>
        </SectionCard>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <SectionCard
          title="Automatisations actives"
          description="Aucune tâche ne peut être créée tant que le mode automatique est désactivé."
        >
          <EmptyState
            title="Aucune automatisation active"
            description="Les règles, quotas et reprises seront implémentés au Sprint 10 avec tests de coupe-circuit."
          />
        </SectionCard>

        <SectionCard
          title="Arrêt d'urgence"
          description="Suspend les nouveaux envois et annule les relances en attente."
        >
          <button
            type="button"
            disabled
            className="inline-flex cursor-not-allowed items-center justify-center rounded-lg border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-400"
            title="Disponible au Sprint 10"
          >
            Arrêt d&apos;urgence (Sprint 10)
          </button>
          <p className="mt-3 text-xs text-slate-500">
            En l&apos;absence d&apos;automatisation active, aucun envoi n&apos;est en cours et aucune relance n&apos;est
            planifiée.
          </p>
        </SectionCard>
      </div>
    </div>
  );
}
