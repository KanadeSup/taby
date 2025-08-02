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
      <Collapse>
         <CollapseTrigger className="flex items-center justify-between">
            <h1>Shape</h1>
            <ShapeSection />
         </CollapseTrigger>
         <CollapseContent>fill</CollapseContent>
      </Collapse>
   );
}

function EdgeStyleSection() {
   return <div>EdgeStyleSection</div>;
}

function ColorSchemeSection() {
   return <div>ColorSchemeSection</div>;
}

type Shape = {
   name: string;
   icon: React.ElementType;
};
function ShapeSection() {
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
            <div className="flex items-center gap-2 cursor-pointer p-2 rounded-md border border-accent hover:bg-accent">
               <selectedShape.icon className="w-4 h-4" />
               <ChevronDown className="w-4 h-4" />
            </div>
         </DropdownMenuTrigger>
         <DropdownMenuContent className="w-64 grid grid-cols-3 gap-2" align="end">
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
