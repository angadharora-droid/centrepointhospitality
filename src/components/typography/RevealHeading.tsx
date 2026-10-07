import { Fragment } from "react";
import { RevealItem } from "@/components/motion/Reveal";
import { Emphasis } from "./Emphasis";

type RevealHeadingProps = {
  as?: "h1" | "h2";
  id?: string;
  lines: readonly string[];
  emphasis?: string;
  emphasisClassName?: string;
  className?: string;
};

/**
 * A multi-line display heading whose lines rise out of their own masks when
 * the surrounding <Reveal> plays. Lines stay separate words for assistive tech.
 */
export function RevealHeading({ as: Tag = "h2", id, lines, emphasis, emphasisClassName, className }: RevealHeadingProps) {
  return (
    <Tag id={id} className={className}>
      {lines.map((line, i) => (
        <Fragment key={line}>
          <span className="-my-[0.14em] block overflow-hidden py-[0.14em] pr-[0.08em]">
            <RevealItem as="span" variant="line" className="block">
              {emphasis ? <Emphasis text={line} word={emphasis} className={emphasisClassName} /> : line}
            </RevealItem>
          </span>
          {i < lines.length - 1 && " "}
        </Fragment>
      ))}
    </Tag>
  );
}
