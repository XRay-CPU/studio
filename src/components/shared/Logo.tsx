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
      {/* Nature: Central Leaf */}
      <path d="M12 2L8 8c0 2.5.5 5.5 4 8 3.5-2.5 4-5.5 4-8L12 2z" />
      
      {/* People Empowerment & Blockchain: Hands made of linked blocks */}
      <path d="M8 14H6a2 2 0 00-2 2v2a2 2 0 002 2h2v-4z" />
      <path d="M16 14h2a2 2 0 012 2v2a2 2 0 01-2 2h-2v-4z" />
      <path d="M6 16h-.5a2.5 2.5 0 00-2.5 2.5V20" />
      <path d="M18 16h.5a2.5 2.5 0 012.5 2.5V20" />
      <path d="M8 20v-1a2 2 0 012-2h4a2 2 0 012 2v1" />
    </svg>
  );
}
