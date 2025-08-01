import { Handle, NodeProps, Position } from "@xyflow/react";
import { Globe } from "lucide-react";

export function TabNode(props: NodeProps) {
   const { title, url, description, favIconUrl } = props.data as {
      title: string;
      url: string;
      description: string;
      favIconUrl: string;
   };
   return (
      <div
         className="flex"
         style={{
            width: 180,
            height: 80,
         }}
      >
         <Handle id="left" type="target" position={Position.Left} />
         <div className="w-full border border-accent rounded-sm bg-black/80 hover:border-blue-400/40">
            <div className="px-3 py-1 border-b border-accent flex items-center gap-1 text-gray-200">
               {favIconUrl && (
                  <img src={favIconUrl} className="w-3 h-3 rounded-sm" />
               )}
               {!favIconUrl && <Globe className="w-10 h-10" />}
               <h1 className="text-sm font-semibold truncate">{title}</h1>
            </div>
            <div className="flex flex-col gap-1 px-3 py-2">
               <div className="text-xs truncate">{url}</div>
               <div className="text-xs text-gray-300">{description}</div>
            </div>
         </div>
         <Handle id="right" type="target" position={Position.Right} />
      </div>
   );
}
