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
      {/* Central block - the root/foundation */}
      <rect x="10" y="15" width="4" height="4" rx="1" stroke="hsl(var(--primary))" />

      {/* Left leaf block */}
      <path d="M10 15l-5-3.5" stroke="hsl(var(--primary))" />
      <rect x="3" y="10.5" width="4" height="4" rx="1" transform="rotate(-35 5 12.5)" stroke="hsl(var(--primary))" />

      {/* Right leaf block */}
      <path d="M14 15l5-3.5" stroke="hsl(var(--primary))" />
      <rect x="17" y="10.5" width="4" height="4" rx="1" transform="rotate(35 19 12.5)" stroke="hsl(var(--primary))" />

      {/* Top leaf block */}
      <path d="M12 15V9" stroke="hsl(var(--primary))" />
      <rect x="10" y="5" width="4" height="4" rx="1" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" />
    </svg>
  );
}
