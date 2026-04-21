import { EditNodeStyleState, FontWeight, BorderThickness } from "./types";

export const FONT_SIZES = [8, 10, 12, 14, 18, 24, 28, 36, 48, 60];
export const FONT_FAMILIES = [
   "Arial",
   "Helvetica",
   "Verdana",
   "Georgia",
   "Times New Roman",
   "Courier New",
   "Monospace",
];

export const FONT_WEIGHTS: FontWeight[] = [
   "Thin",
   "Light",
   "Regular",
   "Medium",
   "Semi-bold",
   "Bold",
];

export const THICKNESS_OPTIONS: BorderThickness[] = [
   "Extra thin",
   "Thin",
   "Normal",
   "Thick",
   "Extra thick",
];

export const DEFAULT_EDIT_NODE_STYLE: EditNodeStyleState = {
   shape: {
      shapeType: "rectangle",
      fillStyle: "flat",
      fillColor: "#ef4444",
      width: null,
      height: null,
   },
   border: {
      style: "solid",
      thickness: "Normal",
      color: "#ffffff",
   },
   text: {
      fontFamily: FONT_FAMILIES[0],
      fontSize: FONT_SIZES[0],
      fontWeight: FONT_WEIGHTS[2],
      color: "#ffffff",
      decorations: [],
      align: "left",
   },
   branch: {
      style: "solid",
      color: "#ffffff",
      weight: "Normal",
   },
};
