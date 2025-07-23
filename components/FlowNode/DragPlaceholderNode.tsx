import { Handle, NodeProps, Position } from "@xyflow/react";

export function DragPlaceholderNode({}: NodeProps) {
   return (
      <div className="w-44 h-20 rounded-md bg-white/30">
         <Handle id="right" type="target" position={Position.Right} />
         <Handle id="left" type="target" position={Position.Left} />
      </div>
   );
}
