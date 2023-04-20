import { Backdrop, CircularProgress, css } from "@mui/material";
import { type ReactElement } from "react";

export function LoadingModal(): ReactElement {
  return (
    <Backdrop
      open={true}
      css={css`
        z-index: 999;
      `}
    >
      <CircularProgress />
    </Backdrop>
  );
}
