# Architecture — CandidBoost IA

Statut : Sprint 0 (audit et plan d'intégration)
Source : `CandidBoost_IA_Cahier_des_charges_Sprints_OpenCode_Web.pdf` (v1.1, 23 octobre 2026)

## 1. État actuel du dépôt

### 1.1 Au Sprint 1

| Élément | État |
| --- | --- |
| Code applicatif | Next.js 15 (App Router) + React 19 + TypeScript |
| Styles | Tailwind CSS 4 (PostCSS) |
| Scripts | `dev`, `build`, `start`, `lint`, `typecheck`, `test` |
| Tests UI | Vitest + Testing Library (11 tests) |
| Pages | Tableau de bord, Profil, Offres, Entreprises, Candidatures, Automatisations, Statistiques, Paramètres |
| Données | Fictives, isolées dans `src/lib/demo/data.ts`, bannière de démonstration sur chaque page |
| Auth / base / API / envoi | Non implémentés (Sprints 2 à 10) |
| Déploiement / CI | Non implémentés (Sprint 14) |
| Documentation | Architecture, roadmap, risques, ADR 0001 à 0005 |

### 1.2 Au Sprint 0 (audit initial)

Audit du dépôt `artemys37/PremierCap` au démarrage du Sprint 0 :

| Élément | État |
| --- | --- |
| Code applicatif | Aucun |
| `package.json` / dépendances | Absent |
| Scripts lint / tests / build | Absents |
| Authentification | Aucune |
| Base de données / migrations | Aucune |
| API | Aucune |
| Interface web | Aucune |
| Déploiement / CI | Aucun |
| Intégrations (sources, mail, IA) | Aucune |
| Documentation | Uniquement le cahier des charges PDF |
| Branche de travail | `sprint-0-audit` (depuis `main`) |

Conséquence : le Sprint 0 est un audit « dépôt vide ». Il n'y a rien à réutiliser ni à préserver côté code. La stack doit être confirmée avant le Sprint 1 (voir ADR-0001 et ADR-0002).

## 2. Périmètre

Application **web uniquement** (navigateur). Aucun client Windows natif, Electron, installateur `.exe` ou mise à jour desktop.

Objectif : accompagner la recherche d'emploi en France (offres publiées et candidatures spontanées) avec une automatisation encadrée, traçable et désactivée par défaut.

## 3. Stack proposée

| Couche | Choix | Justification |
| --- | --- | --- |
| Frontend / Backend | Next.js 15 (App Router) + React 19 + TypeScript strict | Un seul déploiement web, rendu serveur, routes API et server actions ; compétences déjà disponibles sur SPIRIT-12 |
| Styles | Tailwind CSS 4 | Rapide, cohérent, faible coût |
| Validation | Zod | Validation stricte des entrées, des fichiers et des sorties IA |
| Base | PostgreSQL (Supabase) | Relationnel, migrations SQL, RLS, adapté aux entités du cahier des charges |
| Auth | Supabase Auth | Email + mot de passe, vérification email, sessions, MFA possible |
| Stockage documents | Supabase Storage (bucket privé) | CV privés, URLs signées, pas de lien public permanent |
| File de tâches | Table PostgreSQL + worker dédié (voir ADR-0003) | Persistante, idempotente, sans infrastructure lourde au démarrage |
| IA | Interface `LLMProvider` (OpenAI par défaut) | Fournisseur abstrait, prompts versionnés, sorties structurées, fallback sans IA (ADR-0004) |
| Email | Un seul fournisseur OAuth/API officielle ou SMTP autorisé | Permissions minimales, jetons chiffrés, révocation (ADR-0005) |
| Observabilité | Logs structurés (JSON) + Sentry (offre gratuite si possible) | Erreurs, tâches bloquées, coûts, sans CV ni jetons |
| CI/CD | GitHub Actions + hébergement web (Vercel ou équivalent) | Lint, types, tests, build, migrations contrôlées |
| Tests | Vitest (unitaire/intégration) + Playwright (e2e) | Couvre matching, quotas, idempotence, parcours navigateur |

Aucune de ces briques n'est installée à ce stade : elles sont proposées et doivent être validées (questions ouvertes en fin de document).

## 4. Architecture logique cible

```text
Navigateur
   │ HTTPS
   ▼
Next.js (UI + routes API /api/v1 + server actions)
   │  auth + validation Zod + autorisation par utilisateur
   ├──► PostgreSQL (Supabase) : données métier + tâches + audit
   ├──► Storage privé : CV / documents
   ├──► LLMProvider (OpenAI) : agents IA, sorties structurées
   └──► EmailProvider : envoi via OAuth/API officielle ou SMTP autorisé

Worker de tâches (processus séparé)
   ├──► PostgreSQL : tâches à exécuter (verrouillage, idempotence)
   ├──► EmailProvider
   └──► connecteurs de sources autorisées
```

Principes :

- Les clés et jetons restent **côté serveur**.
- Chaque requête vérifie l'utilisateur et la propriété des données (anti-IDOR).
- Le mode automatique est désactivé par défaut ; activation explicite après affichage des règles et test.
- Les agents ne peuvent pas modifier les permissions, règles ou quotas côté serveur.
- Les contenus externes (CV, offres, emails) sont non fiables et ne modifient jamais les instructions des agents.
- Le produit fonctionne en mode dégradé si l'IA ou une source est indisponible.

## 5. Modules prévus

```text
src/
  app/                    # pages et routes API (App Router)
    (auth)/               # connexion, inscription, vérification email
    dashboard/
    profil/
    offres/
    entreprises/
    candidatures/
    automatisations/
    statistiques/
    parametres/
    api/v1/               # endpoints versionnés
  components/             # UI réutilisable, états vide/chargement/erreur
  lib/
    auth/                 # session, autorisation, guards
    db/                   # client base, requêtes, migrations helpers
    ai/                   # LLMProvider, prompts versionnés, fallback
    agents/               # Orchestrateur + agents
    matching/             # score déterministe et explicable
    connectors/           # SourceConnector, import CSV, sources API
    email/                # EmailProvider, OAuth, jetons chiffrés
    queue/                # tâches, idempotence, quotas, reprises
    validation/           # schémas Zod
  types/                  # types partagés / types base
supabase/
  migrations/             # migrations SQL reproductibles
  policies/               # politiques RLS
docs/
  decisions/              # ADR
```

## 6. Agents IA

| Agent | Rôle | Limites |
| --- | --- | --- |
| Orchestrateur | Planifie, vérifie les permissions, arrête le flux si une règle n'est pas satisfaite | Ne contourne jamais les politiques serveur |
| Profil | Normalise le CV, sépare faits confirmés / incertains / absents | N'invente aucun fait |
| Sourcing | Interroge les connecteurs autorisés, renvoie résultats sourcés, datés, dédupliqués | Aucun scraping non autorisé |
| Matching | Calcule un score explicable et en résume les raisons | Score déterministe ; l'IA ne modifie pas les règles critiques |
| Rédaction | Prépare des brouillons fondés sur les faits confirmés et la cible | Signale les affirmations non étayées |
| Contrôle qualité/conformité | Vérifie exactitude, doublons, exclusions, destinataire, contenu, règles | Bloque en cas de doute |
| Envoi | Exécute uniquement les tâches autorisées par les politiques serveur | Idempotence, quotas, arrêt d'urgence |
| Suivi | Traite les réponses, entretiens, refus, rebonds | Annule les relances quand nécessaire |
| Analyste | Statistiques descriptives | Pas de causalité ni de promesse de résultat |

## 7. Flux principal

```text
source autorisée → collecte/provenance → normalisation/déduplication
→ matching → brouillon → contrôle → règles serveur
→ simulation/planification → envoi → journal → suivi
```

Avant chaque envoi : vérification du destinataire, du contenu, de la source, des pièces jointes, des exclusions, du seuil de pertinence, des doublons et des quotas.

## 8. Entités minimales (base de données)

`User`, `CandidateProfile`, `CVDocument`, `Skill`, `Experience`, `Preference`, `ConsentRecord`, `SourceConnector`, `Company`, `Contact`, `JobOffer`, `MatchEvaluation`, `ApplicationDraft`, `Application`, `SendingPolicy`, `Task`, `MessageEvent`, `Reply`, `Interview`, `SuppressionEntry`, `AuditLog`, `ProviderCredentialRef`, `UsageMeter`.

Chaque entité liée à un candidat est cloisonnée par propriétaire (`user_id`), avec contraintes d'unicité, dates, politique de rétention et journal d'audit. Les politiques RLS sont obligatoires en production.

## 9. Environnements et commandes

Depuis le Sprint 1 :

```bash
npm install
npm run dev        # développement local (http://localhost:3000)
npm run lint       # ESLint
npm run typecheck  # TypeScript strict
npm test           # tests UI Vitest + Testing Library
npm run build      # build de production
```

Les données affichées sont fictives et isolées dans `src/lib/demo/data.ts`. Aucune donnée réelle
n'est utilisée par l'interface du Sprint 1.

Environnements cibles : `local`, `staging`, `production`. Secrets côté serveur, migrations contrôlées, sauvegardes, health checks et rollback documentés au Sprint 14.

## 10. Variables d'environnement

Voir `.env.example` (valeurs fictives uniquement). Aucune valeur réelle ne doit être commitée.

## 11. Questions ouvertes / bloquantes

1. Hébergement cible : Vercel (simple, mais worker séparé nécessaire) ou VPS unique (worker + app) ?
2. Base : Supabase hébergé (rapide, RLS) ou PostgreSQL self-hosted (coût/contrôle) ?
3. Fournisseur email retenu pour le Sprint 9 : Gmail API, Microsoft Graph ou SMTP autorisé ?
4. Sources de recherche autorisées pour le Sprint 4 : France Travail API, flux partenaires, import CSV uniquement ?
5. Fournisseur IA et budget mensuel maximal accepté.
6. Validation juridique RGPD / conditions d'utilisation des sources avant bêta (Sprint 15).
