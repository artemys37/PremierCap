# Changelog

Format inspiré de [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/).

## [Non publié]

### Sprint 1 — Socle web et navigation (2026-10-23)

- Initialisation Next.js 15, React 19, TypeScript strict, Tailwind CSS 4.
- Shell accessible (lien d'évitement, navigation principale et mobile, `aria-current`).
- 8 pages : Tableau de bord, Profil, Offres, Entreprises, Candidatures, Automatisations, Statistiques, Paramètres.
- États de chargement, erreur, 404 et composant d'état vide.
- Données de démonstration fictives isolées dans `src/lib/demo/data.ts` et bannières explicites.
- Tests UI Vitest + Testing Library (11 tests).
- Scripts `lint`, `typecheck`, `test`, `build` conformes.

### Sprint 0 — Audit et plan d'intégration (2026-10-23)

- Audit du dépôt : vide, seul le cahier des charges PDF est présent.
- Documentation de l'architecture cible et de la stack proposée.
- Roadmap des sprints 0 à 15 et critères de sortie.
- Registre des risques priorisés.
- ADR 0001 à 0005 (web Next.js, Supabase, file de tâches, abstraction IA, fournisseur email).
- `.env.example` avec valeurs fictives et `.gitignore`.
- Aucune fonctionnalité produit implémentée ; aucun test exécutable à ce stade.
