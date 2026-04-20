import { cn } from "@/lib/shadnc-utils";
import {
   GitBranch,
   Palette,
   Paintbrush,
   ChevronDown,
   RectangleHorizontal,
   Circle,
   Triangle,
   Octagon,
} from "lucide-react";
import { useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../shadcn/tooltip";
import {
   Collapse,
   CollapseContent,
   CollapseTrigger,
} from "../Collapse/Collapse";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "../shadcn/dropdown-menu";
import { MyTextInput } from "../Input/MyTextInput";
import { MyButton } from "../Button/MyButton";

export function EditNodeSidebar() {
   const [selectedSection, setSelectedSection] = useState<string | null>(
      "general-style"
   );
   return (
      <div className="w-72 h-full rounded-md border border-gray-700">
         <SectionSelectorHeader
            selectedSection={selectedSection}
            setSelectedSection={setSelectedSection}
         />
         <div className="p-2">
            {selectedSection === "general-style" && <GeneralStyleSection />}
            {selectedSection === "edge-style" && <EdgeStyleSection />}
            {selectedSection === "color-scheme" && <ColorSchemeSection />}
         </div>
      </div>
   );
}

type SectionSelectorHeaderProps = {
   selectedSection: string | null;
   setSelectedSection: (section: string | null) => void;
};
function SectionSelectorHeader({
   selectedSection,
   setSelectedSection,
}: SectionSelectorHeaderProps) {
   const sections = [
      {
         toolTip: "General Style",
         icon: Paintbrush,
         code: "general-style",
      },
      {
         toolTip: "Edge Style",
         icon: GitBranch,
         code: "edge-style",
      },
      {
         toolTip: "Color Scheme",
         icon: Palette,
         code: "color-scheme",
      },
   ];
   return (
      <div className="grid grid-cols-3 gap-1 p-2 border-b border-accent">
         {sections.map((section) => (
            <Tooltip>
               <TooltipTrigger>
                  <div
                     key={section.code}
                     className={cn(
                        "hover:bg-accent p-2 rounded-md cursor-pointer flex items-center justify-center",
                        selectedSection === section.code && "bg-accent"
                     )}
                     onClick={() => setSelectedSection(section.code)}
                  >
                     <section.icon className="w-4 h-4" />
                  </div>
               </TooltipTrigger>
               <TooltipContent>{section.toolTip}</TooltipContent>
            </Tooltip>
         ))}
      </div>
   );
}

function GeneralStyleSection() {
   return (
      <div className="space-y-1">
         <ShapeControl />
         <BorderControl />
         <TextControl />
      </div>
   );
}

function EdgeStyleSection() {
   return <div>EdgeStyleSection</div>;
}

function ColorSchemeSection() {
   return <div>ColorSchemeSection</div>;
}

function ShapeControl() {
   return (
      <Collapse>
         <CollapseTrigger className="flex items-center justify-between">
            <h1 className="text-xs font-semibold">Shape</h1>
            <ShapeSelector />
         </CollapseTrigger>
         <CollapseContent className="p-2 space-y-2">
            <div className="flex justify-between items-center">
               <p className="text-xs font-semibold">Fill</p>
               <div className="flex items-center gap-2">
                  <FillStyleSection />
                  <FillColorSection />
               </div>
            </div>
            <div className="flex justify-between items-center">
               <p className="text-xs font-semibold">Width</p>
               <NodeWidthControl />
            </div>
            <div className="flex justify-between items-center">
               <p className="text-xs font-semibold">Height</p>
               <NodeHeightControl />
            </div>
         </CollapseContent>
      </Collapse>
   );
}

function BorderControl() {
   return (
      <Collapse>
         <CollapseTrigger className="flex items-center justify-between">
            <h1 className="text-xs font-semibold">Border</h1>
            <BorderStyleSelector />
         </CollapseTrigger>
         <CollapseContent className="p-2 space-y-2">
            <div className="flex justify-between items-center">
               <p className="text-xs font-semibold">Fill</p>
               <div className="flex items-center gap-2">
                  <BorderThicknessControl />
                  <FillColorSection />
               </div>
            </div>
         </CollapseContent>
      </Collapse>
   );
}

function TextControl() {
   return (
      <Collapse>
         <CollapseTrigger className="flex items-center justify-between">
            <h1 className="text-xs font-semibold">Text</h1>
         </CollapseTrigger>
         <CollapseContent className="p-2 space-y-2">
            <div className="flex justify-between items-center">
               <p className="text-xs font-semibold">Font Size</p>
               <MyTextInput
                  placeholder="Font Size"
                  className="w-14 text-[12px]! p-1 px-2 h-auto rounded-sm"
               />
            </div>
         </CollapseContent>
      </Collapse>
   );
}

type BorderStyle = "solid" | "dashed" | "dotted" | "none";
function BorderStyleSelector() {
   const [selectedBorderStyle, setSelectedBorderStyle] =
      useState<BorderStyle>("solid");
   const borderStyles: BorderStyle[] = ["solid", "dashed", "dotted", "none"];
   return (
      <DropdownMenu>
         <DropdownMenuTrigger
            onClick={(e) => e.stopPropagation()}
            className="w-20"
         >
            <div className="flex items-center justify-between gap-2 cursor-pointer p-2 rounded-md border border-accent hover:bg-accent">
               {selectedBorderStyle === "none" ? (
                  <p className="text-xs font-semibold text-center">None</p>
               ) : (
                  <BorderStyleIcon style={selectedBorderStyle} />
               )}
               <ChevronDown className="w-4 h-4" />
            </div>
         </DropdownMenuTrigger>
         <DropdownMenuContent className="w-40 flex flex-col gap-1" align="end">
            {borderStyles
               .filter((style) => style !== "none")
               .map((style) => (
                  <DropdownMenuItem
                     key={style}
                     className={cn(
                        "py-5 px-5 cursor-pointer hover:bg-accent",
                        selectedBorderStyle === style && "bg-accent"
                     )}
                     onClick={(e) => {
                        e.stopPropagation();
                        setSelectedBorderStyle(style);
                     }}
                  >
                     <BorderStyleIcon style={style} />
                  </DropdownMenuItem>
               ))}
            <DropdownMenuItem
               className={cn(
                  "py-2 px-5 cursor-pointer hover:bg-accent flex items-center justify-center",
                  selectedBorderStyle === "none" && "bg-accent"
               )}
               onClick={(e) => {
                  e.stopPropagation();
                  setSelectedBorderStyle("none");
               }}
            >
               <p className="text-xs font-semibold text-center">No border</p>
            </DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   );
}

type BorderStyleProps = {
   style: "solid" | "dashed" | "dotted";
};
function BorderStyleIcon({ style }: BorderStyleProps) {
   return (
      <div
         className="w-full h-[1px] stroke-gray-200 border border-white"
         style={{
            borderStyle: style,
         }}
      />
   );
}

type BorderThickness =
   | "Extra thin"
   | "Thin"
   | "Normal"
   | "Thick"
   | "Extra thick";
function BorderThicknessControl() {
   const [selectedBorderThickness, setSelectedBorderThickness] =
      useState<BorderThickness>("Normal");
   const borderThicknesses: BorderThickness[] = [
      "Extra thin",
      "Thin",
      "Normal",
      "Thick",
      "Extra thick",
   ];
   return (
      <DropdownMenu>
         <DropdownMenuTrigger onClick={(e) => e.stopPropagation()}>
            <div
               className={cn(
                  "flex items-center justify-between gap-2",
                  "cursor-pointer p-2 min-w-20 rounded-md",
                  "border border-accent hover:bg-accent"
               )}
            >
               <p className="text-xs font-semibold">
                  {selectedBorderThickness}
               </p>
               <ChevronDown className="w-4 h-4 text-gray-200" />
            </div>
         </DropdownMenuTrigger>
         <DropdownMenuContent
            className="w-40 flex flex-col gap-1"
            align="center"
         >
            {borderThicknesses.map((thickness) => (
               <DropdownMenuItem
                  key={thickness}
                  className={cn(
                     "py-2 px-3 cursor-pointer hover:bg-accent",
                     selectedBorderThickness === thickness && "bg-accent"
                  )}
                  onClick={(e) => {
                     e.stopPropagation();
                     setSelectedBorderThickness(thickness);
                  }}
               >
                  {thickness}
               </DropdownMenuItem>
            ))}
         </DropdownMenuContent>
      </DropdownMenu>
   );
}

type Shape = {
   name: string;
   icon: React.ElementType;
};
function ShapeSelector() {
   const shapes = [
      { name: "rectangle", icon: RectangleHorizontal },
      { name: "circle", icon: Circle },
      { name: "triangle", icon: Triangle },
      { name: "octagon", icon: Octagon },
   ];
   const [selectedShape, setSelectedShape] = useState<Shape>(shapes[0]);
   return (
      <DropdownMenu>
         <DropdownMenuTrigger onClick={(e) => e.stopPropagation()}>
            <div
               className={cn(
                  "flex items-center justify-between gap-2",
                  "p-2 rounded-md cursor-pointer w-20",
                  "border border-accent hover:bg-accent"
               )}
            >
               <selectedShape.icon className="w-4 h-4" />
               <ChevronDown className="w-4 h-4" />
            </div>
         </DropdownMenuTrigger>
         <DropdownMenuContent
            className="w-64 grid grid-cols-3 gap-2"
            align="end"
         >
            {shapes.map((shape) => (
               <DropdownMenuItem
                  key={shape.name}
                  className="cursor-pointer w-full h-14 p-3"
                  onClick={(e) => {
                     e.stopPropagation();
                     setSelectedShape(shape);
                  }}
               >
                  <shape.icon className="w-full! h-full! stroke-gray-200" />
               </DropdownMenuItem>
            ))}
         </DropdownMenuContent>
      </DropdownMenu>
   );
}

function FillStyleSection() {
   const shapes = [
      { name: "rectangle", icon: RectangleHorizontal },
      { name: "circle", icon: Circle },
      { name: "triangle", icon: Triangle },
      { name: "octagon", icon: Octagon },
   ];
   const [selectedShape, setSelectedShape] = useState<Shape>(shapes[0]);
   return (
      <DropdownMenu>
         <DropdownMenuTrigger onClick={(e) => e.stopPropagation()}>
            <div
               className={cn(
                  "flex items-center justify-between gap-2",
                  "p-2 rounded-md cursor-pointer w-20",
                  "border border-accent hover:bg-accent"
               )}
            >
               <selectedShape.icon className="w-4 h-4" />
               <ChevronDown className="w-4 h-4" />
            </div>
         </DropdownMenuTrigger>
         <DropdownMenuContent className="w-64 grid grid-cols-3 gap-2">
            {shapes.map((shape) => (
               <DropdownMenuItem
                  key={shape.name}
                  className="cursor-pointer w-full h-14 p-3"
                  onClick={(e) => {
                     e.stopPropagation();
                     setSelectedShape(shape);
                  }}
               >
                  <shape.icon className="w-full! h-full! stroke-gray-200" />
               </DropdownMenuItem>
            ))}
         </DropdownMenuContent>
      </DropdownMenu>
   );
}

function FillColorSection() {
   const [selectedColor, setSelectedColor] = useState<string>("red");
   return (
      <DropdownMenu>
         <DropdownMenuTrigger
            onClick={(e) => e.stopPropagation()}
            className="w-20 h-7 rounded-sm cursor-pointer border"
            style={{
               backgroundColor: selectedColor,
            }}
         />
         <DropdownMenuContent
            className="w-64 grid grid-cols-3 gap-2"
            align="end"
         >
            color picker
         </DropdownMenuContent>
      </DropdownMenu>
   );
}

function NodeHeightControl() {
   return (
      <div className="flex items-center gap-2">
         <MyTextInput
            placeholder="Height"
            className="w-14 text-[12px]! p-1 px-2 h-auto rounded-sm"
         />
         <MyButton
            size="sm"
            className="rounded-sm text-gray-200 text-[12px]! h-auto py-1 px-4 bg-accent hover:bg-accent/80"
         >
            Fit
         </MyButton>
      </div>
   );
}

function NodeWidthControl() {
   return (
      <div className="flex items-center gap-2">
         <MyTextInput
            placeholder="Width"
            className="w-14 text-[12px]! p-1 px-2 h-auto rounded-sm"
         />
         <MyButton
            size="sm"
            className="rounded-sm text-gray-200 text-[12px]! h-auto py-1 px-4 bg-accent hover:bg-accent/80"
         >
            Fit
         </MyButton>
      </div>
   );
}
