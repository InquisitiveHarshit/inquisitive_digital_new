export interface ParsedResult {
  title: string;
  slug: string;
  category: string;
  author: string;
  intro: string;
  excerpt: string;
  seoTitle: string;
  seoDescription: string;
  sections: any[];
  faqs: any[];
}

/**
 * Reads the Google Docs <style> block via regex and maps class names
 * (like .c11) to whether they apply bold, italic, or underline.
 */
function extractGoogleDocsFormattingClasses(css: string) {
  const boldClasses = new Set<string>();
  const italicClasses = new Set<string>();
  const underlineClasses = new Set<string>();

  const ruleMatches = css.matchAll(/\.(c\d+)\s*\{([^}]+)\}/g);
  for (const match of ruleMatches) {
    const cls = match[1];
    const body = match[2];
    if (/font-weight\s*:\s*(700|bold)/i.test(body))  boldClasses.add(cls);
    if (/font-style\s*:\s*italic/i.test(body))        italicClasses.add(cls);
    if (/text-decoration[^;]*underline/i.test(body))  underlineClasses.add(cls);
  }

  return { boldClasses, italicClasses, underlineClasses };
}

/**
 * Replaces <span class="cN">text</span> with semantic <strong>, <em>, <u> tags.
 * Strips class-only spans (no formatting) leaving just plain text.
 */
function convertGoogleDocsSpans(
  html: string,
  boldClasses: Set<string>,
  italicClasses: Set<string>,
  underlineClasses: Set<string>
): string {
  return html.replace(/<span\s+class="([^"]*)">([\s\S]*?)<\/span>/g, (_, classAttr, content) => {
    const classes = classAttr.split(/\s+/);
    const isBold      = classes.some((c: string) => boldClasses.has(c));
    const isItalic    = classes.some((c: string) => italicClasses.has(c));
    const isUnderline = classes.some((c: string) => underlineClasses.has(c));

    let result = content;
    if (isUnderline) result = `<u>${result}</u>`;
    if (isItalic)    result = `<em>${result}</em>`;
    if (isBold)      result = `<strong>${result}</strong>`;
    return result;
  });
}

/**
 * Parses raw HTML pasted from Google Docs into our Blog schema format.
 *
 * Key design:
 * - H2 tags → new sections (with heading field)
 * - H3 tags → embedded as <h3> HTML inside section.text (preserves document order)
 * - <p> tags → wrapped as <p> HTML inside section.text
 * - <ul>/<ol> → both stored in listItems[] (for Admin UI) AND appended as HTML to section.text (for blog page order)
 * - Everything within a section flows into section.text as one ordered HTML blob
 */
