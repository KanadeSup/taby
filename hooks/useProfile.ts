import { useEffect, useState } from "react";
import { getProfiles } from "@/api/profile";
import Profile from "@/models/profile";

export function useProfiles() {
   const [profiles, setProfiles] = useState<Profile[]>([]);
   const [isLoading, setIsLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);
   useEffect(() => {
      getProfiles()
         .then(setProfiles)
         .catch((err) => {
            setError(err.message);
         })
         .finally(() => setIsLoading(false));
   }, []);

   const refetch = () => {
      setIsLoading(true);
      setError(null);
      getProfiles()
         .then(setProfiles)
         .catch((err) => {
            setError(err.message);
         })
         .finally(() => setIsLoading(false));
   };
   return { profiles, isLoading, error, refetch };
}
