import { Handle, Position } from "@xyflow/react";

export function RootNode() {
   return (
      <div className="flex items-center">
         <div className="flex justify-end border-b border-white w-2">
            <Handle
               id="left"
               type="source"
               position={Position.Left}
               className="border-0!"
            />
         </div>
         <div className="bg-blue-700 p-4 rounded-md border-2 border-black/50 text-gray-300">
            <div>Tab root</div>
         </div>
         <div className="flex justify-end border-b border-white w-2">
            <Handle
               id="right"
               type="source"
               position={Position.Right}
               className="border-0!"
            />
         </div>
      </div>
   );
}
