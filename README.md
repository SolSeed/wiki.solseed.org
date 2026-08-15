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
├── site/                               # Public URL root
│   ├── .nojekyll
│   ├── CNAME
│   └── ...generated archive...
└── README.md
```

GitHub Actions copies `site/` to an untracked `_site/` staging directory,
builds a Pagefind search index there, and deploys `_site/` as a GitHub Pages
artifact. Consequently, `site/index.html` is served as `/`, not `/site/`, and
no deployment branch is required.

The production archive must provide `site/index.html`. It should preserve the
historical MediaWiki routes wherever practical, including `/SolSeed` and
`/A_Frame_of_Paper_And_Ink`, by using directory indexes or another static,
GitHub Pages-compatible layout.

## Search

The workflow runs Pagefind 1.5.2 after staging the HTML. It writes the generated
browser bundle and index to `_site/pagefind/`; those files are deployed but are
not committed. Until HTML exists, the workflow deliberately skips this step.

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
