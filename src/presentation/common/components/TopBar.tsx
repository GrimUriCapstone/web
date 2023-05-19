import { HOME_PAGE_PATH } from "@domain/constants/paths";
import { IconButton, Typography, css } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { type ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import {
  ToolBarPadding,
  contentPaddingXStyle,
  pageWidthStyle,
} from "@presentation/common/atomics/PageContent";
import { centerColStyle } from "../styles/commonStyles";

interface TopBarProps {
  title?: string;
  to?: string;
}

export function TopBar({
  title = "",
  to = HOME_PAGE_PATH,
}: TopBarProps): ReactElement {
  const navigate = useNavigate();
  return (
    <>
      <ToolBarPadding />
      <div
        css={css`
          ${pageWidthStyle};
          right: auto;
          position: fixed;
          top: 0px;
          z-index: 2;
          height: 56px;
          background-color: white;
          box-shadow: 0px 3px 6px -6px gray;
          ${centerColStyle};
        `}
      >
        <div
          css={css`
            position: absolute;
            left: 0px;
            ${contentPaddingXStyle}
          `}
        >
          <IconButton
            css={css``}
            onClick={() => {
              navigate(to);
            }}
          >
            <ArrowBackIcon />
          </IconButton>
        </div>

        <Typography variant="h6" component="div">
          {title}
        </Typography>
      </div>
    </>
  );
}

export function AbsoluteTobBar({
  title = "",
  to = HOME_PAGE_PATH,
}: TopBarProps): ReactElement {
  const navigate = useNavigate();
  return (
    <>
      <div
        css={css`
          ${pageWidthStyle};
          right: auto;
          z-index: 2;
          position: fixed;
          top: 0px;
          height: 56px;
          ${centerColStyle}
        `}
      >
        <div
          css={css`
            position: absolute;
            left: 0px;
            ${contentPaddingXStyle}
          `}
        >
          <IconButton
            css={css`
              background-color: #f0f8ff85;
            `}
            onClick={() => {
              navigate(to);
            }}
          >
            <ArrowBackIcon />
          </IconButton>
        </div>
      </div>
    </>
  );
}
