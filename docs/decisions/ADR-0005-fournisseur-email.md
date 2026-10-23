# ADR-0005 — Un seul fournisseur email officiel, sans contournement

- Statut : proposé (à valider)
- Date : 2026-10-23
- Sprint : 0

## Contexte

Le produit doit envoyer des candidatures et des relances, tout en respectant les conditions d'utilisation, les quotas et la vie privée. Le cahier des charges interdit tout contournement de CAPTCHA, de restrictions ou de protections, et impose un mode automatique désactivé par défaut.

## Décision

- Intégrer **un seul** fournisseur email au démarrage, via OAuth/API officielle (par exemple Gmail API ou Microsoft Graph) ou SMTP autorisé.
- Permissions minimales, jetons chiffrés au repos, rotation et révocation.
- Envoi uniquement via une tâche autorisée par les politiques serveur.
- Simulation, puis test vers une adresse contrôlée par l'utilisateur avant tout envoi réel.
- Quotas, plafond quotidien, délai minimum, horaires, domaines exclus, limite de relances.
- Arrêt d'urgence et suspension sur réponse, rebond, refus, opposition ou erreur.
- Aucune automatisation de formulaires tiers en dehors d'une API ou méthode officiellement autorisée.

## Justification

- Réduit le risque juridique et de réputation (R1, R2, R15).
- Un seul fournisseur limite la surface d'intégration et les coûts.
- Les garde-fous serveur garantissent que l'IA ne déclenche jamais un envoi non autorisé.

## Conséquences

- Le fournisseur retenu doit être choisi avant le Sprint 9 (question ouverte).
- La délivrabilité et les politiques anti-spam doivent être testées à faible volume (Sprint 15).
- Les jetons OAuth nécessitent un chiffrement applicatif et une procédure de révocation documentée.

## Alternatives considérées

- **Envoi SMTP générique non vérifié** : risque de spam et de blocage.
- **Automatisation de webmails par navigateur** : contraire au périmètre et aux conditions d'utilisation.
- **Plusieurs fournisseurs dès le départ** : complexité prématurée.
