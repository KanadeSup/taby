import {
   Collapse,
   CollapseContent,
   CollapseTrigger,
} from "@/components/Collapse/Collapse";
import { FONT_FAMILIES, FONT_SIZES, FONT_WEIGHTS } from "../constants";
import { ColorSelector } from "../Input/ColorSelector";
import { SelectControl } from "../Input/SelectControl";
import {
   TextAlignSelector,
   TextDecorationSelector,
} from "../Input/TextFormatSelector";
import { EditNodeStyleState } from "../types";

export type TextControlSectionProps = {
   value: EditNodeStyleState["text"];
   onChange: (value: EditNodeStyleState["text"]) => void;
};

export function TextControlSection({ value, onChange }: TextControlSectionProps) {
   return (
      <Collapse>
         <CollapseTrigger className="flex items-center justify-between">
            <h1 className="text-xs font-semibold">Text</h1>
         </CollapseTrigger>
         <CollapseContent className="p-2 space-y-2">
            <div className="flex items-center gap-2">
               <SelectControl
                  value={value.fontFamily}
                  options={FONT_FAMILIES}
                  onChange={(fontFamily) => onChange({ ...value, fontFamily })}
               />
               <SelectControl
                  value={String(value.fontSize)}
                  options={FONT_SIZES.map((item) => String(item))}
                  onChange={(fontSize) =>
                     onChange({ ...value, fontSize: Number(fontSize) })
                  }
                  triggerClassName="w-20 shrink-0"
               />
            </div>
            <div className="flex items-center gap-2">
               <SelectControl
                  value={value.fontWeight}
                  options={FONT_WEIGHTS}
                  onChange={(fontWeight) => onChange({ ...value, fontWeight })}
               />
               <ColorSelector
                  value={value.color}
                  className="shrink-0"
                  onChange={(color) => onChange({ ...value, color })}
               />
            </div>
            <div className="flex items-center gap-2">
               <TextDecorationSelector
                  value={value.decorations}
                  onChange={(decorations) => onChange({ ...value, decorations })}
               />
            </div>
            <div className="flex items-center gap-2">
               <TextAlignSelector
                  value={value.align}
                  onChange={(align) => onChange({ ...value, align })}
               />
            </div>
         </CollapseContent>
      </Collapse>
   );
}
