import { useEffect, useState } from "react";
import { useMindFlowStateStore } from "../Provider/MindFlowStateProvider";

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
         <div className="bg-gray-700 h-full w-64 rounded-md p-2">
            <div className="text-white text-sm font-medium text-center">
               Active tab
            </div>
            <div className="flex flex-col gap-2">
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
