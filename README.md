# SolSeed Wiki Archive

Static, preservation-oriented restoration of the historical SolSeed MediaWiki
1.16 site, published at <https://wiki.solseed.org/>.

The current migration direction is Markdown-first: approved historical
wikitext remains immutable, while each maintainable current page is introduced
as a clearly labeled site-authored Markdown revision. See
[`docs/markdown-migration-plan.md`](docs/markdown-migration-plan.md) for the
test-driven, worktree-based execution plan and [`AGENTS.md`](AGENTS.md) for
model routing and repository working rules.

This is the public output repository. Generated HTML, public media, styles,
scripts, route directories, and public provenance data belong under `site/`.
Source database dumps, the MediaWiki installation, credentials, private user
data, temporary uploads, and restoration tooling do not belong here.

## Repository layout

```text
.
├── .github/workflows/deploy-pages.yml  # Test, build, and publish Pages
├── scripts/check-supply-chain.mjs      # Reject package and mutable CI inputs
├── scripts/build-static-version.mjs    # Generate deployment identity page
├── site/                               # Public URL root
│   ├── .nojekyll
│   ├── CNAME
│   └── ...generated archive...
├── VERSION                             # SemVer 2 site release number
└── README.md
```

GitHub Actions validates the dependency-free policy, runs the tests, copies
`site/` to an untracked `_site/` staging directory, and deploys `_site/` as a
GitHub Pages artifact. Consequently, `site/index.html` is served as `/`, not
`/site/`, and no deployment branch is required.

Each deployment also generates `/static-version/index.html`. Visiting
`/static-version` shows the SemVer 2 release number from `VERSION` and the full
Git commit SHA used by that deployment. Bump `VERSION` when publishing a new
site release; it begins at `0.0.1`.

## Commit versions

The repository includes `.githooks/pre-commit`. It preserves the `MAJOR.MINOR.PATCH`
release number and increments SemVer build metadata for each commit:

```text
0.0.1
0.0.1+commit.1
0.0.1+commit.2
```

Enable the versioned hooks once after cloning:

```sh
git config core.hooksPath .githooks
```

The hook updates and stages `VERSION` automatically. It is idempotent when a
commit fails or is cancelled after the hook runs. To begin another release,
replace `VERSION` with a new `MAJOR.MINOR.PATCH` value and stage it; the hook
will add `+commit.1`.

The production archive must provide `site/index.html`. It should preserve the
historical MediaWiki routes wherever practical, including `/SolSeed` and
`/A_Frame_of_Paper_And_Ink`, by using directory indexes or another static,
GitHub Pages-compatible layout.

## Dependency policy

The archive has no package manifest, dependency installation, or one-off package
execution. Build and test files are checked into this repository and run
directly with Node. `scripts/check-supply-chain.mjs` rejects package-manager
manifests and lockfiles, package-manager execution in automation, mutable
third-party GitHub Action references, and executable binary files.

Search is intentionally omitted until it can be implemented with small,
reviewed, dependency-free code stored in this repository.

## Local preview

Validate and generate the archive with:

```sh
node scripts/check-supply-chain.mjs
node --test
node scripts/build-archive.mjs
```

During page editing, rebuild only the changed page by passing its numeric page
ID. This preserves the rest of `site/` and keeps the Markdown development loop
fast:

```sh
node scripts/build-archive.mjs _source site 1
```

Then assemble and preview it with:

```sh
cp -a site _site
node scripts/build-static-version.mjs _site "$(git rev-parse HEAD)"
python3 -m http.server 8080 --directory _site
```

Then open <http://localhost:8080/>. Remove `_site/` when finished; it is ignored
by Git.

## GitHub Pages setup

In the repository settings:

1. Under **Pages**, select **GitHub Actions** as the publishing source.
2. Set the custom domain to `wiki.solseed.org`.
3. Configure the domain's DNS record for GitHub Pages and enable HTTPS after
   GitHub validates it.

The workflow deploys only from `main`. Pull requests can run separate validation
checks later without publishing.

## Preservation boundary

Do not commit `backup.sql`, `LocalSettings.php`, password hashes, email addresses,
session or token data, deleted/private revisions, quarantined uploads, or the
historical Google Analytics identifier. Public files should be reproducibly
derived from the immutable source archive in the parent restoration repository.
