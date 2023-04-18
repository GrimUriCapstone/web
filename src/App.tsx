import { router } from "@router";

import { type ReactElement } from "react";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Global, css } from "@emotion/react";
import reset from "emotion-reset";
export function App(): ReactElement {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <Global
        styles={css`
          ${reset}
          *, *::before, *::after {
            box-sizing: border-box;
          }
        `}
      />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
