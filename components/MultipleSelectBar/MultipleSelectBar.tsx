import { cn } from "@/lib/shadnc-utils";
import { useState } from "react";

export type MultipleSelectBarItem = {
   label: string | React.ReactNode;
   value: string;
};

export type MultipleSelectBarProps = {
   items: MultipleSelectBarItem[];
   containerClass?: string;
   itemWrapperClass?: string;
   mode? : "single" | "multiple";
   onChange?: (
      value: string,
      isActived: boolean,
      allActiveValues: string[]
   ) => void;
};

export function MultipleSelectBar({
   items,
   containerClass,
   itemWrapperClass,
   mode = "multiple",
   onChange,
}: MultipleSelectBarProps) {
   const [selectedItems, setSelectedItems] = useState<string[]>([]);
   const handleItemClick = (value: string) => {
      if (mode === "single") {
         setSelectedItems([value]);
         onChange?.(value, true, [value]);
         return;
      }
      const isActive = selectedItems.includes(value);
      const allActiveValues = selectedItems.filter((item) => item !== value);
      const newSelectedItems = isActive
         ? allActiveValues
         : [...selectedItems, value];
      setSelectedItems(newSelectedItems);
      onChange?.(value, isActive, newSelectedItems);
   };
   return (
      <div
         className={cn(
            "flex border border-accent rounded-sm overflow-hidden",
            containerClass
         )}
      >
         {items.map((item) => (
            <div
               key={item.value}
               className={cn(
                  "flex items-center justify-center basis-full gap-2",
                  "cursor-pointer px-2 py-1",
                  "hover:bg-accent/50",
                  selectedItems.includes(item.value) &&
                     "bg-accent hover:bg-accent",
                  itemWrapperClass
               )}
               onClick={(e) => {
                  e.stopPropagation();
                  handleItemClick(item.value);
               }}
            >
               {item.label}
            </div>
         ))}
      </div>
   );
}
