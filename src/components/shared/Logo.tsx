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
        d="M12,2A10,10,0,0,0,8.2,21.12"
        stroke="hsl(var(--primary))"
        fill="hsl(var(--primary))"
        opacity="0.1"
      />
      <path d="M12,2a10,10,0,0,0,4.8,18.53" fill="none" stroke="hsl(var(--primary))" />
      <path d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10" fill="none" stroke="hsl(var(--primary))" />

      {/* <!-- Circuit lines inside the leaf --> */}
      <path d="M12,9 v-2" stroke="hsl(var(--primary))" opacity="0.6" />
      <path d="M12,9 h-2" stroke="hsl(var(--primary))" opacity="0.6" />
      <path d="M12,15 v2" stroke="hsl(var(--primary))" opacity="0.6" />
      <path d="M12,15 h2" stroke="hsl(var(--primary))" opacity="0.6" />

      <circle cx="10" cy="9" r="0.5" fill="hsl(var(--primary))" opacity="0.8" />
      <circle cx="14" cy="15" r="0.5" fill="hsl(var(--primary))" opacity="0.8" />
      
      <path d="M10,9.5 v2 h2" stroke="hsl(var(--primary))" opacity="0.6" />
      <path d="M14,14.5 v-2 h-2" stroke="hsl(var(--primary))" opacity="0.6" />

    </svg>
  );
}
