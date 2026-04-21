import { cn } from "@/lib/shadnc-utils";
import { useState } from "react";

export type ColorSelectorProps = {
   value?: string;
   className?: string;
   onChange?: (color: string) => void;
};

export function ColorSelector(props: ColorSelectorProps) {
   const { value: propValue, className, onChange } = props;

   const [internalValue, setInternalValue] = useState(propValue ?? "#ffffff");
   let selectedValue = internalValue;
   if (propValue) {
      selectedValue = propValue;
   }

   return (
      <label
         className={cn(
            "flex items-center gap-2 w-20 h-7 border border-foreground/10 rounded-sm",
            className
         )}
         style={{ backgroundColor: selectedValue }}
      >
         <input
            type="color"
            value={selectedValue}
            className="absolute opacity-0"
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => {
               onChange?.(e.target.value);
               setInternalValue(e.target.value);
            }}
         />
      </label>
   );
}
