import{renderInlineDiff,renderSplitDiff,selectRevisionPair}from'/assets/wikitext-diff.js';
const shell=document.querySelector('[data-diff-shell]');
const form=document.querySelector('[data-diff-controls]');
const status=document.querySelector('[data-diff-status]');
const result=document.querySelector('[data-diff-result]');
const params=new URLSearchParams(location.search);
const from=params.get('from'),to=params.get('to'),mode=params.get('mode')==='inline'?'inline':'split';
if(form&&from)form.elements.from.value=from;
if(form&&to)form.elements.to.value=to;
if(form&&form.elements.mode)form.elements.mode.value=mode;
const getJson=async url=>{const response=await fetch(url);if(!response.ok)throw new Error('metadata fetch failed');return response.json()};
const getText=async url=>{const response=await fetch(url);if(!response.ok)throw new Error('revision fetch failed');return response.text()};
if(shell&&from&&to){
  const pageId=encodeURIComponent(shell.dataset.pageId);
  getJson('/archive-data/pages/'+pageId+'/page.json').then(async page=>{
    const pair=selectRevisionPair(page,from,to);
    const base='/archive-data/pages/'+pageId+'/revisions/';
    const texts=await Promise.all([getText(base+encodeURIComponent(pair.before.revision_id)+'.'+(pair.before.source_extension||'wiki')),getText(base+encodeURIComponent(pair.after.revision_id)+'.'+(pair.after.source_extension||'wiki'))]);
    if(status)status.textContent='Revision '+from+' compared with revision '+to+'.';
    if(result)result.replaceChildren(mode==='inline'?renderInlineDiff(document,...texts):renderSplitDiff(document,...texts));
  }).catch(()=>{if(status)status.textContent='That revision pair is not public for this page.';if(result)result.replaceChildren()});
}