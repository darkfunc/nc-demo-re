"use server";

import { z } from "zod";

const SUBJECTS = [
  "General enquiry",
  "Admissions",
  "Sports & Activities",
  "Media & Press",
] as const;

const enquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name.").max(100),
  email: z.string().trim().email("Please enter a valid email address.").max(200),
  subject: z.enum(SUBJECTS),
  message: z
    .string()
    .trim()
    .min(10, "Please provide at least 10 characters.")
    .max(2000),
  // Honeypot: hidden from humans, bots tend to fill every input. Must stay empty.
  website: z.string().max(0),
});

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message: string;
};

export async function submitEnquiry(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const parsed = enquirySchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;

    // A filled honeypot means a bot — return a fake success so it learns nothing.
    if (fieldErrors.website?.length) {
      return {
        status: "success",
        message: "Thank you. Your enquiry has been received.",
      };
    }

    const firstError =
      fieldErrors.name?.[0] ??
      fieldErrors.email?.[0] ??
      fieldErrors.subject?.[0] ??
      fieldErrors.message?.[0];

    return {
      status: "error",
      message: firstError ?? "Please check the form and try again.",
    };
  }

  // TODO: deliver the enquiry to the school inbox (e.g. info@nalandacollege.lk)
  // via an email provider (Resend / Nodemailer) once credentials are available.
  console.log("[contact] enquiry received", {
    name: parsed.data.name,
    email: parsed.data.email,
    subject: parsed.data.subject,
    length: parsed.data.message.length,
  });

  return {
    status: "success",
    message:
      "Thank you. Your enquiry has been received and will be reviewed by the office.",
  };
}
