"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";

import { cn } from "@/lib/utils";

function Label({ className, ...props }) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn("mb-1 block text-[0.6rem] uppercase tracking-[0.25em] text-muted-foreground", className)}
      {...props}
    />
  );
}

export { Label };
