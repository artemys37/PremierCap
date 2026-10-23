# ADR-0002 — PostgreSQL Supabase pour base, auth et stockage

- Statut : proposé (à valider)
- Date : 2026-10-23
- Sprint : 0

## Contexte

Le cahier des charges recommande PostgreSQL avec migrations reproductibles, une authentification par utilisateur, un stockage privé pour les CV et une isolation stricte des données (RLS). Le budget doit rester minimal.

## Décision

Utiliser Supabase pour :

- PostgreSQL managé ;
- Supabase Auth (email + mot de passe, vérification email, MFA possible) ;
- Supabase Storage avec buckets privés et URLs signées ;
- politiques RLS sur toutes les tables liées à un utilisateur ;
- migrations SQL versionnées dans `supabase/migrations/`.

## Justification

- Offre gratuite suffisante pour le développement et un faible volume de bêta.
- RLS native, adaptée aux exigences d'isolation et d'anti-IDOR.
- Stockage privé sans serveur de fichiers à maintenir.
- Migrations SQL simples et réversibles.

## Conséquences

- Les requêtes sensibles passent par le serveur ou par des politiques RLS vérifiées ; aucune confiance au client.
- La clé `SUPABASE_SERVICE_ROLE_KEY` reste exclusivement côté serveur et n'est jamais exposée au navigateur.
- Prévoir un export régulier des données et un plan de migration vers PostgreSQL self-hosted si les coûts ou les limites changent (R12).
- La validation juridique RGPD doit inclure Supabase comme sous-traitant.

## Alternatives considérées

- **PostgreSQL self-hosted + Auth maison** : plus de contrôle, mais coût d'exploitation et de sécurité plus élevé.
- **SQLite** : insuffisant pour un déploiement web multi-utilisateurs et la RLS.
