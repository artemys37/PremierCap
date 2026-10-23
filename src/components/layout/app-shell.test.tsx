import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { AppShell } from "./app-shell";
import { NAV_ITEMS } from "./nav-items";

vi.mock("next/navigation", () => ({
  usePathname: () => "/offres",
}));

describe("AppShell", () => {
  it("affiche la navigation principale et les huit destinations du Sprint 1", () => {
    render(
      <AppShell>
        <p>Contenu de test</p>
      </AppShell>,
    );

    const navigation = screen.getByRole("navigation", { name: "Navigation principale" });
    expect(within(navigation).getAllByRole("link")).toHaveLength(NAV_ITEMS.length);

    for (const item of NAV_ITEMS) {
      expect(within(navigation).getByRole("link", { name: item.label })).toHaveAttribute(
        "href",
        item.href,
      );
    }

    expect(screen.getByText("Contenu de test")).toBeInTheDocument();
  });

  it("marque la page courante avec aria-current", () => {
    render(
      <AppShell>
        <p>Contenu</p>
      </AppShell>,
    );

    const navigation = screen.getByRole("navigation", { name: "Navigation principale" });
    expect(within(navigation).getByRole("link", { name: "Offres" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(within(navigation).getByRole("link", { name: "Profil" })).not.toHaveAttribute(
      "aria-current",
    );
  });

  it("fournit un lien d'évitement vers le contenu principal", () => {
    render(
      <AppShell>
        <p>Contenu</p>
      </AppShell>,
    );

    expect(screen.getByRole("link", { name: "Aller au contenu principal" })).toHaveAttribute(
      "href",
      "#contenu",
    );
    expect(screen.getByRole("main")).toHaveAttribute("id", "contenu");
  });

  it("identifie clairement le mode démonstration", () => {
    render(
      <AppShell>
        <p>Contenu</p>
      </AppShell>,
    );

    expect(screen.getAllByText(/démonstration/i).length).toBeGreaterThan(0);
  });
});
