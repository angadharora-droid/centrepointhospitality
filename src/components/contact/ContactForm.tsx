"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { ErrorSummary, Field, FormActions, FormNotice, FormSuccess, RequiredNote, Select } from "@/components/forms/FormParts";
import { useEnquiryForm, type BoundControl } from "@/components/forms/useEnquiryForm";
import * as v from "@/components/forms/validators";
import { emailFor, enquiryTypes, type EnquiryType } from "@/content/contact";
import { enquiryCopy, formOptions } from "@/content/contact-page";
import { cn } from "@/lib/cn";

/**
 * INTEGRATION POINT — no contact backend is configured for this project yet.
 * Set NEXT_PUBLIC_CONTACT_ENDPOINT to a URL that accepts a JSON POST of
 * `{ type, ...fields }` and returns 2xx; the success state then shows. Until
 * then a valid enquiry is never reported as sent: the visitor is offered a
 * pre-filled email to the right inbox (see emailFor in contact.ts) instead.
 */
const ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;

const ALL = [
  "name",
  "email",
  "phone",
  "company",
  "location",
  "projectType",
  "projectStatus",
  "currentLocation",
  "area",
  "experience",
  "publication",
  "deadline",
  "message",
] as const;
type ContactField = (typeof ALL)[number];

/** Fields on screen for each enquiry type, in order. Base fields first, the message last. */
const FIELDS: Record<EnquiryType, readonly ContactField[]> = {
  general: ["name", "email", "phone", "company", "message"],
  development: ["name", "email", "phone", "company", "location", "projectType", "projectStatus", "message"],
  careers: ["name", "email", "phone", "currentLocation", "area", "experience", "message"],
  media: ["name", "email", "phone", "publication", "deadline", "message"],
};

const BASE = new Set<ContactField>(["name", "email", "phone", "company", "message"]);

const initial = Object.fromEntries(ALL.map((field) => [field, ""])) as Record<ContactField, string>;

function rulesFor(type: EnquiryType) {
  return {
    name: v.name,
    email: v.email,
    // Recruiters usually call first, so a number is required for careers.
    phone: type === "careers" ? v.phone : v.optionalPhone,
    location: v.required("Please tell us where the project is."),
    projectType: v.required("Please choose a project type."),
    projectStatus: v.required("Please choose the project status."),
    currentLocation: v.required("Please tell us where you’re based."),
    area: v.required("Please choose an area of interest."),
    experience: v.required("Please choose your years of experience."),
    publication: v.required("Please tell us which publication or organisation you’re with."),
    message: v.message(20),
  } satisfies Partial<Record<ContactField, v.Validator>>;
}

const labelled: Record<ContactField, string> = {
  name: "Name",
  email: "Email",
  phone: "Phone",
  company: "Company",
  location: "Project location",
  projectType: "Project type",
  projectStatus: "Project status",
  currentLocation: "Current location",
  area: "Area of interest",
  experience: "Years of experience",
  publication: "Publication / organisation",
  deadline: "Deadline",
  message: "Message",
};

const controls: Record<ContactField, (control: BoundControl) => ReactNode> = {
  name: (c) => <input type="text" autoComplete="name" {...c} />,
  email: (c) => <input type="email" inputMode="email" autoComplete="email" {...c} />,
  phone: (c) => <input type="tel" inputMode="tel" autoComplete="tel" {...c} />,
  company: (c) => <input type="text" autoComplete="organization" {...c} />,
  location: (c) => <input type="text" placeholder="City, state" {...c} />,
  projectType: (c) => <Select tone="light" options={formOptions.projectTypes} {...c} />,
  projectStatus: (c) => <Select tone="light" options={formOptions.projectStatuses} {...c} />,
  currentLocation: (c) => <input type="text" autoComplete="address-level2" placeholder="City" {...c} />,
  area: (c) => <Select tone="light" options={formOptions.areasOfInterest} {...c} />,
  experience: (c) => <Select tone="light" options={formOptions.experienceLevels} {...c} />,
  publication: (c) => <input type="text" autoComplete="organization" {...c} />,
  deadline: (c) => <input type="date" {...c} />,
  message: (c) => <textarea rows={6} {...c} className={`${c.className} resize-y`} />,
};

// Links inside running text keep a resting underline, so they never rely on colour alone.
const inlineLink =
  "text-ink underline decoration-current/35 underline-offset-[0.3em] transition-[text-decoration-color] duration-(--duration-base) hover:decoration-current";

const isRequired = (type: EnquiryType, field: ContactField) => !["company", "deadline"].includes(field) && (field !== "phone" || type === "careers");

