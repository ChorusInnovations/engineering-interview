# Pokemon Interview — Tilt dev environment
#
# Prerequisites:
#   - Docker Desktop with Kubernetes enabled (or any local k8s cluster)
#   - tilt (https://docs.tilt.dev/install.html)
#
# Usage:
#   tilt up     — start everything
#   tilt down   — tear down all resources
#
# Services:
#   Postgres  → localhost:5432  (admin/admin, db: pokemon)
#   Backend   → localhost:3000/api
#   Frontend  → localhost:4200

watch_settings(ignore=['packages/**/vite.config.ts.timestamp-*.mjs', 'dist/**'])

include('./tilt/postgres/Tiltfile')
include('./packages/pokemon-user-backend/Tiltfile')
include('./packages/pokemon-ui/Tiltfile')
