import { Handle, Position } from "@xyflow/react";

export function RootNode() {
   return (
      <div className="flex items-center">
         <div className="flex justify-end border border-white w-5">
            <Handle id="left" type="source" position={Position.Left} />
         </div>
         <div className="bg-blue-700 p-4 rounded-md border-2 border-gray-400 text-gray-300">
            <div>Tab root</div>
         </div>
         <div className="flex justify-end border border-white w-5">
            <Handle id="right" type="source" position={Position.Right} />
         </div>
      </div>
   );
}
