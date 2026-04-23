import {
   BorderStyle,
   BorderThickness,
   FontWeight,
   TextAlign,
   TextDecoration,
} from "@/components/EditNodeSidebar/types";

export function getBorderWidth(thickness?: BorderThickness | null) {
   if (!thickness) {
      return "0px";
   }

   switch (thickness) {
      case "Extra thin":
         return "1px";
      case "Thin":
         return "2px";
      case "Normal":
         return "3px";
      case "Thick":
         return "4px";
      case "Extra thick":
         return "5px";
   }
}

export function getBorderStyle(style?: BorderStyle | null) {
   if (!style) {
      return "none";
   }

   switch (style) {
      case "solid":
         return "solid";
      case "dashed":
         return "dashed";
      case "dotted":
         return "dotted";
      case "none":
         return "none";
   }
}

export function getFontSize(fontSize?: number | null) {
   if (!fontSize) {
      return undefined;
   }

   return `${fontSize}px`;
}

export function getFontWeight(fontWeight?: FontWeight | null) {
   if (!fontWeight) {
      return undefined;
   }

   switch (fontWeight) {
      case "Thin":
         return "100";
      case "Light":
         return "300";
      case "Regular":
         return "400";
      case "Medium":
         return "500";
      case "Semi-bold":
         return "600";
      case "Bold":
         return "700";
   }
}

export function getTextDecoration(decorations?: TextDecoration[] | null) {
   if (!decorations) {
      return undefined;
   }

   return decorations
      .map((decoration) => {
         switch (decoration) {
            case "strikethrough":
               return "line-through";
            case "underline":
               return "underline";
            default:
               null;
         }
      })
      .filter(Boolean)
      .join(" ");
}

export function getTextAlign(align?: TextAlign | null) {
   if (!align) {
      return undefined;
   }

   switch (align) {
      case "left":
         return "left";
      case "center":
         return "center";
      case "right":
         return "right";
   }
}