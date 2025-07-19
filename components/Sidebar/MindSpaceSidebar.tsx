import { cn } from "@newtab/lib/utils";
import { Plus } from "lucide-react";

export type MindspaceSidebarProps = {
   rootClassName?: string;
};

export function MindspaceSidebar(props: MindspaceSidebarProps) {
   const { rootClassName } = props;
   return (
      <div className={cn("h-full max-w-64", rootClassName)}>
         <Header />
         <MindSpaceList />
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

function MindSpaceList() {
   return (
      <div className="py-2 px-1 space-y-1">
         {/* Header */}
         <div className="flex items-center justify-between">
            <h1 className="font-bold text-xs px-2 text-gray-300">MINDSPACES</h1>
            <Plus className="w-6 h-6 text-gray-300 cursor-pointer hover:bg-accent p-1 rounded-sm" />
         </div>
         {/* List item */}
         <div className="flex flex-col gap-1">
            <MindspaceItem title="Mindspace 1" />
            <MindspaceItem title="Mindspace 2" />
            <MindspaceItem title="Mindspace 3" />
         </div>
      </div>
   );
}

export type MindspaceItemProps = {
   title: string;
};

function MindspaceItem(props: MindspaceItemProps) {
   const { title } = props;
   return (
      <div className="flex items-center justify-between px-2 py-1 cursor-pointer hover:bg-accent rounded-sm transition-all">
         <div className="flex flex-col">
            <h1 className="font-bold text-gray-300 text-sm">{title}</h1>
         </div>
      </div>
   );
}
