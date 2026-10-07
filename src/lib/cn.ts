/** Joins truthy class names. Deliberately tiny — no merge semantics. */
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
