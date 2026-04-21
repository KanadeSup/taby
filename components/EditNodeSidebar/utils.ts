import {
   DEFAULT_EDIT_NODE_STYLE,
   FONT_FAMILIES,
   FONT_SIZES,
   FONT_WEIGHTS,
   THICKNESS_OPTIONS,
} from "./constants";
import { EditNodeStyleState } from "./types";

export function clampNumber(
   value: number,
   min?: number | null,
   max?: number | null
) {
   return Math.min(max ?? Infinity, Math.max(min ?? -Infinity, value));
}

export function normalizeStyleState(
   style?: Partial<EditNodeStyleState>
): EditNodeStyleState {
   if (!style) {
      return DEFAULT_EDIT_NODE_STYLE;
   }

   const fontFamily = style.text?.fontFamily;
   const fontSize = style.text?.fontSize;
   const fontWeight = style.text?.fontWeight;
   const borderThickness = style.border?.thickness;
   const branchWeight = style.branch?.weight;

   return {
      ...DEFAULT_EDIT_NODE_STYLE,
      ...style,
      shape: {
         ...DEFAULT_EDIT_NODE_STYLE.shape,
         ...style.shape,
      },
      border: {
         ...DEFAULT_EDIT_NODE_STYLE.border,
         ...style.border,
         thickness: THICKNESS_OPTIONS.includes(borderThickness ?? "Normal")
            ? borderThickness!
            : DEFAULT_EDIT_NODE_STYLE.border.thickness,
      },
      text: {
         ...DEFAULT_EDIT_NODE_STYLE.text,
         ...style.text,
         fontFamily: FONT_FAMILIES.includes(fontFamily ?? "")
            ? fontFamily!
            : DEFAULT_EDIT_NODE_STYLE.text.fontFamily,
         fontSize: FONT_SIZES.includes(fontSize ?? -1)
            ? fontSize!
            : DEFAULT_EDIT_NODE_STYLE.text.fontSize,
         fontWeight: FONT_WEIGHTS.includes(fontWeight ?? "Regular")
            ? fontWeight!
            : DEFAULT_EDIT_NODE_STYLE.text.fontWeight,
      },
      branch: {
         ...DEFAULT_EDIT_NODE_STYLE.branch,
         ...style.branch,
         weight: THICKNESS_OPTIONS.includes(branchWeight ?? "Normal")
            ? branchWeight!
            : DEFAULT_EDIT_NODE_STYLE.branch.weight,
      },
   };
}
