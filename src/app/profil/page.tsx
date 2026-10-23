import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { DemoNotice } from "@/components/ui/demo-notice";
import { PageHeader } from "@/components/ui/page-header";
import { Progress } from "@/components/ui/progress";
import { SectionCard } from "@/components/ui/section-card";
import { demoSkills, demoUser } from "@/lib/demo/data";

export const metadata: Metadata = { title: "Profil" };

const PREFERENCES = [
  { label: "Métier recherché", value: demoUser.title },
  { label: "Contrat", value: demoUser.contract },
  { label: "Localisation", value: demoUser.location },
  { label: "Mobilité", value: demoUser.mobility },
  { label: "Disponibilité", value: demoUser.availability },
];

export default function ProfilPage() {
  return (
    <div>
      <PageHeader
        title="Profil"
        description="Informations vérifiées, préférences de recherche et documents privés. Les faits incertains restent à confirmer."
        actions={<ButtonLink href="/offres">Voir les offres compatibles</ButtonLink>}
      />

      <DemoNotice />

      <div className="grid gap-6 xl:grid-cols-[1.2fr_1fr]">
        <SectionCard
          title="Identité et préférences"
          description="Ces informations servent au matching et à la rédaction. Elles ne sont jamais inventées par les agents."
        >
          <dl className="grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Nom</dt>
              <dd className="mt-1 text-sm text-slate-900">
                {demoUser.firstName} {demoUser.lastName}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Email</dt>
              <dd className="mt-1 text-sm text-slate-900">{demoUser.email}</dd>
            </div>
            {PREFERENCES.map((preference) => (
              <div key={preference.label}>
                <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {preference.label}
                </dt>
                <dd className="mt-1 text-sm text-slate-900">{preference.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-5 rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-500">
            Édition du profil disponible au Sprint 2. Aucune modification n&apos;est possible dans cette
            version de démonstration.
          </p>
        </SectionCard>

        <SectionCard title="Complétude du profil" description="Les données non confirmées ne comptent pas comme acquises.">
          <Progress value={demoUser.completeness} label="Profil complété" />
          <ul className="mt-5 space-y-2 text-sm">
            <li className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2">
              <span className="text-slate-700">Identité</span>
              <Badge tone="success">Confirmée</Badge>
            </li>
            <li className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2">
              <span className="text-slate-700">Compétences</span>
              <Badge tone="warning">3 à vérifier</Badge>
            </li>
            <li className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2">
              <span className="text-slate-700">CV</span>
              <Badge tone="neutral">Non importé</Badge>
            </li>
          </ul>
          <ButtonLink href="/parametres" variant="secondary">
            Gérer les documents
          </ButtonLink>
        </SectionCard>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <SectionCard
          title="Compétences confirmées"
          description="Faits validés par le candidat, utilisables en rédaction."
        >
          <ul className="flex flex-wrap gap-2">
            {demoSkills.confirmed.map((skill) => (
              <li key={skill}>
                <Badge tone="success">{skill}</Badge>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard
          title="À vérifier avant usage"
          description="Ces éléments sont signalés comme non confirmés ; les agents ne les présentent pas comme acquis."
        >
          <ul className="flex flex-wrap gap-2">
            {demoSkills.toVerify.map((skill) => (
              <li key={skill}>
                <Badge tone="warning">{skill}</Badge>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>
    </div>
  );
}
