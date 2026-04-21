import { buttonVariants } from "@/components/shadcn/button";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/shadcn/dropdown-menu";
import { cn } from "@/lib/shadnc-utils";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export type SelectControlProps<T extends string> = {
   value?: T;
   options: T[];
   onChange?: (value: T) => void;
   triggerClassName?: string;
};

export function SelectControl<T extends string>(props: SelectControlProps<T>) {
   const { value: propValue, options, onChange, triggerClassName } = props;

   const [internalValue, setInternalValue] = useState<T>(
      propValue ?? options[0]
   );
   let selectedValue = internalValue;
   if (propValue) {
      selectedValue = propValue;
   }

   return (
      <DropdownMenu>
         <DropdownMenuTrigger
            onClick={(e) => e.stopPropagation()}
            className={cn(
               buttonVariants({ variant: "secondary" }),
               "flex items-center justify-between gap-2 shrink-1",
               "w-full h-7 rounded-sm cursor-pointer border",
               "text-[12px] p-1 px-2",
               triggerClassName
            )}
         >
            <p className="text-xs font-semibold truncate">{selectedValue}</p>
            <ChevronDown className="w-4 h-4 shrink-0" />
         </DropdownMenuTrigger>
         <DropdownMenuContent className="dropdown-menu-trigger-width flex flex-col gap-1">
            {options.map((item) => (
               <DropdownMenuItem
                  key={item}
                  className={cn(
                     "cursor-pointer",
                     selectedValue === item && "bg-accent"
                  )}
                  onClick={(e) => {
                     e.stopPropagation();
                     onChange?.(item);
                     setInternalValue(item);
                  }}
               >
                  <p className="text-xs font-semibold">{item}</p>
               </DropdownMenuItem>
            ))}
         </DropdownMenuContent>
      </DropdownMenu>
   );
}
