*Copied from [Wikipedia's Wikitext help page](https://en.wikipedia.org/wiki/Help:Wikitext)*

*To convert to and from Wikitext, use [pandoc](https://pandoc.org/)*

----

**Wikitext**, also known as *Wiki markup* or *Wikicode*, consists of the syntax and keywords used by the [MediaWiki](/MediaWiki) software to format a page. To learn how to see this markup, and to save an edit, see: [Editing](/Help:Editing). Generally, coding can be copied and pasted, without writing new code. There is a short list of markup and tips at [Cheatsheet](/Help:Cheatsheet).

In addition to Wikitext, some [HTML element](/HTML_element)s are also allowed for presentation formatting. See [HTML in wikitext](/Help:HTML_in_wikitext) for information on this.
[Template unavailable in the 2018 archive: TOC limit]

### Layout

#### Sections
Sections in a page will follow the page's [lead/introduction](/WP:LEAD) and (under certain conditions,) the [Table of Contents](/WP:TOC).

##### Section headings
[Template unavailable in the 2018 archive: see — Help:Section; MOS:HEAD]

The <code>=</code> through <code>======</code> markup are headings for the sections with which they are associated.
- A single = is styled as the article title and should not be used within an article.
- Headings are styled through [CSS](/CSS) and add an <code>[edit]</code> link. [See this section](/Help:Cascading_Style_Sheets#Wiki_headings) for the relevant CSS.
- Four or more headings cause a table of contents to be generated automatically.
- Do not use <em>any</em> markup after the final heading markup – this will either break the heading, or will cause the heading to not be included in an edit summary.

[Template unavailable in the 2018 archive: #lst:Help:HTML in wikitext — WIKI_section]

Templates: [Template unavailable in the 2018 archive: tl — fake heading] for use in documentation.

##### Horizontal rule
[Template unavailable in the 2018 archive: see — WP:LINE]

The horizontal rule represents a paragraph-level thematic break. Do not use in article content, as rules are used only after main sections, and this is automatic.

[Template unavailable in the 2018 archive: markup — <nowiki>----</nowiki>; [Template unavailable in the 2018 archive: crlf2]
----]

HTML equivalent: [Template unavailable in the 2018 archive: tag — hr; s]

##### Table of contents
[Template unavailable in the 2018 archive: see — WP:TOC]

When a page has at least four headings, a table of contents (TOC) will automatically appear after the lead and before the first heading. The TOC can be controlled by magic words or templates:
- <code><nowiki>__FORCETOC__</nowiki></code> forces the TOC to appear at the normal location regardless of the number of headings.
- <code><nowiki>__TOC__</nowiki></code> forces the TOC to appear at the point where the magic word is inserted instead of the normal location.
- <code><nowiki>__NOTOC__</nowiki></code> disables the TOC entirely.
- [Template unavailable in the 2018 archive: tl — TOC limit] can be used to control the depth of subsections included in the TOC. This is useful where the TOC is long and unwieldy.
- [Category:Wikipedia table of contents templates](/Category:Wikipedia_table_of_contents_templates) contains a number of specialized TOC templates.

#### Line breaks

[Template unavailable in the 2018 archive: see — Wikipedia:Line-break handling; Wikipedia:Don't use line breaks]

Line breaks or newlines are used to add whitespace between lines, such as separating paragraphs.
- A line break that is visible in the content is inserted by pressing [Template unavailable in the 2018 archive: key press — Enter] twice.
- Pressing [Template unavailable in the 2018 archive: key press — Enter] once will place a line break in the markup, but it will not show in the rendered content, except when using list markup.
- Markup such as bold or italics will be terminated at a line break.

[Template unavailable in the 2018 archive: markup — <nowiki>A single newline here
has no effect on the layout.

But an empty line starts a new paragraph, 
or ends a list or an indented part.
</nowiki>; [Template unavailable in the 2018 archive: crlf2]
A single newline here
has no effect on the layout.

But an empty line starts a new paragraph, 
or ends a list or an indented part.]

HTML equivalent: [Template unavailable in the 2018 archive: tag — br; o] or [Template unavailable in the 2018 archive: tag — br; s]

Templates:
- [Template unavailable in the 2018 archive: tl — break] adds multiple line breaks.
- [Template unavailable in the 2018 archive: tl — -] and [Template unavailable in the 2018 archive: tl — clear] adds a break with styling, to clear floating elements.
- [Template unavailable in the 2018 archive: tl — plainlist] and [Template unavailable in the 2018 archive: tl — unbulleted list] both create an unbulleted list.

#### Indent text
[Template unavailable in the 2018 archive: see — WP:INDENT]

Indentation is most commonly used on talk pages.

[Template unavailable in the 2018 archive: markup — <nowiki>Indentation as used on talk pages:
Each colon at the start of a line
causes the line to be indented by three more character positions.
(The indentation persists
so long as no carriage return or line break is used.)
Repeat the indentation at any line break.
Use an extra colon for each response.
And so forth ...
And so on ...
[Template unavailable in the 2018 archive: Outdent — ::::::]The outdent template can give a visual indicator that we're deliberately cancelling the indent (6 levels here)</nowiki>; Indentation as used on talk pages:
Each colon at the start of a line
causes the line to be indented by three more character positions.
(The indentation persists
so long as no carriage return or line break is used.)
Repeat the indentation at any line break.
Use an extra colon for each response.
And so forth ...
And so on ...
[Template unavailable in the 2018 archive: Outdent — ::::::]The outdent template can give a visual indicator that we're deliberately cancelling the indent (6 levels here)]

Templates: [Template unavailable in the 2018 archive: tl — outdent], [Template unavailable in the 2018 archive: tl — outdent2]

#### Blockquote
When there is a need for separating a block of text. This is useful for (as the name says) inserting blocks of quoted (and cited) text.
[Template unavailable in the 2018 archive: markup — <nowiki>**
The **blockquote** tag will indent both margins when needed instead of the left margin only as the colon does.
</blockquote>
</nowiki>; <blockquote>
The **blockquote** tag will indent both margins when needed instead of the left margin only as the colon does.
</blockquote>]

#### Center text
[Template unavailable in the 2018 archive: markup — <source lang="html" inline style="border:none; background:transparent;">Centered text</source>; 2=Centered text]

Template [Template unavailable in the 2018 archive: tl — center] uses the same markup. To center a table, see [Table#Centering tables](/Help:Table#Centering_tables).
Please do not use [Template unavailable in the 2018 archive: tag — center], as it is obsolete.

#### Align text to right
You can align content in a separate container:

[Template unavailable in the 2018 archive: markup — 1=<source lang="html" inline style="border:none; background:transparent;">Text on the right</source>; 2=Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Text on the rightLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.]

Or; make the text float around it:

[Template unavailable in the 2018 archive: markup — 1=<source lang="html" inline style="border:none; background:transparent;">Text on the right</source>; 2=Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Text on the rightLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.; 3=<nowiki>[Template unavailable in the 2018 archive: stack — Text on the right]</nowiki>; 4=Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.[Template unavailable in the 2018 archive: stack — Text on the right]Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.]

#### Lists
[Template unavailable in the 2018 archive: see — Help:List; MOS:LIST]

Do not leave blank lines between items in a list unless there is a reason to do so, since this causes the MediaWiki software to interpret each item as beginning a new list.

##### Unordered lists
[Template unavailable in the 2018 archive: markup — <nowiki>* Item1
- Item2
- Item3
- Item4
  - Sub-item 4 a)
    - Sub-item 4 a) 1.
      - Sub-item 4 a) 1. i)
      - Sub-item 4 a) 1. ii)
  - Sub-item 4 b)
- Item5</nowiki>; [Template unavailable in the 2018 archive: crlf2]
- Item1
- Item2
- Item3
- Item4
  - Sub-item 4 a)
    - Sub-item 4 a) 1.
      - Sub-item 4 a) 1. i)
      - Sub-item 4 a) 1. ii)
  - Sub-item 4 b)
- Item5]

##### Ordered lists
[Template unavailable in the 2018 archive: markup — <nowiki>
1. Item1
1. Item2
1. Item3
1. Item4
  1. Sub-item 1
    1. Sub-sub-item
      1. Sub-sub-sub-item
  1. Sub-item 2
1. Item5
</nowiki>; [Template unavailable in the 2018 archive: crlf2]
1. Item1
1. Item2
1. Item3
1. Item4
  1. Sub-item 1
    1. Sub-sub-item
      1. Sub-sub-sub-item
  1. Sub-item 2
1. Item5]

##### [Template unavailable in the 2018 archive: Anchor — DL]Description lists
[Template unavailable in the 2018 archive: anchors — Definition lists; Association lists; H:DL]
[Template unavailable in the 2018 archive: Shortcut — H:DL]

To list terms and definitions, start a new line with a semicolon (;) followed by the term. Then, type a colon (:) followed by a definition. The format can also be used for other purposes, such as make and models of vehicles, etc.

*Description lists* (formerly *definition lists*, and a.k.a. *association lists*) consist of group names corresponding to values. Group names (terms) are in bold. Values (definitions) are indented. Each group <em>must</em> include one or more definitions. For a single or first value, the <code>:</code> can be placed on the same line after <code>;</code> – but subsequent values must be placed on separate lines.

[Template unavailable in the 2018 archive: hatnote-inline — Do not use a semicolon (;) simply to bold a line without defining a value using a colon (:). This usage renders invalid [HTML5](/HTML5) and creates issues with [screen reader](/screen_reader)s.]

[Template unavailable in the 2018 archive: markup — <nowiki>; Term : Definition1</nowiki>; [Template unavailable in the 2018 archive: crlf2]
**Term : Definition1; <nowiki>; Term**
Definition1
Definition2
Definition3
Definition4</nowiki>; [Template unavailable in the 2018 archive: crlf2]
**Term**
Definition1
Definition2
Definition3
Definition4]

HTML equivalent: [Template unavailable in the 2018 archive: tag — dl; o] [Template unavailable in the 2018 archive: tag — dt], [Template unavailable in the 2018 archive: tag — dd] [Template unavailable in the 2018 archive: tag — dl; c]

Templates: [Template unavailable in the 2018 archive: tl — defn]

#### Retaining newlines and spaces
[Template unavailable in the 2018 archive: shortcut — H:POEM]

The MediaWiki software suppresses single newlines and converts lines starting with a space to preformatted text in a dashed box. HTML suppresses multiple spaces. It is often desirable to retain these elements for poems, lyrics, mottoes, oaths and the like. The [Poem](/mw:Extension:Poem) extension adds HTML-like [Template unavailable in the 2018 archive: tag — poem] tags to maintain newlines and spaces. These tags may be used inside other tags such as [Template unavailable in the 2018 archive: tag — blockquote]. [CSS styles](/H:CSS) may be applied to this tag, e.g.: <code><nowiki></nowiki></code>.

[Template unavailable in the 2018 archive: markup — <nowiki>
In Xanadu did Kubla Khan
  A stately pleasure-dome decree:
Where Alph, the sacred river, ran
  Through caverns measureless to man
Down to a sunless sea.

So twice five miles of fertile ground
  With walls and towers were girdled round:
And there were gardens bright with sinuous rills,
  Where blossomed many an incense-bearing tree;
And here were forests ancient as the hills,
  Enfolding sunny spots of greenery.
</nowiki>; 
In Xanadu did Kubla Khan
  A stately pleasure-dome decree:
Where Alph, the sacred river, ran
  Through caverns measureless to man
Down to a sunless sea.

So twice five miles of fertile ground
  With walls and towers were girdled round:
And there were gardens bright with sinuous rills,
  Where blossomed many an incense-bearing tree;
And here were forests ancient as the hills,
  Enfolding sunny spots of greenery.
]

