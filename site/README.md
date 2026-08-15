# Published site root

Place the generated static MediaWiki archive in this directory. GitHub Actions
publishes the *contents* of this directory at <https://wiki.solseed.org/>; the
directory name `site` does not appear in public URLs.

The archive generator must eventually provide `site/index.html`. Keep `CNAME`
and `.nojekyll` in this directory. Do not commit the generated `pagefind/`
directory: the deployment workflow creates it in a temporary staging copy.
