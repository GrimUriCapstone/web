import { NOTI_PAGE_PATH, SETTINGS_PAGE_PATH } from "@domain/constants/paths";
import { css } from "@emotion/react";
import { IconButton, useTheme } from "@mui/material";
import { type ReactElement } from "react";
import { Link } from "react-router-dom";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { centerStyle } from "@presentation/common/styles/commonStyles";

function NotificationIconWithIndicator(): ReactElement {
  const theme = useTheme();
  return (
    <Link
      to={NOTI_PAGE_PATH}
      css={css`
        position: relative;
      `}
    >
      <div
        css={css`
          position: absolute;
          right: 10px;
          top: -7px;
          border-radius: 100%;
          width: 15px;
          height: 15px;
          background-color: ${theme.palette.primary.main};
          font-size: 10px;
          font-weight: 900;
          color: white;
          z-index: 1;
          ${centerStyle}
        `}
      >
        99
      </div>
      <IconButton>
        <NotificationsIcon fontSize="large" />
      </IconButton>
    </Link>
  );
}
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
      <div>
        <NotificationIconWithIndicator />
        <Link to={SETTINGS_PAGE_PATH}>
          <IconButton>
            <SettingsIcon fontSize="large" />
          </IconButton>
        </Link>
      </div>
    </div>
  );
}