Poems and their translation can be presented side-by-side, and the language can be indicated with <code>lang="xx"</code>. Following the last side-by-side block, [Template unavailable in the 2018 archive: tlx — Clear; left] must be used to cancel <code>"float:left;"</code> and to re-establish normal flow. Note that this method does not require [a table](/#Tables) and its columns to achieve the side-by-side presentation.

**Markup**
<nowiki>Frère Jacques, frère Jacques,
Dormez-vous? Dormez-vous?
Sonnez les matines! Sonnez les matines!
Ding, dang, dong. Ding, dang, dong.
Are you sleeping? Are you sleeping?
Brother John, Brother John,
Morning bells are ringing! Morning bells are ringing!
Ding, dang, dong. Ding, dang, dong.<br style="clear:both"/></nowiki>
**Renders as**
Frère Jacques, frère Jacques,
Dormez-vous? Dormez-vous?
Sonnez les matines! Sonnez les matines!
Ding, dang, dong. Ding, dang, dong.
Are you sleeping? Are you sleeping?
Brother John, Brother John,
Morning bells are ringing! Morning bells are ringing!
Ding, dang, dong. Ding, dang, dong.<br style="clear:both"/>

### Format
#### Text formatting

- style="vertical-align: top;"
Description
What you type
What it looks like

- id="emph" style="vertical-align: top;"
*italics*, **bold**, [Template unavailable in the 2018 archive: smallcaps — small capital letters]

To *italicize text*, put two consecutive apostrophes on each side of it.

Three apostrophes each side will **bold the text**.

Five consecutive apostrophes on each side (two for italics plus three for bold) produces **bold italics**.

**Italic and bold formatting** works correctly only within a single line.

For text as [Template unavailable in the 2018 archive: smallcaps — small caps], use the template [Template unavailable in the 2018 archive: tl — smallcaps].

To *italicize text*, put two consecutive apostrophes on each side of it.

Three apostrophes each side will **bold the text**.

Five consecutive apostrophes on each side (two for italics plus three for bold) produces **bold italics**.

**Italic and bold formatting** works correctly only within a single line.

For text as [Template unavailable in the 2018 archive: smallcaps — small caps], use the template [Template unavailable in the 2018 archive: tl — smallcaps].

To reverse this effect where it has been automatically applied, use [Template unavailable in the 2018 archive: tl — nobold] and [Template unavailable in the 2018 archive: tl — noitalic].

Small chunks of [source code](/source_code) within a line of normal text.

Code is displayed in a [monospace](/Monospaced_font) font.
<nowiki>function <code>int m2()</code> is nice.</nowiki>
function <code>int m2()</code> is nice.

- style="vertical-align:top;"
[Syntax highlighting](/mw:Extension:SyntaxHighlight) for source code.

Computer code has colored text and more stringent formatting. For example, to define a function: <code>int m2()</code>, with highlights.

See [here](https://github.com/wikimedia/mediawiki-extensions-SyntaxHighlight_GeSHi/blob/master/SyntaxHighlight.lexers.php) for a full list of supported languages that can be put in <code>lang="????"</code>
<nowiki><syntaxhighlight lang="cpp">
1. include <iostream>
int m2 (int ax, char *p_ax) {
  std::cout <<"Hello World!";
  return 0;
}</syntaxhighlight></nowiki>
OR (will be rendered exactly the same way)
<nowiki><source lang="cpp">
1. include <iostream>
int m2 (int ax, char *p_ax) {
  std::cout <<"Hello World!";
  return 0;
}</source></nowiki>
<syntaxhighlight lang="cpp">
1. include <iostream>
int m2 (int ax, char *p_ax) {
  std::cout <<"Hello World!";
  return 0;
}</syntaxhighlight>

Small text
<source lang="html">
Use small text only 
when necessary.
</source>
Use small text only when necessary.

a <nowiki></nowiki> span
<source lang="html">
To match, for example, the font-size used in an [image caption](/Help:Visual_file_markup#Caption), the "small" tag can also be used to 
reduce a text's font-size to 87%.
</source>
To match, for example, the font-size used in an [image caption](/Help:Visual_file_markup#Caption), the "small" tag can also be used to reduce a text's font-size to 87%.

Big text
<source lang="html">
Better not use big text, unless it's within small text.
</source>
Better not use big text, unless it's within small text.

To prevent two words from becoming separated by a [linewrap](/linewrap) (e.g. *Mr. Smith* or *400 km/h*) a **[non-breaking space](/non-breaking_space)**, sometimes also called a "non-printing character", may be used between them. (For three or more words, the template [Template unavailable in the 2018 archive: tl — nowrap] is probably more suitable.)
Mr.&nbsp;Smith or 400&nbsp;km/h
Mr. Smith or 400 km/h

**Extra spacing** within text is usually best achieved using the [Template unavailable in the 2018 archive: tl — pad] template.
<nowiki>Mary [Template unavailable in the 2018 archive: pad — 4.0em] had a little lamb.</nowiki>
Mary [Template unavailable in the 2018 archive: pad — 4.0em] had a little lamb.

#### Special characters
[Template unavailable in the 2018 archive: See also — Help:Special characters; List of XML and HTML character entity references]
Special characters can often be displayed using [numeric character references](/Numeric_character_reference) or [character entity references](/List_of_XML_and_HTML_character_entity_references). See [Character encodings in HTML](/Character_encodings_in_HTML) for more information. For example, <code>&Agrave;</code> and <code>&#xC0;</code> both render [À](/À) (A-[grave](/Grave_accent)). [Percent-encoding](/Percent-encoding) can't be used, as it works only in [URL](/URL)s.

##### Diacritical marks
[Diacritic](/Diacritic) marks, using character entity references.

What you type
What it looks like

<nowiki>&Agrave; &Aacute; &Acirc; &Atilde; &Auml; &Aring; &AElig;

&Ccedil; &Egrave; &Eacute; &Ecirc; &Euml;

&Igrave; &Iacute; &Icirc; &Iuml; &Ntilde;

&Ograve; &Oacute; &Ocirc; &Otilde; &Ouml; &Oslash; &OElig;

&Ugrave; &Uacute; &Ucirc; &Uuml; &Yuml; &szlig;

&agrave; &aacute; &acirc; &atilde; &auml; &aring; &aelig; &ccedil;

&egrave; &eacute; &ecirc; &euml;

&igrave; &iacute; &icirc; &iuml; &ntilde;

&ograve; &oacute; &ocirc; &otilde; &ouml; &oslash; &oelig;

&ugrave; &uacute; &ucirc; &uuml; &yuml;</nowiki>

À Á Â Ã Ä Å Æ

Ç È É Ê Ë

Ì Í Î Ï Ñ

Ò Ó Ô Õ Ö Ø Œ

Ù Ú Û Ü Ÿ ß

à á â ã ä å æ ç

è é ê ë

ì í î ï ñ

ò ó ô õ ö ø œ

ù ú û ü ÿ

##### Punctuation special characters
Using character entity references.

What you type
What it looks like

<code>&iquest; &iexcl; &sect; &para;</code>
¿ ¡ § ¶ 

<code>&dagger; &Dagger; &bull; &ndash; &mdash;</code>
† ‡ • – —

<code>&lsaquo; &rsaquo; &laquo; &raquo;</code>
‹ › « »

<code>&lsquo; &rsquo; &ldquo; &rdquo;</code>
‘ ’ “ ”

<code>&apos; &quot;</code> 
' "

##### Escaping punctuation characters
The [[#Pre|[Template unavailable in the 2018 archive: tag — pre; o]]], [[#Nowiki|[Template unavailable in the 2018 archive: tag — nowiki; o]]], and  [[#Code|[Template unavailable in the 2018 archive: tag — code; o]]]  markup tags are also available, for writing <nowiki>"[", "{", "&", "}", "]"</nowiki> for example. These tags prevent these characters from being recognised as wiki markup, which is a possibility in some circumstances.

##### Commercial symbols
Using character entity references.

What you type
What it looks like

<code>&trade; &copy; &reg; </code>
™ © ®

<code>&cent; &euro; &yen; &pound; &curren;
</code>
¢ € ¥ £ ¤

##### Greek characters
Using character entity references.

What you type
What it looks like

<code>&alpha; &beta; &gamma; &delta; &epsilon; &zeta; </code>
α β γ δ ε ζ

<code>&Alpha; &Beta; &Gamma; &Delta; &Epsilon; &Zeta;</code>
Α Β Γ Δ Ε Ζ

<code>&eta; &theta; &iota; &kappa; &lambda; &mu; &nu;</code>
η θ ι κ λ μ ν

<code>&Eta; &Theta; &Iota; &Kappa; &Lambda; &Mu; &Nu; </code>
Η Θ Ι Κ Λ Μ Ν

<code>&xi; &omicron; &pi; &rho; &sigma; &sigmaf;</code>
ξ ο π ρ σ ς

<code>&Xi; &Omicron; &Pi; &Rho; &Sigma; </code>
Ξ Ο Π Ρ Σ

<code>&tau; &upsilon; &phi; &chi; &psi; &omega;</code>
τ υ φ χ ψ ω

<code>&Tau; &Upsilon; &Phi; &Chi; &Psi; &Omega; </code>
Τ Υ Φ Χ Ψ Ω

##### Egyptian hieroglyphs
[Template unavailable in the 2018 archive: main — Help:WikiHiero syntax]

WikiHiero is a software extension that renders [Egyptian hieroglyphs](/Egyptian_hieroglyphs) as PNG images using [Template unavailable in the 2018 archive: xtag — hiero] tags.

Example:
[Template unavailable in the 2018 archive: markup — <nowiki><hiero>P2</hiero></nowiki>; <hiero>P2</hiero>]

##### Chess symbols
[Template unavailable in the 2018 archive: main — Chess symbols in Unicode]

For example, &#9812; displays ♔

##### Subscripts and superscripts
- The [Manual of Style](/Wikipedia:Manual_of_Style_(mathematics)#Superscripts_and_subscripts) prefers the [Template unavailable in the 2018 archive: tag — sub; o] and [Template unavailable in the 2018 archive: tag — sup; o] formats, for example <code>x[Template unavailable in the 2018 archive: tag — sub; content=1]</code>. So this should be used under most circumstances.
- The latter methods of sub/superscripting cannot be used in the most general context, as they rely on Unicode support that may not be present on all users' machines.

Description
What you type
What it looks like

*Subscripts*
<nowiki>
x<sub>1</sub> x<sub>2</sub> x<sub>3</sub> or

x&#8320; x&#8321; x&#8322; x&#8323; x&#8324;

x&#8325; x&#8326; x&#8327; x&#8328; x&#8329;
</nowiki>
x<sub>1</sub> x<sub>2</sub> x<sub>3</sub> or

x₀ x₁ x₂ x₃ x₄

x₅ x₆ x₇ x₈ x₉

*Superscripts*
<nowiki>
x<sup>1</sup> x<sup>2</sup> x<sup>3</sup> or

x&#8304; x&sup1; x&sup2; x&sup3; x&#8308;

x&#8309; x&#8310; x&#8311; x&#8312; x&#8313;
</nowiki>
x<sup>1</sup> x<sup >2</sup > x<sup >3</sup > or

x⁰ x¹ x² x³ x⁴

x⁵ x⁶ x⁷ x⁸ x⁹

*Combined*

&epsilon;<sub>0</sub> = 8.85 &times; 10<sup>&minus;12</sup> C&sup2; / J m

1 [hectare](/hectare) = [1 E+4 m&sup2;](/1_E+4_m&sup2;)

ε<sub>0</sub> = 8.85 × 10<sup>−12</sup> C² / J m

1 [hectare](/hectare) = [1 E+4 m²](/1_E+4_m²)

##### Characters in the Private Use Area, and invisible formatting characters
[Template unavailable in the 2018 archive: main — MOS:TEXT#PUA and RTL]

Invisible and [PUA (Private Use Areas)](/Private_Use_Areas) characters should be avoided where possible.  When needed, they should both be replaced with their (hexa)decimal code values (as "&#(x)...;").  This renders invisible characters visible, for manual editing, and allows [AWB](/Wikipedia:AutoWikiBrowser) to process pages with PUA characters.  The latter should also be tagged with the [Template unavailable in the 2018 archive: tl — PUA] template for tracking and future maintenance.

#### Mathematical characters and formulae
##### Mathematical characters
- See also [Mathematical symbols](/Wikipedia:Mathematical_symbols), [WikiProject Mathematics](/Wikipedia:WikiProject_Mathematics) and [TeX](/TeX).

What you type
What it looks like

∫ ∑ ∏ √

− ± ∞

≈ ∝ ≡ ≠

≤ ≥

× · ÷ ∂

′ ″

∇ ‰ ° ∴ ℵ

ø

∈ ∉ ∩ ∪

⊂ ⊃ ⊆ ⊇

¬ ∧ ∨ ∃ ∀

⇒ ⇐ ⇓ ⇑ ⇔

→ ← ↓ ↑ ↔

##### Mathematical formulae
[Template unavailable in the 2018 archive: main — Help:Displaying a formula]

- Formulae that include mathematical letters, like [Template unavailable in the 2018 archive: math — x], and operators like <code>×</code> should not use the plain letter <code>x</code>. See [math font formatting](/MOS:MATH#Font_formatting). For a comprehensive set of symbols, and comparison between [Template unavailable in the 2018 archive: tag — math; o] tags and the [Template unavailable in the 2018 archive: tl — math] template see section [*TeX vs HTML*](/Help:Displaying_a_formula#TeX_vs_HTML).

- The [Template unavailable in the 2018 archive: tag — math; o] tag typesets using [LaTeX markup](/MOS:MATH#Typesetting_of_mathematical_formulae), which may render as an image or as HTML, depending on environmental settings. The [Template unavailable in the 2018 archive: tag — math; o] tag is best for the complex formula on its own line in an image format. If you use this tag to put a formula in the line with text, put it in the [Template unavailable in the 2018 archive: tl — nowrap] template.

- The [Template unavailable in the 2018 archive: tl — math] template [uses HTML](/MOS:MATH#Using_HTML), and will size-match a serif font, and will also prevent line-wrap. All templates are sensitive to the <code>=</code> sign, so remember to replace <code>=</code> with <code>[Template unavailable in the 2018 archive: tl — [Template unavailable in the 2018 archive: =]]</code> in template input, or start the input with <code>1=</code>. Use wikimarkup <code><nowiki>*</nowiki></code> and <code><nowiki>**</nowiki></code> inside the [Template unavailable in the 2018 archive: tl — math] template, as well as other [HTML entities](/Wikipedia:Mathematical_symbols). The [Template unavailable in the 2018 archive: tl — math] template is best for typeset formulas in line with the text.

[Template unavailable in the 2018 archive: markup — <source lang="tex" inline>
<math>2x \times 4y \div 6z + 8 - \frac {y}{z^2} = 0</math>
</source>

<source lang="html" inline>
[Template unavailable in the 2018 archive: math — 2*x* × 4*y* ÷ 6*z* + 8 − [Template unavailable in the 2018 archive: sfrac — *y*; *z*<sup>2</sup>] [Template unavailable in the 2018 archive: =] 0]
</source>

<source lang="tex" inline>
<math>\sin 2\pi x + \ln e</math>
</source>
<nowiki>
[Template unavailable in the 2018 archive: math — sin 2&pi;*x* + ln *e*]
</nowiki>; <math>2x \times 4y \div 6z + 8 - \frac {y}{z^2} = 0</math>
[Template unavailable in the 2018 archive: crlf]

[Template unavailable in the 2018 archive: math — 2*x* × 4*y* ÷ 6*z* + 8 − [Template unavailable in the 2018 archive: sfrac — *y*; *z*<sup>2</sup>] [Template unavailable in the 2018 archive: =] 0]

<math>\sin 2\pi x + \ln e</math>[Template unavailable in the 2018 archive: crlf]
[Template unavailable in the 2018 archive: math — sin 2π*x* + ln *e*]]

##### Spacing in simple math formulae
- Using **<code>&nbsp;</code>** to prevent line break is not needed; the [Template unavailable in the 2018 archive: tl — math] template will prevent line breaks anyway; you can use [Template unavailable in the 2018 archive: tag — br; s] if you need an explicit line break inside a formula.

[Template unavailable in the 2018 archive: markup — <source lang="html" inline>
It follows that [Template unavailable in the 2018 archive: math — *x*<sup>2</sup> ≥ 0] for real [Template unavailable in the 2018 archive: mvar — x].
</source>; 2=

It follows that [Template unavailable in the 2018 archive: math — *x*<sup>2</sup> ≥ 0] for real [Template unavailable in the 2018 archive: mvar — x].]

##### Complicated formulae
- See [Displaying a formula](/Help:Displaying_a_formula) for how to use [Template unavailable in the 2018 archive: tag — math; o].
- A formula displayed on a line by itself should probably be indented by using the colon (:) character.

[Template unavailable in the 2018 archive: markup — <source lang="latex" inline>
<math>\sum_{n=0}^\infty \frac{x^n}{n!}</math>
</source>; 2=[Template unavailable in the 2018 archive: crlf2]
<math>\sum_{n=0}^\infty \frac{x^n}{n!}</math>]

### Links and URLs
[Template unavailable in the 2018 archive: main — Help:Link]

#### Free links
In [Wikipedia](/Wikipedia) and some other [wiki](/wiki)s, **free links** are used in [wikitext](/wikitext) markup to produce [internal link](/internal_link)s between pages, as opposed to the concept of [CamelCase](/CamelCase) for the same purpose, which was used in the early days of Wikipedia – see [CamelCase and Wikipedia](/Wikipedia:CamelCase_and_Wikipedia).

In [Wikipedia's markup language](/Wikipedia:How_to_edit_a_page#Wiki_markup), you create free links by putting double square brackets around text designating the title of the page you want to link to. Thus, <code><nowiki>[Texas](/Texas)</nowiki></code> will be rendered as [Texas](/Texas). Optionally, you can use a [vertical bar](/vertical_bar) (|) to customize the link title. For example, typing <code><nowiki>[Lone Star State](/Texas)</nowiki></code> will produce [Lone Star State](/Texas), a link that is displayed as "<u>Lone Star State</u>" but in fact links to [Texas](/Texas).

##### Link to another wiki article
- Internally, the first letter of the target page is automatically capitalized and spaces are represented as underscores (typing an underscore in the link has the same effect as typing a space, but is not recommended).
- Thus the link hereafter is to the Web address <code>en.wikipedia.org/wiki/Public_transport</code>, which is the Wikipedia article with the name "Public transport". See also [Canonicalization](/Help:Link#Conversion_to_canonical_form).
- [A red link](/Intentionally_permanent_red_link) is a page that doesn't exist yet; it can be created by clicking on the link.
- [A link to its own page](/Help:Self_link) will appear only as bold text.

[Template unavailable in the 2018 archive: markup — <nowiki>London has [public transport](/public_transport).</nowiki>; London has [public transport](/public_transport).; <nowiki>Link to this article: "[Wikitext](/Help:Wikitext)" will appear only as bold text.</nowiki>; Link to this article: "[Wikitext](/Help:Wikitext)" will appear only as bold text.]

##### Renamed link
- Same target, different name.
- The target ("piped") text must be placed **first**, then the text to be displayed **second**.

What you type
What it looks like

<code><nowiki>New York also has [public transportation](/public_transport).</nowiki></code>
New York also has [public transportation](/public_transport).

##### Automatically rename links
- Simply typing the pipe character | after a link will automatically rename the link in certain circumstances. The next time you open the edit box you will see the expanded piped link. When [previewing](/Help:Show_preview) your edits, you will not see the expanded form until you press **Save** and **Edit** again. The same applies to [links to sections within the same page](/#link-to-section).
- See [Pipe trick](/Help:Pipe_trick) for details.

Description
What you type
What it looks like

*Automatically hide stuff in parentheses*
<code><nowiki>[](/kingdom_(biology))</nowiki></code>
[kingdom](/kingdom_(biology))

*Automatically hide the comma and following text*
]]</nowiki></code>
Seattle]]

*Automatically hide namespace*
<code><nowiki>[](/Wikipedia:Village_pump)</nowiki></code>
[Village pump](/Wikipedia:Village_pump)

*Or both*
<code><nowiki>[](/Wikipedia:Manual_of_Style_(headings))</nowiki></code>
[Manual of Style](/Wikipedia:Manual_of_Style_(headings))

*<b>But this doesn't work for section links**
<code><nowiki>[](/Wikipedia:Manual_of_Style#Links)</nowiki></code>
[](/Wikipedia:Manual_of_Style#Links)

##### Blend link
- Endings are blended into the link. 
  - *Exception*: a trailing [apostrophe](/apostrophe) (') and any characters following the apostrophe are *not* blended.
- Preferred style is to use this instead of a piped link, if possible.
- Blending can be suppressed by using the [[#Nowiki|[Template unavailable in the 2018 archive: tag — nowiki; s]]] tag, which may be desirable in some instances.

Description
What you type
What it looks like

*Blending active*
<code><nowiki>San Francisco also has [public transport](/public_transport)ation. Examples include [bus](/bus)es, [taxicab](/taxicab)s, and [tram](/tram)s.</nowiki></code>
San Francisco also has [public transport](/public_transport)ation. Examples include [bus](/bus)es, [taxicab](/taxicab)s, and [tram](/tram)s.

<code><nowiki>A [micro-](/micro-)second</nowiki></code>
A [micro-](/micro-)second

*Blending suppressed*
<code><nowiki>A [micro-](/micro-)<nowiki />second.</nowiki></code>
A [micro-](/micro-)<nowiki />second

##### Link to a section of a page
- The part after the hash sign (#) must match a [section heading](/Section_editing#Creation_and_numbering_of_sections) on the page. Matches must be exact in terms of spelling, case, and punctuation. Links to non-existent sections are not broken; they are treated as links to the beginning of the page.
- Include "| link title" to create a stylish ([piped](/WP:Piping)) link title.
- If sections have the same title, add a number to link to any but the first. [#Example section 3](/#Example_section_3) goes to the third section named "Example section". You can use the pipe and retype the section title to display the text without the # symbol.

What you type
What it looks like

<code><nowiki>[Manual of Style#Italics](/Wikipedia:Manual_of_Style#Italics) is a link to a section within another page.</nowiki></code>
[Manual of Style#Italics](/Wikipedia:Manual_of_Style#Italics) is a link to a section within another page.

<code><nowiki>[#Links and URLs](/#Links_and_URLs) is a link to another section on the current page. [Links and URLs](/#Links_and_URLs) is a link to the same section without showing the # symbol.</nowiki></code>
[#Links and URLs](/#Links_and_URLs) is a link to another section on the current page. [Links and URLs](/#Links_and_URLs) is a link to the same section without showing the # symbol.

<code><nowiki>[Italics](/Wikipedia:Manual_of_Style#Italics) is a piped link to a section within another page.</nowiki></code>
[Italics](/Wikipedia:Manual_of_Style#Italics) is a piped link to a section within another page.

##### Create a page link
- To create a new page:
- # Create a link to it on some other (related) page.
- # Save that page.
- # Click on the link you just made. The new page will open for editing.
- For more information, see [starting an article](/Wikipedia:Starting_an_article) and check out Wikipedia's [naming conventions](/Wikipedia:Naming_conventions).
- Please do not create a new article without linking to it from at least one other article.

Description
What you type
What it looks like

*Links to pages that don’t exist yet look red.*
<code><nowiki>The article about [cardboard sandwiches](/cardboard_sandwiches) doesn't exist yet.</nowiki></code>
The article about [cardboard sandwiches](/cardboard_sandwiches) doesn't exist yet.

#### Redirects
[Template unavailable in the 2018 archive: main — Help:Redirect]

- [Redirect](/Wikipedia:Redirect) one article title to another by placing a directive like the one shown to the right on the *first* line of the article (such as at a page titled "[USA](/USA)").
- It is possible to redirect to a section. For example, a redirect to [United States#History](/United_States#History) will redirect to the History section of the [United States](/United_States) page, if it exists.

Description
What you type

*Redirect to an article*
<code><nowiki>#REDIRECT [United States](/United_States) </nowiki></code>

*Redirect to a section*
<code><nowiki>#REDIRECT [United States#History](/United_States#History)</nowiki></code>

#### Link to another [namespace](/Help:namespace)
- The full page name should be included in double square brackets.

What you type
What it looks like

<code><nowiki>See the [Manual of Style](/Wikipedia:Manual_of_Style).</nowiki></code>
See the [Manual of Style](/Wikipedia:Manual_of_Style).

#### Link to the same article in another language (interlanguage links)
[Template unavailable in the 2018 archive: main — Help:Interlanguage links; Wikipedia:Complete list of language wikis available]
[Template unavailable in the 2018 archive: notice — After the launch of [Wikidata](/Wikipedia:Wikidata), interlanguage links are now added through it. Links in articles should exist only in special cases, for example when an article in one language has two articles in another language.]

- To link to a corresponding page in another language, use the form: <code><nowiki>[<em>Foreign title</em><nowiki>](/</nowiki><em>language_code</em>:<em>Foreign_title</em><nowiki>)</nowiki></code>.
- It is recommended interlanguage links be placed at the very end of the article.
- Interlanguage links are not visible within the formatted article, but instead appear as language links on the sidebar (to the left) under the menu section "languages".

- **NOTE:** To create an **inline link** (a clickable link within the text) to *any* foreign language article, see [Interlanguage links#Inline interlanguage links](/Help:Interlanguage_links#Inline_interlanguage_links) and consider the usage notes.

Description
What you type

*Link from English article "Plankton" to the Spanish article ["Plancton"](/es:Plancton).*

*"es" is the language code for "[Template unavailable in the 2018 archive: lang — es; español]" (the [Spanish language](/Spanish_language)).*

[Plancton](/es:Plancton)

*Other examples: French (<code>fr</code> for [Template unavailable in the 2018 archive: lang — fr; français]), German (<code>de</code> for [Template unavailable in the 2018 archive: lang — de; Deutsch]), Russian (<code>ru</code>), and simple English (<code>simple</code>).*

[Plancton](/fr:Plancton)
[Plankton](/de:Plankton)
[Планктон](/ru:Планктон)
[Plankton](/simple:Plankton)

#### Interwiki link
- [Interwiki links](/Interwiki_links) link to any page on other wikis. [Interwikimedia links](/Help:Interwikimedia_links) link to other Wikimedia wikis.
- Note that interwikimedia links use the internal link style, with double square brackets.
- See [Interwiki map](/MetaWikiPedia:Interwiki_map) for the list of shortcuts; if the site you want to link to is not on the list, use an [external link](/#External_links).
- See also [Wikimedia sister projects](/Wikipedia:Wikimedia_sister_projects).

Description
What you type
What it looks like

Linking to a page on another wiki in English.

All of these forms lead to the URL <em>http://en.wiktionary.org/wiki/hello</em>.

*Simple link.*

*Without prefix.*

*Named link.*
<code><nowiki>[hello](/Wiktionary:hello)</nowiki></code>

<code><nowiki>[](/Wiktionary:hello)</nowiki></code>

<code><nowiki>[Wiktionary definition of "hello"](/Wiktionary:hello) </nowiki></code>
[hello](/Wiktionary:hello)

[hello](/Wiktionary:hello)

[Wiktionary definition of "hello"](/Wiktionary:hello)

Linking to a page on another wiki in another language.

All of these forms lead to the URL <em>http://fr.wiktionary.org/wiki/bonjour</em>.

*Simple link.*

*Without prefix.*

*Named link.*
<code><nowiki>[fr:bonjour](/Wiktionary:fr:bonjour)</nowiki></code>

<code><nowiki>[](/Wiktionary:fr:bonjour)</nowiki></code>

<code><nowiki>[bonjour](/Wiktionary:fr:bonjour)</nowiki></code>
[fr:bonjour](/Wiktionary:fr:bonjour)

[fr:bonjour](/Wiktionary:fr:bonjour)

[bonjour](/Wiktionary:fr:bonjour)

#### Categories
- To put an article in a [category](/Wikipedia:Categorization), place a link like <code><nowiki>[Example](/Category:Example)</nowiki></code> into the article. As with interlanguage links, placing these links at [the end of the article](/WP:FOOTERS) is recommended.
- To link to a category page without putting the article into the category, use a colon prefix (":Category") in the link.

Description
What you type
What it looks like

*Categorize an article.*
<code><nowiki>[Character sets](/Category:Character_sets)</nowiki></code>

*Link to a category.*
<code><nowiki>[Category:Character sets](/Category:Character_sets)</nowiki></code>
[Category:Character sets](/Category:Character_sets)

*Without prefix.*
<code><nowiki>[](/Category:Character_sets)</nowiki></code>
[Character sets](/Category:Character_sets)

#### External links

- Single square brackets indicate an external link. Note the use of a *space* (not a pipe |) to separate the URL from the link text in a named link. Square brackets may be used as normal punctuation when not linking to anything – [like this].
- A [URL](/Uniform_Resource_Locator) must begin with a supported [URI scheme](/URI_scheme): <code>http://</code> and <code>https://</code> will be supported by all browsers; <code>irc://</code>, <code>ircs://</code>, <code>ftp://</code>, <source inline>news://</source>, <code>mailto:</code>, and <code>gopher://</code> will require a plugin or an external application. IPv6 addresses in URLs are currently not supported.
- A URL containing certain characters will display and link incorrectly unless those characters are [percent encoded](/Percent-encoding). For example, a space must be replaced by <code>%20</code>. Encoding can be achieved by:
*Use the link button ![Vector toolbar insert link button.png](/assets/uploads/Vector_toolbar_insert_link_button.png) on the enhanced editing toolbar to encode the link; this tool will add the bracket markup and the linked text, which may not always be desirable.
*Or manually encode the URL by replacing these characters:

*space* !! " !! ' !! , !! ; !! < !! > !! ? !! [ !! ]

 %22 || %27 || %2c || %3b || %3c || %3e || %3f || %5b || %5d

*Or use the <nowiki>[Template unavailable in the 2018 archive: urlencode:]</nowiki> magic word. See [Help:Magic words](/mw:Help:Magic_words#URL_data) in the MediaWiki documentation for more details.

- See [External links](/Wikipedia:External_links) for style issues, and [External link file type templates](/Category:External_link_file_type_templates) for indicating the file type of an external link with an icon.

Description
What you type
What it looks like

*Named link* with an [external link icon](/Help:external_link_icons)
<code><nowiki>[Wikipedia](http://www.wikipedia.org)</nowiki></code>
[Wikipedia](http://www.wikipedia.org)

*Unnamed link*

*(Used only within article body for footnotes)*
<code><nowiki>[http://www.wikipedia.org](http://www.wikipedia.org)</nowiki></code>
[http://www.wikipedia.org](http://www.wikipedia.org)

*Bare URL*

*(Bad style)*  

use <nowiki><nowiki></nowiki></nowiki> to keep this bad style from showing
<code><nowiki>http://www.wikipedia.org</nowiki></code>
http://www.wikipedia.org

*Link without arrow*

*(Not often used)*
<code><nowiki>[Wikipedia](http://www.wikipedia.org)</nowiki></code>
 [Wikipedia](http://www.wikipedia.org)

#### Automatic links
[Template unavailable in the 2018 archive: main — Help:Magic links]

Magic links are automatic links for certain unique identifiers that require no markup. They can be used for ISBN numbers, RFC numbers, and PMID numbers.

##### Book sources
- Link to books using their [ISBN](/Wikipedia:ISBN), which creates a link to [BookSources](/Special:BookSources). This is preferred to linking to a specific online bookstore, because it gives the reader a choice of vendors. However, if one bookstore or online service provides additional free information, such as table of contents or excerpts from the text, then a link to that source will aid the user and is recommended. ISBN links do not need any extra markup, provided you use one of the indicated formats.
- To create a link to [BookSources](/Special:BookSources) using alternative text (e.g. the book's title), use the internal link style with the appropriate namespace.

What you type
What it looks like

<code><nowiki>[Template unavailable in the 2018 archive: ISBN — 022628705X]</nowiki></code>
[Template unavailable in the 2018 archive: ISBN — 022628705X]

<code><nowiki>[Template unavailable in the 2018 archive: ISBN — 0-22-628705-X]</nowiki></code>
[Template unavailable in the 2018 archive: ISBN — 0-22-628705-X]

<code><nowiki>Link to a book using [alternative text, such as its title](/Special:BookSources/0670037818)</nowiki></code>
Link to a book using [alternative text, such as its title](/Special:BookSources/0670037818)

##### RFC number
- Link to an [Internet Engineering Task Force](/Internet_Engineering_Task_Force) [Request for Comments (RFC)](/Request_for_Comments).

What you type
What it looks like

<code><nowiki>Text mentioning an RFC number anywhere, e.g. RFC 4321.</nowiki></code>
Text mentioning an RFC number anywhere, e.g. RFC 4321.

#### Miscellaneous
##### "As of" template
- The *[As of](/Wikipedia:As_of)* template generates phrases like "As of April 2009" or "as of April 2009", and categorize information that will need updating. For an explanation of the parameters see the [Template unavailable in the 2018 archive: tl — As of] documentation.

What you type
What it looks like

<code><nowiki>[Template unavailable in the 2018 archive: As of — 2009; 4; df=us]</nowiki></code>
[Template unavailable in the 2018 archive: As of — 2009; 4; df=us]

<code><nowiki>[Template unavailable in the 2018 archive: As of — 2009; 4; df=us; lc=y]</nowiki></code>
[Template unavailable in the 2018 archive: As of — 2009; 4; df=us; lc=y]

##### Media link
- To include links to non image uploads such as sounds, use a "media" link. For images, [see next section](/#Images).
- Some uploaded sounds are listed at [Sound](/Commons:Sound).

What you type
What it looks like

<code><nowiki>[Sound](/media:Classical_guitar_scale.ogg)</nowiki></code>
[Sound](/media:Classical_guitar_scale.ogg)

##### Links directly into edit mode
- These create links that directly go to the edit or view source tab. For example, to create links to the edit tab for this page, either of the following works:

Description
What you type
What it looks like

Using the [Template unavailable in the 2018 archive: tl — fullurl] template
<code><nowiki>[[Template unavailable in the 2018 archive: fullurl:Help:Wiki markup — archived-action-removed] edit]</nowiki></code>
[[Template unavailable in the 2018 archive: fullurl:Help:Wiki markup — archived-action-removed] edit]

Using the [Template unavailable in the 2018 archive: tl — Edit] template
<code><nowiki>[Template unavailable in the 2018 archive: edit]</nowiki></code>
[Template unavailable in the 2018 archive: edit]

##### Links partially italicized
- Linking to a page with a title containing words that are usually italicized, such as the [*Hindenburg* disaster](/Hindenburg_disaster) article.

What you type
What it looks like

<code><nowiki>[*Hindenburg* disaster](/Hindenburg_disaster)</nowiki></code>
[*Hindenburg* disaster](/Hindenburg_disaster)

### Pronunciation aids
It is often desirable to provide an aid to pronunciation for a word. The [*IPAc-en*](/Template:IPAc-en) and [*Respell*](/Template:Respell) templates can be of assistance.

What you type
What it looks like

<code><nowiki>**Konjac** [Template unavailable in the 2018 archive: IPAc-en — lang; pron; ˈ; k; oʊ; n; j; æ; k]</nowiki></code>
**Konjac** [Template unavailable in the 2018 archive: IPAc-en — lang; pron; ˈ; k; oʊ; n; j; æ; k]

<code><nowiki>**Konjac** ([Template unavailable in the 2018 archive: IPAc-en — lang; pron; ˈ; k; oʊ; n; j; æ; k] [Template unavailable in the 2018 archive: respell — KOHN; yak])</nowiki></code>
**Konjac** ([Template unavailable in the 2018 archive: IPAc-en — lang; pron; ˈ; k; oʊ; n; j; æ; k] [Template unavailable in the 2018 archive: respell — KOHN; yak])

<code><nowiki>*Konjac* is pronounced [Template unavailable in the 2018 archive: IPAc-en — ˈ; k; oʊ; n; j; æ; k] in English.</nowiki></code>
*Konjac* is pronounced [Template unavailable in the 2018 archive: IPAc-en — ˈ; k; oʊ; n; j; æ; k] in English.

Refer to [Manual of Style (pronunciation)](/Wikipedia:Manual_of_Style_(pronunciation)) for more information.

### Musical notation
[Template unavailable in the 2018 archive: main — Help:Score]
Musical notation is added by using the [Template unavailable in the 2018 archive: xtag — score; p] extension tag. For example:
[Template unavailable in the 2018 archive: markup — <nowiki><score>\relative c' { fis d fis a d f e d c cis d e a g f ees }</score></nowiki>; <score>\relative c' { fis d fis a d f e d c cis d e a g f ees }</score>]

### Images
[Template unavailable in the 2018 archive: Main page — Help:Visual file markup; Wikipedia:Images]
Only images that have been uploaded to Wikipedia or [Wikipedia Commons](/commons:main) can be used. To upload images, use the [Commons upload wizard](/commons:Special:UploadWizard) for photos you have taken, and the [upload page](/Special:Upload) if there maybe copyright issues. You can find the uploaded image on the [image list](/Special:Imagelist).

See the Wikipedia's [image use policy](/Wikipedia:Image_use_policy) for the policy used on Wikipedia.

For further help on images, including some more versatile abilities, see the [picture tutorial](/WP:PIC) and [extended image syntax](/Wikipedia:Extended_image_syntax).

What you type
What it looks like
Notes
- style="vertical-align:top;"
The image name, the word thumb then the caption : 
<nowiki>![Wikipedia logo](/assets/uploads/wiki.png)</nowiki> 

The image name, the word thumb then the caption : 
![Wikipedia logo](/assets/uploads/wiki.png) <br style="clear:both"/>

- The thumb tag automatically allows the image to be enlarged and positions it (floats) automatically to the right of the page.
- An enlarge icon is placed in the lower right corner.
- See note below about adding an [alt tag](/#alt_tag)
- This is the basic markup for most images

- style="vertical-align: top;"
A picture: <nowiki>![wiki.png](/assets/uploads/wiki.png)</nowiki>

A picture: ![wiki.png](/assets/uploads/wiki.png)

- The picture name alone places the image in the text, or on the next line if there is insufficient space.
- Embedding the image in the text is only possible for very small images.
- Embedding the image will affect the vertical formatting of text.
- style="vertical-align: top;"
With alternative text: 
<nowiki>![alt=Puzzle globe logo](/assets/uploads/wiki.png)</nowiki>

With alternative text: 
![alt=Puzzle globe logo](/assets/uploads/wiki.png)

- [Template unavailable in the 2018 archive: anchor — alt tag]Alternative text, used when the image is unavailable or when the image is loaded in a text-only browser, or when spoken aloud, is **strongly** encouraged. See [Alternative text for images](/Wikipedia:Alternative_text_for_images) for help on choosing it.

- style="vertical-align:top;"
With link: 
<nowiki>![link=Wikipedia](/assets/uploads/wiki.png)</nowiki>

With link: 
![link=Wikipedia](/assets/uploads/wiki.png) <br style="clear:both"/>
- The link directs to the Wikipedia page, [Wikipedia](/Wikipedia), instead of the image file page.

- style="vertical-align:top;"
Forced to the centre of the page
using the *frame* tag (attribute), a *centre* tag and a caption: 
<nowiki>![Wikipedia logo](/assets/uploads/wiki.png)</nowiki> 

Forced to the centre of the page using the *frame* tag (attribute), a *centre* tag and a caption:
![Wikipedia logo](/assets/uploads/wiki.png) <br style="clear:both"/>

- The frame tag automatically floats the image right.
- The frame tag is only of use with very small images or ones using the [px tag](/#px_tag)
- The attributes left, center or centre override this, and places the image to the left or the centre of the page. [Template unavailable in the 2018 archive: anchor — upright tag]
- The last parameter is the caption that appears below the image.

- style="vertical-align:top;"
Forced to the left side of the page
using the *thumb* attribute, the *left* attribute  and a caption: 
<nowiki>![Wikipedia logo](/assets/uploads/wiki.png)</nowiki> 

Forced to the left side of the page using the *thumb* attribute, the *left* attribute  and a caption:
![Wikipedia logo](/assets/uploads/wiki.png) <br style="clear:both"/>

- The thumb tag automatically floats the image right.
- An enlarge icon is placed in the lower right corner.
- The attributes left, center or centre override this, and places the image to the left or the centre of the page. 

- style="vertical-align:top;"
Forced to the right side of the page
*without* a caption: 
<nowiki>![Wikipedia encyclopedia](/assets/uploads/wiki.png)</nowiki>

Forced to the right side of the page *without* a caption: 
![Wikipedia encyclopedia](/assets/uploads/wiki.png)
- Captions are only displayed when the thumb or frame attributes are present
- The [picture tutorial](/WP:PIC) explains more options.

- style="vertical-align:top;"
A picture resized to 50 pixels... 
<nowiki>![Wikipedia encyclopedia](/assets/uploads/wiki.png)</nowiki>

A picture resized to 50 pixels... 
![Wikipedia encyclopedia](/assets/uploads/wiki.png)

- [Template unavailable in the 2018 archive: anchor — px tag]The [picture tutorial](/WP:PIC) explains more options.
- This should be used very sparingly, thumb images are always of the same width. 
- There is an [*upright* attribute](/#upright_tag) that can be used to display tall images. These tags are optimised for both laptop and mobile phone screens.

- style="vertical-align:top;"
Linking directly to the description page of an image: 
<nowiki>[File:wiki.png](/File:wiki.png)</nowiki>

Linking directly to the description page of an image: 
[File:wiki.png](/File:wiki.png)

- Clicking on an image displayed normally on a page also leads to the description page.

- style="vertical-align:top;"
Linking directly to an image without displaying it: 
<nowiki>[Image of jigsaw globe](/Media:wiki.png)</nowiki>

Linking directly to an image without displaying it: 
[Image of jigsaw globe](/Media:wiki.png)

- To include links to images shown as links instead of drawn on the page, use a "media" link.

- style="vertical-align:top;"
<source lang="html">Example: 

![Wikipedia encyclopedia](/assets/uploads/wiki.png)![50 px](/assets/uploads/wiki.png) </source>

Example: 

![Wikipedia encyclopedia](/assets/uploads/wiki.png)![50 px](/assets/uploads/wiki.png) 

- Using the [<code>span</code> or <code>div</code> elements](/span_and_div) to separate images from text (note that this may allow images to cover text).

- style="vertical-align:top;"
<nowiki>Example:

![50 px](/assets/uploads/wiki.png)

![50 px](/assets/uploads/wiki.png)

![50 px](/assets/uploads/wiki.png)

Example:

![50 px](/assets/uploads/wiki.png)

![50 px](/assets/uploads/wiki.png)

![50 px](/assets/uploads/wiki.png)

- Using wiki markup to make a table in which to place a vertical column of images (this helps edit links match headers, especially in Firefox browsers).

### Tables
[Template unavailable in the 2018 archive: main — Help:Table]
There are two ways to build tables:
- In special wiki-markup (see [Table](/Help:Table)).
- Using HTML elements: [Template unavailable in the 2018 archive: tag — table; o], [Template unavailable in the 2018 archive: tag — tr; o], [Template unavailable in the 2018 archive: tag — td; o] or [Template unavailable in the 2018 archive: tag — th; o].

See also [When tables are appropriate](/Wikipedia:Manual_of_Style/Tables#Appropriate).

### Columns
[Template unavailable in the 2018 archive: main — Help:Columns]
Use [Template unavailable in the 2018 archive: tl — colbegin] and [Template unavailable in the 2018 archive: tl — colend] to produce columns.

### References and citing sources
[Template unavailable in the 2018 archive: main — Wikipedia:Citing sources; Help:Footnotes]
[Template unavailable in the 2018 archive: see also — APA style; The Chicago Manual of Style[Template unavailable in the 2018 archive: !]Chicago style; Harvard style; MLA style]

Making a reference citing a printed or online source can be accomplished by using the [Template unavailable in the 2018 archive: tag — ref] tags. Inside these tags details about the reference are added.

Details about the citation can be provided using a structure provided by various templates; the table below lists some typical citation components.

What it's for !! What you type

 [Template unavailable in the 2018 archive: tag — ref; params=name="name for reference"; content=Use a closing tag]

 [Template unavailable in the 2018 archive: Tlx — cite book]

 [Template unavailable in the 2018 archive: Tlx — cite web]

 [Template unavailable in the 2018 archive: para — isbn; 0-4397-0818-4] (ISBN of the book)

 [Template unavailable in the 2018 archive: para — url; ht<nowiki />tp://www.wikipedia.org]

 [Template unavailable in the 2018 archive: para — title; title of source]

 [Template unavailable in the 2018 archive: para — author; authors, use commas for multiple]

 [Template unavailable in the 2018 archive: para — first; first name]

 [Template unavailable in the 2018 archive: para — last; last name]

 [Template unavailable in the 2018 archive: para — location; location of publisher]

 [Template unavailable in the 2018 archive: para — publisher; who published the source]

 [Template unavailable in the 2018 archive: para — date; 2007-09-21] (date of source)

 [Template unavailable in the 2018 archive: para — year; year of source]

 [Template unavailable in the 2018 archive: para — accessdate; 2008-12-25] (only if url= is included)

 [Template unavailable in the 2018 archive: tag — ref; o; params=name="WikiMarkup"]<code><nowiki>[Template unavailable in the 2018 archive: cite web — url=http://en.wikipedia.org/w/index.php?title=Help:Wiki_markup; title=Help:Wiki markup; publisher=Wikimedia Foundation]</nowiki></code>[Template unavailable in the 2018 archive: tag — ref; c]

 [Template unavailable in the 2018 archive: tag — ref; s; params=name="WikiMarkup"]

 [Template unavailable in the 2018 archive: tlx — Citation needed; [Template unavailable in the 2018 archive: tls — DATE]]

### Templates and transcluding pages
[Template unavailable in the 2018 archive: main — Wikipedia:Transclusion]
[Template unavailable in the 2018 archive: see also — Help:Template#Noinclude, includeonly, and onlyinclude]

Examples for templates: <nowiki>[Template unavailable in the 2018 archive: pad — ...], [Template unavailable in the 2018 archive: math — ...], [Template unavailable in the 2018 archive: as of — ...], [Template unavailable in the 2018 archive: edit]</nowiki>

**[Templates](/Help:Template)** are segments of wiki markup that are meant to be copied automatically ("transcluded") into a page.
You add them by putting the template's name in <nowiki>[Template unavailable in the 2018 archive: double braces]</nowiki>. It is also possible to transclude other pages by using <nowiki>[Template unavailable in the 2018 archive: :colon and double braces]</nowiki>.

There are three pairs of [tags](/html_element) that can be used in [wikitext](/wikitext) to control how transclusion affects parts of a template or article.
They determine whether or not wikitext renders, either in its own article, which we will call "**here**", or in another article where it is transcluded, which we will call "**there**".
- **<nowiki><noinclude></nowiki>: ** the content **will not be rendered *there**. These tags have no effect *here*.
- **<nowiki><includeonly></nowiki>: ** the content  **will render only *there**, and  **will not render *here** (like [invisible ink](/invisible_ink) made visible by means of transclusion).
- **<nowiki><onlyinclude></nowiki>: ** the content **will render *here** and **will render *there**, but it will only render *there* what is between these tags.
There can be several such section "[elements](/HTML#Elements)". Also, they can be nested. All possible renderings are achievable. For example, to render *there* one or more sections of the page *here* use **<nowiki><onlyinclude></nowiki>** tags. To append text *there*, wrap the addition in **<nowiki><includeonly></nowiki>** tags before, within, or after the section. To omit portions of the section, nest **<nowiki><noinclude></nowiki>** tags within it.

If a page is transcluded without transclusion markup, it may cause an unintentional [categorization](/Help:Category#Putting_pages_in_categories). Any page transcluding it will contain the same category as the original page. Wrap the category markup with **<nowiki><noinclude></nowiki>** tags to prevent incorrect categorization.
[Template unavailable in the 2018 archive: anchor — hovertext]
Some templates take *parameters*, as well, which you separate with the pipe character <code>|</code>.

What you type
What it looks like

[Template unavailable in the 2018 archive: Transclusion demo]
[Template unavailable in the 2018 archive: Transclusion demo]

[Template unavailable in the 2018 archive: Help:Transclusion demo]
[Template unavailable in the 2018 archive: Help:Transclusion demo]

This template takes two parameters,
and creates underlined text with a
hover box for many modern browsers
supporting CSS:

[Template unavailable in the 2018 archive: H:title — This is the hover text; Hover your mouse over this text]

Go to this page to see the H:title
template itself: [Template unavailable in the 2018 archive: tl — H:title]

This template takes two parameters,
and creates underlined text with a
hover box for many modern browsers
supporting CSS:

[Template unavailable in the 2018 archive: H:title — This is the hover text; Hover your mouse over this text]

Go to this page to see the H:title
template itself: [Template unavailable in the 2018 archive: tl — H:title]

### Talk and project pages
These are likely to be helpful on [talk](/Help:Using_talk_pages) and [project pages](/Wikipedia:Project_namespace).

#### Signing comments
- The  *[tilde](/tilde)* character (~) is used when signing a comment on a talk page. Your username provides a link to your [user page](/Wikipedia:user_page).

Description
What you type
What it looks like

*You should sign your comments by appending four tildes to the comment, which adds your user name plus date/time.*
<code><nowiki>~~~~</nowiki></code>
[Username](/Special:Mypage) ([talk](/Special:Mytalk)) [Template unavailable in the 2018 archive: CURRENTTIME], [Template unavailable in the 2018 archive: CURRENTDAY] [Template unavailable in the 2018 archive: CURRENTMONTHNAME] [Template unavailable in the 2018 archive: CURRENTYEAR] (UTC)

*Adding three tildes will add just your user name.*
<code><nowiki>~~~</nowiki></code>
[Username](/Special:Mypage) ([talk](/Special:Mytalk))

*Adding five tildes gives the date/time alone.*
<code><nowiki>~~~~~</nowiki></code>
[Template unavailable in the 2018 archive: CURRENTTIME], [Template unavailable in the 2018 archive: CURRENTDAY] [Template unavailable in the 2018 archive: CURRENTMONTHNAME] [Template unavailable in the 2018 archive: CURRENTYEAR] (UTC)

#### Linking to old revisions of pages, diffs, and specific history pages
- The external link function is mainly used for these. Open an old revision or diff, and copy the [URL](/URL) from the address bar, pasting it where you want it.

What you type
What it looks like

<code><nowiki>[//en.wikipedia.org/w/index.php?title=Help:Wiki_markup&diff=330350877&oldid=330349143 Diff between revisions 330349143 and 330350877]</nowiki></code>
[//en.wikipedia.org/w/index.php?title=Help:Wiki_markup&diff=330350877&oldid=330349143 Diff between revisions 330349143 and 330350877]

- You can also use an [internal diff link](/Help:Diff#Internal_links). **Unlike the template [Template unavailable in the 2018 archive: tl — diff], this kind of link can even be used in edit summaries.**

What you type
What it looks like

<code><nowiki>[Diff between revisions 330349143 and 330350877](/Special:Diff/330349143/330350877)</nowiki></code>
[Diff between revisions 330349143 and 330350877](/Special:Diff/330349143/330350877)

- If the diff intended to be shown is between an immediately previous revision, the first parameter can be dropped.

What you type
What it looks like

<code><nowiki>[Diff between revisions 330349143 and 330350877](/Special:Diff/330350877)</nowiki></code>
[Diff between revisions 330349143 and 330350877](/Special:Diff/330350877)

- For an old revision, you can also use a [permalink](/Help:Permanent_link). Though here only the main text is guaranteed to be retained (images and templates will be shown as they are today, not as they were at the time).

What you type
What it looks like

<code><nowiki>[Revision 330350877](/Special:Permalink/330350877)</nowiki></code>
[Revision 330350877](/Special:Permalink/330350877)

#### What links here, and recent changes linked
- The following markup can be used. For example, for the article [Beetroot](/Beetroot):

What you type
What it looks like

<code><nowiki>[WhatLinksHere/Beetroot](/Special:WhatLinksHere/Beetroot)</nowiki></code>
[WhatLinksHere/Beetroot](/Special:WhatLinksHere/Beetroot)

<code><nowiki>[RecentChangesLinked/Beetroot](/Special:RecentChangesLinked/Beetroot)</nowiki></code>
[RecentChangesLinked/Beetroot](/Special:RecentChangesLinked/Beetroot)

#### User edits
- Link to a user's [contributions page](/Help:User_contributions).

Description
What you type
What it looks like

*Username (registered users).*
<code><nowiki>[Contributions/UserName](/Special:Contributions/UserName)</nowiki></code>
[Contributions/UserName](/Special:Contributions/UserName)

*[IPv4](/IPv4) address (unregistered users).*
<code><nowiki>[Contributions/192.0.2.0](/Special:Contributions/192.0.2.0)</nowiki></code>
[Contributions/192.0.2.0](/Special:Contributions/192.0.2.0)

*[IPv6](/IPv6) address (unregistered users).*
<code><nowiki>[Contributions/2001:0db8:0000:0000:0000:ff00:0042:8329](/Special:Contributions/2001:0db8:0000:0000:0000:ff00:0042:8329)</nowiki></code>
[Contributions/2001:0db8:0000:0000:0000:ff00:0042:8329](/Special:Contributions/2001:0db8:0000:0000:0000:ff00:0042:8329)

#### Coloring and highlighting text
- Using the [Template unavailable in the 2018 archive: tl — Color] and [Template unavailable in the 2018 archive: tl — Font color] templates:

What you type
What it looks like

<code><nowiki>I will change the color in [Template unavailable in the 2018 archive: color — blue; the middle part of] this sentence.</nowiki></code>

I will change the color in [Template unavailable in the 2018 archive: color — blue; the middle part of] this sentence.

<code><nowiki>This is how to [Template unavailable in the 2018 archive: Font color — yellow; highlight part of a sentence].</nowiki></code>

This is how to [Template unavailable in the 2018 archive: Font color — yellow; highlight part of a sentence].

#### Example text
The [Template unavailable in the 2018 archive: tlx — xt] family of templates can be used on help pages and user pages to highlight e**x**ample te**x**t. 

[Template unavailable in the 2018 archive: !bxt — It does not work in mainspace, that is articles.]

What you type
What you get

<kbd><nowiki>This is an [Template unavailable in the 2018 archive: </nowiki>**xt**<nowiki> — A correct example] for comparison [Template unavailable in the 2018 archive: tick]</nowiki></kbd>
This is an [Template unavailable in the 2018 archive: xt — A correct example] for comparison [Template unavailable in the 2018 archive: tick]

<kbd><nowiki>this is an [Template unavailable in the 2018 archive: </nowiki>**!xt**<nowiki> — An incorrect example] for example [Template unavailable in the 2018 archive: cross]</nowiki></kbd>
this is an [Template unavailable in the 2018 archive: !xt — An incorrect example] for example [Template unavailable in the 2018 archive: cross]

<kbd><nowiki>this is an [Template unavailable in the 2018 archive: </nowiki>**mxt**<nowiki> — In monospace] for comparison</nowiki></kbd>
this is an [Template unavailable in the 2018 archive: mxt — In monospace] for comparison

<kbd><nowiki>this is an [Template unavailable in the 2018 archive: </nowiki>**!mxt**<nowiki> — In monospace] for comparison</nowiki></kbd>
this is an [Template unavailable in the 2018 archive: !mxt — In monospace] for comparison

<kbd><nowiki>this is an [Template unavailable in the 2018 archive: </nowiki>**bxt**<nowiki> — in bold] for comparison</nowiki></kbd>
this is an [Template unavailable in the 2018 archive: bxt — In bold] for comparison

<kbd><nowiki>this is an [Template unavailable in the 2018 archive: </nowiki>**!bxt**<nowiki> — In bold] for comparison</nowiki></kbd>
this is an [Template unavailable in the 2018 archive: !bxt — In bold] for 

#### Show deleted or inserted text
[Template unavailable in the 2018 archive: details — Wikipedia:Talk page guidelines]
- When editing your own previous remarks in talk pages, it is sometimes appropriate to mark up deleted or inserted content: 
  - It is best to indicate deleted content using the strike-through markup [Template unavailable in the 2018 archive: tag — s].
  - It is best to indicate inserted content using the underline markup [Template unavailable in the 2018 archive: tag — u].
- When editing regular Wikipedia articles, just make your changes, and do not mark them up in any special way. However, when the article itself discusses deleted or inserted content, such as an amendment to a statute:
  - It is best to indicate deleted content using the strike-through markup [Template unavailable in the 2018 archive: tag — del].
  - It is best to indicate inserted content using the underline markup [Template unavailable in the 2018 archive: tag — ins].
Note: [Template unavailable in the 2018 archive: tag — s; content=] and [Template unavailable in the 2018 archive: tag — u; content=] (speced in HTML 3 & 4) are considerably more popular than [Template unavailable in the 2018 archive: tag — del; content=] and [Template unavailable in the 2018 archive: tag — ins; content=]  (speced in HTML 5) on Wikipedia.

What you type
What it looks like

<code><nowiki>You can <del>strike out deleted material</del> and <ins>underline new material</ins>.</nowiki></code>
You can <del>strike out deleted material</del> and <ins>underline new material</ins>.

Alternative markup:

<code><nowiki>You can <s>strike out deleted material</s> and <u>underline new material</u>.</nowiki></code>
You can <s>strike out deleted material</s> and <u>underline new material</u>.

#### Strike through
[Template unavailable in the 2018 archive: anchor — Strikethrough]
This is also possible with the [Template unavailable in the 2018 archive: tlx — strike]} template.

What you type
What you get

<kbd><nowiki>This is an [Template unavailable in the 2018 archive: </nowiki>**strike**<nowiki> — A misplaced bit of text] for comparison</nowiki></kbd>
This is an [Template unavailable in the 2018 archive: strike — A misplaced bit of text] for comparison

### [Template unavailable in the 2018 archive: anchor — Limiting formatting] Limiting formatting / escaping wiki markup
A few different kinds of formatting will tell the wiki to display things as you typed them – what you see is what you get!

What you type
What it looks like

**&lt;nowiki&gt; tag:**

<nowiki>
The nowiki tag ignores [wiki](/wiki)
*markup*. It reformats text by
removing newlines and multiple
spaces. It still interprets
characters specified by
&name;: &rarr;
</nowiki>
**<nowiki> tag:**

<nowiki>
The nowiki tag ignores [wiki](/wiki)
*markup*. It reformats text by
removing newlines and multiple
spaces. It still interprets
characters specified by
&name;: →
</nowiki>

**&lt;pre&gt; tag:**

<pre>The <pre> tag ignores [wiki](/wiki)
*markup* as does the <nowiki>
tag. Additionally, <pre> displays
in a mono-spaced font, and does
not  reformat    text    spaces.
It still interprets special
characters: &rarr;
</pre>
**<pre> tag:**

The <pre> tag ignores [wiki](/wiki)
*markup* as does the <nowiki>
tag. Additionally, <pre> displays
in a mono-spaced font, and does
not  reformat    text    spaces.
It still interprets special
characters: →

**[Text without a URL]:**

Single square brackets holding
[text without a HTTP URL] are
preserved, but single square
brackets containing a URL are
treated as being an external
[Web link](http://example.com/).
**[Text without a URL]:**

Single square brackets holding
[text without a HTTP URL] are
preserved, but single square
brackets containing a URL are
treated as being an external
[Web link](http://example.com/).

<source lang="moin">**Leading space:**

Leading spaces are another way
to preserve formatting.
 Putting a space at the
 beginning of each line
 stops the text   from
 being reformatted.
 It still interprets [wiki](/wiki)
 *markup* and special characters: &rarr;</source>
**Leading space:**

Leading spaces are another way
to preserve formatting.
 Putting a space at the
 beginning of each line
 stops the text   from
 being reformatted.
 It still interprets [wiki](/wiki)
 *markup* and special characters: →

#### Nowiki
[Template unavailable in the 2018 archive: shortcut — Help:NOWIKI; WP:NOWIKI]

In order for the software to interpret wiki markup, its parser first scans the page. When it sees its nowiki tags 
[Template unavailable in the 2018 archive: tag — nowiki] ([escape](/escape_character)s all contained wiki markup), and
[Template unavailable in the 2018 archive: tag — nowiki; s] (escapes the interpretations it is designed to "break"),
it escapes its wikicode, so editors can document its markup *using* its markup.

Article editors can normalize the font of characters trailing <code>[<nowiki />[...]]outside</code> a wikilink, which would otherwise adhere to the wikilink font. They can also add line-spacing in the wikitext. Template editors: tag [Template unavailable in the 2018 archive: tag — nowiki; o] works only on its source page, not the target; also <code>[Template unavailable in the 2018 archive: #tag<nowiki />:nowiki  —  *content*]</code>, although it wraps that content in nowiki tags, it also does a [pre-save transform](/mw:Manual:Tag_extensions#How_do_I_render_wikitext_in_my_extension?) on that content, which is entirely at odds with the intended purpose of nowiki for templates, subst, signatures, and the pipe-trick.

The two kinds of nowiki operate in different ways to target content, but they both remove meaning (subtract rendering) of wiki markup, then disappear into the background font. Nowiki does nothing toward rendering, but it can add newlines to wikitext (for readability), just like the HTML comment (the preferred method) can. Unlike it does for wiki markup, nowiki does not remove the meaning of *character entities*, either [HTML](/HTML_character_entities) or MediaWiki [special *characters*](/#Special_characters).

There is only one meaning for what [Template unavailable in the 2018 archive: tag — nowiki] contains, so it needs few examples; but the singular [Template unavailable in the 2018 archive: tag — nowiki; s] tag "contains" *many* linkage structures, where it is expected between bracketing-pair characters or in the keyword area.  So this section has *many* examples and few mis-examples.

For example, only at the beginning of a line (bol of wikitext, bol in a transclusion, or beginning of a table cell), do [Template unavailable in the 2018 archive: code — *], [Template unavailable in the 2018 archive: code — #], [Template unavailable in the 2018 archive: code — ;] or [Template unavailable in the 2018 archive: code — :] mean something. 

[Template unavailable in the 2018 archive: markup — <nowiki># Ordered list</nowiki>; [Template unavailable in the 2018 archive: crlf2]
1. Ordered list; <nowiki><nowiki /># Ordered list</nowiki>; [Template unavailable in the 2018 archive: crlf2]
<nowiki /># Ordered list; <nowiki>A [micro-](/micro-)second.</nowiki>; A [micro-](/micro-)second.; <nowiki>A [micro-](/micro-)<nowiki />second.</nowiki>; A [micro-](/micro-)<nowiki />second.; <nowiki>a<nowiki>

</nowiki>b</nowiki>; a<nowiki>

</nowiki>b; <nowiki>'<nowiki />'Italics' markup'<nowiki />'</nowiki>; '<nowiki />'Italics' markup'<nowiki />'; <nowiki><nowiki>[Example](/Example)</nowiki></nowiki>; <nowiki>[Example](/Example)</nowiki>; <nowiki><!-- revealed --></nowiki>; <nowiki>       </nowiki>]

The rest of the section consists of simple, live examples showing how a single nowiki tag escapes entire linkage structures, beyond [ wikilink <nowiki />](/ wikilink <nowiki_/>)</code> and [Template unavailable in the 2018 archive:  template <nowiki />]:

[[ *[fullpagename](/wp:fullpagename)* <nowiki />| *label* ]]
[Template unavailable in the 2018 archive: *pagename* <nowiki /> — *parameter*]
[[ *fullpagename* | [Template unavailable in the 2018 archive: *pagename* }<nowiki />} ]<nowiki />]
[Template unavailable in the 2018 archive: *pagename* — [[ *fullpagename* ]<nowiki />]]
[Template unavailable in the 2018 archive: *pagename* <nowiki /> — [Template unavailable in the 2018 archive: *pagename* }<nowiki />}]

Unless you use the two "balanced" nowiki tags, troubleshooting [strip marker](/help:strip_markers) errors and template parameter-handling inconsistencies is a risk. Also, a rendering error may arise when two <kbd>[<nowiki />[...]]</kbd> square brackets are on the same line, or two <kbd>{<nowiki />{...]</kbd> curly brackets are in the same section, but only when the two have the nowiki markup placed inconsistently.

##### Displaying wikilinks
(These are all live examples.)

[page name](/wp:pagename)
[<nowiki />[ wp:pagename — page name ]]
[page name](/<nowiki_/>_wp:pagename)
[page name](/wp:pagename_<nowiki_/>)
[[ wp:pagename | page name ]<nowiki />]

[page name](/wp:pagename)
[<nowiki />[ wp:pagename | page name ]]
[page name](/<nowiki_/>_wp:pagename)
[page name](/wp:pagename_<nowiki_/>)
[[ wp:pagename | page name ]<nowiki />] 

For **nested structures**, escaping an inner structure escapes its outer structure too.

[[ wp: [Template unavailable in the 2018 archive: 1x — pagename] ]]
[[ wp: {<nowiki />{ 1x | pagename] ]]
[[ wp: [Template unavailable in the 2018 archive: <nowiki /> 1x — pagename] ]]
[[ wp: [Template unavailable in the 2018 archive: 1x <nowiki /> — pagename] ]]

[[ wp: [Template unavailable in the 2018 archive: 1x — pagename] ]]
[pagename }}](/wp:_{<nowiki_/>{_1x)
[[ wp: [Template unavailable in the 2018 archive: <nowiki /> 1x — pagename] ]]
[[ wp: [Template unavailable in the 2018 archive: 1x <nowiki /> — pagename] ]]

For **two, first pipes**, two nowiki tags are required: 

[[ wp: pagename | [Template unavailable in the 2018 archive: 1x — label] ]]
[[ wp: pagename <nowiki />| [Template unavailable in the 2018 archive: 1x <nowiki /> — label] ]]
<nowiki>[[ wp: pagename | [Template unavailable in the 2018 archive: 1x — label] ]] </nowiki>

[[ wp: pagename | [Template unavailable in the 2018 archive: 1x — label] ]]
[[ wp: pagename <nowiki />| [Template unavailable in the 2018 archive: 1x <nowiki /> — label] ]]
<nowiki>[[ wp: pagename | [Template unavailable in the 2018 archive: 1x — label] ]] </nowiki>

##### Displaying template calls
[Template unavailable in the 2018 archive: See also — Template:tl]

For templates, put nowiki before the first pipe.
If a parameter has a wikilink, put it in that, an inmost position.

{<nowiki />{ val | u=&gt; [ms](/ms) | 49082 }}
[Template unavailable in the 2018 archive: <nowiki /> val — u=&gt; [ms](/ms); 49082]
[Template unavailable in the 2018 archive: val <nowiki /> — u=&gt; [ms](/ms); 49082]
[Template unavailable in the 2018 archive: val — u= > [ms](/ms); 49082 }<nowiki />}
[Template unavailable in the 2018 archive: val — u= > [[ ms ]<nowiki />] | 49082] 

{<nowiki />{ val | u=> [ms](/ms) | 49082]
[Template unavailable in the 2018 archive: val — u= > [ms](/ms); 49082 }<nowiki />}
[Template unavailable in the 2018 archive: <nowiki /> val — u=> [ms](/ms); 49082]
[Template unavailable in the 2018 archive: val <nowiki /> — u=> [ms](/ms); 49082]
[Template unavailable in the 2018 archive: val — u= > [[ ms ]<nowiki />] | 49082] [Template unavailable in the 2018 archive: OK]

##### Displaying magic words
For input **parameters**, , , just write them out, unless they have a default (which goes behind their pipe): 
[Template unavailable in the 2018 archive: <nowiki />{1 — default]} → [Template unavailable in the 2018 archive: <nowiki />{1 — default]}

For a **parser function** nowiki goes between bracketing-pair characters, or anywhere before the : colon.

[Template unavailable in the 2018 archive: #ifeq: inYes — inYes; outYes; outNo]
{<nowiki />{ #ifeq: inYes | inYes | outYes | outNo]
[Template unavailable in the 2018 archive: <nowiki /> #ifeq: inYes — inYes; outYes; outNo]
[Template unavailable in the 2018 archive: #ifeq<nowiki />: inYes — inYes; outYes; outNo]
[Template unavailable in the 2018 archive: #ifeq: inYes — inYes; outYes; outNo }<nowiki />}

[Template unavailable in the 2018 archive: #ifeq: inYes — inYes; outYes; outNo]
{<nowiki />{ #ifeq: inYes; inYes; outYes; outNo]
[Template unavailable in the 2018 archive: <nowiki /> #ifeq: inYes — inYes; outYes; outNo]
[Template unavailable in the 2018 archive: #ifeq<nowiki />: inYes — inYes; outYes; outNo] 
[Unresolved legacy notation: #ifeq: inYes | inYes | outYes | outNo }<nowiki />}]

**Behavioral switches** expect the tag anywhere:

 1. __HIDDENCAT__
 2. __HIDDENCAT<nowiki />__

1. __HIDDENCAT__[Template unavailable in the 2018 archive: break]
2. __HIDDENCAT<nowiki />__

##### Displaying tags
[Template unavailable in the 2018 archive: tag — tags; o] do not display; they are just markup. If you want them to, insert [Template unavailable in the 2018 archive: tag — nowiki; s] after an [Template unavailable in the 2018 archive: code — <] opening angle bracket; it goes only in the very front. Opening tags and closing tags must be treated separately.

 Blue 
<<nowiki />span style=color:blue> Blue <<nowiki />/span>
<section end=la<nowiki />bel /> 

 Blue 
<<nowiki />span style=color:blue> Blue <<nowiki />/span>
<section end=la<nowiki />bel /> [Template unavailable in the 2018 archive: cross]

Use template [Template unavailable in the 2018 archive: tl — tag] instead of nowiki tags to display parser tags:

**Character entities**, nowiki cannot escape.  
To escape HTML or special character entities, replace <code>&</code> with <code>&amp;</code>.
For example, <code>&amp;lt;</code> → <code>&lt;</code>

To **display a nowiki tag**, you can (1) use [Template unavailable in the 2018 archive: tl — tag], (2) replace the < left angle bracket with its HTML character entity, or (3) nest nowiki tags in each other:

[Template unavailable in the 2018 archive: tag — nowiki]
<code>&lt; nowiki>...&lt;/ nowiki ></code>
<code><<nowiki />nowiki>...<<nowiki />/ nowiki ></code>

[Template unavailable in the 2018 archive: tag — nowiki]
<code>< nowiki>...</ nowiki ></code>
<code><<nowiki /> nowiki>...<<nowiki />/ nowiki ></code>

[Template unavailable in the 2018 archive: tag — nowiki; s]
<code>&lt; nowiki /></code>
<code><<nowiki /> nowiki /></code>
<code><nowiki>< nowiki /></nowiki></code>

[Template unavailable in the 2018 archive: tag — nowiki; s]
<code>< nowiki /></code>
<code><<nowiki /> nowiki /></code>
<code><nowiki>< nowiki /></nowiki></code>

Nowiki tags do not otherwise nest, so it is the second and fourth that displays:

1<nowiki>2<nowiki>3</nowiki>4</nowiki>
<nowiki>[Template unavailable in the 2018 archive: !]<nowiki></nowiki>[Template unavailable in the 2018 archive: !]</nowiki>

1<nowiki>2<nowiki>3</nowiki>4</nowiki> [Template unavailable in the 2018 archive: spaces — 5] *[Template unavailable in the 2018 archive: small — second and fourth]* 
<nowiki>[Template unavailable in the 2018 archive: !]<nowiki></nowiki>[Template unavailable in the 2018 archive: !]</nowiki>

These simply scan from left to right.
The paired tags cannot overlap, because the very first pair-match nullifies any intervening tags inside. Unbalanced tags always display.

Nowiki tags do not display table markup, use [Template unavailable in the 2018 archive: tag — pre].

#### Pre
[Template unavailable in the 2018 archive: shortcut — WP:PRE]

[Template unavailable in the 2018 archive: tag — pre; o] is a parser tag that emulates the HTML [Template unavailable in the 2018 archive: tag — pre; o] tag. It defines preformatted text that is displayed in a fixed-width font and is enclosed in a dashed box. HTML and wiki markups are escaped and spaces and line breaks are preserved, but HTML entities are parsed.

[Template unavailable in the 2018 archive: markup — title=[Template unavailable in the 2018 archive: tag — pre; o] examples; <nowiki>

[wiki](/wiki) markup &amp;</nowiki>; 

[wiki](/wiki) markup &]

[Template unavailable in the 2018 archive: tag — pre; o] formatted text does not wrap, thus text may extend past the browser window:

Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

To resolve this, [Template unavailable in the 2018 archive: tag — pre; o] may use CSS styling to add wrapping or a horizontal scrollbar:
- Wrapping: [Template unavailable in the 2018 archive: tag — pre; o; params=style="white-space:-moz-pre-wrap; white-space:-pre-wrap; white-space:-o-pre-wrap; white-space:pre-wrap; word-wrap:break-word;"]
- Scroll bar: [Template unavailable in the 2018 archive: tag — pre; o; params=style="overflow:auto; width:auto;"]

Alternatively, consider using [Template unavailable in the 2018 archive: tl — pre2] template or [Template unavailable in the 2018 archive: xtag — syntaxhighlight; p; params=lang="text"].

### Invisible text (comments)
[Template unavailable in the 2018 archive: see also — Help:Hidden text]

It's uncommon[Template unavailable in the 2018 archive: spaced ndash]but on occasion acceptable for notes to other editors[Template unavailable in the 2018 archive: spaced ndash]to add a hidden comment within the text of an article. These comments are visible only when editing or viewing the source of a page. Most comments should go on the appropriate [Talk page](/Wikipedia:Talk_page).  The format is to surround the hidden text with "<code><!--</code>" and "<code>--></code>" and may cover several lines, e.g.:
 <nowiki></nowiki>

Another way to include a comment in the wiki markup uses the [Template unavailable in the 2018 archive: tl — Void] template, which can be abbreviated as [Template unavailable in the 2018 archive: tl — ^]. This template "expands" to the empty string, generating no HTML output; it is visible only to people editing the wiki source. Thus [Template unavailable in the 2018 archive: nowrap — 1=<code>[Template unavailable in the 2018 archive: tlp — ^; A lengthy comment here]</code>] operates similarly to the comment [Template unavailable in the 2018 archive: nowrap — 1=<code><!-- A lengthy comment here --></code>]. The main difference is that the template version can be nested, while attempting to nest HTML comments produces odd results.

### Variables
[Template unavailable in the 2018 archive: seealso — Help:Magic_words#Variables]

Code
Effect
Notes

 [Template unavailable in the 2018 archive: CURRENTWEEK]
 <nowiki>[Template unavailable in the 2018 archive: CURRENTDOW]</nowiki> || [Template unavailable in the 2018 archive: CURRENTDOW]
Monday = 1, Tuesday = 2, etc., but Sunday = 0

 [Template unavailable in the 2018 archive: CURRENTMONTH]
 <nowiki>[Template unavailable in the 2018 archive: CURRENTMONTHNAME]</nowiki>
[Template unavailable in the 2018 archive: CURRENTMONTHNAME]
 <nowiki>[Template unavailable in the 2018 archive: CURRENTMONTHNAMEGEN]</nowiki>
[Template unavailable in the 2018 archive: CURRENTMONTHNAMEGEN]
 <nowiki>[Template unavailable in the 2018 archive: CURRENTDAY]</nowiki> || [Template unavailable in the 2018 archive: CURRENTDAY]
 <nowiki>[Template unavailable in the 2018 archive: CURRENTDAYNAME]</nowiki> || [Template unavailable in the 2018 archive: CURRENTDAYNAME]
 <nowiki>[Template unavailable in the 2018 archive: CURRENTYEAR]</nowiki> || [Template unavailable in the 2018 archive: CURRENTYEAR]
 <nowiki>[Template unavailable in the 2018 archive: CURRENTTIME]</nowiki> || [Template unavailable in the 2018 archive: CURRENTTIME]
 <nowiki>[Template unavailable in the 2018 archive: NUMBEROFARTICLES]</nowiki>
[Template unavailable in the 2018 archive: NUMBEROFARTICLES]
 <nowiki>[Template unavailable in the 2018 archive: NUMBEROFPAGES]</nowiki>
[Template unavailable in the 2018 archive: NUMBEROFPAGES]
 <nowiki>[Template unavailable in the 2018 archive: NUMBEROFUSERS]</nowiki>
[Template unavailable in the 2018 archive: NUMBEROFUSERS]
 <nowiki>[Template unavailable in the 2018 archive: PAGENAME]</nowiki> || [Template unavailable in the 2018 archive: PAGENAME]
 <nowiki>[Template unavailable in the 2018 archive: NAMESPACE]</nowiki> || [Template unavailable in the 2018 archive: NAMESPACE]
 <nowiki>[Template unavailable in the 2018 archive: REVISIONID]</nowiki> || [Template unavailable in the 2018 archive: REVISIONID]
 <nowiki>[Template unavailable in the 2018 archive: REVISIONUSER]</nowiki> || [Template unavailable in the 2018 archive: REVISIONUSER]
 <nowiki>[Template unavailable in the 2018 archive: localurl:pagename]</nowiki>
[Template unavailable in the 2018 archive: localurl:pagename]
 <nowiki>[Template unavailable in the 2018 archive: localurl:</nowiki>*Wikipedia:Sandbox*<nowiki> — archived-action-removed]</nowiki>
[Template unavailable in the 2018 archive: localurl:Wikipedia:Sandbox — archived-action-removed]
 <nowiki>[Template unavailable in the 2018 archive: fullurl:pagename]</nowiki>
[Template unavailable in the 2018 archive: fullurl:pagename]
 <nowiki>[Template unavailable in the 2018 archive: fullurl:pagename — </nowiki>*query_string*<nowiki>]</nowiki>
[Template unavailable in the 2018 archive: fullurl:pagename — query_string]
 <nowiki>[Template unavailable in the 2018 archive: SERVER]</nowiki> || [Template unavailable in the 2018 archive: SERVER]
 <nowiki>[Template unavailable in the 2018 archive: ns:1]</nowiki> || [Template unavailable in the 2018 archive: ns:1]
<nowiki>[Template unavailable in the 2018 archive: ns:</nowiki>*index*<nowiki>] e.g. [Template unavailable in the 2018 archive: ns:1]</nowiki>  →  full name of namespace

 [Template unavailable in the 2018 archive: SITENAME]
**[Template unavailable in the 2018 archive: tlf — NUMBEROFARTICLES]** is the number of pages in the main namespace that contain a link and are not a redirect. This includes full articles, stubs containing a link, and disambiguation pages.

**[Template unavailable in the 2018 archive: tlf — CURRENTMONTHNAMEGEN]** is the genitive (possessive) grammatical form of the month name, as used in some languages but not in English; **[Template unavailable in the 2018 archive: tlf — CURRENTMONTHNAME]*' is the nominative (subject) form, as usually seen in English.

In languages where it makes a difference, you can use constructs like <code><nowiki>[Template unavailable in the 2018 archive: grammar:case — word]</nowiki></code> to convert a word from the nominative case to some other case. For example, <code><nowiki>[Template unavailable in the 2018 archive: grammar:genitive — [Template unavailable in the 2018 archive: CURRENTMONTHNAME]]</nowiki></code> means the same as <code><nowiki>[Template unavailable in the 2018 archive: CURRENTMONTHNAMEGEN]</nowiki></code>. 

### HTML
[Template unavailable in the 2018 archive: main — Help:HTML in wikitext]

Many [HTML](/HTML) tags can be used in wiki markup. You can check your HTML by using [markup validation](/Help:Markup_validation).

### Common templates
[Template unavailable in the 2018 archive: quicktemplates — state=expanded]

### See also
[Template unavailable in the 2018 archive: Help desk]
See the 'Coding wiki markup' section of the Help navigation navbox below for additional links.
- [Magic links](/Help:Magic_links): magic links are automatic links for certain unique identifiers that require no markup.
- [Extended image syntax](/Wikipedia:Extended_image_syntax): advanced [visual file markup](/Help:Visual_file_markup).
- [A quick guide to templates](/Help:A_quick_guide_to_templates): an introduction to [templates](/Help:Template).
- [Substitution](/Help:Substitution): substitution is an alternative way of including templates than [transclusion](/Wikipedia:Transclusion)
- [Score](/Help:Score): how to render musical scores.
- [Displaying a formula](/Help:Displaying_a_formula): displaying mathematical formulae.

[Template unavailable in the 2018 archive: Help navigation]
[Template unavailable in the 2018 archive: Wikipedia technical help — state=collapsed]
[Template unavailable in the 2018 archive: Tools — state=collapsed]

[Wikipedia how-to](/Category:Wikipedia_how-to)
[Wikipedia editor help](/Category:Wikipedia_editor_help)
[Wikipedia text help](/Category:Wikipedia_text_help)
