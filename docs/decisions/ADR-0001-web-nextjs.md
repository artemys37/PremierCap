# ADR-0001 — Application web Next.js 15, sans client desktop

- Statut : proposé (à valider)
- Date : 2026-10-23
- Sprint : 0

## Contexte

Le cahier des charges impose une **application web uniquement** : pas de Windows natif, Electron, installateur `.exe` ni mises à jour desktop. Le dépôt est vide et ne contient aucun code à réutiliser.

## Décision

Construire l'application avec :

- Next.js 15 (App Router), React 19, TypeScript strict ;
- Tailwind CSS 4 pour l'interface ;
- Zod pour la validation ;
- un unique déploiement web (UI + routes API `/api/v1`).

## Justification

- Couvre frontend et backend dans un seul projet, adapté à un faible budget.
- Rendu serveur et server actions utiles pour l'authentification et les données privées.
- Stack déjà maîtrisée sur le projet SPIRIT-12, donc coût d'apprentissage quasi nul.
- Aucune dépendance desktop à maintenir.

## Conséquences

- Les envois automatiques et les traitements longs ne doivent pas dépendre d'une requête HTTP : ils passeront par une file persistée et un worker (ADR-0003).
- Le déploiement doit supporter les routes serveur et les migrations contrôlées (Sprint 14).
- Le choix de l'hébergeur reste ouvert (voir questions de `docs/architecture.md`).

## Alternatives considérées

- **SPA React + API séparée** : plus de pièces mobiles et de déploiements pour un bénéfice limité.
- **Application desktop Electron** : hors périmètre explicite du cahier des charges.
