import { router } from "@router";
import { useFirebase } from "@data/utils/useFirebase";

import { type ReactElement } from "react";
import { RouterProvider } from "react-router-dom";
export function App(): ReactElement {
  useFirebase();
  return <RouterProvider router={router} />;
}
