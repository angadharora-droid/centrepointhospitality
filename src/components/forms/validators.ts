/** A field rule: an error message for the visitor, or null when the value is fine. */
export type Validator = (raw: string) => string | null;

export const required =
  (message: string): Validator =>
  (raw) =>
    raw.trim() ? null : message;

export const name: Validator = (raw) => (raw.trim().length < 2 ? "Please enter your name." : null);

export const email: Validator = (raw) => {
  const value = raw.trim();
  if (!value) return "Please enter your email address.";
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value) ? null : "Please enter a valid email address, like name@company.com.";
};

const PHONE = /^[+()\d\s-]{7,20}$/;

export const optionalPhone: Validator = (raw) => {
  const value = raw.trim();
  return value && !PHONE.test(value) ? "Please enter a valid phone number, or leave it blank." : null;
};

export const phone: Validator = (raw) => {
  const value = raw.trim();
  if (!value) return "Please enter a phone number.";
  return PHONE.test(value) ? null : "Please enter a valid phone number, like +91 98765 43210.";
};

export const optionalWebsite: Validator = (raw) => {
  const value = raw.trim();
  if (!value) return null;
  try {
    new URL(/^https?:\/\//.test(value) ? value : `https://${value}`);
    return /\.\w{2,}/.test(value) ? null : "Please enter a valid web address, or leave it blank.";
  } catch {
    return "Please enter a valid web address, or leave it blank.";
  }
};

export const message =
  (min = 20, text = "Please tell us a little more"): Validator =>
  (raw) =>
    raw.trim().length < min ? `${text} (at least ${min} characters).` : null;

/** Builds a mailto: link with the given lines as the body — the fallback while no endpoint is connected. */
export function mailto(to: string, subject: string, lines: Array<string | false | null | undefined>) {
  const body = lines.filter((line): line is string => typeof line === "string").join("\n");
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/** "Label: value" when the value is filled in — for optional lines in a mailto body. */
export const line = (label: string, value: string) => (value.trim() ? `${label}: ${value.trim()}` : null);
