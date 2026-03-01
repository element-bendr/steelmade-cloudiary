# Project Overview

This project was migrated into `/mnt/shared/projects/node/<project>` as part of the canonical workspace. Use `/opt/dev/nvm` to pin the Node.js version locally:

```bash
source /opt/dev/nvm/nvm.sh
nvm install --lts
nvm use
```

## Bootstrap

```bash
npm install
npm run lint
npm run test
```

## Development Workflow

- `npm run dev` – local development server
- `npm run build` – production bundle
- `npm test` – automated test suite (adjust per project)

Update this README with project-specific commands, dependencies, and deployment notes after verifying the migrated source.
