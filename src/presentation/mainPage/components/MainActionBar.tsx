import { NOTI_PAGE_PATH, SETTINGS_PAGE_PATH } from "@domain/constants/paths";
import { css } from "@emotion/react";
import { IconButton, useTheme } from "@mui/material";
import { type ReactElement } from "react";
import { Link } from "react-router-dom";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { centerStyle } from "@presentation/common/styles/commonStyles";
import { mq } from "@presentation/common/theme/mediaQuery";
import { useDirayRepository } from "@data/repository/diaryRepository";
import { useQuery } from "@tanstack/react-query";

function NotificationIconWithIndicator(): ReactElement {
  const theme = useTheme();

  const { getUnselectedCount } = useDirayRepository();

  const { data, isLoading } = useQuery({
    queryKey: ["diary", "getUnselectedCount"],
    queryFn: getUnselectedCount,
  });
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
        {isLoading || data == null ? "" : data}
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
        position: fixed;
        display: flex;
        justify-content: space-between;
        width: 100%;
        align-items: center;
        background-color: white;
        padding: 10px;
        box-shadow: 0px 2px 1px #0000004f;
        ${mq.sm} {
          width: 480px;
        }
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
