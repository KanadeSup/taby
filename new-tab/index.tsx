import { createRoot } from "react-dom/client";
import { routeTree } from "./routeTree.gen";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import "@assets/css/tailwind.css"

const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
   interface Register {
      router: typeof router;
   }
}

function init() {
   const rootContainer = document.querySelector("#__root");
   if (!rootContainer) throw new Error("Can't find Newtab root element");
   const root = createRoot(rootContainer);
   root.render(<RouterProvider router={router} />);
}

init();
