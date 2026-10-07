import { cn } from "@/lib/cn";

type EmphasisProps = { text: string; word: string; className?: string };

/** Renders `text`, setting the first occurrence of `word` in italic. */
export function Emphasis({ text, word, className }: EmphasisProps) {
  const at = text.indexOf(word);
  if (at < 0) return text;
  return (
    <>
      {text.slice(0, at)}
      <em className={cn("italic", className)}>{word}</em>
      {text.slice(at + word.length)}
    </>
  );
}
