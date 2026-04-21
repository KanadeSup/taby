import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/shadcn/dropdown-menu";
import { cn } from "@/lib/shadnc-utils";
import { ChevronDown } from "lucide-react";
import { LineStyle } from "../types";
import { useState } from "react";
import { buttonVariants } from "@/components/shadcn/button";

const lineStyles: LineStyle[] = ["solid", "dashed", "dotted"];

function LinePreview({ style }: { style: LineStyle }) {
   return (
      <div
         className="w-full h-[1px] border border-white"
         style={{
            borderStyle: style,
         }}
      />
   );
}

export type LineStyleSelectorProps = {
   value?: LineStyle;
   onChange?: (value: LineStyle) => void;
};

export function LineStyleSelector(props: LineStyleSelectorProps) {
   const { value: propValue, onChange } = props;

   const [internalValue, setInternalValue] = useState<LineStyle>(
      propValue ?? lineStyles[0]
   );

   let selectedValue = internalValue;
   if (propValue) {
      selectedValue = propValue;
   }

   return (
      <DropdownMenu>
         <DropdownMenuTrigger
            className={cn(
               buttonVariants({ variant: "secondary" }),
               "flex items-center justify-between gap-2 shrink-1",
               "w-full h-7 rounded-sm cursor-pointer border",
               "text-[12px] p-1 px-2"
            )}
            onClick={(e) => e.stopPropagation()}
         >
            <div className="w-full px-2">
               <LinePreview style={selectedValue} />
            </div>
            <ChevronDown className="w-4 h-4" />
         </DropdownMenuTrigger>
         <DropdownMenuContent className="dropdown-menu-trigger-width flex flex-col gap-1">
            {lineStyles.map((style) => (
               <DropdownMenuItem
                  key={style}
                  className={cn(
                     "cursor-pointer py-3 px-4",
                     selectedValue === style && "bg-accent"
                  )}
                  onClick={(e) => {
                     e.stopPropagation();
                     onChange?.(style);
                     setInternalValue(style);
                  }}
               >
                  <LinePreview style={style} />
               </DropdownMenuItem>
            ))}
         </DropdownMenuContent>
      </DropdownMenu>
   );
}
