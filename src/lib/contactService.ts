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
 *
 * Sequence:
 * 1. Dispatch EmailJS. If EmailJS fails -> STOP, return error (do NOT call Google Apps Script).
 * 2. If EmailJS succeeds -> Dispatch Google Apps Script webhook POST request.
 * 3. Return overall success even if Google Apps Script encounters non-blocking network warning.
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
    const emailResult = await emailjs.send(
      serviceId,
      templateId,
      templateParams,
      publicKey
    );

    if (emailResult.status !== 200 && emailResult.text !== "OK") {
      console.error("EmailJS dispatch returned status:", emailResult.status, emailResult.text);
      return {
        success: false,
        message: "Failed to send email via EmailJS. Please try contacting directly via email.",
      };
    }
  } catch (error) {
    console.error("EmailJS dispatch failed:", error);
    return {
      success: false,
      message: "Network error sending email. Please check your connection and try again.",
    };
  }

  // STEP 2: EmailJS succeeded! Now log to Google Sheets via Google Apps Script Webhook
  if (googleScriptUrl) {
    try {
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

      await fetch(googleScriptUrl, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sheetPayload),
      });
    } catch (error) {
      console.warn("Google Apps Script logging encountered warning:", error);
      // Do NOT lose user submission since EmailJS already succeeded
    }
  }

  // STEP 3: Return success response
  return {
    success: true,
    message: "Thank you! Your message has been sent successfully.",
  };
}
