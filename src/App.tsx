import { router } from "@router";
import { useFirebase } from "@utils/useFirebase";

import { useEffect, type ReactElement } from "react";
import { RouterProvider } from "react-router-dom";
export function App(): ReactElement {
  useFirebase();
  return <RouterProvider router={router} />;
}
