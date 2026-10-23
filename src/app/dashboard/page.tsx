import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { DemoNotice } from "@/components/ui/demo-notice";
import { EmptyState } from "@/components/ui/empty-state";
import { PageHeader } from "@/components/ui/page-header";
import { SectionCard } from "@/components/ui/section-card";
import { StatCard } from "@/components/ui/stat-card";
import {
  demoApplications,
  demoPipeline,
  demoStats,
  demoUser,
  demoWeeklyActivity,
} from "@/lib/demo/data";

export const metadata: Metadata = { title: "Tableau de bord" };

const STATUS_TONES = {
  Entretien: "success",
  Réponse: "info",
  Envoyée: "info",
  Refus: "danger",
  Brouillon: "neutral",
} as const;

export default function DashboardPage() {
  const maxActivity = Math.max(...demoWeeklyActivity.map((day) => day.qualified + day.sent));

  return (
    <div>
      <PageHeader
        title={`Bonjour ${demoUser.firstName}`}
        description="Vue d'ensemble de votre recherche : offres qualifiées, candidatures, réponses et prochaines actions."
        actions={
          <>
            <ButtonLink href="/offres" variant="secondary">
              Voir les offres
            </ButtonLink>
            <ButtonLink href="/candidatures">Suivre les candidatures</ButtonLink>
          </>
        }
      />

      <DemoNotice />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {demoStats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <SectionCard
          title="Pipeline de candidatures"
          description="Statuts normalisés, mis à jour manuellement au Sprint 8."
          action={<ButtonLink href="/candidatures" variant="secondary">Ouvrir le pipeline</ButtonLink>}
        >
          <ul className="grid gap-2 sm:grid-cols-2">
            {demoPipeline.map((item) => (
              <li
                key={item.status}
                className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2"
              >
                <span className="text-sm text-slate-700">{item.status}</span>
                <Badge tone={item.tone}>{item.count}</Badge>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard
          title="Activité de la semaine"
          description="Données fictives, en attente des statistiques réelles (Sprint 12)."
        >
          <ul className="space-y-3">
            {demoWeeklyActivity.map((day) => (
              <li key={day.day} className="flex items-center gap-3 text-xs">
                <span className="w-8 shrink-0 text-slate-500">{day.day}</span>
                <div className="flex h-2 flex-1 gap-1 overflow-hidden rounded-full bg-slate-100">
                  <span
                    className="h-full rounded-l-full bg-emerald-600"
                    style={{ width: `${(day.qualified / maxActivity) * 100}%` }}
                  />
                  <span
                    className="h-full bg-sky-500"
                    style={{ width: `${(day.sent / maxActivity) * 100}%` }}
                  />
                </div>
                <span className="w-16 shrink-0 text-right text-slate-500">
                  {day.qualified + day.sent} actions
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex gap-4 border-t border-slate-100 pt-3 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <span aria-hidden="true" className="size-2 rounded-full bg-emerald-600" /> Qualifiées
            </span>
            <span className="flex items-center gap-1.5">
              <span aria-hidden="true" className="size-2 rounded-full bg-sky-500" /> Envoyées
            </span>
          </div>
        </SectionCard>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <SectionCard
          title="Candidatures récentes"
          description="Dernières activités du pipeline."
          action={<ButtonLink href="/candidatures" variant="secondary">Tout voir</ButtonLink>}
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[540px] text-left text-sm">
              <caption className="sr-only">Liste des candidatures récentes de démonstration</caption>
              <thead>
                <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
                  <th scope="col" className="pb-2 font-semibold">Offre</th>
                  <th scope="col" className="pb-2 font-semibold">Entreprise</th>
                  <th scope="col" className="pb-2 font-semibold">Statut</th>
                  <th scope="col" className="pb-2 font-semibold">Date</th>
                </tr>
              </thead>
              <tbody>
                {demoApplications.slice(0, 4).map((application) => (
                  <tr key={application.id} className="border-b border-slate-100 last:border-0">
                    <td className="py-2.5 pr-3 font-medium text-slate-800">{application.offer}</td>
                    <td className="py-2.5 pr-3 text-slate-600">{application.company}</td>
                    <td className="py-2.5 pr-3">
                      <Badge tone={STATUS_TONES[application.status as keyof typeof STATUS_TONES] ?? "neutral"}>
                        {application.status}
                      </Badge>
                    </td>
                    <td className="py-2.5 text-slate-500">{application.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        <SectionCard
          title="Prochaines actions"
          description="Priorités proposées, sans envoi automatique."
        >
          <ul className="space-y-3">
            <li className="rounded-lg border border-slate-200 p-3">
              <p className="text-sm font-medium text-slate-800">Relire 3 brouillons</p>
              <p className="mt-0.5 text-xs text-slate-500">Contrôle qualité avant planification.</p>
              <Link href="/candidatures" className="mt-2 inline-flex text-xs font-semibold text-emerald-700 hover:underline">
                Ouvrir les brouillons
              </Link>
            </li>
            <li className="rounded-lg border border-slate-200 p-3">
              <p className="text-sm font-medium text-slate-800">Compléter le profil à 100 %</p>
              <p className="mt-0.5 text-xs text-slate-500">Objectif actuel : 72 %. Données à confirmer.</p>
              <Link href="/profil" className="mt-2 inline-flex text-xs font-semibold text-emerald-700 hover:underline">
                Vérifier le profil
              </Link>
            </li>
          </ul>
          <div className="mt-4">
            <EmptyState
              title="Aucune relance planifiée"
              description="Les relances seront disponibles après l'intégration de la messagerie (Sprint 11)."
            />
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
