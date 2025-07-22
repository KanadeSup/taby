import { useState, useCallback } from "react";
import {
   ReactFlow,
   addEdge,
   applyNodeChanges,
   applyEdgeChanges,
   type Node,
   type Edge,
   type FitViewOptions,
   type OnConnect,
   type OnNodesChange,
   type OnEdgesChange,
   type OnNodeDrag,
   type DefaultEdgeOptions,
   Panel,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { RootNode } from "./RootNode";
import { TabNode } from "./TabNode";
import { MindFlowToolbar } from "../Toolbar/MindFlowToolbar";
import { ActiveTabSidebar } from "../Sidebar/ActiveTabSidebar";
import {
   MindFlowLayoutProvider,
   useMindFlowLayoutStore,
} from "../Provider/MindFlowLayoutProvider";
import { cn } from "@/lib/shadnc-utils";

const NodeTypes = {
   root: RootNode,
   tab: TabNode,
};

const initialNodes: Node[] = [
   {
      id: "1",
      type: "root",
      data: { label: "Root" },
      position: { x: 5, y: 5 },
      draggable: false,
   },
   {
      id: "2",
      type: "tab",
      data: {
         title: "Tab",
         url: "https://www.google.com",
         description: "Tab description",
      },
      position: { x: 5, y: 100 },
   },
];

const initialEdges: Edge[] = [
   {
      id: "e1-2",
      source: "1",
      target: "2",
      targetHandle: "right",
      style: { stroke: "white" },
   },
];

const fitViewOptions: FitViewOptions = {
   padding: 0.2,
};

const defaultEdgeOptions: DefaultEdgeOptions = {
   animated: false,
};

const onNodeDrag: OnNodeDrag = (_, node) => {
   console.log("drag event", node.data);
};

function Flow() {
   const [nodes, setNodes] = useState<Node[]>(initialNodes);
   const [edges, setEdges] = useState<Edge[]>(initialEdges);
   const isActiveTabSidebarOpen = useMindFlowLayoutStore(
      (state) => state.isActiveTabSidebarOpen
   );
   console.log("isActiveTabSidebarOpen", isActiveTabSidebarOpen);
   const onNodesChange: OnNodesChange = useCallback(
      (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
      [setNodes]
   );
   const onEdgesChange: OnEdgesChange = useCallback(
      (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
      [setEdges]
   );
   const onConnect: OnConnect = useCallback(
      (connection) => setEdges((eds) => addEdge(connection, eds)),
      [setEdges]
   );

   return (
      <ReactFlow
         nodes={nodes}
         nodeTypes={NodeTypes}
         colorMode="dark"
         edges={edges}
         onNodesChange={onNodesChange}
         onEdgesChange={onEdgesChange}
         onConnect={onConnect}
         onNodeDrag={onNodeDrag}
         fitView
         fitViewOptions={fitViewOptions}
         defaultEdgeOptions={defaultEdgeOptions}
      >
         <Panel position="top-center" className="w-full">
            <MindFlowToolbar />
         </Panel>
         <Panel
            position="center-right"
            className={cn(
               "h-[92%] transition-transform duration-300 translate-y-[30px]",
               isActiveTabSidebarOpen ? "translate-x-0" : "translate-x-[110%]"
            )}
         >
            <ActiveTabSidebar />
         </Panel>
      </ReactFlow>
   );
}

export function MindFlow() {
   return (
      <MindFlowLayoutProvider>
         <Flow />
      </MindFlowLayoutProvider>
   );
}
