import { BorderStyleSelectorProps } from "./Input/BorderStyleSelector";
import { FillStyleSelectorProps } from "./Input/FillStyleSelector";
import { NodeShape } from "./Input/ShapeSelector";

export type SidebarSection = "general-style" | "edge-style" | "color-scheme";

export type BorderStyle = NonNullable<BorderStyleSelectorProps["value"]>;
export type FillStyle = NonNullable<FillStyleSelectorProps["value"]>;
export type LineStyle = "solid" | "dashed" | "dotted";
export type TextAlign = "left" | "center" | "right";
export type TextDecoration = "bold" | "italic" | "strikethrough" | "underline";
export type FontWeight =
   | "Thin"
   | "Light"
   | "Regular"
   | "Medium"
   | "Semi-bold"
   | "Bold";
export type BorderThickness =
   | "Extra thin"
   | "Thin"
   | "Normal"
   | "Thick"
   | "Extra thick";

export type EditNodeStyleState = {
   shape: {
      shapeType: NodeShape;
      fillStyle: FillStyle;
      fillColor: string;
      width: number | null;
      height: number | null;
   };
   border: {
      style: BorderStyle;
      thickness: BorderThickness;
      color: string;
   };
   text: {
      fontFamily: string;
      fontSize: number;
      fontWeight: FontWeight;
      color: string;
      decorations: TextDecoration[];
      align: TextAlign;
   };
   branch: {
      style: LineStyle;
      color: string;
      weight: BorderThickness;
   };
};
