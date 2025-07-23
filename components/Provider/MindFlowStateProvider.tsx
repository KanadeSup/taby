import { createStore, StoreApi, useStore } from "zustand";
import { Edge, Node, ReactFlowProvider } from "@xyflow/react";
import { createContext, useContext, useState } from "react";
import { DragActiveTab } from "@/types/MindFlow";

type MindFlowStateStore = {
   isActiveTabSidebarOpen: boolean;
   dragActiveTab: null | DragActiveTab;
   nodes: Node[];
   edges: Edge[];
   action: {
      toggleActiveTabSidebar: (state?: boolean) => void;
      setDragActiveTab: (tab: DragActiveTab) => void;
      clearDragActiveTab: () => void;
      setNodes: (nodes: Node[] | ((nodes: Node[]) => Node[])) => void;
      setEdges: (edges: Edge[] | ((edges: Edge[]) => Edge[])) => void;
   };
};

const createMindFlowStateStore = (
   initialState: Partial<MindFlowStateStore> = {}
) => {
   return createStore<MindFlowStateStore>((set, get) => ({
      isActiveTabSidebarOpen: false,
      dragActiveTab: null,
      nodes: [{
         id: "root-node",
         type: "root",
         data: {
            title: "Root Node",
         },
         position: { x: 0, y: 0 },
         draggable: false,
         className: "connectable-node",
      }],
      edges: [],
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
