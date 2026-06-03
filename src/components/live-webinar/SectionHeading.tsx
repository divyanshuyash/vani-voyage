type SectionHeadingProps = {
  kicker?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  kicker,
  title,
  intro,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  return (
    <div
      className={`${align === "center" ? "mx-auto text-center" : ""} ${className}`}
    >
      {kicker ? (
        <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.12em] text-brand-bronze">
          {kicker}
        </p>
      ) : null}
      <h2 className="font-serif text-[2.15rem] font-black leading-[1.05] text-brand-text sm:text-5xl">
        {title}
      </h2>
      {intro ? (
        <p className="mt-4 text-lg font-semibold leading-8 text-brand-dim sm:text-xl">
          {intro}
        </p>
      ) : null}
      <span
        aria-hidden="true"
        className={`mt-6 block h-1 w-12 rounded-full bg-brand-bronze ${align === "center" ? "mx-auto" : ""}`}
      />
    </div>
  );
}
