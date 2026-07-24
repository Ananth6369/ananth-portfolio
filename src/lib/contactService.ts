import emailjs from "@emailjs/browser";
import { ClientMetadata } from "@/utils/browserMetadata";

export interface ContactSubmissionPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
  metadata: ClientMetadata;
}

export interface ContactServiceResult {
  success: boolean;
  message: string;
}

/**
 * Dispatches contact message to EmailJS via @emailjs/browser SDK and logs to Google Sheets.
 * Includes diagnostic logging and robust runtime resolution.
 */
export async function sendContactMessage(
  payload: ContactSubmissionPayload
): Promise<ContactServiceResult> {
  const serviceId =
    process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_71pr04i";
  const templateId =
    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_8pp7gma";
  const publicKey =
    process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "r_jxZ6Z8vMDMR57Yq";
  const googleScriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;

  console.log("[ContactService Debug] Initializing contact submission flow:", {
    serviceId: serviceId ? "Present" : "Missing",
    templateId: templateId ? "Present" : "Missing",
    publicKey: publicKey ? "Present" : "Missing",
    hasGoogleScriptUrl: Boolean(googleScriptUrl && googleScriptUrl.trim().length > 0),
    googleScriptUrlValue: googleScriptUrl ? `${googleScriptUrl.slice(0, 35)}...` : "UNDEFINED / MISSING",
  });

  const templateParams = {
    name: payload.name,
    email: payload.email,
    subject: payload.subject,
    message: payload.message,
    from_name: payload.name,
    from_email: payload.email,
    browser: payload.metadata.browser,
    os: payload.metadata.os,
    screen: payload.metadata.screen,
    language: payload.metadata.language,
    timezone: payload.metadata.timezone,
  };

  // STEP 1: Dispatch via EmailJS SDK
  try {
    console.log("[ContactService Debug] Attempting EmailJS dispatch...");
    const emailResult = await emailjs.send(
      serviceId,
      templateId,
      templateParams,
      publicKey
    );

    console.log("[ContactService Debug] EmailJS result:", emailResult.status, emailResult.text);

    if (emailResult.status !== 200 && emailResult.text !== "OK") {
      console.error("[ContactService Debug] EmailJS returned non-ok status:", emailResult.status, emailResult.text);
      return {
        success: false,
        message: "Failed to send email via EmailJS. Please try contacting directly via email.",
      };
    }
  } catch (error) {
    console.error("[ContactService Debug] EmailJS dispatch exception:", error);
    return {
      success: false,
      message: "Network error sending email. Please check your connection and try again.",
    };
  }

  // STEP 2: EmailJS succeeded! Now log to Google Sheets via Google Apps Script Webhook
  if (googleScriptUrl && googleScriptUrl.trim().length > 0) {
    try {
      console.log("[ContactService Debug] EmailJS succeeded. Dispatching Google Apps Script webhook to:", googleScriptUrl);
      const sheetPayload = {
        name: payload.name,
        email: payload.email,
        subject: payload.subject,
        message: payload.message,
        browser: payload.metadata.browser,
        os: payload.metadata.os,
        screen: payload.metadata.screen,
        language: payload.metadata.language,
        timezone: payload.metadata.timezone,
      };

      const fetchResult = await fetch(googleScriptUrl, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sheetPayload),
      });

      console.log("[ContactService Debug] Google Apps Script fetch executed successfully with no-cors mode:", fetchResult);
    } catch (error) {
      console.warn("[ContactService Debug] Google Apps Script fetch caught error:", error);
      // Do NOT lose user submission since EmailJS already succeeded
    }
  } else {
    console.warn(
      "[ContactService Debug] CRITICAL: Google Apps Script request skipped because NEXT_PUBLIC_GOOGLE_SCRIPT_URL is undefined or empty. Add NEXT_PUBLIC_GOOGLE_SCRIPT_URL in Vercel Environment Variables and trigger a re-deploy."
    );
  }

  // STEP 3: Return success response
  return {
    success: true,
    message: "Thank you! Your message has been sent successfully.",
  };
}
