import { createStore, StoreApi, useStore } from "zustand";
import { ReactFlowProvider } from "@xyflow/react";
import { createContext, useContext, useState } from "react";
import { DragActiveTab } from "@/types/MindFlow";

type MindFlowStateStore = {
   isActiveTabSidebarOpen: boolean;
   dragActiveTab: null | DragActiveTab;
   action: {
      toggleActiveTabSidebar: (state?: boolean) => void;
      setDragActiveTab: (tab: DragActiveTab) => void;
      clearDragActiveTab: () => void;
   };
};

const createMindFlowStateStore = (
   initialState: Partial<MindFlowStateStore> = {}
) => {
   return createStore<MindFlowStateStore>((set, get) => ({
      isActiveTabSidebarOpen: false,
      dragActiveTab: null,
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

export function useMindFlowStateStore<T>(selector: (state: MindFlowStateStore) => T) {
   const store = useContext(MindFlowStateContext);
   if (!store) {
      throw new Error("useMindFlowStateStore must be used within a MindFlowStateProvider");
   }
   return useStore(store, selector);
}