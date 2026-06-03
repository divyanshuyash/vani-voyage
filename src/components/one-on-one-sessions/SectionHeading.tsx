import { clsx } from "clsx";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  className
}: SectionHeadingProps) {
  return (
    <div className={clsx("text-center", className)}>
      {eyebrow ? (
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-bronze">
          {eyebrow}
        </p>
      ) : null}
      <div className="flex items-center justify-center gap-5">
        <span className="hidden h-px w-14 bg-bronze/55 sm:block" />
        <h2 className="font-serif text-3xl font-semibold leading-tight text-text sm:text-4xl">
          {title}
        </h2>
        <span className="hidden h-px w-14 bg-bronze/55 sm:block" />
      </div>
      {subtitle ? (
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-text-dim sm:text-base">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
