import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogDescription,
   DialogFooter,
} from "@/components/shadcn/dialog";
import { MyButton } from "../Button/MyButton";
import { MyTextInput } from "../Input/MyTextInput";
import { useEffect, useState } from "react";
import { MyTextarea } from "../Input/MyTextarea";
import { getMindspace } from "@/api/mindspace";
import { IconSelector } from "../IconSelector/IconSelector";

export type MindspaceDialogProps = {
   open: boolean;
   type: "create" | "edit";
   mindspaceId?: number;
   onClose?: () => void;
   onSubmit?: (mindspaceName: string, mindspaceId?: number) => void;
};

export function MindspaceDialog(props: MindspaceDialogProps) {
   const { open, type, mindspaceId, onClose, onSubmit } = props;
   const [inputValues, setInputValues] = useState({
      mindspaceName: "",
      mindspaceDescription: "",
   });
   const [inputsValidiation, setInputsValidiation] = useState({
      mindspaceName: false,
   });
   const isEditMode = type === "edit" && mindspaceId !== undefined;

   useEffect(() => {
      const fetchMindspace = async () => {
         if (isEditMode) {
            const mindspace = await getMindspace(mindspaceId);
            if (mindspace) {
               setInputValues({
                  mindspaceName: mindspace.name,
                  mindspaceDescription: "",
               });
               setInputsValidiation({
                  mindspaceName: true,
               });
            }
         }
      };
      fetchMindspace();
   }, [isEditMode, mindspaceId]);

   const handleSubmit = () => {
      onSubmit?.(inputValues.mindspaceName.trim(), mindspaceId);
      onClose?.();
   };

   const handleInputChange = (type: "name" | "description", value: string) => {
      const inputValue = value;
      switch (type) {
         case "name":
            setInputValues({
               ...inputValues,
               mindspaceName: inputValue,
            });
            if (inputValue.trim().length > 0) {
               setInputsValidiation({
                  mindspaceName: true,
               });
            } else {
               setInputsValidiation({
                  mindspaceName: false,
               });
            }
            break;
         case "description":
            setInputValues({
               ...inputValues,
               mindspaceDescription: inputValue,
            });
            break;
      }
   };

   return (
      <Dialog open={open} onOpenChange={onClose}>
         <DialogContent>
            <DialogHeader>
               <DialogTitle>
                  {isEditMode ? "Edit Mindspace" : "Create New Mindspace"}
               </DialogTitle>
               <DialogDescription>
                  {isEditMode ? "Edit the mindspace." : "Add a new mindspace."}
               </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-2">
               <div className="flex items-center gap-2">
                  <IconSelector buttonClassName="w-9 h-9 border border-input bg-input/30" />
                  <MyTextInput
                     placeholder="Mindspace Name"
                     value={inputValues.mindspaceName}
                     onChange={(e) => handleInputChange("name", e.target.value)}
                  />
               </div>
               <MyTextarea
                  placeholder="Description (optional) ...."
                  value={inputValues.mindspaceDescription}
                  className="resize-none h-32"
                  onChange={(e) =>
                     handleInputChange("description", e.target.value)
                  }
               />
            </div>
            <DialogFooter>
               <MyButton
                  variant="outline"
                  className="text-sm"
                  onClick={onClose}
               >
                  Cancel
               </MyButton>
               <MyButton
                  className="text-sm"
                  onClick={handleSubmit}
                  disabled={!inputsValidiation.mindspaceName}
               >
                  {isEditMode ? "Save Changes" : "Create Mindspace"}
               </MyButton>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   );
}
