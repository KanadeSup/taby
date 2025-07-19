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

export type MindspaceDialogProps = {
   open: boolean;
   onClose?: () => void;
   onSubmit?: (mindspaceName: string) => void;
};

export function MindspaceDialog(props: MindspaceDialogProps) {
   const { open, onClose, onSubmit } = props;
   const [mindspaceName, setMindspaceName] = useState("");
   const handleCreateMindspace = () => {
      onSubmit?.(mindspaceName);
      onClose?.();
   };
   return (
      <Dialog open={open} onOpenChange={onClose}>
         <DialogContent>
            <DialogHeader>
               <DialogTitle>Add Mindspace</DialogTitle>
               <DialogDescription>
                  Add a new mindspace to your workspace.
               </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-2">
               <MyTextInput
                  placeholder="Mindspace Name"
                  value={mindspaceName}
                  onChange={(e) => setMindspaceName(e.target.value)}
               />
            </div>
            <DialogFooter>
               <MyButton variant="outline" className="text-sm" onClick={onClose}>
                  Cancel
               </MyButton>
               <MyButton className="text-sm" onClick={handleCreateMindspace}>
                  Create Mindspace
               </MyButton>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   );
}
