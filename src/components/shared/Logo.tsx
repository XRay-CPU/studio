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
        d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
        stroke="hsl(var(--primary))"
        fill="hsl(var(--primary))"
        opacity="0.1"
      />
      <path
        d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
        fill="none"
        stroke="hsl(var(--primary))"
      />
      <path
        d="M14.5 9.1c-1.1-.3-2.3-.4-3.5-.4-3.9 0-7 2.2-7 5.9 0 2.2 1.3 4 3.2 4.9"
        stroke="hsl(var(--primary))"
        opacity="0.8"
      />
      <path
        d="M15.5 16.8c1.3-1 2.5-2.6 2.5-4.8 0-2.3-1.4-4-3.5-4.5"
        stroke="hsl(var(--primary))"
        opacity="0.8"
      />
       <path
        d="M9,12v-1"
        stroke="hsl(var(--primary))"
        opacity="0.6"
       />
       <path
        d="M12,14v-1.5"
        stroke="hsl(var(--primary))"
        opacity="0.6"
       />
        <path
        d="M15,12v-1"
        stroke="hsl(var(--primary))"
        opacity="0.6"
       />
    </svg>
  );
}