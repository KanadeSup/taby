import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
   loader: async ({ location }) => {
      if (location.pathname === "/") {
         return redirect({ to: "/mindspaces" });
      }
   },
   component: Index,
});

function Index() {
   return (
      <div className="p-2">
         <h3>Welcome Home!</h3>
      </div>
   );
}
