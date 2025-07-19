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
      <div>
         <div className="flex items-center justify-between p-2">
            <h1 className="font-bold text-gray-300">Mindspaces</h1>
            <Plus className="w-7 h-7 text-gray-300 cursor-pointer hover:bg-accent p-1 rounded-sm" />
         </div>
      </div>
   );
}
