import { HOME_PAGE_PATH } from "@domain/constants/paths";
import { IconButton, Typography, css } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
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
            css={css``}
            onClick={() => {
              navigate(to);
            }}
          >
            <ArrowBackIosIcon />
          </IconButton>
        </div>

        <Typography variant="h6" component="div">
          {title}
        </Typography>
      </div>
    </>
  );
}
