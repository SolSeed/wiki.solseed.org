#!/usr/bin/env python3
"""Create the checked-in Markdown-first archive from the reviewed 2018 XML dump."""

from __future__ import annotations

import argparse, hashlib, html, json, os, re, shutil, tempfile, uuid
import xml.etree.ElementTree as ET
from pathlib import Path

SPAM_USERS = {
    "Ambepal", "Boydwknpci", "Chenleti", "Churromi", "Deansawn", "Duax2ogrwo",
    "Erbyem", "Harmdels", "Imagiph", "Jamapadu", "Jamqweb9ba", "Marbun",
    "MCaraway48", "Olimnar", "Ottogea", "Paulrgzpca", "Peettait", "Richzgmjpe",
    "SGibbs21", "Wernheli", "Yiyuan",
}
ARCHIVE_TIMESTAMP = "2018-12-15T00:00:00Z"
NS = {0:"",1:"Talk",2:"User",3:"User talk",4:"SolSeed",6:"File",7:"File talk",8:"MediaWiki",10:"Template",12:"Help",14:"Category"}

def local(tag): return tag.rsplit("}", 1)[-1]
def child(node, name): return next((x for x in node if local(x.tag) == name), None)
def text_of(node, name):
    item = child(node, name); return "" if item is None or item.text is None else item.text
def digest(text): return hashlib.sha256(text.encode()).hexdigest()
def write_json(path, value):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2, sort_keys=True)+"\n")

def parse_xml(path):
    pages=[]; namespaces=dict(NS)
    for _event,node in ET.iterparse(path,events=("end",)):
        tag=local(node.tag)
        if tag=="namespace" and "key" in node.attrib: namespaces[int(node.attrib["key"])]=node.text or ""
        elif tag=="page":
            title=text_of(node,"title"); raw_namespace=text_of(node,"ns")
            namespace_id=int(raw_namespace) if raw_namespace else 0
            if not raw_namespace and ":" in title:
                prefix=title.split(":",1)[0].casefold()
                namespace_id=next((key for key,value in namespaces.items() if key and value.casefold()==prefix),0)
            bare=title.split(":",1)[1] if namespace_id and ":" in title else title
            revisions=[]
            for rev in (x for x in node if local(x.tag)=="revision"):
                contributor_node=child(rev,"contributor"); contributor="(unknown)"
                if contributor_node is not None: contributor=text_of(contributor_node,"username") or text_of(contributor_node,"ip") or contributor
                revisions.append({"revision_id":int(text_of(rev,"id")),"timestamp":text_of(rev,"timestamp"),"author":contributor,"comment":text_of(rev,"comment"),"text":text_of(rev,"text")})
            pages.append({"page_id":int(text_of(node,"id")),"namespace_id":namespace_id,"namespace_name":namespaces.get(namespace_id,""),"database_title":bare.replace(" ","_"),"display_title":title,"revisions":revisions})
            node.clear()
    return pages

def split_top(text, separator="|"):
    parts=[]; start=0; curly=square=0; i=0
    while i<len(text):
        pair=text[i:i+2]
        if pair=="{{": curly+=1; i+=2; continue
        if pair=="}}" and curly: curly-=1; i+=2; continue
        if pair=="[[": square+=1; i+=2; continue
        if pair=="]]" and square: square-=1; i+=2; continue
        if text[i]==separator and not curly and not square: parts.append(text[start:i]); start=i+1
        i+=1
    parts.append(text[start:]); return parts

def replace_balanced(text, opener, closer, callback):
    while True:
        stack=[]; match=None; i=0
        while i<len(text)-1:
            pair=text[i:i+len(opener)]
            if pair==opener: stack.append(i); i+=len(opener); continue
            if text[i:i+len(closer)]==closer and stack:
                start=stack.pop(); match=(start,i+len(closer)); break
            i+=1
        if not match: return text
        start,end=match; text=text[:start]+callback(text[start+len(opener):end-len(closer)])+text[end:]

