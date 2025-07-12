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
      {/* Shield outline */}
      <path d="M12 2L4 5v6c0 5 3.58 9.64 8 11 4.42-1.36 8-6 8-11V5l-8-3z" />
      {/* Leaf inside the shield */}
      <path d="M12 17c-2.5-1.5-3.5-4-3.5-6 0-2 1.5-4 3.5-4s3.5 2 3.5 4c0 2-1 4.5-3.5 6z" />
      <path d="M12 7v10" />
    </svg>
  );
}
