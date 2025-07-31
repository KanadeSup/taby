import { useEffect, useState } from "react";
import { useMindFlowStateStore } from "../Provider/MindFlowStateProvider";
import { PanelTop } from "lucide-react";

export function ActiveTabSidebar() {
   const [tabs, setTabs] = useState<chrome.tabs.Tab[]>([]);
   const { setDragActiveTab} = useMindFlowStateStore(
      (state) => state.action
   );
   useEffect(() => {
      chrome.tabs.query({}, (tabs) => {
         setTabs(tabs.filter((tab) => tab.url));
      });
   }, []);
   return (
      <div className="w-full h-full rounded-md">
         <div className="h-full w-64 rounded-md border border-gray-700 bg-[#090909]">
            <div className="text-white px-4 py-3 border-b border-gray-700 flex items-center gap-2">
               <PanelTop className="w-4 h-4" />
               <span className="text-sm font-medium">Active tabs</span>
            </div>
            <div className="flex flex-col gap-2 p-2">
               {tabs.map((tab) => (
                  <div
                     key={tab.id}
                     className="flex items-center gap-2 p-2 cursor-pointer rounded-md hover:bg-accent"
                     onDragStart={() => {
                        setDragActiveTab({
                           title: tab.title ?? "Untitled",
                           url: tab.url ?? "",
                           favIconUrl: tab.favIconUrl,
                        });
                     }}
                     draggable
                  >
                     {tab.favIconUrl && (
                        <img src={tab.favIconUrl} className="w-4 h-4 rounded" />
                     )}
                     <p className="text-xs truncate">{tab.title}</p>
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
}
