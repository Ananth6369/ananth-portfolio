/**
 * Unescapes common HTML entities in text strings.
 */
function unescapeHtml(html: string): string {
  return html
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"');
}

/**
 * Creates a clean, word-boundary safe excerpt from HTML or raw text content.
 * @param content Source text or HTML content
 * @param maxLength Target maximum length of excerpt
 * @returns Cleaned and truncated summary string
 */
export function createExcerpt(content: string, maxLength: number = 160): string {
  if (!content || typeof content !== "string") {
    return "";
  }

  // Strip HTML tags
  let cleaned = content.replace(/<[^>]*>/g, " ");

  // Unescape HTML entities
  cleaned = unescapeHtml(cleaned);

  // Normalize whitespace
  cleaned = cleaned.replace(/\s+/g, " ").trim();

  if (cleaned.length <= maxLength) {
    return cleaned;
  }

  // Truncate cleanly at word boundary
  const truncated = cleaned.slice(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(" ");

  if (lastSpaceIndex > 0) {
    return `${truncated.slice(0, lastSpaceIndex)}...`;
  }

  return `${truncated}...`;
}
