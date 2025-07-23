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
   useStoreApi,
   InternalNode,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { RootNode } from "../FlowNode/RootNode";
import { TabNode } from "../FlowNode/TabNode";
import { MindFlowToolbar } from "../Toolbar/MindFlowToolbar";
import { ActiveTabSidebar } from "../Sidebar/ActiveTabSidebar";
import {
   MindFlowLayoutProvider,
   useMindFlowStateStore,
} from "../Provider/MindFlowStateProvider";
import { cn } from "@/lib/shadnc-utils";
import { DragPlaceholderNode } from "../FlowNode/DragPlaceholderNode";
import { useShallow } from "zustand/shallow";

const NodeTypes = {
   root: RootNode,
   tab: TabNode,
   dragPlaceholder: DragPlaceholderNode,
};
const MIN_DISTANCE = 500;

const initialNodes: Node[] = [
   {
      id: "1",
      type: "root",
      data: { label: "Root" },
      position: { x: 5, y: 5 },
      draggable: false,
      className: "connectable-node",
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

function Flow() {
   const [nodes, setNodes] = useState<Node[]>(initialNodes);
   const [edges, setEdges] = useState<Edge[]>(initialEdges);
   const store = useStoreApi();
   const { isActiveTabSidebarOpen, dragActiveTab } = useMindFlowStateStore(
      useShallow((state) => ({
         isActiveTabSidebarOpen: state.isActiveTabSidebarOpen,
         dragActiveTab: state.dragActiveTab,
      }))
   );
   const { getInternalNode } = useReactFlow();
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

   const getClosestEdge = useCallback((nodeId: string) => {
      const { nodeLookup } = store.getState();
      const internalNode = getInternalNode(nodeId);
      if (!internalNode) return null;
      const closestNode = Array.from(nodeLookup.values()).reduce<{
         distance: number;
         node: InternalNode<Node> | null;
      }>(
         (closest, node) => {
            if (node.id === internalNode.id) return closest;
            if (node.className !== "connectable-node") return closest;
            const dx =
               node.internals.positionAbsolute.x -
               internalNode.internals.positionAbsolute.x;
            const dy =
               node.internals.positionAbsolute.y -
               internalNode.internals.positionAbsolute.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < closest.distance && distance < MIN_DISTANCE) {
               closest.distance = distance;
               closest.node = node;
            }
            return closest;
         },
         { distance: Infinity, node: null }
      );
      if (!closestNode.node) return null;
      const useRightHandle =
         closestNode.node.internals.positionAbsolute.x <
         internalNode.internals.positionAbsolute.x;
      return {
         id: `${closestNode.node.id}-${nodeId}-${useRightHandle ? "right" : "left"}`,
         source: closestNode.node.id,
         target: nodeId,
         targetHandle: useRightHandle ? "left" : "right",
         sourceHandle: useRightHandle ? "right" : "left",
         className: "tmp",
         style: {
            strokeDasharray: "5 5",
            stroke: "white",
            strokeWidth: 1,
         },
         animated: true,
      };
   }, []);

   const onNodeDrag: OnNodeDrag = (_, node) => {};

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
            let placeHolderNode: Node;
            if (nodes[nodes.length - 1].id === "drag-placeholder-node") {
               placeHolderNode = nodes[nodes.length - 1];
               placeHolderNode.position = flowPosition;
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
               placeHolderNode = {
                  id: "drag-placeholder-node",
                  type: "dragPlaceholder",
                  data: {},
                  position: flowPosition,
               };
               setNodes((nodes) => [...nodes, placeHolderNode]);
            }
            const closestEdge = getClosestEdge(placeHolderNode.id);
            setEdges((eds) => {
               const nextEdges = eds.filter((ed) => ed.className !== "tmp");
               if (closestEdge) {
                  closestEdge.className = "tmp";
                  nextEdges.push(closestEdge);
               }
               return nextEdges;
            });
         }}
         onDrop={(e) => {
            if (!dragActiveTab) {
               setNodes((nodes) =>
                  nodes.filter((node) => node.id !== "drag-placeholder-node")
               );
               return;
            }
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
                  title: dragActiveTab.title,
                  url: dragActiveTab.url,
                  description: "",
                  favIconUrl: dragActiveTab.favIconUrl,
               },
               position: flowPosition,
            };
            let newNodes = [...nodes, tabNode];
            newNodes = newNodes.filter(
               (node) => node.id !== "drag-placeholder-node"
            );
            setNodes(newNodes);
            // set edge
            setTimeout(() => {
               const closestEdge = getClosestEdge(tabNode.id);
               setEdges((eds) => {
                  const nextEdges = eds.filter((ed) => ed.className !== "tmp");
                  if (closestEdge) {
                     closestEdge.animated = false;
                     closestEdge.className = "";
                     closestEdge.style = {
                        strokeDasharray: "0 0",
                        stroke: "white",
                        strokeWidth: 1,
                     };
                     nextEdges.push(closestEdge);
                  }
                  return nextEdges;
               });
            }, 0);
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
