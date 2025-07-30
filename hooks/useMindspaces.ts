import { useState } from "react";
import { useEffect } from "react";
import { getMindspaces } from "@/api/mindspace";
import Mindspace from "@/models/mindspace";

export function useMindspaces(profileId?: number | null) {
   const [mindspaces, setMindspaces] = useState<Mindspace[]>([]);
   const [isLoading, setIsLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);
   useEffect(() => {
      if (!profileId) return;
      getMindspaces(profileId)
         .then((mindspaces) => {
            setMindspaces(mindspaces);
            setIsLoading(false);
         })
         .catch((error) => {
            setError(error);
            setIsLoading(false);
         });
   }, [profileId]);

   const refetch = () => {
      if (!profileId) return;
      if (isLoading) return;
      setIsLoading(true);
      setError(null);
      getMindspaces(profileId)
         .then((mindspaces) => {
            setMindspaces(mindspaces);
            setIsLoading(false);
         })
         .catch((error) => {
            setError(error.message);
            setIsLoading(false);
         });
   };
   return { mindspaces, isLoading, error, refetch };
}
