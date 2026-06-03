import { clsx } from "clsx";
import { ArrowRight } from "lucide-react";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "light" | "dark";

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
  fullWidth?: boolean;
  showArrow?: boolean;
};

const variants: Record<ButtonVariant, string> = {
  primary:
    "border-bronze bg-bronze text-white hover:bg-[#936f45] hover:border-[#936f45]",
  secondary:
    "border-bronze/70 bg-transparent text-text hover:bg-bronze/10 hover:border-bronze",
  light:
    "border-bronze bg-bronze text-white hover:bg-[#b08a5a] hover:border-[#b08a5a]",
  dark:
    "border-cta-green bg-cta-green text-white hover:bg-green hover:border-green"
};

export default function Button({
  children,
  className,
  variant = "primary",
  fullWidth,
  showArrow = true,
  ...props
}: ButtonProps) {
  return (
    <a
      className={clsx(
        "group inline-flex min-h-12 items-center justify-center gap-3 rounded-md border px-7 py-3 text-sm font-semibold transition duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bronze",
        variants[variant],
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      <span>{children}</span>
      {showArrow ? (
        <ArrowRight className="h-4 w-4 transition duration-200 group-hover:translate-x-1" aria-hidden="true" />
      ) : null}
    </a>
  );
}
