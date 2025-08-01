import { createStore, StoreApi, useStore } from "zustand";
import { Edge, Node, ReactFlowProvider } from "@xyflow/react";
import { createContext, useContext, useState } from "react";
import { DragActiveTab, NodeMenuForInsert } from "@/types/MindFlow";

type MindFlowStateStore = {
   isActiveTabSidebarOpen: boolean;
   dragActiveTab: null | DragActiveTab;
   nodes: Node[];
   edges: Edge[];
   selectedNode?: null | Node;
   nodeMenuForInsert: NodeMenuForInsert;
   action: {
      toggleActiveTabSidebar: (state?: boolean) => void;
      setDragActiveTab: (tab: DragActiveTab) => void;
      clearDragActiveTab: () => void;
      setNodes: (nodes: Node[] | ((nodes: Node[]) => Node[])) => void;
      setEdges: (edges: Edge[] | ((edges: Edge[]) => Edge[])) => void;
      setSelectedNode: (node: null | Node) => void;
      openNodeMenuForInsert: (nodeMenuForInsert: NodeMenuForInsert) => void;
      closeNodeMenuForInsert: () => void;
      addNode: (node: Node) => void;
      addEdge: (edge: Edge) => void;
      removeNodeById: (id: string) => void;
      removeEdgeById: (id: string) => void;
      updateNodeById: (id: string, updateData: Partial<Node>) => void;
      updateEdgeById: (id: string, updateData: Partial<Edge>) => void;
   };
};

const createMindFlowStateStore = (
   initialState: Partial<MindFlowStateStore> = {}
) => {
   return createStore<MindFlowStateStore>((set, get) => ({
      isActiveTabSidebarOpen: false,
      dragActiveTab: null,
      nodes: [
         {
            id: "root-node",
            type: "root",
            data: {
               title: "Root Node",
            },
            position: { x: 0, y: 0 },
            draggable: false,
            className: "connectable-node",
         },
      ],
      edges: [],
      selectedNode: null,
      nodeMenuForInsert: {
         baseNodeId: null,
         baseNodeSide: "left",
         top: 0,
         left: 0,
      },
      ...initialState,
      action: {
         toggleActiveTabSidebar: (state?: boolean) => {
            set({
               isActiveTabSidebarOpen: state ?? !get().isActiveTabSidebarOpen,
            });
         },
         setDragActiveTab: (tab: DragActiveTab) => {
            set({ dragActiveTab: tab });
         },
         clearDragActiveTab: () => {
            set({ dragActiveTab: null });
         },
         setNodes: (nodes: Node[] | ((nodes: Node[]) => Node[])) => {
            set({
               nodes: typeof nodes === "function" ? nodes(get().nodes) : nodes,
            });
         },
         setEdges: (edges: Edge[] | ((edges: Edge[]) => Edge[])) => {
            set({
               edges: typeof edges === "function" ? edges(get().edges) : edges,
            });
         },
         setSelectedNode: (node: null | Node) => {
            set({ selectedNode: node });
         },
         openNodeMenuForInsert: (nodeMenuForInsert: NodeMenuForInsert) => {
            set({ nodeMenuForInsert });
         },
         closeNodeMenuForInsert: () => {
            set({
               nodeMenuForInsert: {
                  baseNodeId: null,
                  baseNodeSide: "left",
                  top: 0,
                  left: 0,
               },
            });
         },
         addNode: (node: Node) => {
            set({ nodes: [...get().nodes, node] });
         },
         addEdge: (edge: Edge) => {
            set({ edges: [...get().edges, edge] });
         },
         removeNodeById: (id: string) => {
            set({
               nodes: get().nodes.filter((node) => node.id !== id),
            });
         },
         removeEdgeById: (id: string) => {
            set({
               edges: get().edges.filter((edge) => edge.id !== id),
            });
         },
         updateNodeById: (id: string, updateData: Partial<Node>) => {
            set({
               nodes: get().nodes.map((node) =>
                  node.id === id ? { ...node, ...updateData } : node
               ),
            });
         },
         updateEdgeById: (id: string, updateData: Partial<Edge>) => {
            set({
               edges: get().edges.map((edge) =>
                  edge.id === id ? { ...edge, ...updateData } : edge
               ),
            });
         },
      },
   }));
};

const MindFlowStateContext = createContext<
   StoreApi<MindFlowStateStore> | undefined
>(undefined);

export type MindFlowLayoutProviderProps = {
   children: React.ReactNode;
};
export function MindFlowLayoutProvider({
   children,
}: MindFlowLayoutProviderProps) {
   const [store] = useState(() => createMindFlowStateStore());
   return (
      <ReactFlowProvider>
         <MindFlowStateContext.Provider value={store}>
            {children}
         </MindFlowStateContext.Provider>
      </ReactFlowProvider>
   );
}

export function useMindFlowStateStore<T>(
   selector: (state: MindFlowStateStore) => T
) {
   const store = useContext(MindFlowStateContext);
   if (!store) {
      throw new Error(
         "useMindFlowStateStore must be used within a MindFlowStateProvider"
      );
   }
   return useStore(store, selector);
}
