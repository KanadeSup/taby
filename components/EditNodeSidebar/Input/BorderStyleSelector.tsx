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

type BorderStyle = "solid" | "dashed" | "dotted" | "none";
export type BorderStyleSelectorProps = {
   value?: BorderStyle;
   onChange?: (value: BorderStyle) => void;
};

const borderStyles: BorderStyle[] = ["solid", "dashed", "dotted", "none"];

export function BorderStyleSelector(props: BorderStyleSelectorProps) {
   const { value: propValue, onChange } = props;

   const [internalSelectedBorderStyle, setInternalSelectedBorderStyle] =
      useState<BorderStyle>(borderStyles[0]);
   let selectedBorderStyle = internalSelectedBorderStyle;
   if (propValue) {
      selectedBorderStyle = propValue;
   }
   return (
      <DropdownMenu>
         <DropdownMenuTrigger
            onClick={(e) => e.stopPropagation()}
            className={cn(
               buttonVariants({ variant: "secondary" }),
               "flex items-center justify-between gap-2 shrink-0",
               "rounded-sm cursor-pointer h-7 w-20"
            )}
         >
            {selectedBorderStyle === "none" ? (
               <p className="text-xs font-semibold text-center">None</p>
            ) : (
               <BorderStyleIcon style={selectedBorderStyle} />
            )}
            <ChevronDown className="w-4 h-4" />
         </DropdownMenuTrigger>
         <DropdownMenuContent className="w-40 flex flex-col gap-1" align="end">
            {borderStyles
               .filter((style) => style !== "none")
               .map((style) => (
                  <DropdownMenuItem
                     key={style}
                     className={cn(
                        "py-5 px-5 cursor-pointer hover:bg-accent",
                        selectedBorderStyle === style && "bg-accent"
                     )}
                     onClick={(e) => {
                        e.stopPropagation();
                        onChange?.(style);
                        setInternalSelectedBorderStyle(style);
                     }}
                  >
                     <BorderStyleIcon style={style} />
                  </DropdownMenuItem>
               ))}
            <DropdownMenuItem
               className={cn(
                  "py-2 px-5 cursor-pointer hover:bg-accent flex items-center justify-center",
                  selectedBorderStyle === "none" && "bg-accent"
               )}
               onClick={(e) => {
                  e.stopPropagation();
                  onChange?.("none");
                  setInternalSelectedBorderStyle("none");
               }}
            >
               <p className="text-xs font-semibold text-center">No border</p>
            </DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   );
}

export type BorderStyleProps = {
   style: "solid" | "dashed" | "dotted";
};
export function BorderStyleIcon({ style }: BorderStyleProps) {
   return (
      <div
         className="w-full h-[1px] stroke-gray-200 border border-white"
         style={{
            borderStyle: style,
         }}
      />
   );
}
