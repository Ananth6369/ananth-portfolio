export interface ClientMetadata {
  browser: string;
  os: string;
  screen: string;
  language: string;
  timezone: string;
}

/**
 * Detects browser name from UserAgent string.
 */
function detectBrowser(): string {
  if (typeof window === "undefined" || !navigator) return "Unknown Browser";

  const ua = navigator.userAgent;
  if (ua.includes("Firefox")) return "Mozilla Firefox";
  if (ua.includes("Edg")) return "Microsoft Edge";
  if (ua.includes("Chrome")) return "Google Chrome";
  if (ua.includes("Safari")) return "Apple Safari";
  if (ua.includes("OPR") || ua.includes("Opera")) return "Opera";

  return "Browser";
}

/**
 * Detects Operating System from UserAgent / Platform.
 */
function detectOS(): string {
  if (typeof window === "undefined" || !navigator) return "Unknown OS";

  const ua = navigator.userAgent;
  if (ua.includes("Win")) return "Windows";
  if (ua.includes("Mac")) return "macOS";
  if (ua.includes("Linux")) return "Linux";
  if (ua.includes("Android")) return "Android";
  if (ua.includes("like Mac")) return "iOS";

  return "Desktop/Mobile";
}

/**
 * Collects client telemetry metadata for EmailJS & Google Sheets submission log.
 */
export function getBrowserMetadata(): ClientMetadata {
  if (typeof window === "undefined") {
    return {
      browser: "Server",
      os: "Server",
      screen: "N/A",
      language: "en",
      timezone: "UTC",
    };
  }

  let timezone = "UTC";
  try {
    timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
  } catch {
    timezone = "UTC";
  }

  return {
    browser: detectBrowser(),
    os: detectOS(),
    screen: `${window.innerWidth}x${window.innerHeight}`,
    language: navigator.language || "en",
    timezone,
  };
}
