# ADR-0003 — File de tâches persistante dans PostgreSQL

- Statut : proposé (à valider)
- Date : 2026-10-23
- Sprint : 0

## Contexte

Les envois, relances, collectes de sources et traitements IA ne doivent pas être exécutés dans une requête HTTP. Ils exigent : persistance, idempotence, retries limités, quotas, journalisation et reprise après redémarrage. Le volume initial est faible.

## Décision

Démarrer avec une table PostgreSQL `Task` comme file de tâches :

- statut, type, payload validé, priorité, disponibilité, tentative, erreur ;
- verrouillage par transaction (`SELECT ... FOR UPDATE SKIP LOCKED`) ;
- clé d'idempotence unique par tâche métier ;
- retries limités avec backoff exponentiel ;
- worker séparé (processus Node) qui consomme la file ;
- journal des événements dans `AuditLog` / `MessageEvent`.

Une infrastructure de file dédiée (Redis, SQS, etc.) ne sera ajoutée que si le volume ou la latence l'exigent.

## Justification

- Aucun service supplémentaire au démarrage, coût minimal.
- Transactionnel avec les données métier : une tâche et son effet sont cohérents.
- Idempotence et reprises testables simplement.

## Conséquences

- Un worker doit être déployé et supervisé en plus de l'application web (Sprint 14).
- Les tâches bloquées doivent être détectées par health check et alerte.
- Les payloads ne contiennent ni secret ni donnée personnelle inutile ; uniquement des références.

## Alternatives considérées

- **Exécution dans les routes API** : pas de reprise, timeouts, perte de tâches.
- **Redis / BullMQ** : plus performant, mais service et coût supplémentaires prématurés.
- **Cron uniquement** : insuffisant pour les délais, quotas et reprises par tâche.
