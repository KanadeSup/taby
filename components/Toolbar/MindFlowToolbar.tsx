import { Sidebar } from "lucide-react";
import { IconButton } from "../Button/IconButton";
import { useMindFlowStateStore } from "../Provider/MindFlowStateProvider";

export function MindFlowToolbar() {
   const { toggleActiveTabSidebar } = useMindFlowStateStore(
      (state) => state.action
   );

   return (
      <div className="w-full px-4">
         <div className="bg-gray-600 rounded-md px-2 py-1 flex items-center justify-between">
            {/* Left side */}
            <div></div>
            {/* Center side */}
            <div></div>
            {/* Right side */}
            <div>
               <IconButton onClick={() => toggleActiveTabSidebar()}>
                  <Sidebar className="w-4 h-4" />
               </IconButton>
            </div>
         </div>
      </div>
   );
}
