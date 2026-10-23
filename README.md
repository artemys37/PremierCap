# CandidBoost IA

Application web de recherche d'emploi et d'accompagnement aux candidatures (France), avec matching explicable, rédaction assistée et automatisation encadrée.

- **Périmètre actuel** : Sprint 0 — audit et plan d'intégration (aucun code applicatif).
- **Plateforme** : web uniquement. Pas de Windows natif, Electron ou installateur `.exe`.
- **Cahier des charges** : [`CandidBoost_IA_Cahier_des_charges_Sprints_OpenCode_Web.pdf`](./CandidBoost_IA_Cahier_des_charges_Sprints_OpenCode_Web.pdf)

## Principes

- Mode d'envoi automatique désactivé par défaut ; activation explicite après affichage des règles et test.
- Sources et canaux autorisés uniquement ; aucun contournement de CAPTCHA, restrictions, quotas ou conditions.
- Aucune invention de compétence, expérience, diplôme ou disponibilité.
- Contrôle serveur avant chaque envoi : destinataire, contenu, source, pièces jointes, exclusions, seuil, doublons, quotas.
- Arrêt d'urgence ; relances annulées après réponse, rebond, refus, opposition ou arrêt.
- Les contenus externes (CV, offres, emails) ne modifient jamais les instructions ou permissions des agents.
- Aucun secret ni donnée personnelle réelle dans Git.

## Stack prévue

Next.js 15 (App Router) + React 19 + TypeScript, Tailwind CSS 4, Zod, PostgreSQL/Supabase (Auth, Storage privé, RLS), interface `LLMProvider` (OpenAI par défaut), un fournisseur email officiel, file de tâches PostgreSQL + worker.

Détails et alternatives : [`docs/architecture.md`](./docs/architecture.md).

## Démarrage (à partir du Sprint 1)

Aucune commande n'est disponible pour l'instant : le dépôt ne contient pas encore d'application.

```bash
npm install
npm run dev
```

## Documentation

- [Architecture](docs/architecture.md)
- [Roadmap](docs/roadmap.md)
- [Risques](docs/risks.md)
- [Décisions (ADR)](docs/decisions/)
- [Variables d'environnement](.env.example)

## Statut des livrables

| Sprint | État |
| --- | --- |
| 0 — Audit et plan | Terminé |
| 1 — Socle web et navigation | À venir |
| 2 à 15 | À venir |

Aucune fonctionnalité produit n'est implémentée avant le Sprint 1.
