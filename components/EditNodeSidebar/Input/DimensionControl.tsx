import { MyButton } from "@/components/Button/MyButton";
import { MyTextInput } from "@/components/Input/MyTextInput";
import { useMemo, useState } from "react";
import { clampNumber } from "../utils";

export type DimensionControlProps = {
   placeholder: string;
   value?: number | null;
   min?: number | null;
   max?: number | null;
   onChange?: (value: number | null) => void;
   onFitClick?: () => void;
};

export function DimensionControl({
   placeholder,
   value,
   min,
   max,
   onChange,
   onFitClick,
}: DimensionControlProps) {
   const [draftValue, setDraftValue] = useState<string>(() => {
      if (value != null) return String(value);
      if (min != null) return String(min);
      return "";
   });

   const displayValue = useMemo(() => {
      if (draftValue.length > 0) {
         return draftValue;
      }
      if (min != null) return String(min);
      return "";
   }, [draftValue, min]);

   const handleSubmit = () => {
      if (displayValue.length === 0 && min == null) {
         onChange?.(null);
         setDraftValue("");
         return;
      }

      if (displayValue.length === 0 && min != null) {
         onChange?.(min);
         setDraftValue(String(min));
         return;
      }

      const changedValue = Number(displayValue);
      const clampedValue = clampNumber(changedValue, min, max);
      onChange?.(clampedValue);
      setDraftValue(String(clampedValue));
   };

   return (
      <div className="flex items-center gap-2">
         <MyTextInput
            value={displayValue}
            placeholder={placeholder}
            className="w-20 text-[12px]! p-1 px-2 h-auto rounded-sm"
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => {
               const next = e.target.value.replace(/[^\d]/g, "");
               setDraftValue(next);
            }}
            onBlur={handleSubmit}
            onKeyDown={(e) => {
               if (e.key === "Enter") {
                  handleSubmit();
               }
            }}
         />
         <MyButton
            size="sm"
            variant="secondary"
            className="rounded-sm text-gray-200 text-[12px]! w-20 h-auto py-1 px-4 border border-foreground/10"
            onClick={(e) => {
               e.stopPropagation();
               onFitClick?.();
            }}
         >
            Fit
         </MyButton>
      </div>
   );
}
