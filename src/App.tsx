import { router } from "@router";
import { useFirebase } from "@data/utils/useFirebase";

import { type ReactElement } from "react";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
export function App(): ReactElement {
  useFirebase();
  return (
    <QueryClientProvider client={new QueryClient()}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
