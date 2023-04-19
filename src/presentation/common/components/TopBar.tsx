import { HOME_PAGE_PATH, SETTINGS_PAGE_PATH } from "@domain/constants/paths";
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  css,
  useTheme,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import SettingsIcon from "@mui/icons-material/Settings";
import { type ReactElement } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ToolBarPadding,
  pageWidthStyle,
} from "@presentation/common/atomics/PageContent";

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
      <AppBar
        css={css`
          ${pageWidthStyle};
          right: auto;
        `}
      >
        <Toolbar variant="dense">
          <IconButton
            onClick={() => {
              navigate(to);
            }}
          >
            <ArrowBackIosIcon />
          </IconButton>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
}

export function MainTopBar(): ReactElement {
  return (
    <>
      <ToolBarPadding />
      <AppBar
        css={css`
          ${pageWidthStyle};
          right: auto;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 56px;
        `}
      >
        <Typography variant="h6" component="div">
          그림우리
        </Typography>
        <Toolbar
          variant="dense"
          css={css`
            position: absolute;
            right: 0px;
          `}
        >
          <Link to={SETTINGS_PAGE_PATH}>
            <IconButton>
              <SettingsIcon />
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
    </>
  );
}
