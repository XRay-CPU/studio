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
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="hsl(var(--primary))" />
      <path d="M12 12c-2-2.5-2.5-6-1-7.5" stroke="hsl(var(--primary))" />
      <path d="M12 12c2-2.5 2.5-6 1-7.5" stroke="hsl(var(--primary))" />
      <path d="M12 12v6" stroke="hsl(var(--primary))" />
      <path d="M10 14h4" stroke="hsl(var(--primary))" />
    </svg>
  );
}
