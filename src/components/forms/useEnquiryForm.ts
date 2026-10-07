"use client";

import { useId, useState, type ChangeEvent, type FocusEvent, type FormEvent } from "react";
import { cn } from "@/lib/cn";
import type { Validator } from "./validators";

/** The surface a form sits on: charcoal / aubergine ("dark") or paper ("light"). */
export type FormTone = "light" | "dark";
export type FormStatus = "idle" | "submitting" | "success" | "unconnected" | "error";

type Control = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

// Underline fields; resting rules keep 3:1 against their surface. Focus
// thickens the rule (border + inset shadow) as well as changing its colour, so
// the focus state never relies on colour alone.
const CONTROL =
  "mt-3 block min-h-12 w-full rounded-none border-0 border-b bg-transparent px-0 py-3 text-[1.0625rem] transition-[border-color,background-color,box-shadow] duration-(--duration-fast) focus:outline-none focus-visible:outline-none";

const TONES = {
  dark: {
    base: "text-paper placeholder:text-mist/80 focus:bg-paper/[0.04]",
    idle: "border-paper/40 hover:border-paper/65 focus:border-paper focus:shadow-[inset_0_-1px_0_var(--color-paper)]",
    invalid: "border-blush focus:shadow-[inset_0_-1px_0_var(--color-blush)]",
  },
  light: {
    base: "text-ink placeholder:text-stone focus:bg-ink/[0.03]",
    idle: "border-ink/50 hover:border-ink/75 focus:border-ink focus:shadow-[inset_0_-1px_0_var(--color-ink)]",
    invalid: "border-magenta focus:shadow-[inset_0_-1px_0_var(--color-magenta)]",
  },
} as const;

export function controlClass(tone: FormTone, invalid: boolean) {
  return cn(CONTROL, TONES[tone].base, invalid ? TONES[tone].invalid : TONES[tone].idle);
}

type Options<F extends string> = {
  initial: Record<F, string>;
  rules: Partial<Record<F, Validator>>;
  tone?: FormTone;
  /** Fields that report a missing value as soon as they're left. Others wait for submit, so nobody is nagged mid-form. */
  eager?: readonly F[];
};

type SubmitOptions<F extends string> = {
  /** The fields currently on screen, in the order they appear. */
  fields: readonly F[];
  endpoint?: string;
  payload: Record<string, string>;
};

/**
 * State, validation and submission shared by every enquiry form on the site.
 * Errors are checked on blur and on submit; a failed submit moves focus to the
 * first problem field. With no endpoint configured the form never claims to
 * have sent anything — it reports "unconnected" so the page can offer email.
 */
export function useEnquiryForm<F extends string>({ initial, rules, tone = "dark", eager = [] }: Options<F>) {
  const uid = useId();
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState<Partial<Record<F, string>>>({});
  const [status, setStatus] = useState<FormStatus>("idle");

  const id = (field: F) => `${uid}-${field}`;
  /** Id for the success / notice block that takes focus after a submit. */
  const resultId = `${uid}-result`;
  const check = (field: F, value: string) => rules[field]?.(value) ?? undefined;

  const onChange = (event: ChangeEvent<Control>) => {
    const field = event.target.name as F;
    const value = event.target.value;
    setValues((current) => ({ ...current, [field]: value }));
    // Once a field has shown an error, re-check it as the visitor corrects it.
    if (errors[field]) setErrors((current) => ({ ...current, [field]: check(field, value) }));
  };

  const onBlur = (event: FocusEvent<Control>) => {
    const field = event.target.name as F;
    if (!event.target.value && !eager.includes(field)) return;
    setErrors((current) => ({ ...current, [field]: check(field, event.target.value) }));
  };

  const focusResult = () => requestAnimationFrame(() => document.getElementById(resultId)?.focus());

  const submit = async (event: FormEvent, { fields, endpoint, payload }: SubmitOptions<F>) => {
    event.preventDefault();
    if (status === "submitting") return;

    const next: Partial<Record<F, string>> = {};
    for (const field of fields) {
      const message = check(field, values[field]);
      if (message) next[field] = message;
    }
    setErrors(next);
    const firstInvalid = fields.find((field) => next[field]);
    if (firstInvalid) {
      document.getElementById(id(firstInvalid))?.focus();
      return;
    }

    if (!endpoint) {
      setStatus("unconnected");
      focusResult();
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setStatus(response.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
    focusResult();
  };

  /** Props for the input, select or textarea bound to `field`. */
  const bind = (field: F, { hint = false, required = false }: { hint?: boolean; required?: boolean } = {}) => ({
    id: id(field),
    name: field,
    value: values[field],
    onChange,
    onBlur,
    "aria-required": required || undefined,
    "aria-invalid": Boolean(errors[field]) || undefined,
    "aria-describedby": errors[field] ? `${id(field)}-error` : hint ? `${id(field)}-hint` : undefined,
    className: controlClass(tone, Boolean(errors[field])),
  });

  const errorCount = (fields: readonly F[]) => fields.filter((field) => errors[field]).length;

  return { uid, id, resultId, tone, values, errors, setErrors, status, setStatus, bind, submit, errorCount };
}

export type EnquiryForm<F extends string> = ReturnType<typeof useEnquiryForm<F>>;
export type BoundControl = ReturnType<EnquiryForm<string>["bind"]>;
