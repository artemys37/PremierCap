export type NavItem = {
  href: string;
  label: string;
  shortLabel: string;
  group: "Pilotage" | "Recherche" | "Système";
};

export const NAV_ITEMS: NavItem[] = [
  { href: "/dashboard", label: "Tableau de bord", shortLabel: "Tableau", group: "Pilotage" },
  { href: "/profil", label: "Profil", shortLabel: "Profil", group: "Pilotage" },
  { href: "/offres", label: "Offres", shortLabel: "Offres", group: "Recherche" },
  { href: "/entreprises", label: "Entreprises", shortLabel: "Entreprises", group: "Recherche" },
  { href: "/candidatures", label: "Candidatures", shortLabel: "Candidatures", group: "Recherche" },
  { href: "/automatisations", label: "Automatisations", shortLabel: "Automatisations", group: "Recherche" },
  { href: "/statistiques", label: "Statistiques", shortLabel: "Stats", group: "Système" },
  { href: "/parametres", label: "Paramètres", shortLabel: "Paramètres", group: "Système" },
];

export const NAV_GROUPS = ["Pilotage", "Recherche", "Système"] as const;
