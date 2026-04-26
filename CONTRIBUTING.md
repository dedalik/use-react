# Contributing to useReact

Thank you for helping improve `@dedalik/use-react`. This document covers how to set up your environment and match project conventions before you open a pull request.

## Prerequisites

- Node.js 20 or newer (GitHub Actions uses Node 24)
- npm (recommended; `npm ci` is used in CI)

## Getting started

```bash
git clone https://github.com/dedalik/use-react.git
cd use-react
npm ci
```

## Code style

We use **Prettier** for formatting and **ESLint** for linting. Configuration lives in `.prettierrc.json` and `.eslintrc` at the repository root.

| Command            | Purpose                                      |
| ------------------ | -------------------------------------------- |
| `npm run format`   | Format `src/`, `tests/`, and `example/src/` |
| `npm run format:check` | Verify formatting (CI and pre-publish) |
| `npm run lint`     | Run ESLint                                   |

Run `npm run format` before committing if your editor does not format on save. Husky runs `format:check`, `lint`, and `test` on pre-commit when hooks are installed (`npm install` runs `husky install` via the `prepare` script).

## Tests

```bash
npm test
npm run test:coverage
```

Add or update tests under `__tests__/` for any behavior change.

## Build

```bash
npm run build
```

Ensure the TypeScript build completes without errors.

## Release tags (npm)

Publishing runs from GitHub Actions on tags matching `v*` (`.github/workflows/release-npm.yml`). Annotate the tag from `HEAD` when you want the tag message to match the release commit:

```bash
npm run release:tag -- 1.0.6
git push origin v1.0.6
```

Alternatively use `npm version patch` (or minor/major), which bumps `package.json` and creates a tag.

### Trusted publishing (recommended, no `NPM_TOKEN`)

[npm Trusted Publishing](https://docs.npmjs.com/trusted-publishers/) uses **OIDC** from GitHub Actions so you do **not** store a long-lived npm token in GitHub.

1. On **npmjs.com**, open package **`@dedalik/use-react`** → **Publishing access** / package settings → **Trusted Publisher** (wording may vary) → choose **GitHub Actions**.
2. Enter exactly:
   - **Organization or user:** `dedalik`
   - **Repository:** `use-react`
   - **Workflow filename:** `release-npm.yml` (only the file name, must match the file under `.github/workflows/`, case-sensitive)
   - **Environment (optional):** leave empty unless you also add `environment: <name>` to the `publish` job in this repo - if you set an environment on npm, the job must use the same name.
3. Keep **`package.json` → `repository.url`** pointing at this repo (`git+https://github.com/dedalik/use-react.git`) - npm uses it for provenance and publisher checks.
4. The workflow already sets **`permissions: id-token: write`**, **Node 24**, and upgrades **npm to 11.5.1+** (required for OIDC). Publishing runs **`npm publish --access public`** with **no** `NODE_AUTH_TOKEN`.

The **first** publish of a brand-new package may still require a one-time manual `npm publish` with login; after the package exists, switch to trusted publishing only.

### Legacy: `NPM_TOKEN` (optional)

The workflow **does not read `NPM_TOKEN`**. If you are not using trusted publishing yet, add token-based auth back to the workflow locally, or publish manually. For a token-based CI setup, use a classic **`Automation`** token (not `Publish`) to avoid **`EOTP`** in Actions - see [npm access tokens](https://www.npmjs.com/settings/~/tokens).

### If the registry did not update after a tag

1. **Actions** → **Release to npm** → open the failed run and read the log.
2. **Trusted publisher mismatch:** npm shows auth errors if **owner**, **repo**, or **workflow file name** does not match npm’s form exactly (`release-npm.yml`). **`workflow_dispatch`** is validated against the **same** workflow file name.
3. **Version already published:** `npm view @dedalik/use-react versions` - bump semver and tag again.
4. **Self-hosted runners:** trusted publishing is **not** supported on self-hosted GitHub runners yet (npm limitation); use GitHub-hosted `ubuntu-latest` as in this workflow.
5. **Manual publish:** `npm login` then `npm publish --access public` from a machine with the built `dist/` folder.

## Pull requests

- Keep changes focused and describe the motivation in the PR text.
- Confirm `npm run format:check`, `npm run lint`, `npm run test`, and `npm run build` pass locally.
- Documentation and user-facing strings should be in **English**.

## Documentation site

The public docs live in a separate repository. See the [use-react-docs](https://github.com/dedalik/use-react-docs) project if you are updating the VitePress site or examples shown on usereact.org.
