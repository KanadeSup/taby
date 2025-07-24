import { cn } from "@/lib/shadnc-utils";
import { Loader2, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { MindspaceDialog } from "../Dialog/MindspaceDialog";
import { useState } from "react";
import {
   createMindspace,
   deleteMindspace,
   updateMindspace,
} from "@/api/mindspace";
import { useMindspaces } from "@/hooks/useMindspaces";
import { useNavigate } from "@tanstack/react-router";
import * as lucidIcon from "lucide-react";
import { MyTextInput } from "../Input/MyTextInput";
import { MyButton } from "../Button/MyButton";

export type MindspaceSidebarProps = {
   rootClassName?: string;
};

export function MindspaceSidebar(props: MindspaceSidebarProps) {
   const { rootClassName } = props;
   return (
      <div className={cn("h-full w-64 flex flex-col gap-4", rootClassName)}>
         <Header />
         <SearchSection />
         <MindSpaceList />
         <div className="mt-auto px-2">
            <MyButton variant="outline" className="w-full">
               <lucidIcon.LogIn className="w-4 h-4 text-gray-300" />
               Login
            </MyButton>
            <SettingsSection />
         </div>
      </div>
   );
}

function Header() {
   return (
      <div className="border-b border-gray-500">
         <h1 className="text-lg font-bold text-center p-2"> Tabby AI </h1>
      </div>
   );
}

function SearchSection() {
   const [search, setSearch] = useState("");
   return (
      <div className="flex items-center gap-2 px-2">
         <MyTextInput
            placeholder="Search for a mindspace"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
         />
      </div>
   );
}

function MindSpaceList() {
   const [isMindspaceDialogOpen, setIsMindspaceDialogOpen] = useState({
      open: false,
      type: "create" as "create" | "edit",
      mindspaceId: null as number | null,
   });
   const { mindspaces, isLoading, error, refetch } = useMindspaces();
   const navigate = useNavigate();
   const handleSubmitMindspaceDialog = (
      mindspaceName: string,
      mindspaceIcon: string,
      mindspaceId?: number
   ) => {
      if (mindspaceId) {
         updateMindspace(mindspaceId, mindspaceName, mindspaceIcon);
      } else {
         createMindspace(mindspaceName, mindspaceIcon);
      }
      refetch();
   };
   const handleOpenAddMindspaceDialog = () => {
      setIsMindspaceDialogOpen({
         open: true,
         type: "create",
         mindspaceId: null,
      });
   };
   const handleCloseAddMindspaceDialog = () => {
      setIsMindspaceDialogOpen({
         open: false,
         type: "create",
         mindspaceId: null,
      });
   };
   const handleDeleteMindspace = (mindspaceId: number) => {
      deleteMindspace(mindspaceId);
      refetch();
   };
   const handleEditMindspace = (mindspaceId: number) => {
      setIsMindspaceDialogOpen({
         open: true,
         type: "edit",
         mindspaceId,
      });
   };
   const handleSelectMindspace = (mindspaceId: number) => {
      navigate({
         to: "/mindspaces/$id",
         params: {
            id: mindspaceId.toString(),
         },
      });
   };
   return (
      <div className="px-1 space-y-1">
         {/* Header */}
         <div className="flex items-center justify-between">
            <h1 className="font-bold text-xs px-2 text-gray-300">MINDSPACES</h1>
            <Plus
               className="w-6 h-6 text-gray-300 cursor-pointer hover:bg-accent p-1 rounded-sm"
               onClick={handleOpenAddMindspaceDialog}
            />
         </div>
         {/* List item */}
         <div className="flex flex-col gap-1">
            {mindspaces.length === 0 && isLoading && (
               <div className="flex items-center justify-center">
                  <Loader2 className="w-4 h-4 animate-spin" />
               </div>
            )}
            {error && (
               <div className="flex items-center justify-center">
                  <p className="text-red-500">{error}</p>
               </div>
            )}
            {mindspaces.map((mindspace) => (
               <MindspaceItem
                  key={mindspace.id}
                  title={mindspace.name}
                  icon={mindspace.icon}
                  onDelete={() => handleDeleteMindspace(mindspace.id)}
                  onEdit={() => handleEditMindspace(mindspace.id)}
                  onSelect={() => handleSelectMindspace(mindspace.id)}
               />
            ))}
         </div>
         {/* Dialog */}
         <MindspaceDialog
            open={isMindspaceDialogOpen.open}
            type={isMindspaceDialogOpen.type}
            mindspaceId={isMindspaceDialogOpen.mindspaceId ?? undefined}
            onClose={handleCloseAddMindspaceDialog}
            onSubmit={handleSubmitMindspaceDialog}
         />
      </div>
   );
}

export type MindspaceItemProps = {
   title: string;
   icon: string;
   onDelete?: () => void;
   onEdit?: () => void;
   onSelect?: () => void;
};

function MindspaceItem(props: MindspaceItemProps) {
   const { title, icon, onDelete, onEdit, onSelect } = props;
   const IconComponent = lucidIcon[
      (icon as keyof typeof lucidIcon) || "UserRound"
   ] as React.ElementType;
   return (
      <div
         className="flex items-center justify-between px-2 py-2 cursor-pointer hover:bg-accent rounded-sm transition-all group"
         onClick={onSelect}
      >
         <div className="flex items-center gap-2">
            <IconComponent className="w-4 h-4 text-gray-300" />
            <h1 className="text-gray-300 text-sm">{title}</h1>
         </div>
         <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
            <Pencil
               className="w-4 h-4 text-gray-300 cursor-pointer hover:text-blue-500"
               onClick={onEdit}
            />
            <Trash2
               className="w-4 h-4 text-gray-300 cursor-pointer hover:text-red-500"
               onClick={onDelete}
            />
         </div>
      </div>
   );
}

function SettingsSection() {
   return (
      <div className="flex flex-col py-2">
         <div className="flex items-center gap-2 cursor-pointer hover:bg-accent rounded-sm transition-all p-2 w-full">
            <lucidIcon.Settings className="w-4 h-4 text-gray-300" />
            <h1 className="text-gray-300 text-sm">Profile Settings</h1>
         </div>
         <div className="flex items-center gap-2 cursor-pointer hover:bg-accent rounded-sm transition-all p-2 w-full">
            <lucidIcon.Settings className="w-4 h-4 text-gray-300" />
            <h1 className="text-gray-300 text-sm">Mindspace Settings</h1>
         </div>
      </div>
   );
}
