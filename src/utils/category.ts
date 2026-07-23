/**
 * Normalizes a tag string into Title Case (e.g. "playwright" -> "Playwright").
 */
export function normalizeTag(tag: string): string {
  if (!tag || typeof tag !== "string") return "";

  const trimmed = tag.trim();
  if (!trimmed) return "";

  // Split by whitespace or hyphens if needed, or capitalize word start
  return trimmed
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

/**
 * Normalizes an array of category tags:
 * 1. Title case normalization
 * 2. Deduplication (case-insensitive)
 * 3. Alphabetical sorting
 */
export function normalizeCategories(categories: string[]): string[] {
  if (!Array.isArray(categories)) {
    return [];
  }

  const map = new Map<string, string>();

  for (const cat of categories) {
    if (!cat) continue;
    const normalized = normalizeTag(cat);
    const key = normalized.toLowerCase();
    if (normalized && !map.has(key)) {
      map.set(key, normalized);
    }
  }

  return Array.from(map.values()).sort((a, b) => a.localeCompare(b));
}
