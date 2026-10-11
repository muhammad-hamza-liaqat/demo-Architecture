import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "w-full rounded-xl border border-border bg-white/3 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/55 focus:border-primary disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}

export { Input };
