import { cn } from "@/lib/utils";
import type { SVGProps } from "react";

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="hsl(var(--primary))"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
      className={cn(props.className)}
    >
      <title>Likas Bayani Logo</title>
      {/* Outer Circle */}
      <circle cx="12" cy="12" r="10" />
      {/* Leaf Vein / Circuit */}
      <path d="M12 2v4" />
      <path d="M12 18v4" />
      <path d="M12 12l-4 4" />
      <path d="M12 12l4 4" />
      <path d="M12 12l-4-4" />
      <path d="M12 12l4-4" />
      {/* Node Dots */}
      <circle cx="12" cy="7" r="1" />
      <circle cx="12" cy="17" r="1" />
      <circle cx="7" cy="7" r="1" />
      <circle cx="17" cy="7" r="1" />
      <circle cx="7" cy="17" r="1" />
      <circle cx="17" cy="17" r="1" />
    </svg>
  );
}
