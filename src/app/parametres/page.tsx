import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { DemoNotice } from "@/components/ui/demo-notice";
import { PageHeader } from "@/components/ui/page-header";
import { SectionCard } from "@/components/ui/section-card";
import { demoConnections, demoUser } from "@/lib/demo/data";

export const metadata: Metadata = { title: "Paramètres" };

function DisabledAction({ children }: { children: string }) {
  return (
    <button
      type="button"
      disabled
      className="inline-flex cursor-not-allowed items-center rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm font-semibold text-slate-400"
      title="Fonctionnalité prévue dans un sprint ultérieur"
    >
      {children}
    </button>
  );
}

export default function ParametresPage() {
  return (
    <div>
      <PageHeader
        title="Paramètres"
        description="Compte, connexions, sources autorisées et droits sur les données personnelles."
      />

      <DemoNotice>
        Les connexions affichées sont fictives. Aucun identifiant, jeton ou secret réel n&apos;est
        présent dans cette version.
      </DemoNotice>

      <div className="grid gap-6 xl:grid-cols-2">
        <SectionCard title="Compte" description="Informations utilisées pour l'authentification et les notifications.">
          <dl className="space-y-3 text-sm">
            <div className="flex items-center justify-between gap-3">
              <dt className="text-slate-600">Nom</dt>
              <dd className="font-medium text-slate-900">
                {demoUser.firstName} {demoUser.lastName}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-3">
              <dt className="text-slate-600">Email</dt>
              <dd className="font-medium text-slate-900">{demoUser.email}</dd>
            </div>
            <div className="flex items-center justify-between gap-3">
              <dt className="text-slate-600">Vérification email</dt>
              <dd><Badge tone="warning">Démo</Badge></dd>
            </div>
            <div className="flex items-center justify-between gap-3">
              <dt className="text-slate-600">Double authentification</dt>
              <dd><Badge tone="neutral">Non configurée</Badge></dd>
            </div>
          </dl>
          <div className="mt-4">
            <DisabledAction>Modifier le compte (Sprint 3)</DisabledAction>
          </div>
        </SectionCard>

        <SectionCard
          title="Connexions"
          description="Une source doit être autorisée et documentée avant utilisation."
        >
          <ul className="space-y-2">
            {demoConnections.map((connection) => (
              <li key={connection.name} className="rounded-lg border border-slate-200 px-3 py-2">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-medium text-slate-800">{connection.name}</p>
                  <Badge tone={connection.status === "Non connectée" ? "neutral" : "info"}>
                    {connection.status}
                  </Badge>
                </div>
                <p className="mt-0.5 text-xs text-slate-500">{connection.detail}</p>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-slate-500">
            Aucun contournement de CAPTCHA, de quota ou de conditions d&apos;utilisation ne sera proposé.
          </p>
        </SectionCard>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <SectionCard
          title="Sources autorisées"
          description="Les conditions, quotas et coûts de chaque source seront documentés dans docs/connectors.md (Sprint 4)."
        >
          <ul className="space-y-2 text-sm text-slate-600">
            <li className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2">
              <span>APIs officielles et flux publics</span>
              <Badge tone="success">Prévu</Badge>
            </li>
            <li className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2">
              <span>Import CSV contrôlé</span>
              <Badge tone="success">Prévu</Badge>
            </li>
            <li className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2">
              <span>Scraping non autorisé</span>
              <Badge tone="danger">Interdit</Badge>
            </li>
          </ul>
        </SectionCard>

        <SectionCard
          title="Données et RGPD"
          description="Les droits d'accès, d'export et de suppression seront implémentés et testés."
        >
          <div className="space-y-3 text-sm text-slate-600">
            <p>Export des données personnelles (CSV/JSON) : Sprint 12.</p>
            <p>Suppression du compte et politique de conservation : Sprint 12.</p>
            <p>Journal d&apos;audit consultable par le candidat : Sprint 13.</p>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <DisabledAction>Exporter mes données (Sprint 12)</DisabledAction>
            <DisabledAction>Supprimer mon compte (Sprint 12)</DisabledAction>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
