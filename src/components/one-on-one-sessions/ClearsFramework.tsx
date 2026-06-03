import { clsx } from "clsx";
import type { FrameworkItem } from "@/lib/one-on-one-sessions/content";

type ClearsFrameworkProps = {
  title: string;
  items: FrameworkItem[];
};

export default function ClearsFramework({ title, items }: ClearsFrameworkProps) {
  return (
    <div id="how-it-works" className="h-full">
      <h2 className="font-serif text-3xl font-semibold text-text sm:text-4xl">
        {title.replace(" (C.L.E.A.R.S)", "")}{" "}
        <span className="font-serif text-2xl font-normal tracking-[0.16em] text-muted sm:text-3xl">
          (C.L.E.A.R.S)
        </span>
      </h2>
      <span className="mt-4 block h-px w-12 bg-bronze" aria-hidden="true" />

      <div className="mt-7 grid gap-0 overflow-hidden rounded-2xl border border-border/55 bg-background/15 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((item, index) => (
          <article
            key={`${item.letter}-${item.title}`}
            className={clsx(
              "flex min-h-[150px] gap-4 border-border/55 p-6",
              index % 3 !== 0 && "xl:border-l",
              index > 1 && "sm:border-t",
              index > 2 && "xl:border-t"
            )}
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-bronze/70 font-serif text-3xl font-semibold text-text">
              {item.letter}
            </div>
            <div className="pt-1">
              <h3 className="text-sm font-bold text-text">{item.title}</h3>
              <p className="mt-2 text-xs leading-5 text-text-dim sm:text-[13px]">
                {item.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
