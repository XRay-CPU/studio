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

      {/* Nature (Leaf) + Blockchain (Blocks) + Tech (Lines) */}
      <g transform="translate(0, -1)">
        <path 
            d="M12 17.5c-3.3 0-6-2.7-6-6 0-3.9 2-6.5 6-9.5 4 3 6 5.6 6 9.5 0 3.3-2.7 6-6 6z"
            stroke="hsl(var(--primary))" 
            opacity="0.4"
            strokeWidth="1.5"
        />
        
        {/* Blockchain Vein */}
        <path d="M12 17V14.5M12 12.5V11" stroke="hsl(var(--primary))" strokeWidth="1.5"/>
        <rect x="11" y="12.5" width="2" height="2" rx="0.5" fill="hsl(var(--primary))" stroke="hsl(var(--primary))" strokeWidth="0.5" />
        
        {/* Tech Lines branching out */}
        <path d="M12 11c-1-1-2.5-2.5-2.5-4" stroke="hsl(var(--primary))" opacity="0.8" />
        <path d="M12 11c1-1 2.5-2.5 2.5-4" stroke="hsl(var(--primary))" opacity="0.8" />
        
        <path d="M9.5 13.5c-1.5 0-2.5-1.5-2.5-2.5" stroke="hsl(var(--primary))" opacity="0.8" />
        <path d="M14.5 13.5c1.5 0 2.5-1.5 2.5-2.5" stroke="hsl(var(--primary))" opacity="0.8" />

        {/* Nodes */}
        <circle cx="9.5" cy="7" r="0.75" fill="hsl(var(--primary))" />
        <circle cx="14.5" cy="7" r="0.75" fill="hsl(var(--primary))" />
        <circle cx="7" cy="11" r="0.75" fill="hsl(var(--primary))" />
        <circle cx="17" cy="11" r="0.75" fill="hsl(var(--primary))" />
      </g>
    </svg>
  );
}
