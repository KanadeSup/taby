import {
   Icon,
   LucideIcon,
   NotepadText,
   PanelTop,
   SquareLibrary,
} from "lucide-react";
import { useMindFlowStateStore } from "../Provider/MindFlowStateProvider";
import { Edge, Node } from "@xyflow/react";

export type InsertNodeMenuProps = {
   baseNodeId: string | null;
   top: number;
   left: number;
};
export function InsertNodeMenu(props: InsertNodeMenuProps) {
   const { baseNodeId, top, left } = props;
   const { closeNodeMenuForInsert, addNode, addEdge } = useMindFlowStateStore(
      (state) => state.action
   );
   const menuItems = [
      {
         title: "Add category",
         icon: SquareLibrary,
         onClick: () => {
            handleAddCategory();
         },
      },
      {
         title: "Add note",
         icon: NotepadText,
         onClick: () => {},
      },
      {
         title: "Add tab",
         icon: PanelTop,
         onClick: () => {},
      },
   ];

   const handleCloseMenu = () => {
      closeNodeMenuForInsert();
   };
   const handleAddCategory = () => {
      if (!baseNodeId) return;
      const categoryNode: Node = {
         id: `category-${Date.now()}`,
         type: "createCategory",
         position: { x: 150, y: 150 },
         data: {
            name: "New category",
         },
      };
      addNode(categoryNode);
      addEdge({
         id: `edge-${Date.now()}`,
         source: baseNodeId,
         target: categoryNode.id,
         sourceHandle: "right",
         targetHandle: "left",
         className: "category-edge-tmp",
         style: {
            strokeDasharray: "5 5",
            stroke: "white",
            strokeWidth: 1,
         },
         animated: true,
      });
      handleCloseMenu();
   };

   if (!baseNodeId) return null;
   return (
      <div>
         <div
            className="fixed top-0 left-0 w-screen h-screen bg-black/50 z-30"
            onClick={handleCloseMenu}
         />
         <div
            className="absolute bg-black rounded-md p-1 border border-gray-700 z-40"
            style={{
               top: top,
               left: left,
            }}
         >
            {menuItems.map((item) => (
               <MenuItem
                  key={item.title}
                  title={item.title}
                  icon={item.icon}
                  onClick={item.onClick}
               />
            ))}
         </div>
      </div>
   );
}

type MenuItemProps = {
   title: string;
   icon: LucideIcon;
   onClick: () => void;
};
function MenuItem(props: MenuItemProps) {
   const { title, icon: Icon, onClick } = props;
   return (
      <div
         className="cursor-pointer p-1 px-3 rounded-sm hover:bg-accent text-sm flex items-center gap-2"
         onClick={onClick}
      >
         <Icon className="w-4 h-4" />
         {title}
      </div>
   );
}
