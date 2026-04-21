import { MultipleSelectBar } from "@/components/MultipleSelectBar/MultipleSelectBar";
import {
   AlignCenterIcon,
   AlignLeftIcon,
   AlignRightIcon,
   BoldIcon,
   ItalicIcon,
   StrikethroughIcon,
   UnderlineIcon,
} from "lucide-react";
import { TextAlign, TextDecoration } from "../types";
import { useState } from "react";

const decorationItems = [
   { value: "bold", label: <BoldIcon className="w-4 h-4 stroke-3" /> },
   { value: "italic", label: <ItalicIcon className="w-4 h-4" /> },
   {
      value: "strikethrough",
      label: <StrikethroughIcon className="w-4 h-4" />,
   },
   { value: "underline", label: <UnderlineIcon className="w-4 h-4" /> },
] as const;

const alignItems = [
   { value: "left", label: <AlignLeftIcon className="w-4 h-4" /> },
   { value: "center", label: <AlignCenterIcon className="w-4 h-4" /> },
   { value: "right", label: <AlignRightIcon className="w-4 h-4" /> },
] as const;

export type TextDecorationSelectorProps = {
   value?: TextDecoration[];
   onChange?: (value: TextDecoration[]) => void;
};

export function TextDecorationSelector(props: TextDecorationSelectorProps) {
   const { value: propValue, onChange } = props;
   const [internalValue, setInternalValue] = useState<TextDecoration[]>(
      propValue ?? []
   );
   let selectedValue = internalValue;
   if (propValue) {
      selectedValue = propValue;
   }
   return (
      <MultipleSelectBar
         value={selectedValue}
         containerClass="w-full"
         itemWrapperClass="py-2"
         items={decorationItems.map((item) => ({
            value: item.value,
            label: item.label,
         }))}
         onChange={(_, __, allActiveValues) => {
            onChange?.(allActiveValues as TextDecoration[]);
            setInternalValue(allActiveValues as TextDecoration[]);
         }}
      />
   );
}

export type TextAlignSelectorProps = {
   value?: TextAlign;
   onChange?: (value: TextAlign) => void;
};

export function TextAlignSelector(props: TextAlignSelectorProps) {
   const { value: propValue, onChange } = props;
   const [internalValue, setInternalValue] = useState<TextAlign>(
      propValue ?? "left"
   );
   let selectedValue = internalValue;
   if (propValue) {
      selectedValue = propValue;
   }
   return (
      <MultipleSelectBar
         value={[selectedValue]}
         containerClass="w-full"
         itemWrapperClass="py-2"
         items={alignItems.map((item) => ({
            value: item.value,
            label: item.label,
         }))}
         mode="single"
         onChange={(itemValue) => {
            onChange?.(itemValue as TextAlign);
            setInternalValue(itemValue as TextAlign);
         }}
      />
   );
}
