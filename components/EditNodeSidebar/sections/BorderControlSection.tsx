import {
   Collapse,
   CollapseContent,
   CollapseTrigger,
} from "@/components/Collapse/Collapse";
import { BorderStyleSelector } from "../Input/BorderStyleSelector";
import { ColorSelector } from "../Input/ColorSelector";
import { SelectControl } from "../Input/SelectControl";
import { THICKNESS_OPTIONS } from "../constants";
import { EditNodeStyleState } from "../types";

export type BorderControlSectionProps = {
   value: EditNodeStyleState["border"];
   onChange: (value: EditNodeStyleState["border"]) => void;
};

export function BorderControlSection({
   value,
   onChange,
}: BorderControlSectionProps) {
   return (
      <Collapse>
         <CollapseTrigger className="flex items-center justify-between pr-2">
            <h1 className="text-xs font-semibold">Border</h1>
            <BorderStyleSelector
               value={value.style}
               onChange={(style) => onChange({ ...value, style })}
            />
         </CollapseTrigger>
         <CollapseContent className="p-2 space-y-2">
            <div className="flex justify-between items-center">
               <div className="flex items-center gap-2 w-full">
                  <SelectControl
                     value={value.thickness}
                     options={THICKNESS_OPTIONS}
                     onChange={(thickness) => onChange({ ...value, thickness })}
                     triggerClassName="w-full"
                  />
                  <ColorSelector
                     value={value.color}
                     className="shrink-0"
                     onChange={(color) => onChange({ ...value, color })}
                  />
               </div>
            </div>
         </CollapseContent>
      </Collapse>
   );
}
