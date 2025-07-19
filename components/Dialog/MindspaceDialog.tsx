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

export type MindspaceDialogProps = {
   open: boolean;
   onClose: () => void;
};

export function MindspaceDialog(props: MindspaceDialogProps) {
   const { open, onClose } = props;
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
               <MyTextInput placeholder="Mindspace Name" />
            </div>
            <DialogFooter>
               <MyButton variant="outline" className="text-sm" onClick={onClose}>
                  Cancel
               </MyButton>
               <MyButton className="text-sm">
                  Create Mindspace
               </MyButton>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   );
}
