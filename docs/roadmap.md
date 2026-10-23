# Roadmap — CandidBoost IA

Source : `CandidBoost_IA_Cahier_des_charges_Sprints_OpenCode_Web.pdf` (v1.1)

Règle : une branche dédiée par sprint, audit préalable, modifications incrémentales, conservation de l'existant, tests et compte rendu des fichiers touchés. Aucun secret ni donnée personnelle réelle dans Git.

## Ordre de lancement

1. **Sprints 0 à 8** : socle, profil, API, recherche, matching, agents, rédaction, suivi.
2. **Sprints 9 et 10** : messagerie puis automatisation, après vérification des règles des sources et canaux.
3. **Sprints 11 à 15** : relances, statistiques, sécurité, déploiement, bêta.

## Vue d'ensemble

| Sprint | Objectif | Critère de sortie |
| --- | --- | --- |
| 0 | Audit du dépôt et plan d'intégration | Audit, plan de livraison, risques priorisés, commandes reproductibles |
| 1 | Socle web et navigation (Tableau de bord, Profil, Offres, Entreprises, Candidatures, Automatisations, Statistiques, Paramètres) | Interface navigable, responsive, accessible, tests UI |
| 2 | Profil et documents (CRUD, préférences, import PDF/DOCX sécurisé, vérification) | Profil fonctionnel, tests d'accès et fichiers |
| 3 | Base, API versionnée, autorisations, migrations, audit, export/suppression | API testée, migrations reproductibles, tests anti-IDOR |
| 4 | Connecteurs de recherche (`SourceConnector`, import CSV, une source API/flux autorisée, normalisation, déduplication) | Source fonctionnelle, connecteur simulé, fiche source |
| 5 | Matching explicable (compétences, expérience, localisation, contrat, préférences) | Score reproductible et couvert par tests |
| 6 | Infrastructure IA et agents (LLMProvider, prompts versionnés, validation, coûts, Orchestrateur, Profil, Sourcing, Matching, Rédaction, Contrôle) | Agents traçables, observables, limités par les politiques serveur |
| 7 | Rédaction (email + lettre, édition, versions, pièces jointes, non-invention) | Brouillons éditables, tests de non-invention |
| 8 | Pipeline et historique (statuts, déduplication, saisie manuelle des réponses) | Suivi complet avant envoi automatique |
| 9 | Intégration messagerie (un fournisseur OAuth/API ou SMTP autorisé, file persistée, quotas, test contrôlé) | Envoi testable sans doublon lors des reprises |
| 10 | Automatisation sécurisée (désactivée par défaut, quotas, exclusions, arrêt d'urgence) | Automatisation limitée, coupe-circuits testés |
| 11 | Réponses et relances (détection autorisée ou saisie, classification avec confiance, annulation) | Suivi fiable, annulation vérifiée |
| 12 | Statistiques, export, suppression | Calculs testés, export et suppression documentés |
| 13 | Sécurité et robustesse (validation, rate limiting, CSP, cookies, CSRF/XSS, isolation, IDOR, injection de prompt, fichiers hostiles, secrets, OAuth) | Rapport sécurité, tests automatisés, plan de correction |
| 14 | Déploiement web et CI/CD (local/staging/production, CI complète, HTTPS, sauvegardes, health checks, runbooks) | Déploiement reproductible et runbooks |
| 15 | Bêta et lancement (recette bout en bout, test réel à faible volume, guide utilisateur, FAQ) | Bêta validée et plan de lancement |

## Détail par sprint

### Sprint 0 — Audit et plan d'intégration (terminé)

- Inspecter arborescence, stack, dépendances, scripts, tests, auth, base, API, UI, déploiement, intégrations.
- Documenter architecture, variables d'environnement, commandes et risques.
- Livrables : `docs/architecture.md`, `docs/roadmap.md`, `docs/risks.md`, `docs/decisions/ADR-*.md`, `.env.example`, `README.md`.
- Ne pas implémenter les fonctionnalités des sprints suivants.

### Sprint 1 — Socle web et navigation

- Initialiser Next.js 15 + TypeScript + Tailwind + ESLint.
- Pages : Tableau de bord, Profil, Offres, Entreprises, Candidatures, Automatisations, Statistiques, Paramètres.
- Composants cohérents, responsive, accessibles ; états vide/chargement/erreur.
- Données de démonstration clairement identifiées, jamais mélangées aux données réelles.

### Sprint 2 — Profil et documents

- CRUD profil, préférences, historique des modifications.
- Import PDF/DOCX : limite de taille, validation du type réel, extraction, écran de vérification.
- Statut confirmé/non confirmé et provenance pour chaque donnée extraite.
- Documents privés, accès limité au propriétaire.

### Sprint 3 — Base, API et autorisations

- Migrations reproductibles, modèles, validation Zod, pagination, filtres.
- API versionnée `/api/v1`, isolation par utilisateur, audit, export et suppression.
- Documentation des endpoints et autorisations.
- Tests anti-IDOR et d'isolation des comptes.

### Sprint 4 — Connecteurs de recherche

- Contrat `SourceConnector` : provenance, date, quotas, conditions d'utilisation, erreurs.
- Import CSV contrôlé + au moins une source API/flux autorisée et documentée.
- Aucun scraping sans vérification des conditions ; aucun contournement de contrôle.
- Normalisation et déduplication offres/entreprises.
- Fiche source : conditions, quotas, coûts, révocation.

### Sprint 5 — Matching explicable

- Score reproductible : compétences, expérience, localisation, contrat, préférences.
- Afficher raisons positives, écarts, données manquantes et provenance.
- Tests des cas limites ; l'IA ne modifie pas les règles critiques.

### Sprint 6 — Infrastructure et agents IA

- Interface `LLMProvider`, prompts versionnés, validation des sorties, timeouts, retries limités, suivi des coûts.
- Agents Orchestrateur, Profil, Sourcing, Matching, Rédaction, Contrôle avec contrats typés.
- Tests sur données fictives et fallback sans IA.

### Sprint 7 — Rédaction

- Générer email et lettre à partir des faits confirmés et de l'offre/entreprise ciblée.
- Édition, aperçu, versions, validation des pièces jointes, historique.
- Signaler toute affirmation non étayée.

### Sprint 8 — Pipeline et historique

- Statuts normalisés : à qualifier, brouillon, planifiée, envoyée, erreur, réponse, entretien, refus, clôturée.
- Déduplication par candidat, entreprise, offre, canal et période.
- Saisie manuelle des réponses, entretiens, refus.

### Sprint 9 — Intégration messagerie

- Un seul fournisseur via OAuth/API officielle ou SMTP autorisé.
- Permissions minimales, jetons chiffrés au repos, révocation.
- File persistée, idempotence, quotas, reprises limitées, journal.
- Simulation puis test vers une adresse contrôlée par l'utilisateur.

### Sprint 10 — Automatisation sécurisée

- Mode désactivé par défaut ; activation explicite après règles visibles et test.
- Plafond quotidien, délai minimum, horaires, seuil de matching, domaines exclus, maximum de relances.
- Contrôle serveur de chaque envoi.
- Arrêt d'urgence et suspension sur erreurs, rebonds ou non-contact.
- Aucun contournement de CAPTCHA, restrictions, quotas ou conditions.

### Sprint 11 — Réponses et relances

- Détection autorisée des réponses ou saisie manuelle.
- Classification avec niveau de confiance ; cas ambigus soumis à vérification.
- Annulation des relances après réponse, rebond, refus, opposition ou arrêt d'urgence.
- Limite de fréquence et modèles éditables.

### Sprint 12 — Statistiques, export, suppression

- Volumes, réponses, entretiens, refus, délais et résultats par source/campagne.
- Périodes, dénominateurs et données manquantes affichés ; pas de causalité inférée.
- Export CSV/JSON, fermeture de compte et suppression selon politique de conservation.

### Sprint 13 — Sécurité et robustesse

- Validation, rate limiting, CSP, cookies, CSRF/XSS selon stack.
- Tests isolation, IDOR, injection de prompt, fichiers hostiles, secrets, permissions OAuth.
- Documentation données, rétention, sous-traitants, incident, restauration.
- Tests panne fournisseur, quotas, jetons révoqués, reprises.

### Sprint 14 — Déploiement web et CI/CD

- Environnements local/staging/production, configuration et migrations contrôlées.
- CI : lint, types, tests unitaires/intégration/e2e, build, dépendances.
- HTTPS, secrets, sauvegardes, health checks, logs sans données personnelles, alertes.
- Runbooks déploiement, restauration, rollback, incident.

### Sprint 15 — Bêta et lancement

- Recette bout en bout sur données fictives, puis test réel à faible volume.
- Observation/simulation, test d'envoi, quota réduit après validation explicite.
- Vérification coûts, conditions sources, sécurité, suppression, critères d'acceptation.
- Guide utilisateur, FAQ, changelog, limites, support.

## Critères d'acceptation globaux

- Le candidat peut corriger les données extraites du CV.
- Chaque offre/entreprise montre source, date et raisons du matching.
- Une candidature ne peut pas être envoyée deux fois accidentellement.
- Automatisation désactivée par défaut, activée explicitement.
- Quotas, exclusions, arrêt d'urgence et suppression ont des tests.
- Le produit fonctionne en mode dégradé si IA/source indisponible.
- CI et procédures de déploiement/restauration reproductibles.
