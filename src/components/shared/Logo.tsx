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
      {/* Shield Outline */}
      <path 
        d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" 
        stroke="hsl(var(--primary))"
        fill="hsl(var(--primary))"
        opacity="0.1"
      />
      <path 
        d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" 
        stroke="hsl(var(--primary))"
        strokeWidth="1.5"
        fill="none"
      />

      {/* Leaf and Tech Lines */}
      <path 
        d="M12 17a5 5 0 0 0 5-5 5 5 0 0 0-5-5 5 5 0 0 0-5 5 5 5 0 0 0 5 5z" 
        stroke="hsl(var(--primary))" 
        opacity="0.6"
      />
      <path 
        d="M12 17v-1"
        stroke="hsl(var(--primary))"
      />
      <path 
        d="M12 9v-2m-2.5 5h-2m4.5 2.5l-1.5 1.5m5-5.5l1.5-1.5"
        stroke="hsl(var(--primary))"
        opacity="0.8"
      />
    </svg>
  );
}
