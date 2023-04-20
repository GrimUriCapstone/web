import { Alert, Snackbar, css } from "@mui/material";
import { notificationStore } from "@presentation/stores/notificationStore";

import { useState, type ReactElement } from "react";

export function SnackbarProvider(): ReactElement {
  const snackbarConf = notificationStore((state) => state.snackbarConf);
  if (snackbarConf == null) {
    return <></>;
  }
  return (
    <Snackbar
      open={true}
      autoHideDuration={6000}
      css={css`
        z-index: 100;
        bottom: 50px;
      `}
    >
      <Alert
        severity={snackbarConf.variant}
        css={css`
          width: 100%;
        `}
      >
        {snackbarConf.message}
      </Alert>
    </Snackbar>
  );
}
