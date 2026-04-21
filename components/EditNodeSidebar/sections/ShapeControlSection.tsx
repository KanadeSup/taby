import {
   Collapse,
   CollapseContent,
   CollapseTrigger,
} from "@/components/Collapse/Collapse";
import { FillStyleSelector } from "../Input/FillStyleSelector";
import { ShapeSelector } from "../Input/ShapeSelector";
import { ColorSelector } from "../Input/ColorSelector";
import { DimensionControl } from "../Input/DimensionControl";
import { EditNodeStyleState } from "../types";

export type ShapeControlSectionProps = {
   value: EditNodeStyleState["shape"];
   onChange: (value: EditNodeStyleState["shape"]) => void;
};

export function ShapeControlSection({ value, onChange }: ShapeControlSectionProps) {
   return (
      <Collapse>
         <CollapseTrigger className="flex items-center justify-between pr-2">
            <h1 className="text-xs font-semibold">Shape</h1>
            <ShapeSelector
               value={value.shapeType}
               onChange={(shapeType) => onChange({ ...value, shapeType })}
            />
         </CollapseTrigger>
         <CollapseContent className="p-2 space-y-2">
            <div className="flex justify-between items-center">
               <p className="text-xs font-semibold">Fill</p>
               <div className="flex items-center gap-2">
                  <FillStyleSelector
                     value={value.fillStyle}
                     onChange={(fillStyle) => onChange({ ...value, fillStyle })}
                  />
                  <ColorSelector
                     value={value.fillColor}
                     onChange={(fillColor) => onChange({ ...value, fillColor })}
                  />
               </div>
            </div>
            <div className="flex justify-between items-center">
               <p className="text-xs font-semibold">Width</p>
               <DimensionControl
                  placeholder="Width"
                  value={value.width}
                  onChange={(width) => onChange({ ...value, width })}
               />
            </div>
            <div className="flex justify-between items-center">
               <p className="text-xs font-semibold">Height</p>
               <DimensionControl
                  placeholder="Height"
                  value={value.height}
                  onChange={(height) => onChange({ ...value, height })}
               />
            </div>
         </CollapseContent>
      </Collapse>
   );
}
