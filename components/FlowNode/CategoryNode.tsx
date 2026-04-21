import { cn } from "@/lib/shadnc-utils";
import { Handle, NodeProps, NodeResizer, Position } from "@xyflow/react";

export function CategoryNode(props: NodeProps) {
   const { name, baseNodeSide } = props.data as {
      name: string;
      baseNodeSide: "left" | "right";
   };
   const { selected } = props;

   return (
      <>
         <NodeResizer
            color="#ff0071"
            isVisible={selected}
            minWidth={100}
            minHeight={30}
         />
         <div
            className={cn(
               "flex items-center gap-2 border-2 border-transparent rounded-sm",
               "w-full h-full"
            )}
         >
            <Handle
               id="left"
               type={baseNodeSide === "left" ? "target" : "source"}
               position={Position.Left}
               className="invisible"
            />
            <div className="rounded-sm p-3 border border-transparent hover:border-accent w-full h-full">
               <div className="flex items-center gap-1 text-gray-200">
                  <h1 className="text-sm font-semibold truncate">{name}</h1>
               </div>
            </div>
            <Handle
               id="right"
               type={baseNodeSide === "left" ? "source" : "target"}
               position={Position.Right}
               className="invisible"
            />
         </div>
      </>
   );
}
