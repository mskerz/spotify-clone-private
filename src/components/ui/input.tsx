import * as React from "react";

import { cn } from "@/libs/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground",
        "selection:bg-neutral-300 selection:text-black dark:selection:bg-neutral-500 dark:selection:text-white",
        "border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none",
        // ... อื่น ๆ
        className,
      )}
      {...props}
    />
  );
}

export { Input };
