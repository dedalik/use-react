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

Publishing is triggered from GitHub Actions when you push a tag matching `v*` (see `.github/workflows/release-npm.yml`). The tag annotation should describe the release; you can reuse the latest commit message automatically:

```bash
npm run release:tag -- 1.0.6
```

This creates an **annotated** tag `v1.0.6` whose message is the **subject and body of `HEAD`**. Then push the tag (after `package.json` version matches, if you bump it separately):

```bash
git push origin v1.0.6
```

Alternatively use `npm version patch` (or minor/major), which bumps `package.json` and creates a tag with its own default message.

### If npm did not show a new version after pushing a tag

1. **Open GitHub Actions** for `dedalik/use-react` → workflow **Release to npm** → the run that matches your tag (`v*`). A red run means publish never completed; open the failed step and read the log (common causes: missing token, auth error, or version already published).

2. **Repository secret `NPM_TOKEN`** — required for every publish. In GitHub open **Settings → Secrets and variables → Actions → New repository secret**, name **`NPM_TOKEN`**, value = token from npm.

   On npmjs.com go to **Access Tokens** ([direct link](https://www.npmjs.com/settings/~/tokens)).

   - **Classic token type must be `Automation`**, not `Publish` or `Read-only`. `Publish` tokens still hit **`npm error code EOTP`** (one-time password) in GitHub Actions because npm expects interactive 2FA. **Automation** tokens are meant for CI and can publish without OTP.
   - Alternatively use a **Granular Access Token** with **Read and write** for **`@dedalik/use-react`** (configure publish permissions in the token wizard).

   Paste the token value into `NPM_TOKEN` only once; GitHub will not show it again.

   Until this secret exists, CI shows `ENEEDAUTH` / `need auth` on `npm whoami` because `NODE_AUTH_TOKEN` is empty.

   **If the Actions log still shows `NODE_AUTH_TOKEN:` blank** (our step prints `Repository secret NPM_TOKEN is missing or empty`):

   - Add the secret on **`dedalik/use-react`** (the **library** repository that runs **Release to npm**), not on **`use-react-docs`**. The docs repo never receives this workflow.
   - The name must be exactly **`NPM_TOKEN`** (case-sensitive). **Repository secrets** tab under **Actions**, not only **Variables** — variables are not passed to `secrets.NPM_TOKEN`.
   - You need **admin** access to that GitHub repo to create repository secrets.
   - If the org uses **organization secrets**: ensure this repository is **allowed** to use that secret (org **Settings → Secrets and variables → Actions** → secret → repository access).
   - If you stored the token under a **GitHub Environment** (for example `production`), either move it to plain **repository** secrets named `NPM_TOKEN`, or add `environment: <name>` to the `publish` job in `.github/workflows/release-npm.yml` so the job can read environment secrets.

3. **Version already on the registry**: npm rejects publishing the same semver twice. Check with `npm view @dedalik/use-react version` and `npm view @dedalik/use-react versions`. Bump to a new semver and tag again, or run **Actions → Release to npm → Run workflow** and enter a new version.

4. **Tag format**: the workflow only reacts to tags named `v1.2.3` (leading `v`, semver after it). Lightweight tags still trigger the workflow, but an annotated tag is recommended for release notes.

5. **Manual publish**: from a clean checkout with `npm ci`, `npm run build`, and `npm login`, run `npm publish --access public` (requires 2FA or token as configured on your npm account).

## Pull requests

- Keep changes focused and describe the motivation in the PR text.
- Confirm `npm run format:check`, `npm run lint`, `npm run test`, and `npm run build` pass locally.
- Documentation and user-facing strings should be in **English**.

## Documentation site

The public docs live in a separate repository. See the [use-react-docs](https://github.com/dedalik/use-react-docs) project if you are updating the VitePress site or examples shown on usereact.org.
