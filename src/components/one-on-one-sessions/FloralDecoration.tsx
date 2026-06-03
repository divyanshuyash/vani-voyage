import { clsx } from "clsx";

type FloralDecorationProps = {
  className?: string;
  opacity?: string;
};

export default function FloralDecoration({
  className,
  opacity = "opacity-45"
}: FloralDecorationProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/one-on-one-sessions/images/floral-line.svg"
      alt=""
      aria-hidden="true"
      className={clsx("pointer-events-none select-none", opacity, className)}
      loading="lazy"
    />
  );
}
