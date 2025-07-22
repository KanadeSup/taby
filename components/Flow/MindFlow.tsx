import { useState, useCallback, useEffect } from "react";
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
   useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { RootNode } from "../FlowNode/RootNode";
import { TabNode } from "../FlowNode/TabNode";
import { MindFlowToolbar } from "../Toolbar/MindFlowToolbar";
import { ActiveTabSidebar } from "../Sidebar/ActiveTabSidebar";
import {
   MindFlowLayoutProvider,
   useMindFlowLayoutStore,
} from "../Provider/MindFlowLayoutProvider";
import { cn } from "@/lib/shadnc-utils";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DragPlaceholderNode } from "../FlowNode/DragPlaceholderNode";

const NodeTypes = {
   root: RootNode,
   tab: TabNode,
   dragPlaceholder: DragPlaceholderNode,
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
   const { screenToFlowPosition } = useReactFlow();
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
         onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
            const { clientX, clientY } = e;
            const flowPosition = screenToFlowPosition({
               x: clientX,
               y: clientY,
            });
            flowPosition.x = flowPosition.x - 176 / 2;
            flowPosition.y = flowPosition.y - 80 / 2;
            if (nodes[nodes.length - 1].id === "drag-placeholder-node") {
               setNodes((nodes) =>
                  nodes.map((node) => {
                     if (node.id === "drag-placeholder-node") {
                        return {
                           ...node,
                           position: flowPosition,
                        };
                     }
                     return node;
                  })
               );
            } else {
               const placeholderNode = {
                  id: "drag-placeholder-node",
                  type: "dragPlaceholder",
                  data: {},
                  position: flowPosition,
               };
               setNodes((nodes) => [...nodes, placeholderNode]);
            }
         }}
         onDrop={(e) => {
            const { clientX, clientY } = e;
            const flowPosition = screenToFlowPosition({
               x: clientX,
               y: clientY,
            });
            flowPosition.x = flowPosition.x - 176 / 2;
            flowPosition.y = flowPosition.y - 80 / 2;
            const tabNode = {
               id: "tab-node-" + Date.now(),
               type: "tab",
               data: {
                  title: "Tab",
                  url: "https://www.google.com",
                  description: "Tab description",
               },
               position: flowPosition,
            };
            let newNodes = [...nodes, tabNode];
            newNodes = newNodes.filter(
               (node) => node.id !== "drag-placeholder-node"
            );
            setNodes(newNodes);
         }}
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