export function ContactForm({ initialType }: { initialType: EnquiryType }) {
  const [type, setType] = useState(initialType);
  // Follow the URL if it changes under us (e.g. a link to /contact?type=media while on the page).
  const [lastInitial, setLastInitial] = useState(initialType);
  if (initialType !== lastInitial) {
    setLastInitial(initialType);
    setType(initialType);
  }

  const form = useEnquiryForm<ContactField>({
    initial,
    rules: rulesFor(type),
    tone: "light",
    eager: ["name", "email"],
  });
  const { values } = form;
  const fields = FIELDS[type];
  const copy = enquiryCopy[type];
  const to = emailFor(type);

  const choose = (next: EnquiryType) => {
    setType(next);
    form.setErrors({});
    // Keep the address shareable without a navigation.
    window.history.replaceState(null, "", next === "general" ? window.location.pathname : `?type=${next}`);
  };

  if (form.status === "success") {
    return <FormSuccess id={form.resultId} tone="light" title={copy.success.title} text={copy.success.text} />;
  }

  const subjectDetail = {
    general: values.name,
    development: values.location,
    careers: values.area,
    media: values.publication,
  }[type];
  const mailto = v.mailto(to, `${copy.subject}${subjectDetail.trim() ? ` — ${subjectDetail.trim()}` : ""}`, [
    ...fields.filter((field) => field !== "message").map((field) => v.line(labelled[field], values[field])),
    "",
    values.message,
  ]);

  return (
    <form
      noValidate
      onSubmit={(event) =>
        form.submit(event, {
          fields,
          endpoint: ENDPOINT,
          payload: {
            type,
            ...Object.fromEntries(fields.map((field) => [field, values[field]])),
          },
        })
      }
      aria-describedby={`${form.uid}-required-note`}
    >
      <fieldset>
        <legend className="eyebrow text-stone">What’s your enquiry about?</legend>
        <div className="mt-5 grid grid-cols-2 md:flex md:gap-x-10 md:border-b md:border-ink/20">
          {enquiryTypes.map((option) => (
            <label
              key={option}
              data-checked={type === option}
              className={cn(
                "relative flex min-h-14 cursor-pointer items-center border-b border-ink/20 eyebrow text-stone transition-colors duration-(--duration-base) select-none hover:text-ink md:min-h-0 md:border-b-0 md:py-5",
                // Active state: a magenta bar under the label (a shape, not just a colour) plus ink text.
                "after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:origin-left after:scale-x-0 after:bg-magenta after:transition-transform after:duration-(--duration-base) after:ease-editorial",
                // State comes from React (data-checked) and focus from a peer, so neither depends on :has().
                "data-[checked=true]:text-ink data-[checked=true]:after:scale-x-100",
              )}
            >
              <input type="radio" name="type" value={option} checked={type === option} onChange={() => choose(option)} className="peer sr-only" />
              <span className="peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-(--focus-ring) peer-focus-visible:outline-solid">
                {enquiryCopy[option].label}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div aria-live="polite" className="mt-6 max-w-[34rem] text-stone">
        <p>{copy.note}</p>
        {copy.links && (
          <p className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
            {copy.links.map((link) => (
              <span key={link.href}>
                {link.external ? (
                  <a href={link.href} target="_blank" rel="noopener noreferrer" className={inlineLink}>
                    {link.label}
                    <span aria-hidden="true"> ↗</span>
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ) : (
                  <Link href={link.href} className={inlineLink}>
                    {link.label}
                  </Link>
                )}
              </span>
            ))}
          </p>
        )}
      </div>

      <div className="mt-12 border-t border-line pt-10">
        <RequiredNote id={`${form.uid}-required-note`} tone="light" />
        <ErrorSummary count={form.errorCount(fields)} tone="light" />

        <div className="mt-8 grid gap-x-(--spacing-grid) gap-y-8 md:grid-cols-2">
          {fields.map((field) => (
            <Field
              key={field}
              form={form}
              name={field}
              label={labelled[field]}
              required={isRequired(type, field)}
              hint={field === "deadline" ? "If you’re working to one." : undefined}
              className={cn(
                (field === "message" || field === "location") && "md:col-span-2",
                // Fields specific to the chosen type ease in when it changes.
                !BASE.has(field) && "animate-fade-in",
              )}
            >
              {controls[field]}
            </Field>
          ))}
        </div>

        <FormActions tone="light" status={form.status} label="Send enquiry" />
        <FormNotice id={form.resultId} tone="light" status={form.status} mailto={mailto} email={to} />
      </div>
    </form>
  );
}
