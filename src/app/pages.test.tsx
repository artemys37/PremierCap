import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import AutomatisationsPage from "./automatisations/page";
import CandidaturesPage from "./candidatures/page";
import DashboardPage from "./dashboard/page";
import OffresPage from "./offres/page";
import ParametresPage from "./parametres/page";
import ProfilPage from "./profil/page";
import StatistiquesPage from "./statistiques/page";

describe("Pages du Sprint 1", () => {
  it("le tableau de bord affiche les statistiques et le pipeline", () => {
    render(<DashboardPage />);

    expect(screen.getByRole("heading", { level: 1, name: /Bonjour Camille/ })).toBeInTheDocument();
    expect(screen.getByText("Taux de réponse")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Pipeline de candidatures" })).toBeInTheDocument();
    expect(screen.getByText(/Données de démonstration/)).toBeInTheDocument();
  });

  it("les offres affichent source, date et raisons du matching", () => {
    render(<OffresPage />);

    expect(
      screen.getByRole("heading", { name: "Développeuse front-end React" }),
    ).toBeInTheDocument();
    expect(screen.getAllByText(/France Travail \(démo\)/).length).toBeGreaterThan(0);
    expect(screen.getAllByText("Pourquoi ce score")).toHaveLength(4);
    expect(screen.getAllByRole("img", { name: /Score de matching/ })).toHaveLength(4);
  });

  it("les candidatures affichent les statuts normalisés", () => {
    render(<CandidaturesPage />);

    expect(screen.getByRole("heading", { level: 1, name: "Candidatures" })).toBeInTheDocument();
    expect(screen.getAllByText("À qualifier").length).toBeGreaterThan(0);
    expect(screen.getByText("Aucune relance planifiée")).toBeInTheDocument();
  });

  it("les automatisations sont désactivées par défaut", () => {
    render(<AutomatisationsPage />);

    expect(screen.getByText("Désactivé")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Activer \(Sprint 10\)/ })).toBeDisabled();
    expect(screen.getByRole("button", { name: /Arrêt d'urgence/ })).toBeDisabled();
    expect(screen.getByText("Aucune automatisation active")).toBeInTheDocument();
  });

  it("les statistiques affichent les dénominateurs et l'absence de causalité", () => {
    render(<StatistiquesPage />);

    expect(screen.getByRole("heading", { level: 1, name: "Statistiques" })).toBeInTheDocument();
    expect(screen.getAllByText(/3 réponses sur 12 candidatures/).length).toBeGreaterThan(0);
    expect(screen.getByText(/Aucune causalité/)).toBeInTheDocument();
  });

  it("le profil sépare les faits confirmés des données à vérifier", () => {
    render(<ProfilPage />);

    expect(screen.getByText("Compétences confirmées")).toBeInTheDocument();
    expect(screen.getByText("À vérifier avant usage")).toBeInTheDocument();
    expect(screen.getByRole("progressbar", { name: "Profil complété" })).toHaveAttribute(
      "aria-valuenow",
      "72",
    );
  });

  it("les paramètres informent des limites et droits à venir", () => {
    render(<ParametresPage />);

    expect(screen.getByRole("button", { name: /Exporter mes données/ })).toBeDisabled();
    expect(screen.getByRole("button", { name: /Supprimer mon compte/ })).toBeDisabled();
    expect(screen.getByText("Scraping non autorisé")).toBeInTheDocument();
  });
});
