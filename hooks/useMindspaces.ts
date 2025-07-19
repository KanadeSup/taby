import { useState } from "react";
import { useEffect } from "react";
import { getMindspaces } from "@/api/mindspace";
import { Mindspace } from "@/lib/db";

export function useMindspaces() {
   const [mindspaces, setMindspaces] = useState<Mindspace[]>([]);
   const [isLoading, setIsLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);
   useEffect(() => {
      getMindspaces()
         .then((mindspaces) => {
            setMindspaces(mindspaces);
            setIsLoading(false);
         })
         .catch((error) => {
            setError(error);
            setIsLoading(false);
         });
   }, []);
   const refetch = () => {
      if (isLoading) return;
      setIsLoading(true);
      setError(null);
      getMindspaces()
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
