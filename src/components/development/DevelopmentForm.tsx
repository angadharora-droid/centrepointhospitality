"use client";

import { ErrorSummary, Field, FormActions, FormNotice, FormSuccess, RequiredNote, Select } from "@/components/forms/FormParts";
import { useEnquiryForm } from "@/components/forms/useEnquiryForm";
import * as v from "@/components/forms/validators";
import { enquiry } from "@/content/development";

/**
 * INTEGRATION POINT — no form backend is configured for this project yet.
 * Set NEXT_PUBLIC_DEVELOPMENT_ENQUIRY_ENDPOINT to a URL that accepts a JSON
 * POST of the fields below and returns 2xx; the success state then shows.
 * Until then a valid enquiry is never reported as sent: the visitor is offered
 * a pre-filled email to the published address instead.
 */
const ENDPOINT = process.env.NEXT_PUBLIC_DEVELOPMENT_ENQUIRY_ENDPOINT;

const FIELDS = ["name", "company", "email", "phone", "website", "location", "projectType", "size", "projectStatus", "message"] as const;
type DevelopmentField = (typeof FIELDS)[number];

const initial = Object.fromEntries(FIELDS.map((field) => [field, ""])) as Record<DevelopmentField, string>;

const rules = {
  name: v.name,
  email: v.email,
  phone: v.optionalPhone,
  website: v.optionalWebsite,
  location: v.required("Please tell us where the project is."),
  projectType: v.required("Please choose a project type."),
  projectStatus: v.required("Please choose the project status."),
  message: v.message(20, "Please tell us a little more about the opportunity"),
};

export function DevelopmentForm() {
  const form = useEnquiryForm<DevelopmentField>({ initial, rules, tone: "dark", eager: ["name", "email"] });
  const { values } = form;

  if (form.status === "success") {
    return <FormSuccess id={form.resultId} tone="dark" title={enquiry.success.title} text={enquiry.success.text} />;
  }

  const mailto = v.mailto(enquiry.fallbackEmail, `Development enquiry — ${values.location}`, [
    `Name: ${values.name}`,
    v.line("Company", values.company),
    `Email: ${values.email}`,
    v.line("Phone", values.phone),
    v.line("Website", values.website),
    `Project location: ${values.location}`,
    `Project type: ${values.projectType}`,
    v.line("Approximate size / keys", values.size),
    `Project status: ${values.projectStatus}`,
    "",
    values.message,
  ]);

  return (
    <form
      noValidate
      onSubmit={(event) => form.submit(event, { fields: FIELDS, endpoint: ENDPOINT, payload: values })}
      aria-describedby={`${form.uid}-required-note`}
    >
      <RequiredNote id={`${form.uid}-required-note`} tone="dark" />
      <ErrorSummary count={form.errorCount(FIELDS)} tone="dark" />

      <div className="mt-8 grid gap-x-(--spacing-grid) gap-y-8 md:grid-cols-2">
        <Field form={form} name="name" label="Name" required>
          {(control) => <input type="text" autoComplete="name" {...control} />}
        </Field>
        <Field form={form} name="company" label="Company">
          {(control) => <input type="text" autoComplete="organization" {...control} />}
        </Field>
        <Field form={form} name="email" label="Email" required>
          {(control) => <input type="email" inputMode="email" autoComplete="email" {...control} />}
        </Field>
        <Field form={form} name="phone" label="Phone">
          {(control) => <input type="tel" inputMode="tel" autoComplete="tel" {...control} />}
        </Field>
        <Field form={form} name="website" label="Company website">
          {(control) => <input type="url" inputMode="url" autoComplete="url" placeholder="company.com" {...control} />}
        </Field>
        <Field form={form} name="location" label="Project location" required>
          {(control) => <input type="text" placeholder="City, state" {...control} />}
        </Field>
        <Field form={form} name="projectType" label="Project type" required>
          {(control) => <Select tone="dark" options={enquiry.projectTypes} {...control} />}
        </Field>
        <Field form={form} name="projectStatus" label="Project status" required>
          {(control) => <Select tone="dark" options={enquiry.projectStatuses} {...control} />}
        </Field>
        <Field form={form} name="size" label="Approximate size / keys" hint="A rough figure is fine." className="md:col-span-2">
          {(control) => <input type="text" placeholder="e.g. 80 keys, or 6,000 sq ft" {...control} />}
        </Field>
        <Field form={form} name="message" label="About the opportunity" required className="md:col-span-2">
          {(control) => <textarea rows={5} {...control} className={`${control.className} resize-y`} />}
        </Field>
      </div>

      <FormActions tone="dark" status={form.status} label="Discuss a project" />
      <FormNotice id={form.resultId} tone="dark" status={form.status} mailto={mailto} email={enquiry.fallbackEmail} />
    </form>
  );
}
