# Contributing to use-react

Thanks for contributing.

## Development setup

1. Clone the repository.
2. Install dependencies:

```bash
npm install
```

3. Run tests:

```bash
npm run test
```

4. Run lint:

```bash
npm run lint
```

## Pull requests

- Keep pull requests focused and small.
- Add or update tests for behavior changes.
- Update docs in `use-react-docs` when hook APIs change.
- Ensure `npm run test` and `npm run lint` pass locally before opening a PR.

## Commit quality

- Write clear commit messages explaining the intent.
- Avoid unrelated formatting-only changes in functional PRs.

## Release process

- CI publishes to npm automatically when a GitHub Release is published with a semver tag like `v1.2.3`.
- The workflow syncs `package.json` version from the release tag before publishing.
