const escapeHtml = (value) => String(value ?? "")
  .replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;").replaceAll("'", "&#39;");

const safeUrl = (value) => /^(?:https?:\/\/|mailto:|\/|#)/i.test(String(value ?? "").trim())
  ? String(value).trim() : "#";

const inline = (source) => {
  const tokens = [];
  let text = String(source).replace(/!\[([^\]]*)\]\(([^\s)]+)(?:\s+"[^"]*")?\)/g, (_all, alt, url) => {
    const key = `\u0000${tokens.length}\u0000`;
    tokens.push(`<img src="${escapeHtml(safeUrl(url))}" alt="${escapeHtml(alt)}" loading="lazy">`);
    return key;
  }).replace(/\[([^\]]+)\]\(([^\s)]+)(?:\s+"[^"]*")?\)/g, (_all, label, url) => {
    const key = `\u0000${tokens.length}\u0000`;
    const external = /^https?:\/\//i.test(url) ? ' rel="noreferrer"' : "";
    tokens.push(`<a href="${escapeHtml(safeUrl(url))}"${external}>${escapeHtml(label)}</a>`);
    return key;
  });
  text = escapeHtml(text).replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, "<em>$1</em>");
  return text.replace(/\u0000(\d+)\u0000/g, (_all, index) => tokens[Number(index)]);
};

export function renderMarkdown(source) {
  const lines = String(source ?? "").replaceAll("\r\n", "\n").split("\n");
  const output = []; let paragraph = []; let list = null;
  const flushParagraph = () => { if (paragraph.length) output.push(`<p>${inline(paragraph.join(" "))}</p>`); paragraph = []; };
  const closeList = () => { if (list) output.push(`</${list}>`); list = null; };
  for (const line of lines) {
    if (!line.trim()) { flushParagraph(); closeList(); continue; }
    const heading = /^(#{1,6})\s+(.+)$/.exec(line);
    if (heading) { flushParagraph(); closeList(); const level = heading[1].length; output.push(`<h${level}>${inline(heading[2])}</h${level}>`); continue; }
    if (/^---+$/.test(line.trim())) { flushParagraph(); closeList(); output.push("<hr>"); continue; }
    const item = /^(\s*)([-*+] |\d+[.)] )(.+)$/.exec(line);
    if (item) { flushParagraph(); const kind = /^\d/.test(item[2]) ? "ol" : "ul"; if (list !== kind) { closeList(); output.push(`<${kind}>`); list = kind; } output.push(`<li>${inline(item[3])}</li>`); continue; }
    const quote = /^>\s?(.*)$/.exec(line);
    if (quote) { flushParagraph(); closeList(); output.push(`<blockquote><p>${inline(quote[1])}</p></blockquote>`); continue; }
    paragraph.push(line.trim());
  }
  flushParagraph(); closeList(); return output.join("\n");
}
