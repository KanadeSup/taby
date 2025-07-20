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
import { useState } from "react";
import { MyTextarea } from "../Input/MyTextarea";

export type MindspaceDialogProps = {
   open: boolean;
   onClose?: () => void;
   onSubmit?: (mindspaceName: string) => void;
};

export function MindspaceDialog(props: MindspaceDialogProps) {
   const { open, onClose, onSubmit } = props;
   const [inputValues, setInputValues] = useState({
      mindspaceName: "",
      mindspaceDescription: "",
   });
   const [inputsValidiation, setInputsValidiation] = useState({
      mindspaceName: false,
   });

   const handleCreateMindspace = () => {
      onSubmit?.(inputValues.mindspaceName.trim());
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
               <DialogTitle>Create New Mindspace</DialogTitle>
               <DialogDescription>
                  Add a new mindspace to your workspace.
               </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-2">
               <MyTextInput
                  placeholder="Mindspace Name"
                  value={inputValues.mindspaceName}
                  onChange={(e) => handleInputChange("name", e.target.value)}
               />
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
                  onClick={handleCreateMindspace}
                  disabled={!inputsValidiation.mindspaceName}
               >
                  Create Mindspace
               </MyButton>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   );
}
