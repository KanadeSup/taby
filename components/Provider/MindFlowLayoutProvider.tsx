import { createStore, StoreApi, useStore } from "zustand";
import { ReactFlowProvider } from "@xyflow/react";
import { createContext, useContext, useState } from "react";

type MindFlowLayoutStore = {
   isActiveTabSidebarOpen: boolean;
   action: {
      toggleActiveTabSidebar: (state?: boolean) => void;
   };
};

const createMindFlowLayoutStore = (
   initialState: Partial<MindFlowLayoutStore> = {}
) => {
   return createStore<MindFlowLayoutStore>((set, get) => ({
      isActiveTabSidebarOpen: false,
      ...initialState,
      action: {
         toggleActiveTabSidebar: (state?: boolean) => {
            set({
               isActiveTabSidebarOpen: state ?? !get().isActiveTabSidebarOpen,
            });
         },
      },
   }));
};

const MindFlowLayoutContext = createContext<
   StoreApi<MindFlowLayoutStore> | undefined
>(undefined);

export type MindFlowLayoutProviderProps = {
   children: React.ReactNode;
};
export function MindFlowLayoutProvider({
   children,
}: MindFlowLayoutProviderProps) {
   const [store] = useState(() => createMindFlowLayoutStore());
   return (
      <ReactFlowProvider>
         <MindFlowLayoutContext.Provider value={store}>
            {children}
         </MindFlowLayoutContext.Provider>
      </ReactFlowProvider>
   );

}

export function useMindFlowLayoutStore(selector: (state: MindFlowLayoutStore) => any) {
   const store = useContext(MindFlowLayoutContext);
   if (!store) {
      throw new Error("useMindFlowLayoutStore must be used within a MindFlowLayoutProvider");
   }
   return useStore(store, selector);
}