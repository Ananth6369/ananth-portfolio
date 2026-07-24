"use client";

import React, { useState, useRef } from "react";
import { Send, RotateCw, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { sanitizeInput, isValidEmail } from "@/utils/sanitizer";
import { isBotSubmission } from "@/utils/antiSpam";
import { getBrowserMetadata } from "@/utils/browserMetadata";
import { sendContactMessage } from "@/lib/contactService";

const MAX_MESSAGE_LENGTH = 1000;

interface FormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
  botcheck: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function ContactForm() {
  const [values, setValues] = useState<FormValues>({
    name: "",
    email: "",
    subject: "",
    message: "",
    botcheck: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const nameInputRef = useRef<HTMLInputElement>(null);

  const validate = (currentValues: FormValues): FormErrors => {
    const newErrors: FormErrors = {};

    const cleanName = currentValues.name.trim();
    if (!cleanName) {
      newErrors.name = "Full Name is required.";
    } else if (cleanName.length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    } else if (cleanName.length > 100) {
      newErrors.name = "Name cannot exceed 100 characters.";
    }

    const cleanEmail = currentValues.email.trim();
    if (!cleanEmail) {
      newErrors.email = "Email Address is required.";
    } else if (!isValidEmail(cleanEmail)) {
      newErrors.email = "Please enter a valid email address (e.g. name@example.com).";
    }

    const cleanSubject = currentValues.subject.trim();
    if (!cleanSubject) {
      newErrors.subject = "Subject is required.";
    } else if (cleanSubject.length < 3) {
      newErrors.subject = "Subject must be at least 3 characters.";
    } else if (cleanSubject.length > 150) {
      newErrors.subject = "Subject cannot exceed 150 characters.";
    }

    const cleanMessage = currentValues.message.trim();
    if (!cleanMessage) {
      newErrors.message = "Message content is required.";
    } else if (cleanMessage.length < 10) {
      newErrors.message = "Message must be at least 10 characters.";
    } else if (currentValues.message.length > MAX_MESSAGE_LENGTH) {
      newErrors.message = `Message cannot exceed ${MAX_MESSAGE_LENGTH} characters.`;
    }

    return newErrors;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const nextValues = { ...values, [name]: value };
    setValues(nextValues);

    if (touched[name]) {
      setErrors(validate(nextValues));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors(validate(values));
  };

  const handleReset = () => {
    setValues({
      name: "",
      email: "",
      subject: "",
      message: "",
      botcheck: "",
    });
    setErrors({});
    setTouched({});
    setSubmitStatus("idle");
    setStatusMessage("");
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Anti-spam check
    if (isBotSubmission(values.botcheck)) {
      setSubmitStatus("error");
      setStatusMessage("Submission failed. Anti-spam bot check triggered.");
      return;
    }

    // Touch all fields and validate
    setTouched({
      name: true,
      email: true,
      subject: true,
      message: true,
    });

    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    const sanitizedPayload = {
      name: sanitizeInput(values.name),
      email: sanitizeInput(values.email),
      subject: sanitizeInput(values.subject),
      message: sanitizeInput(values.message),
      metadata: getBrowserMetadata(),
    };

    try {
      const result = await sendContactMessage(sanitizedPayload);
      if (result.success) {
        setSubmitStatus("success");
        setStatusMessage(result.message);

        // Case 3: Reset form values on success and return focus
        setValues({
          name: "",
          email: "",
          subject: "",
          message: "",
          botcheck: "",
        });
        setTouched({});
        setErrors({});
      } else {
        // Case 1: EmailJS fails -> Keep form values intact
        setSubmitStatus("error");
        setStatusMessage(result.message);
      }
    } catch {
      setSubmitStatus("error");
      setStatusMessage("An unexpected error occurred while sending your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl backdrop-blur-md relative overflow-hidden">
      <h3 className="text-2xl font-bold text-slate-50 mb-2 font-heading">
        Send a Direct Message
      </h3>
      <p className="text-slate-400 text-sm mb-6">
        Have a question, automation project inquiry, or SDET opportunity? Drop a message below.
      </p>

      {/* Success Alert / Toast */}
      {submitStatus === "success" && (
        <div
          data-testid="contact-success"
          id="contact-success-alert"
          className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 flex items-start gap-3 text-sm animate-fade-in"
          role="alert"
        >
          <CheckCircle2 size={20} className="shrink-0 text-emerald-400 mt-0.5" />
          <div>
            <div className="font-bold">Message Delivered</div>
            <div>{statusMessage}</div>
          </div>
        </div>
      )}

      {/* Error Alert / Toast */}
      {submitStatus === "error" && (
        <div
          data-testid="contact-error"
          id="contact-error-alert"
          className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-300 flex items-start gap-3 text-sm animate-fade-in"
          role="alert"
        >
          <AlertCircle size={20} className="shrink-0 text-red-400 mt-0.5" />
          <div>
            <div className="font-bold font-heading">Submission Error</div>
            <div>{statusMessage}</div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {/* Invisible Honeypot Anti-Spam Field */}
        <div className="hidden" aria-hidden="true">
          <input
            type="text"
            name="botcheck"
            tabIndex={-1}
            autoComplete="off"
            value={values.botcheck}
            onChange={handleChange}
          />
        </div>

        {/* Full Name & Email Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Full Name */}
          <div>
            <label
              htmlFor="contact-name"
              className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2"
            >
              Full Name <span className="text-rose-400">*</span>
            </label>
            <input
              ref={nameInputRef}
              id="contact-name"
              data-testid="contact-name"
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
              placeholder="John Doe"
              className={`w-full px-4 py-3 bg-slate-950/80 border rounded-xl text-slate-100 text-sm placeholder-slate-500 focus:outline-none transition-all ${
                errors.name && touched.name
                  ? "border-red-500 focus:border-red-500 ring-1 ring-red-500/30"
                  : "border-slate-800 focus:border-accent focus:ring-1 focus:ring-accent"
              }`}
            />
            {errors.name && touched.name && (
              <p
                data-testid="contact-name-error"
                className="text-xs text-red-400 mt-1.5 font-medium"
              >
                {errors.name}
              </p>
            )}
          </div>

          {/* Email Address */}
          <div>
            <label
              htmlFor="contact-email"
              className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2"
            >
              Email Address <span className="text-rose-400">*</span>
            </label>
            <input
              id="contact-email"
              data-testid="contact-email"
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
              placeholder="john@example.com"
              className={`w-full px-4 py-3 bg-slate-950/80 border rounded-xl text-slate-100 text-sm placeholder-slate-500 focus:outline-none transition-all ${
                errors.email && touched.email
                  ? "border-red-500 focus:border-red-500 ring-1 ring-red-500/30"
                  : "border-slate-800 focus:border-accent focus:ring-1 focus:ring-accent"
              }`}
            />
            {errors.email && touched.email && (
              <p
                data-testid="contact-email-error"
                className="text-xs text-red-400 mt-1.5 font-medium"
              >
                {errors.email}
              </p>
            )}
          </div>
        </div>

        {/* Subject */}
        <div>
          <label
            htmlFor="contact-subject"
            className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2"
          >
            Subject <span className="text-rose-400">*</span>
          </label>
          <input
            id="contact-subject"
            data-testid="contact-subject"
            type="text"
            name="subject"
            value={values.subject}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
            placeholder="Playwright Automation Architecture / SDET Role"
            className={`w-full px-4 py-3 bg-slate-950/80 border rounded-xl text-slate-100 text-sm placeholder-slate-500 focus:outline-none transition-all ${
              errors.subject && touched.subject
                ? "border-red-500 focus:border-red-500 ring-1 ring-red-500/30"
                : "border-slate-800 focus:border-accent focus:ring-1 focus:ring-accent"
            }`}
          />
          {errors.subject && touched.subject && (
            <p
              data-testid="contact-subject-error"
              className="text-xs text-red-400 mt-1.5 font-medium"
            >
              {errors.subject}
            </p>
          )}
        </div>

        {/* Message */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label
              htmlFor="contact-message"
              className="block text-xs font-bold text-slate-300 uppercase tracking-wider"
            >
              Message <span className="text-rose-400">*</span>
            </label>
            {/* Character Counter */}
            <span
              data-testid="character-count"
              className={`text-xs font-mono font-medium ${
                values.message.length > MAX_MESSAGE_LENGTH
                  ? "text-red-400 font-bold"
                  : "text-slate-400"
              }`}
            >
              {values.message.length} / {MAX_MESSAGE_LENGTH} characters
            </span>
          </div>

          <textarea
            id="contact-message"
            data-testid="contact-message"
            name="message"
            rows={5}
            value={values.message}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
            placeholder="Hello Ananth, I'd like to discuss an automation testing project..."
            className={`w-full px-4 py-3 bg-slate-950/80 border rounded-xl text-slate-100 text-sm placeholder-slate-500 focus:outline-none transition-all resize-y ${
              errors.message && touched.message
                ? "border-red-500 focus:border-red-500 ring-1 ring-red-500/30"
                : "border-slate-800 focus:border-accent focus:ring-1 focus:ring-accent"
            }`}
          />
          {errors.message && touched.message && (
            <p
              data-testid="contact-message-error"
              className="text-xs text-red-400 mt-1.5 font-medium"
            >
              {errors.message}
            </p>
          )}
        </div>

        {/* Form Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            type="submit"
            data-testid="contact-submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-accent text-slate-950 font-bold text-sm rounded-xl hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={18} className="animate-spin text-slate-950" />
                <span>Sending...</span>
              </>
            ) : (
              <>
                <span>Send Message</span>
                <Send size={16} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>

          <button
            type="button"
            data-testid="contact-reset"
            onClick={handleReset}
            disabled={isSubmitting}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-slate-100 font-semibold text-sm rounded-xl border border-slate-700/80 transition-colors disabled:opacity-50"
          >
            <RotateCw size={16} />
            <span>Reset Form</span>
          </button>
        </div>
      </form>
    </div>
  );
}
