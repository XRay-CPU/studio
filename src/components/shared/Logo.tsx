import { cn } from "@/lib/utils";
import type { SVGProps } from "react";

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      {...props}
      className={cn(props.className)}
    >
      <path
        fill="hsl(var(--primary))"
        d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24Zm0 192a88 88 0 1 1 88-88a88.1 88.1 0 0 1-88 88Z"
        opacity="0.2"
      />
      <path
        fill="hsl(var(--primary))"
        d="M173.35 69.4a8 8 0 0 0-10.7-1.4l-64 40a8 8 0 0 0-2.52 11.83l32 51.2a8 8 0 0 0 13.8-8.11l-28.14-44.91l58.86-36.78a8 8 0 0 0-9.3-13.84Z"
      />
      <path
        fill="hsl(var(--primary))"
        d="M162.77 114.2a8 8 0 0 0-11.31 0L128 137.66l-23.46-23.46a8 8 0 0 0-11.32 11.31L122.34 149a8 8 0 0 0 11.32 0l32-32a8 8 0 0 0-2.89-11.31Z"
      />
    </svg>
  );
}
