"use client";

import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Button } from "@/components/ui/ButtonLink";
import { cn } from "@/lib/cn";
import type { BoundControl, EnquiryForm, FormStatus, FormTone } from "./useEnquiryForm";

const muted = (tone: FormTone) => (tone === "dark" ? "text-mist" : "text-stone");
const accent = (tone: FormTone) => (tone === "dark" ? "text-blush" : "text-magenta");

type FieldProps<F extends string> = {
  form: EnquiryForm<F>;
  name: F;
  label: string;
  required?: boolean;
  hint?: string;
  className?: string;
  /** Renders the control with the bound props (id, value, handlers, aria-*, classes). */
  children: (control: BoundControl) => ReactNode;
};

/** Label, control, then either the hint or the error — the error replaces the hint and is linked by aria-describedby. */
export function Field<F extends string>({ form, name, label, required = false, hint, className, children }: FieldProps<F>) {
  const error = form.errors[name];
  return (
    <div className={cn("min-w-0", className)}>
      <label htmlFor={form.id(name)} className={cn("flex items-baseline gap-2 eyebrow", muted(form.tone))}>
        {label}
        {required ? (
          <>
            <span aria-hidden="true" className={accent(form.tone)}>
              *
            </span>
            <span className="sr-only">(required)</span>
          </>
        ) : (
          <span className={cn("normal-case tracking-normal", form.tone === "dark" ? "text-mist/80" : "text-stone")}>optional</span>
        )}
      </label>
      {children(form.bind(name, { hint: Boolean(hint), required }))}
      {hint && !error && (
        <p id={`${form.id(name)}-hint`} className={cn("mt-2 text-small", muted(form.tone))}>
          {hint}
        </p>
      )}
      {error && (
        <p id={`${form.id(name)}-error`} className={cn("mt-2 text-small", accent(form.tone))}>
          {error}
        </p>
      )}
    </div>
  );
}

type SelectProps = BoundControl & Omit<ComponentPropsWithoutRef<"select">, keyof BoundControl> & {
  options: readonly string[];
  tone: FormTone;
};

/** Native select restyled as an underline field, with a hairline chevron. */
export function Select({ options, tone, className, ...props }: SelectProps) {
  const option = tone === "dark" ? "bg-ink text-paper" : "bg-paper text-ink";
  return (
    <div className="relative">
      <select {...props} className={cn(className, "cursor-pointer appearance-none pr-8")}>
        <option value="" disabled className={option}>
          Select…
        </option>
        {options.map((value) => (
          <option key={value} value={value} className={option}>
            {value}
          </option>
        ))}
      </select>
      <svg aria-hidden="true" viewBox="0 0 12 8" className={cn("pointer-events-none absolute right-1 bottom-5 h-2 w-3 fill-none stroke-current", muted(tone))}>
        <path d="M1 1.5 L6 6.5 L11 1.5" strokeWidth="1" />
      </svg>
    </div>
  );
}

export function RequiredNote({ id, tone }: { id: string; tone: FormTone }) {
  return (
    <p id={id} className={cn("text-small", muted(tone))}>
      Fields marked <span className={accent(tone)}>*</span> are required.
    </p>
  );
}

/** Announced the moment a submit finds problems; the fields themselves carry the detail. */
export function ErrorSummary({ count, tone }: { count: number; tone: FormTone }) {
  if (!count) return null;
  return (
    <p role="alert" className={cn("mt-4 text-small", accent(tone))}>
      Please check the {count === 1 ? "highlighted field" : `${count} highlighted fields`} below.
    </p>
  );
}

type ActionsProps = { tone: FormTone; status: FormStatus; label: string; note?: string };

export function FormActions({ tone, status, label, note = "We only use these details to respond to your enquiry." }: ActionsProps) {
  return (
    <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
      <Button type="submit" fillText={tone === "dark" ? "var(--color-ink)" : "var(--color-paper)"} disabled={status === "submitting"}>
        {status === "submitting" ? "Sending…" : label}
      </Button>
      <p className={cn("text-small", muted(tone))}>{note}</p>
    </div>
  );
}

type NoticeProps = {
  /** Receives focus once shown (see useEnquiryForm's resultId). */
  id: string;
  tone: FormTone;
  status: FormStatus;
  /** Pre-filled mailto: link carrying what the visitor typed. */
  mailto: string;
  email: string;
  /** Extra guidance for the email route, e.g. attaching a CV. */
  extra?: string;
  /** What the form sends, for the wording. */
  noun?: "enquiry" | "application";
};

/**
 * Shown after a valid submit when nothing was sent — because no endpoint is
 * connected yet, or the request failed. It says so plainly and offers email.
 */
export function FormNotice({ id, tone, status, mailto, email, extra, noun = "enquiry" }: NoticeProps) {
  if (status !== "unconnected" && status !== "error") return null;
  const strong = tone === "dark" ? "text-paper" : "text-ink";
  return (
    <div id={id} tabIndex={-1} role="status" className={cn("mt-8 border-l pl-5 outline-none", tone === "dark" ? "border-blush" : "border-magenta")}>
      <p className={strong}>
        {status === "unconnected"
          ? `Online ${noun === "enquiry" ? "enquiries" : "applications"} aren’t connected yet, so this form hasn’t sent anything.`
          : `Something went wrong and your ${noun} wasn’t sent.`}
      </p>
      <p className={cn("mt-2", muted(tone))}>
        <a href={mailto} className={cn("underline decoration-current/35 underline-offset-[0.3em] transition-[text-decoration-color] duration-(--duration-base) hover:decoration-current", strong)}>
          Send these details by email
        </a>{" "}
        to {email} instead.{extra && ` ${extra}`}
      </p>
    </div>
  );
}

type SuccessProps = { id: string; tone: FormTone; title: string; text: string };

export function FormSuccess({ id, tone, title, text }: SuccessProps) {
  return (
    <div id={id} tabIndex={-1} role="status" className={cn("border-t pt-10 outline-none", tone === "dark" ? "border-line-inverse" : "border-line")}>
      <p className="font-display text-heading">{title}</p>
      <p className={cn("mt-4 max-w-[30rem] md:text-[1.0625rem]", muted(tone))}>{text}</p>
    </div>
  );
}
