import { SETTINGS_PAGE_PATH } from "@domain/constants/paths";
import { css } from "@emotion/react";
import { IconButton, useTheme } from "@mui/material";
import { type ReactElement } from "react";
import { Link } from "react-router-dom";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import SettingsIcon from "@mui/icons-material/Settings";
export function MainActionBar(): ReactElement {
  const theme = useTheme();
  return (
    <div
      css={css`
        display: flex;
        justify-content: space-between;
        width: 100%;
        align-items: center;
      `}
    >
      <LocalLibraryIcon
        css={css`
          font-size: 45px;
          fill: ${theme.palette.primary.main};
        `}
      />
      <Link to={SETTINGS_PAGE_PATH}>
        <IconButton>
          <SettingsIcon fontSize="large" />
        </IconButton>
      </Link>
    </div>
  );
}
