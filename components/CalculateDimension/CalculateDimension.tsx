import { useEffect, useRef, useState } from "react";

export type CalculateDimensionProps = {
   children: (width: number, height: number) => React.ReactNode;
};
export function CalculateDimension({ children }: CalculateDimensionProps) {
   const [width, setWidth] = useState(0);
   const [height, setHeight] = useState(0);
   return (
      <div
         ref={(ref) => {
            if (ref) {
               const { width, height } = ref.getBoundingClientRect();
               setWidth(width);
               setHeight(height);
            }
         }}
         className="w-full h-full"
      >
         {children(width, height)}
      </div>
   );
}
