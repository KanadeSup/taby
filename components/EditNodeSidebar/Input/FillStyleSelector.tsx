import {
   FlatFillStyleIcon,
   ThickDiagonalFillStyleIcon,
   ThickDashFillStyleIcon,
   ThinDiagonalFillStyleIcon,
   ThinDashFillStyleIcon,
} from "@/components/Icon/FillStyleIcon";
import { Button } from "@/components/shadcn/button";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/shadcn/dropdown-menu";
import { cn } from "@/lib/shadnc-utils";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export type FillStyleSelectorProps = {
   value?: FillStyle;
   onChange?: (value: FillStyle) => void;
};

export type FillStyle =
   | "flat"
   | "diagonal"
   | "thick-diagonal"
   | "dash"
   | "thick-dash"
   | "thin-dash";

export type FillStyleItem = {
   value: FillStyle;
   icon: React.ElementType;
};

const fillStyles: FillStyleItem[] = [
   { value: "flat", icon: FlatFillStyleIcon },
   { value: "diagonal", icon: ThinDiagonalFillStyleIcon },
   { value: "thick-diagonal", icon: ThickDiagonalFillStyleIcon },
   { value: "thick-dash", icon: ThickDashFillStyleIcon },
   { value: "thin-dash", icon: ThinDashFillStyleIcon },
];

export function FillStyleSelector(props: FillStyleSelectorProps) {
   const { value: propValue, onChange } = props;
   const [internalSelectedFillStyle, setInternalSelectedFillStyle] =
      useState<FillStyleItem>(fillStyles[0]);
   let selectedFillStyle = internalSelectedFillStyle;
   if (propValue) {
      selectedFillStyle = fillStyles.find(
         (fillStyle) => fillStyle.value === propValue
      )!;
   }

   return (
      <DropdownMenu>
         <DropdownMenuTrigger onClick={(e) => e.stopPropagation()}>
            <Button
               variant="secondary"
               className={cn(
                  "flex items-center justify-between gap-2",
                  "rounded-sm p-0 cursor-pointer w-20 h-7 px-2!",
                  "border border-foreground/10"
               )}
            >
               <div className="flex items-center justify-center w-full h-full">
                  <selectedFillStyle.icon className="stroke-white size-6" />
               </div>
               <ChevronDown className="w-8 h-4" />
            </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent className="w-64 grid grid-cols-3 gap-2">
            {fillStyles.map((fillStyle) => (
               <DropdownMenuItem
                  key={fillStyle.value}
                  className="cursor-pointer flex items-center justify-center"
                  onClick={(e) => {
                     e.stopPropagation();
                     onChange?.(fillStyle.value);
                     setInternalSelectedFillStyle(fillStyle);
                  }}
               >
                  <fillStyle.icon className="text-whitestroke-white size-10" />
               </DropdownMenuItem>
            ))}
         </DropdownMenuContent>
      </DropdownMenu>
   );
}
