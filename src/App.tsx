import { router } from "@router";
import { type ReactElement } from "react";
import { RouterProvider } from "react-router-dom";
export function App(): ReactElement {
  return <RouterProvider router={router} />;
}
