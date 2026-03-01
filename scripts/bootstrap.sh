#!/usr/bin/env bash
# Node bootstrap helper for migrated projects.
set -euo pipefail

source /opt/dev/nvm/nvm.sh
nvm use --lts
npm install
npm run lint || true
npm test || true
