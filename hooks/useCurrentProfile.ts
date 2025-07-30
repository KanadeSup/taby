import { useState, useEffect, useCallback } from "react";
import {
   getCurrentProfile,
   getCurrentProfileId,
   getOrCreateDefaultProfile,
   setCurrentProfileId as setCurrentProfileIdAPI,
} from "@/api/profile";
import Profile from "@/models/profile";
import { db } from "@/lib/db";

export function useCurrentProfile() {
   const [currentProfile, setCurrentProfile] = useState<Profile | undefined>(
      undefined
   );
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      const loadCurrentProfile = async () => {
         try {
            setIsLoading(true);
            const profileId = await getCurrentProfileId();
            const currentProfile = profileId
               ? await db.profiles.get(profileId)
               : null;
            if (currentProfile) {
               setCurrentProfile(currentProfile);
               setCurrentProfileIdAPI(currentProfile.id);
            } else {
               const defaultProfile = await getOrCreateDefaultProfile();
               setCurrentProfile(defaultProfile);
               setCurrentProfileIdAPI(defaultProfile.id);
            }
         } catch (err) {
            console.error(err);
         } finally {
            setIsLoading(false);
         }
      };
      loadCurrentProfile();
   }, []);

   const setCurrentProfileId = useCallback(async (profileId: number) => {
      try {
         const profile = await setCurrentProfileIdAPI(profileId);
         setCurrentProfile(profile);
      } catch (err) {
         console.error(err);
         throw err;
      }
   }, []);

   return {
      currentProfile,
      currentProfileId: currentProfile?.id,
      isLoading,
      setCurrentProfileId,
   };
}
