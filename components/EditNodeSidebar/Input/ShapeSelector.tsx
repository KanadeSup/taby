import { buttonVariants } from "@/components/shadcn/button";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/shadcn/dropdown-menu";
import { cn } from "@/lib/shadnc-utils";
import {
   Circle,
   RectangleHorizontal,
   ChevronDown,
} from "lucide-react";
import { useState } from "react";

/* ------------ Type ------------ */
export type ShapeSelectorProps = {
   value?: NodeShape;
   onChange?: (value: NodeShape) => void;
};

export type NodeShape = "rectangle" | "circle";

export type ShapeItem = {
   value: NodeShape;
   icon: React.ElementType;
};

/* ------------ Constant ------------ */
const shapes: ShapeItem[] = [
   { value: "rectangle", icon: RectangleHorizontal },
   { value: "circle", icon: Circle },
];

/* ------------ Component ------------ */
export function ShapeSelector(props: ShapeSelectorProps) {
   const { value: propValue, onChange } = props;

   const [internalSelectedShape, setInternalSelectedShape] =
      useState<ShapeItem>(shapes[0]);

   let selectedShape = internalSelectedShape;
   if (propValue) {
      selectedShape = shapes.find((shape) => shape.value === propValue)!;
   }

   return (
      <DropdownMenu>
         <DropdownMenuTrigger onClick={(e) => e.stopPropagation()}>
            <div
               className={cn(
                  buttonVariants({ variant: "secondary" }),
                  "flex items-center justify-between gap-2",
                  "rounded-sm cursor-pointer h-7 w-20",
               )}
            >
               <div className="flex items-center justify-center w-full">
                  <selectedShape.icon className="w-4 h-4" />
               </div>
               <ChevronDown className="w-4 h-4" />
            </div>
         </DropdownMenuTrigger>
         <DropdownMenuContent
            className="w-64 grid grid-cols-3 gap-2"
            align="end"
         >
            {shapes.map((shape) => (
               <DropdownMenuItem
                  key={shape.value}
                  className="cursor-pointer w-full h-14 p-3"
                  onClick={(e) => {
                     e.stopPropagation();
                     onChange?.(shape.value);
                     setInternalSelectedShape(shape);
                  }}
               >
                  <shape.icon className="w-full! h-full! stroke-gray-200" />
               </DropdownMenuItem>
            ))}
         </DropdownMenuContent>
      </DropdownMenu>
   );
}
