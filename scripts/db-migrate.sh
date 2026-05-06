#!/usr/bin/env bash
set -eo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PKG_DIR="$REPO_ROOT/packages/pokemon-user-backend"
TSX="$REPO_ROOT/node_modules/.bin/tsx"
MIKRO_ORM_CLI="$REPO_ROOT/node_modules/@mikro-orm/cli/cli.js"

cd "$PKG_DIR"
exec "$TSX" "$MIKRO_ORM_CLI" migration:up
