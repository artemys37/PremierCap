import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { DemoNotice } from "@/components/ui/demo-notice";
import { EmptyState } from "@/components/ui/empty-state";
import { PageHeader } from "@/components/ui/page-header";
import { ScoreBar } from "@/components/ui/score-bar";
import { SectionCard } from "@/components/ui/section-card";
import { demoOffers, demoUser } from "@/lib/demo/data";

export const metadata: Metadata = { title: "Offres" };

export default function OffresPage() {
  return (
    <div>
      <PageHeader
        title="Offres"
        description={`Offres publiées issues de sources autorisées, avec score explicable et provenance. Seuil de matching : 70/100 pour ${demoUser.firstName}.`}
        actions={
          <>
            <ButtonLink href="/entreprises" variant="secondary">
              Voir les entreprises
            </ButtonLink>
            <ButtonLink href="/candidatures">Préparer une candidature</ButtonLink>
          </>
        }
      />

      <DemoNotice>
        Les offres ci-dessous sont fictives. Sources, dates et scores sont affichés à titre de
        démonstration uniquement.
      </DemoNotice>

      <div className="mb-6 grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-sm sm:grid-cols-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Recherche</p>
          <p className="mt-1 text-slate-800">{demoUser.title} · {demoUser.location}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Contrat</p>
          <p className="mt-1 text-slate-800">{demoUser.contract} · {demoUser.mobility}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Filtres avancés</p>
          <p className="mt-1 text-slate-500">Disponibles avec les connecteurs (Sprint 4)</p>
        </div>
      </div>

      <div className="space-y-4">
        {demoOffers.map((offer) => (
          <article
            key={offer.id}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-base font-semibold text-slate-900">{offer.title}</h2>
                  <Badge tone={offer.score >= 70 ? "success" : "neutral"}>
                    {offer.score >= 70 ? "Au-dessus du seuil" : "Sous le seuil"}
                  </Badge>
                </div>
                <p className="mt-1 text-sm text-slate-600">
                  {offer.company} · {offer.location} · {offer.contract}
                </p>
                <p className="mt-2 text-xs text-slate-500">
                  Source : <span className="font-medium text-slate-700">{offer.source}</span> ·
                  Publiée le {offer.publishedAt}
                </p>
              </div>
              <div className="shrink-0">
                <ScoreBar score={offer.score} />
              </div>
            </div>

            <div className="mt-4 grid gap-4 border-t border-slate-100 pt-4 md:grid-cols-2">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
                  Pourquoi ce score
                </h3>
                <ul className="mt-2 space-y-1 text-sm text-slate-600">
                  {offer.reasons.map((reason) => (
                    <li key={reason} className="flex gap-2">
                      <span aria-hidden="true" className="text-emerald-600">+</span>
                      {reason}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wide text-amber-700">
                  Écarts et données manquantes
                </h3>
                <ul className="mt-2 space-y-1 text-sm text-slate-600">
                  {offer.gaps.map((gap) => (
                    <li key={gap} className="flex gap-2">
                      <span aria-hidden="true" className="text-amber-600">–</span>
                      {gap}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-6">
        <SectionCard
          title="Offres écartées automatiquement"
          description="Les offres sous le seuil ou exclues restent visibles dans l'historique, jamais masquées sans explication."
        >
          <EmptyState
            title="Aucune offre écartée pour le moment"
            description="Les règles d'exclusion et le seuil de matching seront configurables au Sprint 5."
          />
        </SectionCard>
      </div>
    </div>
  );
}
