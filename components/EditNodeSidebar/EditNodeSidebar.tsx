import { useEffect, useMemo, useState } from "react";
import { useShallow } from "zustand/shallow";
import { Node } from "@xyflow/react";
import { useMindFlowStateStore } from "../Provider/MindFlowStateProvider";
import { SectionSelectorHeader } from "./SectionSelectorHeader";
import { SidebarSection, EditNodeStyleState } from "./types";
import { DEFAULT_EDIT_NODE_STYLE } from "./constants";
import { normalizeStyleState } from "./utils";
import { GeneralStyleSection } from "./sections/GeneralStyleSection";
import { EdgeStyleSection } from "./sections/EdgeStyleSection";
import { ColorSchemeSection } from "./sections/ColorSchemeSection";

type NodeDataWithStyle = Record<string, unknown> & {
   style?: Partial<EditNodeStyleState>;
};

function getNodeStyle(node: Node | null) {
   if (!node) {
      return DEFAULT_EDIT_NODE_STYLE;
   }
   return normalizeStyleState((node.data as NodeDataWithStyle)?.style);
}

function createNodePatch(style: EditNodeStyleState): Partial<Node> {
   return {
      style: {
         borderStyle:
            style.border.style === "none" ? "solid" : style.border.style,
         borderColor: style.border.color,
         color: style.text.color,
         width: style.shape.width ?? undefined,
         height: style.shape.height ?? undefined,
      },
   };
}

export function EditNodeSidebar() {
   const { selectedNode, updateNodeById, setSelectedNode } =
      useMindFlowStateStore(
         useShallow((state) => ({
            selectedNode: state.selectedNode ?? null,
            updateNodeById: state.action.updateNodeById,
            setSelectedNode: state.action.setSelectedNode,
         }))
      );

   const [selectedSection, setSelectedSection] =
      useState<SidebarSection>("general-style");
   const [styleState, setStyleState] = useState<EditNodeStyleState>(
      DEFAULT_EDIT_NODE_STYLE
   );

   const nodeTitle = useMemo(() => {
      if (!selectedNode) {
         return "Node style";
      }
      const data = selectedNode.data as Record<string, unknown>;
      return (
         (typeof data.title === "string" && data.title) ||
         (typeof data.name === "string" && data.name) ||
         "Selected node"
      );
   }, [selectedNode]);

   useEffect(() => {
      setStyleState(getNodeStyle(selectedNode));
   }, [selectedNode?.id, selectedNode?.data]);

   const handleChangeStyle = (nextStyle: EditNodeStyleState) => {
      setStyleState(nextStyle);
      if (!selectedNode) {
         return;
      }

      const currentData = (selectedNode.data ?? {}) as Record<string, unknown>;
      const nextData: NodeDataWithStyle = {
         ...currentData,
         style: nextStyle,
      };
      const patch = createNodePatch(nextStyle);

      updateNodeById(selectedNode.id, {
         ...patch,
         data: nextData,
      });
      setSelectedNode({
         ...selectedNode,
         ...patch,
         data: nextData,
      });
   };

   return (
      <div className="w-72 h-full rounded-md border border-gray-700 bg-[#090909]">
         <SectionSelectorHeader
            selectedSection={selectedSection}
            onChange={setSelectedSection}
         />
         <div className="p-2 px-4 border-b border-accent/50">
            <p className="text-sm font-semibold truncate">{nodeTitle}</p>
         </div>
         <div className="p-2">
            {selectedSection === "general-style" && (
               <GeneralStyleSection
                  style={styleState}
                  onChange={handleChangeStyle}
               />
            )}
            {selectedSection === "edge-style" && (
               <EdgeStyleSection
                  value={styleState.branch}
                  onChange={(branch) =>
                     handleChangeStyle({ ...styleState, branch })
                  }
               />
            )}
            {selectedSection === "color-scheme" && (
               <ColorSchemeSection
                  style={styleState}
                  onChange={handleChangeStyle}
               />
            )}
         </div>
      </div>
   );
}
