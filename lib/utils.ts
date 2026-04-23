import { BorderStyle, BorderThickness } from "@/components/EditNodeSidebar/types";

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