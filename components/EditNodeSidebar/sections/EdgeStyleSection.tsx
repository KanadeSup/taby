import { THICKNESS_OPTIONS } from "../constants";
import { ColorSelector } from "../Input/ColorSelector";
import { LineStyleSelector } from "../Input/LineStyleSelector";
import { SelectControl } from "../Input/SelectControl";
import { EditNodeStyleState } from "../types";

export type EdgeStyleSectionProps = {
   value: EditNodeStyleState["branch"];
   onChange: (value: EditNodeStyleState["branch"]) => void;
};

export function EdgeStyleSection({ value, onChange }: EdgeStyleSectionProps) {
   return (
      <div className="space-y-3 p-2">
         <div className="flex items-center justify-between">
            <p className="text-xs font-semibold">Style</p>
            <LineStyleSelector
               value={value.style}
               onChange={(style) => onChange({ ...value, style })}
            />
         </div>
         <div className="flex items-center justify-between">
            <p className="text-xs font-semibold">Weight</p>
            <SelectControl
               value={value.weight}
               options={THICKNESS_OPTIONS}
               onChange={(weight) => onChange({ ...value, weight })}
               triggerClassName="w-28"
            />
         </div>
         <div className="flex items-center justify-between">
            <p className="text-xs font-semibold">Color</p>
            <ColorSelector
               value={value.color}
               onChange={(color) => onChange({ ...value, color })}
            />
         </div>
      </div>
   );
}
