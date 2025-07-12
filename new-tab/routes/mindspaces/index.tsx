import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/mindspaces/")({
   loader: async ({ location }) => {
      const id = "123";
      const path = window.location.hash;
      console.log(path);
      if (path === "#/mindspaces") {
         return redirect({ to: "/mindspaces/$id", params: { id: id } });
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
