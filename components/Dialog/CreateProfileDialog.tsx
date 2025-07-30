import {
   Dialog,
   DialogContent,
   DialogTitle,
   DialogHeader,
   DialogTrigger,
   DialogDescription,
} from "../shadcn/dialog";
import { MyTextInput } from "../Input/MyTextInput";
import { MyButton } from "../Button/MyButton";
import { useEffect, useState } from "react";

export type CreateProfileDialogProps = {
   open: boolean;
   children?: React.ReactNode;
   onClose: () => void;
   onSubmit: (profileName: string) => void;
};

export function CreateProfileDialog(props: CreateProfileDialogProps) {
   const { open, children, onClose, onSubmit } = props;
   const [profileName, setProfileName] = useState("");

   // Reset All states when dialog is opened
   useEffect(() => {
      if (open) {
         setProfileName("");
      }
   }, [open]);

   return (
      <Dialog open={open} onOpenChange={onClose}>
         {children && <DialogTrigger>{children}</DialogTrigger>}
         <DialogContent>
            <DialogHeader>
               <DialogTitle>Create Profile</DialogTitle>
            </DialogHeader>
            <DialogDescription>
               Create a new profile to use in your mindspace.
            </DialogDescription>
            <MyTextInput
               value={profileName}
               placeholder="Profile Name"
               autoFocus={true}
               onChange={(e) => setProfileName(e.target.value)}
            />
            <div className="flex gap-2 justify-end">
               <MyButton variant="outline" onClick={onClose}>
                  Cancel
               </MyButton>
               <MyButton onClick={() => onSubmit(profileName)}>
                  Create Profile
               </MyButton>
            </div>
         </DialogContent>
      </Dialog>
   );
}
