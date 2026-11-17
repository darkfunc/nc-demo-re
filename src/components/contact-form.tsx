"use client";

import { useActionState } from "react";

import { submitEnquiry, type ContactFormState } from "@/app/contact/actions";

const initialState: ContactFormState = { status: "idle", message: "" };

const inputClassName =
  "mt-2 w-full border-b border-border bg-transparent py-3 text-base outline-none transition-colors placeholder:text-muted-foreground focus:border-maroon";

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    submitEnquiry,
    initialState,
  );

  return (
    <form
      action={formAction}
      className="relative border border-border bg-paper p-8 md:p-12"
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        Contact Form
      </span>
      <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight">
        Use the form for general enquiries.
      </h2>

      <div className="mt-10 grid grid-cols-1 gap-7 md:grid-cols-2">
        <label className="block">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            Full Name
          </span>
          <input
            type="text"
            name="name"
            required
            maxLength={100}
            autoComplete="name"
            className={inputClassName}
          />
        </label>
        <label className="block">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            Email
          </span>
          <input
            type="email"
            name="email"
            required
            maxLength={200}
            autoComplete="email"
            className={inputClassName}
          />
        </label>
        <label className="block md:col-span-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            Subject
          </span>
          <select name="subject" defaultValue="General enquiry" className={inputClassName}>
            <option>General enquiry</option>
            <option>Admissions</option>
            <option>Sports & Activities</option>
            <option>Media & Press</option>
          </select>
        </label>
        <label className="block md:col-span-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            Message
          </span>
          <textarea
            name="message"
            rows={5}
            required
            minLength={10}
            maxLength={2000}
            className={`${inputClassName} resize-none`}
          />
        </label>
      </div>

      {/* Honeypot field: visually hidden, must remain empty. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="mt-10 inline-flex items-center gap-3 bg-maroon px-8 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-maroon-foreground transition-colors hover:bg-ink disabled:opacity-60"
      >
        {isPending ? "Submitting…" : "Submit Enquiry"}
        <span aria-hidden="true">→</span>
      </button>

      {state.message && (
        <p
          role="status"
          className={`mt-6 border-t border-border pt-5 text-sm font-medium ${
            state.status === "success" ? "text-maroon" : "text-red-700"
          }`}
        >
          {state.message}
        </p>
      )}
    </form>
  );
}
