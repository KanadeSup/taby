import { cn } from "@/lib/shadnc-utils";
import { Handle, NodeProps, NodeResizer, Position } from "@xyflow/react";
import { Plus } from "lucide-react";
import { useMindFlowStateStore } from "../Provider/MindFlowStateProvider";
import { EditNodeStyleState } from "../EditNodeSidebar/types";
import {
   getBorderStyle,
   getBorderWidth,
   getFontSize,
   getFontWeight,
   getTextDecoration,
} from "@/lib/utils";
import {
   ThickDashFillStyleIcon,
   ThickDiagonalFillStyleIcon,
   ThinDashFillStyleIcon,
   ThinDiagonalFillStyleIcon,
} from "../Icon/FillStyleIcon";

export function RootNode(props: NodeProps) {
   const { selected } = props;

   const { style: nodeStyle = {} } = props.data as {
      title: string;
      style?: Partial<EditNodeStyleState>;
   };

   console.log(props.data);
   const { openNodeMenuForInsert } = useMindFlowStateStore(
      (state) => state.action
   );

   const handleOpenNodeMenuForInsert = (
      e: React.MouseEvent<HTMLDivElement>,
      baseNodeSide: "left" | "right"
   ) => {
      e.stopPropagation();
      e.preventDefault();
      const { top, left } = e.currentTarget.getBoundingClientRect();
      openNodeMenuForInsert({
         baseNodeId: props.id,
         baseNodeSide,
         top: top - 12,
         left: left + 20,
      });
   };
   return (
      <>
         <NodeResizer color="#ff0071" isVisible={selected} />
         <div
            className={cn(
               "flex items-center p-4 rounded-md",
               "w-full h-full relative"
            )}
            style={{
               borderWidth: getBorderWidth(nodeStyle.border?.thickness),
               borderColor: nodeStyle.border?.color,
               borderStyle: getBorderStyle(nodeStyle.border?.style),
               backgroundColor:
                  nodeStyle.shape?.fillStyle === "flat"
                     ? nodeStyle.shape?.fillColor
                     : undefined,
               borderRadius:
                  nodeStyle.shape?.shapeType === "circle" ? "50%" : undefined,
               fontSize: getFontSize(nodeStyle.text?.fontSize),
               fontWeight: getFontWeight(nodeStyle.text?.fontWeight),
               color: nodeStyle.text?.color,
               textDecoration: getTextDecoration(nodeStyle.text?.decorations),
               fontStyle: nodeStyle.text?.decorations.includes("italic")
                  ? "italic"
                  : undefined,
               textAlign: nodeStyle.text?.align,
            }}
         >
            {nodeStyle.shape?.fillStyle === "thin-dash" && (
               <ThinDashFillStyleIcon
                  className="absolute top-0 left-0 w-full h-full -z-10"
                  preserveAspectRatio="none"
                  viewBox="3 10 36 20"
                  style={{ color: nodeStyle.shape?.fillColor }}
               />
            )}
            {nodeStyle.shape?.fillStyle === "thick-dash" && (
               <ThickDashFillStyleIcon
                  className="absolute top-0 left-0 w-full h-full -z-10"
                  preserveAspectRatio="none"
                  viewBox="2 9 36 21"
                  style={{ color: nodeStyle.shape?.fillColor }}
               />
            )}
            {nodeStyle.shape?.fillStyle === "thick-diagonal" && (
               <ThickDiagonalFillStyleIcon
                  className="absolute top-0 left-0 w-full h-full -z-10"
                  preserveAspectRatio="none"
                  viewBox="3 10 34 22"
                  style={{ color: nodeStyle.shape?.fillColor }}
               />
            )}
            {nodeStyle.shape?.fillStyle === "thin-diagonal" && (
               <ThinDiagonalFillStyleIcon
                  className="absolute top-0 left-0 w-full h-full -z-10"
                  preserveAspectRatio="none"
                  viewBox="2 10 36 22"
                  style={{ color: nodeStyle.shape?.fillColor }}
               />
            )}
            <Handle
               id="left"
               type="source"
               position={Position.Left}
               className="border-0! invisible"
            />
            <div
               className={cn(
                  "hidden absolute left-[-25px] rounded-full bg-green-500 hover:bg-green-600 p-0.5 cursor-pointer",
                  selected && "block"
               )}
               onClick={(e) => handleOpenNodeMenuForInsert(e, "right")}
            >
               <Plus className="w-3 h-3" />
            </div>
            <div
               className={cn(
                  "text-gray-300 overflow-hidden w-full h-full",
                  "flex items-center"
               )}
            >
               <div className="w-full">Tab root</div>
            </div>
            <div
               className={cn(
                  "hidden absolute right-[-25px] rounded-full bg-green-500 hover:bg-green-600 p-0.5 cursor-pointer",
                  selected && "block"
               )}
               onClick={(e) => handleOpenNodeMenuForInsert(e, "left")}
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
      </>
   );
}
