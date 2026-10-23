import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { DemoNotice } from "@/components/ui/demo-notice";
import { EmptyState } from "@/components/ui/empty-state";
import { PageHeader } from "@/components/ui/page-header";
import { SectionCard } from "@/components/ui/section-card";
import { demoCompanies } from "@/lib/demo/data";

export const metadata: Metadata = { title: "Entreprises" };

export default function EntreprisesPage() {
  return (
    <div>
      <PageHeader
        title="Entreprises"
        description="Entreprises pertinentes pour une candidature spontanée, à partir de sources autorisées. Aucun envoi n'est déclenché depuis cette page."
        actions={
          <>
            <ButtonLink href="/offres" variant="secondary">Voir les offres</ButtonLink>
            <ButtonLink href="/candidatures">Préparer un brouillon</ButtonLink>
          </>
        }
      />

      <DemoNotice>
        Les entreprises, contacts et motifs sont fictifs. Une adresse professionnelle publique ne
        vaut pas autorisation d&apos;envoi : les règles seront vérifiées au Sprint 10.
      </DemoNotice>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {demoCompanies.map((company) => (
          <article
            key={company.name}
            className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-base font-semibold text-slate-900">{company.name}</h2>
                <p className="mt-1 text-xs text-slate-500">
                  {company.sector} · {company.size}
                </p>
              </div>
              <Badge tone={company.contactStatus === "À qualifier" ? "warning" : "info"}>
                {company.contactStatus}
              </Badge>
            </div>
            <p className="mt-3 text-sm text-slate-600">{company.reason}</p>
            <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4 text-xs text-slate-500">
              <span>{company.location}</span>
              <span>Source : démonstration</span>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-6">
        <SectionCard
          title="À qualifier avant contact"
          description="Les contacts non vérifiés restent séparés des données confirmées."
        >
          <EmptyState
            title="Aucun contact en attente de vérification"
            description="La recherche d'entreprises et la vérification des contacts seront branchées sur des sources autorisées au Sprint 4."
          />
        </SectionCard>
      </div>
    </div>
  );
}
