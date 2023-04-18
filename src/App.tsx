import { router } from "@router";

import { type ReactElement } from "react";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Global, css } from "@emotion/react";
import reset from "emotion-reset";
import { green } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";
export function App(): ReactElement {
  const theme = createTheme({
    palette: {
      primary: {
        main: green[300],
      },
    },
  });
  return (
    <QueryClientProvider client={new QueryClient()}>
      <ThemeProvider theme={theme}>
        <Global
          styles={css`
            ${reset}
            *, *::before, *::after {
              box-sizing: border-box;
            }
            html,
            body,
            #root {
              width: 100%;
              height: 100%;
              overflow: hidden;
            }
          `}
        />
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
