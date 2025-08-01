import { cn } from "@/lib/shadnc-utils";
import { Handle, NodeProps, Position } from "@xyflow/react";
import { Plus } from "lucide-react";
import { useMindFlowStateStore } from "../Provider/MindFlowStateProvider";

export function RootNode(props: NodeProps) {
   const { selected } = props;
   const { openNodeMenuForInsert } = useMindFlowStateStore(
      (state) => state.action
   );

   const handleOpenNodeMenuForInsert = (
      e: React.MouseEvent<HTMLDivElement>
   ) => {
      e.stopPropagation();
      e.preventDefault();
      const { top, left } = e.currentTarget.getBoundingClientRect();
      openNodeMenuForInsert({
         baseNodeId: props.id,
         top: top - 12,
         left: left + 20,
      });
   };
   return (
      <div
         className={cn(
            "flex items-center  bg-blue-700 p-4 rounded-md border-2 border-black/50",
            selected && "border-red-500"
         )}
      >
         <Handle
            id="left"
            type="source"
            position={Position.Left}
            className="border-0! invisible"
         />
         <div
            className={cn(
               "hidden absolute right-[-25px] rounded-full bg-green-500 hover:bg-green-600 p-0.5 cursor-pointer",
               selected && "block"
            )}
            onClick={handleOpenNodeMenuForInsert}
         >
            <Plus className="w-3 h-3" />
         </div>
         <div className="text-gray-300">
            <div>Tab root</div>
         </div>
         <div
            className={cn(
               "hidden absolute left-[-25px] rounded-full bg-green-500 hover:bg-green-600 p-0.5 cursor-pointer",
               selected && "block"
            )}
            onClick={handleOpenNodeMenuForInsert}
         >
            <Plus className="w-3 h-3" />
         </div>
         <Handle
            id="right"
            type="source"
            position={Position.Right}
            className="border-0! invisible"
         />
      </div>
   );
}
