import { cn } from "@/lib/shadnc-utils";
import { GitBranch, Palette, Paintbrush } from "lucide-react";
import { useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../shadcn/tooltip";

export function EditNodeSidebar() {
   const [selectedSection, setSelectedSection] = useState<string | null>(null);
   return (
      <div className="w-72 h-full rounded-md border border-gray-700">
         <SectionSelectorHeader
            selectedSection={selectedSection}
            setSelectedSection={setSelectedSection}
         />
         {selectedSection === "general-style" && <GeneralStyleSection />}
         {selectedSection === "edge-style" && <EdgeStyleSection />}
         {selectedSection === "color-scheme" && <ColorSchemeSection />}
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
   return <div>GeneralStyleSection</div>;
}

function EdgeStyleSection() {
   return <div>EdgeStyleSection</div>;
}

function ColorSchemeSection() {
   return <div>ColorSchemeSection</div>;
}
