import { Handle, Node, NodeProps, Position } from "@xyflow/react";
import { MyTextInput } from "../Input/MyTextInput";
import { useEffect, useRef, useState } from "react";
import { useMindFlowStateStore } from "../Provider/MindFlowStateProvider";

export function CreateCategoryNode(props: NodeProps) {
   const { baseNodeSide } = props.data as { baseNodeSide: "left" | "right" };
   const inputRef = useRef<HTMLInputElement>(null);
   const [title, setTitle] = useState("");
   const { removeNodeById, updateNodeById, setEdges } = useMindFlowStateStore(
      (state) => state.action
   );
   useEffect(() => {
      if (inputRef.current) {
         inputRef.current.click();
         inputRef.current.focus();
      }
   }, []);
   const handleBlur = () => {
      const resolvedTitle = title.trim();
      if (!resolvedTitle) {
         removeNodeById(props.id);
         return;
      }
      const categoryNode: Partial<Node> = {
         type: "category",
         data: {
            name: resolvedTitle,
            baseNodeSide,
         },
      };
      updateNodeById(props.id, categoryNode);
      setEdges((eds) =>
         eds.map((edge) => {
            if (edge.className === "category-edge-tmp") {
               return {
                  ...edge,
                  animated: false,
                  className: "connectable-node",
                  style: { strokeDasharray: "0 0", stroke: "white" },
               };
            }
            return edge;
         })
      );
   };
   return (
      <div className="">
         <Handle
            id="left"
            type="target"
            position={Position.Left}
            className="invisible"
         />
         <MyTextInput
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleBlur}
            ref={(el) => {
               if (el) {
                  // Click to unselect the parent node
                  el.click();
                  // Focus the input
                  el.focus();
               }
            }}
         />
         <Handle
            id="right"
            type="target"
            position={Position.Right}
            className="invisible"
         />
      </div>
   );
}
