import { clsx } from "clsx";
import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

export default function Container({ children, className }: ContainerProps) {
  const classNameText = className || "";

  return (
    <div
      className={clsx(
        "vvv-container mx-auto w-full max-w-[1360px]",
        classNameText.includes("px-0") && "vvv-flush",
        classNameText.includes("lg:px-10") && "vvv-lg-padded",
        className
      )}
    >
      {children}
    </div>
  );
}
