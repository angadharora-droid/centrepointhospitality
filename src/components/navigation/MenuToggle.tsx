type MenuToggleProps = {
  open: boolean;
  controls: string;
  onToggle: () => void;
};

const line =
  "absolute left-0 h-px w-full bg-current transition-transform duration-(--duration-base) ease-editorial";

/** Two hairlines that fold into a cross. The accessible name stays "Menu". */
export function MenuToggle({ open, controls, onToggle }: MenuToggleProps) {
  return (
    <button
      type="button"
      aria-expanded={open}
      aria-controls={controls}
      onClick={onToggle}
      className="group -mr-2 flex items-center gap-3 p-2 lg:hidden"
    >
      <span className="eyebrow">Menu</span>
      <span aria-hidden="true" className="relative block h-2.5 w-7">
        <span className={`${line} top-0 group-aria-expanded:translate-y-[4.5px] group-aria-expanded:rotate-45`} />
        <span className={`${line} bottom-0 group-aria-expanded:-translate-y-[4.5px] group-aria-expanded:-rotate-45`} />
      </span>
    </button>
  );
}
