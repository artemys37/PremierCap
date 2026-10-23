import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { DemoNotice } from "@/components/ui/demo-notice";
import { EmptyState } from "@/components/ui/empty-state";
import { PageHeader } from "@/components/ui/page-header";
import { SectionCard } from "@/components/ui/section-card";
import { demoApplications, demoPipeline } from "@/lib/demo/data";

export const metadata: Metadata = { title: "Candidatures" };

const STATUS_TONES = {
  "À qualifier": "neutral",
  Brouillon: "neutral",
  Planifiée: "warning",
  Envoyée: "info",
  Réponse: "info",
  Entretien: "success",
  Refus: "danger",
  Clôturée: "neutral",
} as const;

export default function CandidaturesPage() {
  return (
    <div>
      <PageHeader
        title="Candidatures"
        description="Pipeline, historique et relances. Un statut ne remplace jamais une réponse réelle : les mises à jour ambiguës restent à vérifier."
        actions={
          <>
            <ButtonLink href="/offres" variant="secondary">Choisir une offre</ButtonLink>
            <ButtonLink href="/automatisations">Configurer les automatisations</ButtonLink>
          </>
        }
      />

      <DemoNotice>
        Le pipeline ci-dessous est fictif. Aucun message n&apos;a été envoyé et aucune relance n&apos;est
        programmée.
      </DemoNotice>

      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4 xl:grid-cols-8">
        {demoPipeline.map((item) => (
          <div key={item.status} className="rounded-xl border border-slate-200 bg-white px-3 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              {item.status}
            </p>
            <p className="mt-1 text-xl font-semibold text-slate-900">{item.count}</p>
          </div>
        ))}
      </div>

      <SectionCard
        title="Toutes les candidatures"
        description="Déduplication par candidat, entreprise, offre, canal et période (Sprint 8)."
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <caption className="sr-only">Candidatures de démonstration et leur dernier événement</caption>
            <thead>
              <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
                <th scope="col" className="pb-2 pr-3 font-semibold">Offre</th>
                <th scope="col" className="pb-2 pr-3 font-semibold">Entreprise</th>
                <th scope="col" className="pb-2 pr-3 font-semibold">Statut</th>
                <th scope="col" className="pb-2 pr-3 font-semibold">Date</th>
                <th scope="col" className="pb-2 font-semibold">Dernier événement</th>
              </tr>
            </thead>
            <tbody>
              {demoApplications.map((application) => (
                <tr key={application.id} className="border-b border-slate-100 last:border-0">
                  <td className="py-3 pr-3 font-medium text-slate-800">{application.offer}</td>
                  <td className="py-3 pr-3 text-slate-600">{application.company}</td>
                  <td className="py-3 pr-3">
                    <Badge tone={STATUS_TONES[application.status]}>{application.status}</Badge>
                  </td>
                  <td className="py-3 pr-3 text-slate-500">{application.date}</td>
                  <td className="py-3 text-slate-600">{application.lastEvent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs text-slate-500">
          Saisie manuelle des réponses, entretiens et refus disponible au Sprint 8. Les relances
          seront annulées après réponse, rebond, refus ou opposition.
        </p>
      </SectionCard>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <SectionCard
          title="Relances en attente"
          description="Une relance ne part jamais sans contrôle serveur des règles et des quotas."
        >
          <EmptyState
            title="Aucune relance planifiée"
            description="La messagerie et les relances seront activées aux Sprints 9 et 11, après validation des règles."
          />
        </SectionCard>

        <SectionCard
          title="À vérifier manuellement"
          description="Les cas ambigus ne sont jamais classés automatiquement."
        >
          <EmptyState
            title="Aucun cas ambigu"
            description="Les réponses ambiguës apparaîtront ici avec un niveau de confiance à valider (Sprint 11)."
          />
        </SectionCard>
      </div>
    </div>
  );
}
