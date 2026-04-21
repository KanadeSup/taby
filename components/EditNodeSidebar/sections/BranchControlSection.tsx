import {
   Collapse,
   CollapseContent,
   CollapseTrigger,
} from "@/components/Collapse/Collapse";
import { THICKNESS_OPTIONS } from "../constants";
import { ColorSelector } from "../Input/ColorSelector";
import { LineStyleSelector } from "../Input/LineStyleSelector";
import { SelectControl } from "../Input/SelectControl";
import { EditNodeStyleState } from "../types";

export type BranchControlSectionProps = {
   value: EditNodeStyleState["branch"];
   onChange: (value: EditNodeStyleState["branch"]) => void;
};

export function BranchControlSection({
   value,
   onChange,
}: BranchControlSectionProps) {
   return (
      <Collapse>
         <CollapseTrigger className="flex items-center justify-between">
            <h1 className="text-xs font-semibold">Branch</h1>
         </CollapseTrigger>
         <CollapseContent className="p-2 space-y-2">
            <div className="flex items-center gap-2">
               <LineStyleSelector
                  value={value.style}
                  onChange={(style) => onChange({ ...value, style })}
               />
               <ColorSelector
                  value={value.color}
                  className="shrink-0"
                  onChange={(color) => onChange({ ...value, color })}
               />
            </div>
            <SelectControl
               value={value.weight}
               options={THICKNESS_OPTIONS}
               onChange={(weight) => onChange({ ...value, weight })}
            />
         </CollapseContent>
      </Collapse>
   );
}