def transclusion_body(text):
    only=re.findall(r"<onlyinclude[^>]*>(.*?)</onlyinclude\s*>",text,re.I|re.S)
    if only: text="".join(only)
    text=re.sub(r"<noinclude[^>]*>.*?</noinclude\s*>","",text,flags=re.I|re.S)
    return re.sub(r"</?includeonly[^>]*>","",text,flags=re.I)

class Converter:
    def __init__(self,pages):
        self.by_title={self.key(p["display_title"]):p for p in pages}; self.sources={self.key(p["display_title"]):p["revisions"][-1]["text"] for p in pages}; self.templates={}
        for p in pages:
            if p["namespace_id"]==10: self.templates[self.key(p["display_title"])]=p["revisions"][-1]["text"]
    def key(self,title): return str(title).replace("_"," ").strip().casefold()
    def expand(self,text,stack=(),depth=0):
        if depth>15: return "[Template expansion depth exceeded]"
        def parameter(inner):
            bits=split_top(inner); name=bits[0].strip(); return bits[1] if len(bits)>1 else ""
        text=replace_balanced(text,"{{{","}}}",parameter)
        def template(inner):
            bits=split_top(inner); raw=bits[0].strip()
            if not raw: return ""
            title=raw[1:].strip() if raw.startswith(":") else raw if ":" in raw else "Template:"+raw
            key=self.key(title)
            if key in stack: return f"[Cyclic template omitted: {raw}]"
            source=self.sources.get(key) if raw.startswith(":") or ":" in raw else self.templates.get(key)
            if source is None:
                if raw.casefold() in {"clear","tocright","reflist"}: return ""
                details="; ".join(value.strip() for value in bits[1:] if value.strip())
                suffix=f" — {details}" if details else ""
                return f"[Template unavailable in the 2018 archive: {raw}{suffix}]"
            positional={}; named={}; n=1
            for value in bits[1:]:
                pair=split_top(value,"=")
                if len(pair)>1: named[pair[0].strip()]="=".join(pair[1:]).strip()
                else: positional[str(n)]=value.strip(); n+=1
            body=transclusion_body(source)
            def param(match):
                name=match.group(1).strip(); default=match.group(2) or ""
                return named.get(name,positional.get(name,default))
            body=re.sub(r"\{\{\{([^{}|]+)(?:\|([^{}]*))?\}\}\}",param,body)
            return self.expand(body,stack+(key,),depth+1)
        return replace_balanced(text,"{{","}}",template)
    def route(self,target):
        target=target.strip().replace(" ","_"); target=target[1:] if target.startswith(":") else target
        return "/"+target
    def inline(self,text):
        text=re.sub(r"<!--.*?-->","",text,flags=re.S)
        def internal(match):
            bits=split_top(match.group(1)); target=bits[0].strip(); label=(bits[-1].strip() if len(bits)>1 else target.split(":",1)[-1]).replace("_"," ")
            if target.casefold().startswith(("file:","image:")):
                name=target.split(":",1)[1].replace(" ","_"); return f"![{label}](/assets/uploads/{name})"
            return f"[{label}]({self.route(target)})"
        text=re.sub(r"\[\[([^\[\]]+)\]\]",internal,text)
        def external(match):
            url=match.group(1); label=(match.group(2) or url).strip()
            if re.search(r"(?:action=(?:edit|submit)|Special:(?:UserLogin|CreateAccount))",url,re.I): return ""
            return f"[{label}]({url})"
        text=re.sub(r"\[(https?://[^\s\]]+)(?:\s+([^\]]+))?\]",external,text)
        text=re.sub(r"'''(.*?)'''",r"**\1**",text,flags=re.S); text=re.sub(r"''(.*?)''",r"*\1*",text,flags=re.S)
        text=re.sub(r"<br\s*/?>","  \n",text,flags=re.I); text=re.sub(r"<b[^>]*>(.*?)</b\s*>",r"**\1**",text,flags=re.I|re.S); text=re.sub(r"<i[^>]*>(.*?)</i\s*>",r"*\1*",text,flags=re.I|re.S); text=re.sub(r"</?(?:div|span|font|center|big|small|p|table|tbody|tr|td|th)[^>]*>","",text,flags=re.I)
        text=re.sub(r"<(?:youtube|videoflash)[^>]*>(.*?)</(?:youtube|videoflash)>",r"[Archived video unavailable: \1]",text,flags=re.I|re.S)
        text=re.sub(r"<youtube\s+v=[\"']?([^\"'\s/>]+)[\"']?\s*/>",r"[Archived YouTube video](https://www.youtube.com/watch?v=\1)",text,flags=re.I)
        return html.unescape(text)
    def convert(self,text):
        text=self.expand(text)
        text=re.sub(r"^\s*#redirect\s*\[\[([^\]]+)\]\]",lambda m:f"This archived page redirects to [{m.group(1)}]({self.route(m.group(1))}).",text,flags=re.I)
        text=re.sub(r"^(\*+)\s*",lambda m:"  "*(len(m.group(1))-1)+"- ",text,flags=re.M)
        text=re.sub(r"^(#+)\s*",lambda m:"  "*(len(m.group(1))-1)+"1. ",text,flags=re.M)
        text=re.sub(r"^(={1,6})\s*(.*?)\s*\1\s*$",lambda m:"#"*min(6,len(m.group(1))+1)+" "+m.group(2),text,flags=re.M)
        text=re.sub(r"^;+\s*(.*)$",r"**\1**",text,flags=re.M); text=re.sub(r"^:+\s*","",text,flags=re.M)
        text=re.sub(r"^\{\|.*$|^\|\}.*$|^\|-\s*$","",text,flags=re.M)
        text=re.sub(r"^[!|](?:[^|\n]*\|)?\s*(.*)$",r"\1",text,flags=re.M)
        text=self.inline(text)
        text=re.sub(r"action=(?:edit|submit)","archived-action-removed",text,flags=re.I)
        text=re.sub(r"Special:(?:UserLogin|CreateAccount)","Archived_control_removed",text,flags=re.I)
        text=re.sub(r"\{\{[^\n]*",lambda m:f"[Unresolved legacy notation: {m.group(0)[2:].strip()}]",text)
        text=re.sub(r"^\|+", "", text, flags=re.M)
        text=re.sub(r"^\*\*\s*$", "", text, flags=re.M)
        text=re.sub(r"\*{3,}", "**", text)
        text=re.sub(r"\n{3,}","\n\n",text).strip()
        return text+"\n" if text else "_This archived page has no textual content._\n"

