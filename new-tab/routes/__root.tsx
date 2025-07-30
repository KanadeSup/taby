import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { CurrentProfileProvider } from "@/components/Provider/CurrentProfileProvider";

export const Route = createRootRoute({
   component: () => (
      <CurrentProfileProvider>
         <Outlet />
         <TanStackRouterDevtools />
      </CurrentProfileProvider>
   ),
});
