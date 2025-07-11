import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export function Logo(props: HTMLAttributes<HTMLImageElement>) {
  return (
    <img
      src="/logo.png"
      alt="Likas Bayani Logo"
      {...props}
      className={cn(props.className)}
    />
  );
}
