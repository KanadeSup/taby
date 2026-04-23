import { cn } from "@/lib/shadnc-utils";
import { Handle, NodeProps, NodeResizer, Position } from "@xyflow/react";
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

export function CategoryNode(props: NodeProps) {
   const { name, baseNodeSide, style: nodeStyle = {} } = props.data as {
      name: string;
      baseNodeSide: "left" | "right";
      style?: Partial<EditNodeStyleState>;
   };
   const textDecorations = nodeStyle.text?.decorations ?? [];
   const { selected } = props;

   return (
      <>
         <NodeResizer
            color="#ff0071"
            isVisible={selected}
         />
         <div
            className={cn(
               "flex items-center gap-2 border-2 border-transparent rounded-sm relative",
               "w-full h-full"
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
               type={baseNodeSide === "left" ? "target" : "source"}
               position={Position.Left}
               className="invisible"
            />
            <div
               className={cn(
                  "rounded-sm p-3 border border-transparent w-full h-full",
                  "flex items-center"
               )}
            >
               <div
                  className="flex items-center gap-1 text-gray-200 w-full h-full"
                  style={{
                     fontSize: getFontSize(nodeStyle.text?.fontSize),
                     fontWeight: getFontWeight(nodeStyle.text?.fontWeight),
                     color: nodeStyle.text?.color,
                     textDecoration: getTextDecoration(textDecorations),
                     fontStyle: textDecorations.includes("italic")
                        ? "italic"
                        : undefined,
                     textAlign: nodeStyle.text?.align,
                  }}
               >
                  <h1 className="truncate w-full">{name}</h1>
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
