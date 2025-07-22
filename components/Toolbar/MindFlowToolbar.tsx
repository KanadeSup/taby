import { Sidebar } from "lucide-react";
import { IconButton } from "../Button/IconButton";

export function MindFlowToolbar() {
   return (
      <div className="w-full px-4">
         <div className="bg-gray-600 rounded-md px-2 py-1 flex items-center justify-between">
            {/* Left side */}
            <div></div>
            {/* Center side */}
            <div></div>
            {/* Right side */}
            <div>
               <IconButton>
                  <Sidebar className="w-4 h-4" />
               </IconButton>
            </div>
         </div>
      </div>
   );
}
