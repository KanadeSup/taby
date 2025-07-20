import { MindspaceSidebar } from "@components/Sidebar/MindSpaceSidebar";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/mindspaces")({
   component: Index,
});

function Index() {
   return (
      <div className="h-screen flex">
         <MindspaceSidebar rootClassName="border-r border-gray-500 shrink-0" />
         <Outlet />
      </div>
   );
}
