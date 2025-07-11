import { cn } from "@/lib/utils";
import type { SVGProps } from "react";

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
      className={cn(props.className)}
    >
      <path
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Z"
        stroke="hsl(var(--primary))"
        fill="hsl(var(--primary))"
        opacity="0.1"
      />
      <path
        d="M12,22C17.5228,22 22,17.5228 22,12C22,6.47715 17.5228,2 12,2C6.47715,2 2,6.47715 2,12C2,17.5228 6.47715,22 12,22Z"
        stroke="hsl(var(--primary))"
        strokeWidth="1.5"
      />
      {/* Leaf Vein / Circuit */}
      <path d="M12 20V8" stroke="hsl(var(--primary))" strokeWidth="1.5" />
      <path d="M10 12h4" stroke="hsl(var(--primary))" strokeWidth="1.5" />
      <path d="M10 15h4" stroke="hsl(var(--primary))" strokeWidth="1.5" />
      <path d="M9 18h6" stroke="hsl(var(--primary))" strokeWidth="1.5" />
    </svg>
  );
}