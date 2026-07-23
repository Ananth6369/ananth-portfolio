/**
 * Calculates estimated reading time for a given text or HTML string.
 * @param content Text or HTML content of the article
 * @returns Formatted reading time string (e.g., "4 min read")
 */
export function calculateReadingTime(content: string): string {
  if (!content || typeof content !== "string") {
    return "1 min read";
  }

  // Strip HTML tags
  const cleanText = content.replace(/<[^>]*>/g, " ").trim();
  if (!cleanText) {
    return "1 min read";
  }

  const wordsPerMinute = 200;
  const wordsCount = cleanText.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(wordsCount / wordsPerMinute));

  return `${minutes} min read`;
}
