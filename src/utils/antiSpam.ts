/**
 * Checks if hidden honeypot field has been filled out by automated spambots.
 */
export function isBotSubmission(honeypotValue: string): boolean {
  return Boolean(honeypotValue && honeypotValue.trim().length > 0);
}

/**
 * Generates a simple timestamp-based submission token for client anti-spam challenge.
 */
export function generateFormToken(): string {
  const time = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 7);
  return `${time}-${random}`;
}
