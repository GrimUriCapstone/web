import { HOME_PAGE_PATH } from "@domain/constants/paths";
import { IconButton, Typography, css } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { cloneElement, type ReactElement } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ToolBarPadding,
  contentPaddingXStyle,
  pageWidthStyle,
} from "@presentation/common/atomics/PageContent";
import { centerColStyle } from "../styles/commonStyles";

interface TopBarProps {
  title?: string;
  to?: string;
  actions?: ReactElement[];
}

export function TopBar({
  title = "",
  to = HOME_PAGE_PATH,
}: TopBarProps): ReactElement {
  return (
    <>
      <ToolBarPadding />
      <div
        css={css`
          ${pageWidthStyle};
          right: auto;
          position: fixed;
          top: 0px;
          z-index: 5;
          height: 56px;
          background-color: white;
          box-shadow: 0px 3px 6px -6px gray;
          -webkit-transform: translate3d(0, 0, 1px);
          transform: translate3d(0, 0, 1px);
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
          <Link to={to}>
            <IconButton>
              <ArrowBackIcon />
            </IconButton>
          </Link>
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
  actions = [],
}: TopBarProps): ReactElement {
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
          -webkit-transform: translate3d(0,0,1px);
          transform: translate3d(0, 0, 1px);
        `}
      >
        <div
          css={css`
            position: absolute;
            left: 0px;
            ${contentPaddingXStyle}
          `}
        >
          <Link to={to}>
            <IconButton
              css={css`
                background-color: #f0f8ff85;
              `}
            >
              <ArrowBackIcon />
            </IconButton>
          </Link>
        </div>
        <div
          css={css`
            position: absolute;
            right: 0px;
            display: flex;
            align-items: center;
            gap: 4px;
            ${contentPaddingXStyle}
          `}
        >
          {actions.map((action, idx) => cloneElement(action, { key: idx }))}
        </div>
      </div>
    </>
  );
}
