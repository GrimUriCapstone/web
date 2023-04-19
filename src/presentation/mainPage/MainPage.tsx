import { ContentPadding } from "@presentation/common/atomics/PageContent";
import { BottonNavigationBar } from "@presentation/common/components/BottomNavigationBar";
import { MainTopBar } from "@presentation/common/components/TopBar";
import { type ReactElement } from "react";
import { Link } from "react-router-dom";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import { IconButton, Typography, css, useTheme } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { SETTINGS_PAGE_PATH } from "@domain/constants/paths";
export function MainPage(): ReactElement {
  const theme = useTheme();
  return (
    <>
      <ContentPadding>
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
        <div
          css={css`
            align-self: flex-start;
            width: 100%;
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
      </ContentPadding>
      <BottonNavigationBar activeIdx={0} />
    </>
  );
}