export function parseGoogleDocsHtml(htmlString: string): ParsedResult {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");

  // Extract formatting classes from embedded Google Docs CSS
  const styleElements = Array.from(doc.querySelectorAll("style"));
  const cssText = styleElements.map(el => el.textContent || "").join("\n");
  const { boldClasses, italicClasses, underlineClasses } = extractGoogleDocsFormattingClasses(cssText);

  /** Clean raw innerHTML from Google Docs: convert spans, fix entities */
  function cleanHtml(raw: string): string {
    let html = convertGoogleDocsSpans(raw, boldClasses, italicClasses, underlineClasses);
    html = html.replace(/<span[^>]*><\/span>/g, ""); // strip empty spans
    html = html.replace(/&lt;/g, "<").replace(/&gt;/g, ">");  // fix escaped HTML
    html = html.replace(/&rdquo;|&ldquo;|\u201d|\u201c/g, '"'); // fix smart quotes
    return html.trim();
  }

  const result: ParsedResult = {
    title: "",
    slug: "",
    category: "",
    author: "",
    intro: "",
    excerpt: "",
    seoTitle: "",
    seoDescription: "",
    sections: [],
    faqs: [],
  };

  let currentSection: any = null;
  let inFaqSection = false;
  let inIntro = true; // true until we hit first H2

  let expectingField: keyof ParsedResult | null = null;

  const nodes = Array.from(doc.body.childNodes);

  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i] as HTMLElement;
    if (node.nodeType !== Node.ELEMENT_NODE) continue;

    const tagName = node.tagName.toLowerCase();
    const plainText = node.textContent?.trim() || "";
    const lowerPlain = plainText.toLowerCase();

    // Skip empty nodes (allow <br>, <hr>, <img>)
    if (!plainText && tagName !== "br" && tagName !== "hr" && tagName !== "img") continue;

    // ── Metadata: inline match (e.g. "Title: My Blog Post") ─────────────────
    const inlineMatch = plainText.match(
      /^(Primary Keyword|Title|URL Slug|Slug|Category|Author|Intro Paragraph|Card Excerpt|Excerpt|SEO Title|SEO Meta Title|Description|SEO Description|SEO Meta Description)[\s*]*[:-]+\s*(.+)$/i
    );
    if (inlineMatch) {
      const key = inlineMatch[1].toLowerCase();
      const val = inlineMatch[2].trim();
      if (key.includes("title") && !key.includes("seo")) result.title = val;
      else if (key.includes("slug"))        result.slug = val;
      else if (key.includes("category"))    result.category = val;
      else if (key.includes("author"))      result.author = val;
      else if (key.includes("intro"))       result.intro = result.intro ? result.intro + "\n\n" + val : val;
      else if (key.includes("excerpt"))     result.excerpt = val;
      else if (key.includes("seo title"))   result.seoTitle = val;
      else if (key.includes("description")) result.seoDescription = val;
      else if (key.includes("keyword") && !result.seoTitle) result.seoTitle = val;
      continue;
    }

    // ── Metadata: label-then-value pattern ───────────────────────────────────
    const labelMap: Record<string, keyof ParsedResult> = {
      "title": "title", "title *": "title", "title:": "title",
      "url slug": "slug", "url slug (optional - autogenerated if empty)": "slug", "slug:": "slug",
      "category": "category", "category *": "category", "category:": "category",
      "author": "author", "author:": "author",
      "intro paragraph": "intro", "intro paragraph:": "intro",
      "card excerpt": "excerpt", "card excerpt:": "excerpt",
      "seo meta title": "seoTitle", "seo meta title:": "seoTitle",
      "seo meta description": "seoDescription", "seo meta description:": "seoDescription",
    };
    if (labelMap[lowerPlain]) {
      expectingField = labelMap[lowerPlain];
      continue;
    }
    if (expectingField) {
      if (typeof result[expectingField] === "string") {
        const basic = ["title", "slug", "category", "author", "seoTitle", "seoDescription"];
        (result as any)[expectingField] = basic.includes(expectingField)
          ? plainText
          : node.innerHTML.trim();
      }
      expectingField = null;
      continue;
    }

    // ── Skip admin UI noise ───────────────────────────────────────────────────
    if (/^(1\. basics|e\.g\. 10-seo-strategies|inquisitive digital|2\. hero image|upload from computer|or|paste cloudinary url\.\.\.|3\. content sections|paste from google docs|add section|no sections added yet\. click "add section" to begin writing\.|4\. faqs|add faq|5\. seo & settings)$/i.test(lowerPlain)) {
      continue;
    }

    // ── H1: Blog title ────────────────────────────────────────────────────────
    if (tagName === "h1") {
      if (!result.title) result.title = plainText;
      continue;
    }

    // ── H2: Start a new section ───────────────────────────────────────────────
    if (tagName === "h2") {
      if (lowerPlain.includes("faq") || lowerPlain.includes("frequently asked questions")) {
        inFaqSection = true;
        currentSection = null;
      } else {
        inFaqSection = false;
        inIntro = false;
        currentSection = {
          heading: plainText,
          subheading: "",
          text: "",
          listItems: [],
          image: { url: "", alt: "" },
          subsections: [],
        };
        result.sections.push(currentSection);
      }
      continue;
    }

    // ── H3: Embed as <h3> in section.text to preserve document order ──────────
    if (tagName === "h3") {
      if (inFaqSection) {
        result.faqs.push({ question: plainText, answer: "", tag: "FAQ" });
      } else if (currentSection) {
        const h3Block = `<h3>${plainText}</h3>`;
        currentSection.text = currentSection.text
          ? currentSection.text + "\n\n" + h3Block
          : h3Block;
      }
      continue;
    }

    // ── Paragraphs ────────────────────────────────────────────────────────────
    if (tagName === "p" || tagName === "span" || tagName === "div") {
      const cleaned = cleanHtml(node.innerHTML.trim());
      if (!cleaned) continue;

      const pBlock = `<p>${cleaned}</p>`;

      if (inFaqSection && result.faqs.length > 0) {
        const faq = result.faqs[result.faqs.length - 1];
        faq.answer = faq.answer ? faq.answer + "<br><br>" + cleaned : cleaned;
      } else if (inIntro || !currentSection) {
        result.intro = result.intro ? result.intro + "\n\n" + pBlock : pBlock;
      } else if (currentSection) {
        currentSection.text = currentSection.text
          ? currentSection.text + "\n\n" + pBlock
          : pBlock;
      }
      continue;
    }

    // ── Lists: stored in both listItems[] and section.text HTML ───────────────
    if (tagName === "ul" || tagName === "ol") {
      const lis = Array.from(node.querySelectorAll("li")).map(li =>
        cleanHtml(li.innerHTML.trim())
      );
      if (lis.length === 0) continue;

      const listHtml = `<${tagName}>\n${lis.map(li => `  <li>${li}</li>`).join("\n")}\n</${tagName}>`;

      if (inFaqSection && result.faqs.length > 0) {
        const faq = result.faqs[result.faqs.length - 1];
        faq.answer += "<br>" + lis.map((li: string) => "• " + li).join("<br>");
      } else if (currentSection) {
        currentSection.listItems.push(...lis);
        currentSection.text = currentSection.text
          ? currentSection.text + "\n\n" + listHtml
          : listHtml;
      }
      continue;
    }
  }

  return result;
}
