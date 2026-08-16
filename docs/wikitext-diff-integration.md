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

Revision metadata must provide an explicit `revisions` array. Only entries whose `approved` field is strictly `true` can be selected, and either approved revision may be chosen as the before or after side:

```js
const revisionMetadata = {
  revisions: [
    { id: "2026-01", approved: true, wikitext: "..." },
    { id: "2026-02", approved: true, wikitext: "..." },
  ],
};
```

`buildLineDiff` returns rows with `type` `equal`, `add`, `delete`, or `change`. Change rows include `oldSegments` and `newSegments`; segments have `type` `equal`, `add`, or `delete` and a text value for optional intraline styling.

Both renderers use only `document.createElement` and `textContent`. Attach CSS to the emitted `wikitext-diff-*` classes; do not replace this with `innerHTML` when displaying revision content.
