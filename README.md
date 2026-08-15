# SolSeed Wiki Archive

Static, preservation-oriented restoration of the historical SolSeed MediaWiki
1.16 site, published at <https://wiki.solseed.org/>.

This is the public output repository. Generated HTML, public media, styles,
scripts, route directories, and public provenance data belong under `site/`.
Source database dumps, the MediaWiki installation, credentials, private user
data, temporary uploads, and restoration tooling do not belong here.

## Repository layout

```text
.
├── .github/workflows/deploy-pages.yml  # Build search and publish Pages
├── scripts/build-static-version.mjs    # Generate deployment identity page
├── site/                               # Public URL root
│   ├── .nojekyll
│   ├── CNAME
│   └── ...generated archive...
├── VERSION                             # SemVer 2 site release number
└── README.md
```

GitHub Actions copies `site/` to an untracked `_site/` staging directory,
builds a Pagefind search index there, and deploys `_site/` as a GitHub Pages
artifact. Consequently, `site/index.html` is served as `/`, not `/site/`, and
no deployment branch is required.

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

## Search

The workflow runs Pagefind 1.5.2 after staging the HTML. It writes the generated
browser bundle and index to `_site/pagefind/`; those files are deployed but are
not committed. The generated version page ensures every deployment has at least
one HTML document even before the historical archive is added.

Generated pages can load Pagefind's component UI with:

```html
<link href="/pagefind/pagefind-component-ui.css" rel="stylesheet">
<script src="/pagefind/pagefind-component-ui.js" type="module"></script>
<pagefind-modal-trigger></pagefind-modal-trigger>
<pagefind-modal></pagefind-modal>
```

Use `data-pagefind-body` on the main article element when generated pages contain
navigation or other boilerplate that should not be indexed.

## Local preview

After generating the archive, assemble and index it with:

```sh
cp -a site _site
node scripts/build-static-version.mjs _site "$(git rev-parse HEAD)"
npx --yes pagefind@1.5.2 --site _site
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
