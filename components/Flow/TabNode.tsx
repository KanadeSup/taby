import { Handle, NodeProps, Position } from "@xyflow/react";
import { Globe } from "lucide-react";

export function TabNode(props: NodeProps) {
   const { title, url, description } = props.data as {
      title: string;
      url: string;
      description: string;
   };
   return (
      <div className="flex">
         <Handle id="left" type="target" position={Position.Left} />
         <div className="border border-accent rounded-sm bg-black/80 hover:border-blue-700/40">
            <div className="px-3 py-1 border-b border-accent flex items-center gap-1 text-gray-200">
               <Globe className="w-3 h-3" />
               <h1 className="text-sm font-semibold">{title}</h1>
            </div>
            <div className="flex flex-col gap-1 px-3 py-2">
               <div className="text-xs">{url}</div>
               <div className="text-xs text-gray-300">{description}</div>
            </div>
         </div>
         <Handle id="right" type="target" position={Position.Right} />
      </div>
   );
}
