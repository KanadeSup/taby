import { Eye, LayoutGrid, Sidebar } from "lucide-react";
import { IconButton } from "../Button/IconButton";
import { useMindFlowStateStore } from "../Provider/MindFlowStateProvider";
import { Edge, getConnectedEdges, getOutgoers, Node } from "@xyflow/react";
import dagre from "@dagrejs/dagre";
import { useShallow } from "zustand/shallow";

function getLayoutedElements(
   nodes: Node[],
   edges: Edge[],
   direction: "RL" | "LR"
) {
   const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(
      () => ({})
   );
   dagreGraph.setGraph({ rankdir: direction, nodesep: 10, ranksep: 50 });
   nodes.forEach((node) => {
      dagreGraph.setNode(node.id, { width: 176, height: 80 });
   });
   edges.forEach((edge) => {
      dagreGraph.setEdge(edge.source, edge.target);
   });
   dagre.layout(dagreGraph);
   const layoutedNodes = nodes.map((node) => {
      const dargeNodePosition = dagreGraph.node(node.id);
      const flowNodePosition = {
         x: dargeNodePosition.x - 176 / 2,
         y: dargeNodePosition.y - 80 / 2,
      };
      return {
         ...node,
         position: flowNodePosition,
      };
   });
   // get root node position
   const rootNode = layoutedNodes.find((node) => node.id === "root-node");
   if (!rootNode) return layoutedNodes;
   const rootNodePosition = rootNode.position;
   return layoutedNodes.map((node) => {
      // Shift all nodes to make root node at (0, 0)
      return {
         ...node,
         position: {
            x: node.position.x - rootNodePosition.x,
            y: node.position.y - rootNodePosition.y,
         },
      };
   });
}
function getNodesConnectedToRoot(
   nodes: Node[],
   edges: Edge[],
   direction: "left" | "right"
) {
   const connectedEdges = getConnectedEdges(nodes, edges);
   const connectedNodes: Node[] = [];
   connectedEdges.forEach((edge) => {
      if (edge.source === "root-node" && edge.sourceHandle === direction) {
         connectedNodes.push(nodes.find((node) => node.id === edge.target)!);
      }
   });
   [...connectedNodes].forEach((node) => {
      const outgoers = getOutgoers(node, nodes, edges);
      connectedNodes.push(...outgoers);
   });
   return connectedNodes;
}
export function MindFlowToolbar() {
   const { toggleActiveTabSidebar, setNodes, setEdges } = useMindFlowStateStore(
      (state) => state.action
   );
   const { nodes, edges } = useMindFlowStateStore(
      useShallow((state) => ({
         nodes: state.nodes,
         edges: state.edges,
      }))
   );

   return (
      <div className="w-full px-4">
         <div className="rounded-md py-1 flex items-center justify-between">
            {/* Left side */}
            <div className="flex gap-1 border border-gray-500 rounded-md p-1">
               <IconButton onClick={() => toggleActiveTabSidebar()}>
                  <Sidebar className="w-4 h-4" />
               </IconButton>
            </div>
            {/* Center side */}
            <div className="flex gap-1 border border-gray-500 rounded-md p-1">
               <IconButton
                  onClick={() => {
                     const rootNode = nodes.find(
                        (node) => node.id === "root-node"
                     );
                     if (!rootNode) return;
                     const rightNodes = getNodesConnectedToRoot(
                        nodes,
                        edges,
                        "right"
                     );
                     const leftNodes = getNodesConnectedToRoot(
                        nodes,
                        edges,
                        "left"
                     );
                     const layoutedRightNodes = getLayoutedElements(
                        [rootNode, ...rightNodes],
                        getConnectedEdges(rightNodes, edges),
                        "LR"
                     );
                     const layoutedLeftNodes = getLayoutedElements(
                        [rootNode, ...leftNodes],
                        getConnectedEdges(leftNodes, edges),
                        "RL"
                     );
                     setNodes([...layoutedRightNodes, ...layoutedLeftNodes]);
                  }}
               >
                  <LayoutGrid className="w-4 h-4" />
               </IconButton>
            </div>
            {/* Right side */}
            <div className="flex gap-1 border border-gray-500 rounded-md p-1">
               <IconButton onClick={() => toggleActiveTabSidebar()}>
                  <Eye className="w-4 h-4" />
               </IconButton>
               <IconButton onClick={() => toggleActiveTabSidebar()}>
                  <Sidebar className="w-4 h-4" />
               </IconButton>
            </div>
         </div>
      </div>
   );
}
