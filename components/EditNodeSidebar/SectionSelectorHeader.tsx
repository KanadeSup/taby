import { cn } from "@/lib/shadnc-utils";
import { GitBranch, Paintbrush, Palette } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../shadcn/tooltip";
import { SidebarSection } from "./types";

export type SectionSelectorHeaderProps = {
   selectedSection: SidebarSection;
   onChange: (section: SidebarSection) => void;
};

const sections: {
   toolTip: string;
   icon: React.ElementType;
   code: SidebarSection;
}[] = [
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

export function SectionSelectorHeader({
   selectedSection,
   onChange,
}: SectionSelectorHeaderProps) {
   return (
      <div className="grid grid-cols-3 gap-1 p-2 border-b border-accent">
         {sections.map((section) => (
            <Tooltip key={section.code}>
               <TooltipTrigger asChild>
                  <button
                     type="button"
                     className={cn(
                        "hover:bg-accent p-2 rounded-md cursor-pointer flex items-center justify-center w-full",
                        selectedSection === section.code && "bg-accent"
                     )}
                     onClick={() => onChange(section.code)}
                  >
                     <section.icon className="w-4 h-4" />
                  </button>
               </TooltipTrigger>
               <TooltipContent>{section.toolTip}</TooltipContent>
            </Tooltip>
         ))}
      </div>
   );
}
