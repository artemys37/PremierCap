# Registre des risques — CandidBoost IA

Statut : Sprint 0. Risques priorisés par impact × probabilité. À revoir à chaque sprint.

Niveaux : **Critique**, **Élevé**, **Moyen**, **Faible**.

## Risques prioritaires

| # | Risque | Impact | Probabilité | Niveau | Parade |
| --- | --- | --- | --- | --- | --- |
| R1 | Sources d'offres non autorisées (scraping, contournement de conditions) | Juridique, blocage produit | Élevée | **Critique** | Uniquement APIs officielles, flux publics et CSV ; fiche source avec conditions, quotas, coûts ; aucun contournement de CAPTCHA/restrictions (Sprint 4) |
| R2 | Envoi d'emails non sollicités / délivrabilité / plainte spam | Réputation, juridique, compte suspendu | Élevée | **Critique** | Un seul fournisseur officiel, volume faible, quotas, exclusions, désinscription, mode auto désactivé par défaut, tests vers adresse contrôlée (Sprints 9-10) |
| R3 | Non-conformité RGPD (données candidat, CV, réponses) | Juridique, confiance | Moyenne | **Élevé** | Minimisation, finalités documentées, rétention, export/suppression, sous-traitants, chiffrement, validation juridique avant bêta |
| R4 | Fuite de secrets ou de données personnelles (logs, Git, frontend) | Critique | Moyenne | **Élevé** | Secrets côté serveur, `.env.local` ignoré, logs sans CV ni jetons, rotation/révocation, scan CI |
| R5 | Injection de prompt via CV, offres ou emails | Comportement agent détourné | Élevée | **Élevé** | Contenus traités comme non fiables, séparation instructions/données, sorties structurées, politiques serveur non modifiables par les agents |
| R6 | Hallucination / invention de compétences ou diplômes | Perte de confiance, préjudice candidat | Moyenne | **Élevé** | Faits confirmés uniquement, statut confirmé/incertain, contrôle qualité, tests de non-invention |
| R7 | Envoi en double ou relance après réponse/rebond | Réputation, juridique | Moyenne | **Élevé** | Idempotence, clé d'unicité, journal d'événements, annulation des relances, arrêt d'urgence |
| R8 | Défaut d'isolation entre comptes (IDOR, RLS manquante) | Critique | Moyenne | **Élevé** | `user_id` partout, RLS, guards serveur, tests anti-IDOR à chaque endpoint |
| R9 | Coûts IA incontrôlés | Financier | Moyenne | **Élevé** | Interface fournisseur, limites de tokens, cache, fallback sans IA, `UsageMeter`, alertes budget |
| R10 | Fichiers CV hostiles (PDF/DOCX malveillants, bombes de décompression) | Sécurité | Moyenne | **Élevé** | Limite de taille, validation du type réel, analyse antivirus si possible, stockage privé, traitement isolé |
| R11 | Files de tâches bloquées ou perdues (serverless, redémarrage) | Fiabilité | Moyenne | **Moyen** | Table persistante, verrouillage, retries limités, backoff, circuit breaker, health checks, alertes |
| R12 | Dépendance à un fournisseur (Supabase, IA, email) et changement des offres gratuites | Coût / continuité | Moyenne | **Moyen** | Abstractions, exports de données, plan de migration, estimation de coût avant production |
| R13 | Périmètre trop large (15 sprints) pour une petite équipe | Retard, qualité | Élevée | **Moyen** | Ordre 0→8 puis 9→15, critères de sortie stricts, pas de fonctionnalité hors sprint |
| R14 | Accessibilité et responsive insuffisants | Adoption | Moyenne | **Moyen** | Tests clavier, contrastes, principaux navigateurs, revue à chaque sprint UI |
| R15 | Conditions d'utilisation des emails professionnels (prospection) | Juridique | Moyenne | **Moyen** | Vérifier canal, destinataire, finalité et opposition ; registre de consentement/opposition ; validation juridique |

## Risques liés à l'état du dépôt (Sprint 0)

| # | Risque | Parade |
| --- | --- | --- |
| R16 | Dépôt vide : aucune base de code, aucun test, aucun historique technique | Initialiser au Sprint 1 avec une base minimale testée, puis sprints incrémentaux |
| R17 | Stack non validée (hébergement, base, email, IA) | Trancher les questions ouvertes de `docs/architecture.md` avant le Sprint 3 |
| R18 | Absence de CI dès le départ | Mettre en place lint/types/tests/build dès le Sprint 1 |
| R19 | Vulnérabilités npm de `postcss` embarqué par Next.js 15 (audit npm) | Suivre les correctifs ; la correction automatique propose Next.js 16, écarté pour l'instant (crash VM constaté). Réévaluer avant la production (Sprint 13/14) |

## Suivi

- Revue des risques à chaque fin de sprint.
- Tout risque Critique ou Élevé doit avoir un test ou un contrôle automatisé avant la bêta.
- Aucun risque accepté sans décision écrite (ADR ou note dans ce fichier).
