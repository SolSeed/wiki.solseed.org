# SolSeed Wiki Archive

Static, preservation-oriented restoration of the historical SolSeed MediaWiki 1.16 site.

The generated site is intended to be published at <https://wiki.solseed.org> with GitHub Pages. This repository is the **output repository**: generated HTML, public media, styles, scripts, route directories, provenance data, and validation reports that belong to the public site should be committed here. Source dumps, credentials, private user data, temporary uploads, and restoration tooling remain outside this repository.

## Repository layout

- `CNAME` configures the GitHub Pages custom domain.
- `.nojekyll` tells GitHub Pages to serve generated files without Jekyll processing.
- Generated archive routes and assets will be written alongside these files.

The production build must provide an `index.html` at the repository root before deployment. It must also preserve MediaWiki-compatible page routes, including `/SolSeed` and `/A_Frame_of_Paper_And_Ink`, using directory indexes or another Pages-compatible static layout.

## Local preview

From this directory, after the static archive has been generated:

```sh
python3 -m http.server 8080
```

Then open <http://localhost:8080/>. A local static server is useful for checking links and assets, but it does not perfectly reproduce GitHub Pages URL normalization; validate the deployed staging URL before changing DNS.

## Publishing

Create an empty GitHub repository, add it as `origin`, push `main`, and configure GitHub Pages to deploy from the `main` branch at the repository root. See the deployment instructions supplied with the restoration handoff for the exact commands and DNS checks.

## Preservation boundary

Do not commit `backup.sql`, the MediaWiki installation, `LocalSettings.php`, password hashes, email addresses, session/token data, deleted/private revisions, quarantined uploads, or the historical Google Analytics identifier. Public files should be reproducibly derived from the immutable source archive in the parent working repository.
