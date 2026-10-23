# ADR-0004 — Abstraction du fournisseur IA et garde-fous serveur

- Statut : proposé (à valider)
- Date : 2026-10-23
- Sprint : 0

## Contexte

Les agents IA doivent produire des sorties structurées, traçables et bornées, avec un coût maîtrisé et un mode dégradé si le fournisseur est indisponible. Les contenus externes (CV, offres, emails) sont non fiables et ne doivent jamais modifier les instructions ou permissions.

## Décision

- Définir une interface `LLMProvider` indépendante du fournisseur.
- Utiliser OpenAI comme premier fournisseur, avec un modèle économique et un plafond de tokens configurables.
- Prompts **versionnés** dans le code, avec schéma Zod de sortie.
- Appels **exclusivement côté serveur** ; aucune clé dans le frontend.
- Limites : timeout, retries limités, budget par tâche et par utilisateur (`UsageMeter`), cache des résultats reproductibles.
- Fallback sans IA : les fonctions déterministes (matching, règles, quotas) continuent de fonctionner.
- Les données externes sont délimitées dans le prompt et ne peuvent pas modifier les instructions, politiques ou permissions.
- Toute sortie est validée avant usage ; en cas d'échec, comportement conservateur (pas d'envoi).

## Justification

- Évite le verrouillage fournisseur et permet de comparer les coûts.
- Réduit les risques d'injection de prompt et d'hallucination.
- Le produit reste utilisable en mode dégradé (critère d'acceptation global).

## Conséquences

- Un contrat typé par agent (entrée/sortie) est requis (Sprint 6).
- Les prompts et versions sont journalisés sans données personnelles inutiles.
- Le coût par candidature doit être mesuré et alerté (Sprint 12/14).

## Alternatives considérées

- **Appels directs au SDK OpenAI partout** : duplication, pas de fallback, coûts non mesurés.
- **Modèle local dès le départ** : coût d'exploitation et qualité encore incertains ; option à réévaluer.
