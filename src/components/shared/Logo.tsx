import { cn } from "@/lib/utils";
import type { SVGProps } from "react";

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
      className={cn(props.className)}
    >
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2Z" fill="hsl(var(--primary))" opacity="0.1" stroke="none" />
      <path d="M12 15a7 7 0 0 0 7-7c0-4-3-6-6-6s-6 2-6 6a7 7 0 0 0 7 7Z" fill="hsl(var(--primary))" opacity="0.2" stroke="none"/>
      <path
        d="M12,22C6.477,22,2,17.523,2,12C2,6.477,6.477,2,12,2c5.523,0,10,4.477,10,10c0,1.821-0.487,3.53-1.338,5"
        stroke="hsl(var(--primary))"
        strokeWidth="1.5"
      />
      <path
        d="M18.5 14.5c-1.1 0-2.13.3-3 .8-1.74 1-3 2.7-3 4.7 0 1.9 1.4 3.5 3.5 3.5s3.5-1.6 3.5-3.5a2.5 2.5 0 0 0-2-2.4"
        stroke="hsl(var(--primary))"
        strokeWidth="1.5"
      />
    </svg>
  );
}
