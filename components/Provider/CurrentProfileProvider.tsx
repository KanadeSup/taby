import { createContext, useContext, type ReactNode } from "react";
import { useCurrentProfile } from "@/hooks/useCurrentProfile";
import Profile from "@/models/profile";

interface CurrentProfileContextType {
   currentProfile?: Profile;
   currentProfileId?: number;
   isLoading: boolean;
   setCurrentProfileId: (profileId: number) => Promise<void>;
}

const CurrentProfileContext = createContext<
   CurrentProfileContextType | undefined
>(undefined);

interface CurrentProfileProviderProps {
   children: ReactNode;
}

export function CurrentProfileProvider({
   children,
}: CurrentProfileProviderProps) {
   const currentProfileState = useCurrentProfile();

   if (currentProfileState.isLoading) {
      return <div>Loading...</div>;
   }

   return (
      <CurrentProfileContext.Provider value={currentProfileState}>
         {children}
      </CurrentProfileContext.Provider>
   );
}

export function useCurrentProfileContext() {
   const context = useContext(CurrentProfileContext);
   if (context === undefined) {
      throw new Error(
         "useCurrentProfileContext must be used within a CurrentProfileProvider"
      );
   }
   return context;
}
