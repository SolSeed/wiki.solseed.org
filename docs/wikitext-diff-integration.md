# Wikitext diff integration

`src/client/wikitext-diff.js` is a browser ESM module with no dependencies. It compares source text only; it does not interpret wikitext or insert HTML from it.

```js
import {
  buildLineDiff,
  renderInlineDiff,
  renderSplitDiff,
  selectRevisionPair,
} from "./src/client/wikitext-diff.js";

const { before, after } = selectRevisionPair(revisionMetadata, requestedBeforeId, requestedAfterId);
const model = buildLineDiff(before.wikitext, after.wikitext);
document.querySelector("#diff").replaceChildren(renderSplitDiff(document, model));
```

Revision metadata must provide the exporter’s explicit `revisions` array. The exporter includes only approved entries; this module selects only from that exported list. Use the exporter’s `revision_id` field, and either exported revision may be chosen as the before or after side:

```js
const revisionMetadata = {
  revisions: [
    { revision_id: "2026-01", wikitext: "..." },
    { revision_id: "2026-02", wikitext: "..." },
  ],
};
```

`buildLineDiff` returns rows with `type` `equal`, `add`, `delete`, or `change`. Change rows include `oldSegments` and `newSegments`; segments have `type` `equal`, `add`, or `delete` and a text value for optional intraline styling.

Both renderers use only `document.createElement` and `textContent`. Attach CSS to the emitted `wikitext-diff-*` classes; do not replace this with `innerHTML` when displaying revision content.
