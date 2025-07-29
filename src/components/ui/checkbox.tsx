"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { CheckIcon } from "lucide-react"

import { cn } from "@/libs/utils"

// function Checkbox({
//   className,
//   ...props
// }: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
//   return (
//     <CheckboxPrimitive.Root
//       data-slot="checkbox"
//       className={cn(
//         "peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
//         className
//       )}
//       {...props}
//     >
//       <CheckboxPrimitive.Indicator
//         data-slot="checkbox-indicator"
//         className="flex items-center justify-center text-current transition-none"
//       >
//         <CheckIcon className="size-3.5" />
//       </CheckboxPrimitive.Indicator>
//     </CheckboxPrimitive.Root>
//   )
// }

// export { Checkbox }


function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
      "size-4 shrink-0 rounded-sm outline-2 outline-green-400 data-[state=checked]:bg-transparent data-[state=checked]:text-green-500  dark:data-[state=checked]:bg-green-500 dark:data-[state=checked]:text-white focus-visible:ring]:     focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current transition-none"
      >
        <CheckIcon className="w-4 h-4 " />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
