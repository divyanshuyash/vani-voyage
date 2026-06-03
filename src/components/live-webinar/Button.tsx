import { ArrowRight } from "lucide-react";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "dark" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: boolean;
};

const variants = {
  primary:
    "border border-[#C59A60] bg-gradient-to-r from-[#B78343] to-[#D6A45C] text-white shadow-[0_14px_32px_rgba(163,131,91,0.28)] hover:from-[#C18F4E] hover:to-[#E0AE67]",
  secondary:
    "border border-[#B99766] bg-transparent text-[#F8EFE1] hover:bg-[#E8DFCF]/10",
  dark:
    "border border-[#A3835B] bg-[#102D25] text-[#F8EFE1] hover:bg-[#163A31]",
  ghost:
    "border border-[#C7B9A0] bg-[#EFE7DA]/55 text-brand-text hover:bg-[#F7F0E6]",
};

const sizes = {
  sm: "min-h-10 px-4 py-2 text-sm",
  md: "min-h-12 px-5 py-3 text-sm",
  lg: "min-h-14 px-7 py-4 text-base",
};

export function Button({
  children,
  className = "",
  variant = "primary",
  size = "md",
  icon = true,
  ...props
}: ButtonProps) {
  return (
    <a
      className={`inline-flex items-center justify-center gap-3 rounded-xl font-extrabold tracking-[-0.01em] transition duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#A3835B] focus:ring-offset-2 focus:ring-offset-[#102D25] ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      <span>{children}</span>
      {icon ? <ArrowRight aria-hidden="true" size={18} strokeWidth={2.4} /> : null}
    </a>
  );
}
