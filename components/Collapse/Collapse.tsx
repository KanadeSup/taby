import { cn } from "@/lib/shadnc-utils";
import { ChevronDown } from "lucide-react";
import { createContext, useContext, useState } from "react";

type CollapseContextType = {
   isOpen: boolean;
   setIsOpen: (isOpen: boolean) => void;
};
const CollapseContext = createContext<CollapseContextType>({
   isOpen: false,
   setIsOpen: () => {},
});

export type CollapseProps = {
   children: React.ReactNode;
   className?: string;
};
export function Collapse(props: CollapseProps) {
   const [isOpen, setIsOpen] = useState(false);
   return (
      <CollapseContext.Provider value={{ isOpen, setIsOpen }}>
         <div className={cn(props.className)}>{props.children}</div>
      </CollapseContext.Provider>
   );
}

export type CollapseTriggerProps = {
   children: React.ReactNode;
   disableChevron?: boolean;
   className?: string;
};
export function CollapseTrigger(props: CollapseTriggerProps) {
   const { isOpen, setIsOpen } = useContext(CollapseContext);
   return (
      <div
         className="flex items-center gap-2 cursor-pointer"
         onClick={() => setIsOpen(!isOpen)}
      >
         {!props.disableChevron && (
            <ChevronDown
               className={cn(
                  "w-4 h-4 transition-transform",
                  isOpen && "rotate-[-90deg]"
               )}
            />
         )}
         <div className={cn("w-full", props.className)}>{props.children}</div>
      </div>
   );
}

export type CollapseContentProps = {
   children: React.ReactNode;
   className?: string;
};
export function CollapseContent(props: CollapseContentProps) {
   const { isOpen } = useContext(CollapseContext);
   return (
      <div className={cn(props.className, isOpen && "hidden")}>
         {props.children}
      </div>
   );
}