def build(xml_path,output,inventory_path=None,images_root=None):
    pages=parse_xml(xml_path); converter=Converter(pages); max_revision=max(r["revision_id"] for p in pages for r in p["revisions"])
    temporary=Path(tempfile.mkdtemp(prefix=f".{output.name}-",dir=output.parent)); manifest_pages=[]; totals={"published":0,"excluded":0}
    try:
        for offset,page in enumerate(sorted(pages,key=lambda p:p["page_id"]),1):
            clean=[r for r in page["revisions"] if r["author"] not in SPAM_USERS]; excluded=len(page["revisions"])-len(clean)
            if not clean: raise ValueError(f"page {page['page_id']} has no clean revision")
            site_id=max_revision+offset; entries=[]
            for index,rev in enumerate(clean):
                source=rev["text"]; previous=clean[index-1]["revision_id"] if index else None; following=clean[index+1]["revision_id"] if index+1<len(clean) else site_id
                meta={"revision_id":rev["revision_id"],"original_parent_revision_id":page["revisions"][max(0,page["revisions"].index(rev)-1)]["revision_id"] if page["revisions"].index(rev) else None,"previous_public_revision_id":previous,"next_public_revision_id":following,"timestamp":rev["timestamp"],"author":rev["author"],"comment":rev["comment"],"wikitext_bytes":len(source.encode()),"wikitext_sha256":digest(source),"same_as_previous_public":index>0 and source==clean[index-1]["text"],"excluded_revision_count_since_previous_public":0}
                entries.append(meta); folder=temporary/"pages"/str(page["page_id"])/"revisions"/str(rev["revision_id"]); write_json(folder/"revision.json",meta); (folder/"source.wiki").write_text(source)
            markdown=converter.convert(clean[-1]["text"]); prior=clean[-1]["revision_id"]
            entries[-1]["next_public_revision_id"]=site_id; write_json(temporary/"pages"/str(page["page_id"])/"revisions"/str(prior)/"revision.json",entries[-1])
            meta={"revision_id":site_id,"original_parent_revision_id":prior,"previous_public_revision_id":prior,"next_public_revision_id":None,"timestamp":ARCHIVE_TIMESTAMP,"author":"SolSeed archive migration","comment":"Create maintainable Markdown archive revision","source_format":"markdown","revision_origin":"site","derived_from_revision_id":prior,"markdown_bytes":len(markdown.encode()),"markdown_sha256":digest(markdown),"same_as_previous_public":False,"excluded_revision_count_since_previous_public":0}
            entries.append(meta); folder=temporary/"pages"/str(page["page_id"])/"revisions"/str(site_id); write_json(folder/"revision.json",meta); (folder/"source.md").write_text(markdown)
            route=page["display_title"].replace(" ","_")
            doc={**{k:page[k] for k in ("page_id","namespace_id","database_title","display_title")},"canonical_path":"/"+route,"current_revision_id":site_id,"original_revision_count":len(page["revisions"]),"published_revision_count":len(clean),"site_revision_count":1,"excluded_spam_revision_count":excluded,"revisions":entries}
            write_json(temporary/"pages"/str(page["page_id"])/"page.json",doc)
            manifest_pages.append({"page_id":page["page_id"],"namespace_id":page["namespace_id"],"database_title":page["database_title"],"canonical_path":"/"+route,"current_revision_id":site_id,"published_revision_count":len(clean),"excluded_spam_revision_count":excluded}); totals["published"]+=len(clean); totals["excluded"]+=excluded
        media_count=missing_media_count=0
        if inventory_path and images_root:
            inventory=json.loads(inventory_path.read_text())
            for image in inventory.get("images",[]):
                name=image["name"]
                if Path(name).name != name: raise ValueError(f"unsafe media name: {name}")
                key=hashlib.md5(name.encode()).hexdigest(); source=images_root/key[0]/key[:2]/name
                if not source.is_file(): missing_media_count+=1; continue
                target=temporary/"media"/name; target.parent.mkdir(parents=True,exist_ok=True); shutil.copyfile(source,target); media_count+=1
        manifest={"schema_version":1,"source_xml":xml_path.name,"source_xml_sha256":hashlib.sha256(xml_path.read_bytes()).hexdigest(),"archive_as_of":"2018-12-15","page_count":len(pages),"pages":manifest_pages,"original_revision_count":totals["published"]+totals["excluded"],"published_revision_count":totals["published"],"site_revision_count":len(pages),"excluded_spam_revision_count":totals["excluded"],"media_count":media_count,"missing_media_count":missing_media_count}
        write_json(temporary/"manifest.json",manifest)
        backup=output.parent/f".{output.name}.previous-{uuid.uuid4().hex}" if output.exists() else None
        if backup: os.replace(output,backup)
        os.replace(temporary,output)
        if backup: shutil.rmtree(backup)
        return manifest
    except Exception: shutil.rmtree(temporary,ignore_errors=True); raise

if __name__=="__main__":
    parser=argparse.ArgumentParser(); parser.add_argument("--xml",type=Path,required=True); parser.add_argument("--output",type=Path,default=Path("_source")); parser.add_argument("--inventory",type=Path); parser.add_argument("--images",type=Path); args=parser.parse_args()
    result=build(args.xml.resolve(),args.output.resolve(),args.inventory.resolve() if args.inventory else None,args.images.resolve() if args.images else None); print(f"Imported {result['page_count']} pages, {result['media_count']} media files, and excluded {result['excluded_spam_revision_count']} spam revisions")
