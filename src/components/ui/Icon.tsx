interface IconProps {
  name: "phone" | "check" | "arrow" | "shield" | "menu" | "plus";
  className?: string;
}

const paths: Record<IconProps["name"], string> = {
  phone:
    "M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25c1.1.37 2.3.57 3.6.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.3.2 2.5.57 3.6a1 1 0 0 1-.25 1Z",
  check: "M20 6 9 17l-5-5",
  arrow: "M5 12h14m-6-6 6 6-6 6",
  shield: "M12 3 4 6v6c0 5 3.4 8.4 8 9 4.6-.6 8-4 8-9V6Z",
  menu: "M4 7h16M4 12h16M4 17h16",
  plus: "M5 12h14",
};

export function Icon({ name, className }: IconProps) {
  const filled = name === "phone";
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className={className ?? "h-5 w-5"}
      fill={filled ? "currentColor" : "none"}
      stroke={filled ? "none" : "currentColor"}
      strokeWidth={filled ? 0 : 2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={paths[name]} />
      {/* The upright stroke collapses when the parent disclosure opens, so the
          plus reads as a minus without swapping icons. */}
      {name === "plus" ? (
        <path className="icon-plus-upright" d="M12 5v14" />
      ) : null}
    </svg>
  );
}
