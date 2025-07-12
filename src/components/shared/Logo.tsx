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
      {/* Stylized leaf inside the shield */}
      <path d="M14.5 9.5c-1-2.5-3-3-4.5-3-2.5 0-4.5 2-4.5 4.5 0 2.5 2 5.5 4.5 7 2.5-1.5 4.5-4.5 4.5-7Z" />
      <path d="M12 15V7" />
    </svg>
  );
}
