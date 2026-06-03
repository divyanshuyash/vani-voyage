import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

export function Container({ children, className = "" }: ContainerProps) {
  return (
    <div
      className={`vvv-webinar-container mx-auto w-full max-w-[1240px] ${className}`}
    >
      {children}
    </div>
  );
}
