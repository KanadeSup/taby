import { EditNodeStyleState } from "../types";
import { BorderControlSection } from "./BorderControlSection";
import { BranchControlSection } from "./BranchControlSection";
import { ShapeControlSection } from "./ShapeControlSection";
import { TextControlSection } from "./TextControlSection";

export type GeneralStyleSectionProps = {
   style: EditNodeStyleState;
   onChange: (value: EditNodeStyleState) => void;
};

export function GeneralStyleSection({ style, onChange }: GeneralStyleSectionProps) {
   return (
      <div className="space-y-1 select-none">
         <ShapeControlSection
            value={style.shape}
            onChange={(shape) => onChange({ ...style, shape })}
         />
         <BorderControlSection
            value={style.border}
            onChange={(border) => onChange({ ...style, border })}
         />
         <TextControlSection
            value={style.text}
            onChange={(text) => onChange({ ...style, text })}
         />
         <BranchControlSection
            value={style.branch}
            onChange={(branch) => onChange({ ...style, branch })}
         />
      </div>
   );
}
