import { MindspaceSidebar } from "@components/Sidebar/MindSpaceSidebar";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/mindspaces/")({
   component: Index,
});

function Index() {
   return (
      <div className="h-screen">
         <MindspaceSidebar rootClassName="border-r border-gray-500" />
      </div>
   );
}
