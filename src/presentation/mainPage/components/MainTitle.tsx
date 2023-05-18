import { css } from "@emotion/react";
import { Typography } from "@mui/material";
import { type ReactElement } from "react";

export function MainTitle(): ReactElement {
  return (
    <div
      css={css`
        align-self: flex-start;
        width: 100%;
        padding-top: 50px;
      `}
    >
      <Typography
        variant="h3"
        css={css`
          font-weight: 900;
        `}
      >
        그림우리
      </Typography>
    </div>
  );
}
