"use client";

import { ErrorSummary, Field, FormActions, FormNotice, FormSuccess, RequiredNote, Select } from "@/components/forms/FormParts";
import { useEnquiryForm } from "@/components/forms/useEnquiryForm";
import * as v from "@/components/forms/validators";
import { application, areasOfInterest, experienceLevels } from "@/content/careers";

/**
 * INTEGRATION POINT — no applications backend or file storage is configured.
 * Set NEXT_PUBLIC_CAREERS_APPLICATION_ENDPOINT to a URL that accepts a JSON
 * POST of the fields below and returns 2xx; the success state then shows.
 * CV upload is deliberately left out until storage exists — until then the
 * visitor is offered a pre-filled email and asked to attach their CV there.
 */
const ENDPOINT = process.env.NEXT_PUBLIC_CAREERS_APPLICATION_ENDPOINT;

const FIELDS = ["name", "email", "phone", "location", "area", "experience", "message"] as const;
type ApplicationField = (typeof FIELDS)[number];

const initial = Object.fromEntries(FIELDS.map((field) => [field, ""])) as Record<ApplicationField, string>;

const rules = {
  name: v.name,
  email: v.email,
  phone: v.phone,
  location: v.required("Please tell us where you’re based."),
  area: v.required("Please choose an area of interest."),
  experience: v.required("Please choose your years of experience."),
};

export function CareersForm() {
  const form = useEnquiryForm<ApplicationField>({ initial, rules, tone: "dark", eager: ["name", "email"] });
  const { values } = form;

  if (form.status === "success") {
    return <FormSuccess id={form.resultId} tone="dark" title={application.success.title} text={application.success.text} />;
  }

  const mailto = v.mailto(application.fallbackEmail, `General application — ${values.area}`, [
    `Name: ${values.name}`,
    `Email: ${values.email}`,
    `Phone: ${values.phone}`,
    `Current location: ${values.location}`,
    `Area of interest: ${values.area}`,
    `Experience: ${values.experience}`,
    ...(values.message.trim() ? ["", values.message.trim()] : []),
  ]);

  return (
    <form
      noValidate
      onSubmit={(event) => form.submit(event, { fields: FIELDS, endpoint: ENDPOINT, payload: { type: "careers", ...values } })}
      aria-describedby={`${form.uid}-required-note`}
    >
      <RequiredNote id={`${form.uid}-required-note`} tone="dark" />
      <ErrorSummary count={form.errorCount(FIELDS)} tone="dark" />

      <div className="mt-8 grid gap-x-(--spacing-grid) gap-y-8 md:grid-cols-2">
        <Field form={form} name="name" label="Full name" required>
          {(control) => <input type="text" autoComplete="name" {...control} />}
        </Field>
        <Field form={form} name="email" label="Email" required>
          {(control) => <input type="email" inputMode="email" autoComplete="email" {...control} />}
        </Field>
        <Field form={form} name="phone" label="Phone" required>
          {(control) => <input type="tel" inputMode="tel" autoComplete="tel" {...control} />}
        </Field>
        <Field form={form} name="location" label="Current location" required>
          {(control) => <input type="text" autoComplete="address-level2" placeholder="City" {...control} />}
        </Field>
        <Field form={form} name="area" label="Area of interest" required>
          {(control) => <Select tone="dark" options={areasOfInterest} {...control} />}
        </Field>
        <Field form={form} name="experience" label="Years of experience" required>
          {(control) => <Select tone="dark" options={experienceLevels} {...control} />}
        </Field>
        <Field form={form} name="message" label="About you" hint="The kind of role you’re looking for, and anything we should know." className="md:col-span-2">
          {(control) => <textarea rows={5} {...control} className={`${control.className} resize-y`} />}
        </Field>
      </div>

      <FormActions tone="dark" status={form.status} label="Send application" note="We only use these details to consider your application." />
      <FormNotice
        id={form.resultId}
        tone="dark"
        status={form.status}
        mailto={mailto}
        email={application.fallbackEmail}
        extra="Please attach your CV to the email."
        noun="application"
      />
    </form>
  );
}
