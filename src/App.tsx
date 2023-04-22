import { router } from "@router";

import { useEffect, type ReactElement } from "react";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CacheProvider, Global, css } from "@emotion/react";
import reset from "emotion-reset";
import { teal } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Page } from "@presentation/common/atomics/PageContent";
import createCache from "@emotion/cache";
import { getMessaging, onMessage } from "firebase/messaging";

const cache = createCache({
  key: "css",
  prepend: true,
});
export function App(): ReactElement {
  const theme = createTheme({
    palette: {
      primary: {
        main: teal[500],
      },
    },
  });
  const requestPermission = (): void => {
    console.log("Requesting permission...");
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        console.log("Notification permission granted.");
      }
    });
  };
  const messaging = getMessaging();
  onMessage(messaging, (payload) => {
    console.log("Message received. ", payload);
    // ...
  });
  useEffect(() => {
    requestPermission();
  }, []);
  return (
    <QueryClientProvider client={new QueryClient()}>
      <CacheProvider value={cache}>
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
                min-height: 100vh;
                overflow-x: hidden;
                background-color: #eeeeee;
              }
            `}
          />

          <Page>
            <RouterProvider router={router} />
          </Page>
        </ThemeProvider>
      </CacheProvider>
    </QueryClientProvider>
  );
}
