import { router } from "@router";

import { type ReactElement } from "react";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Global, css } from "@emotion/react";
import reset from "emotion-reset";
import { teal } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Page, pageStyle } from "@presentation/common/atomics/PageContent";
export function App(): ReactElement {
  const theme = createTheme({
    palette: {
      primary: {
        main: teal[500],
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
              background-color: gray;
            }
          `}
        />

        <Page>
          <RouterProvider router={router} />
        </Page>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
