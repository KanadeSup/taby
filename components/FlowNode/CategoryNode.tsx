import { Handle, NodeProps, Position } from "@xyflow/react";

export function CategoryNode(props: NodeProps) {
   const { name } = props.data as { name: string };
   return (
      <div className="flex items-center gap-2">
         <Handle
            id="left"
            type="target"
            position={Position.Left}
            className="invisible"
         />
         <div className="rounded-sm p-3 border border-transparent hover:border-accent">
            <div className="flex items-center gap-1 text-gray-200">
               <h1 className="text-sm font-semibold truncate">{name}</h1>
            </div>
         </div>
         <Handle
            id="right"
            type="target"
            position={Position.Right}
            className="invisible"
         />
      </div>
   );
}
