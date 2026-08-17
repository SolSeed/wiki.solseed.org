# Published site root

Place the generated static MediaWiki archive in this directory. GitHub Actions
publishes the *contents* of this directory at <https://wiki.solseed.org/>; the
directory name `site` does not appear in public URLs.

The archive generator must eventually provide `site/index.html`. Keep `CNAME`
and `.nojekyll` in this directory. Search is intentionally omitted so the build
does not download or execute third-party packages.
