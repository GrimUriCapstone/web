import { HOME_PAGE_PATH } from "@domain/constants/paths";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { type ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import { ToolBarPadding } from "@presentation/common/atomics/PageContent";

interface TopBarProps {
  title: string;
  to?: string;
}

export function TopBar({
  title,
  to = HOME_PAGE_PATH,
}: TopBarProps): ReactElement {
  const navigate = useNavigate();
  return (
    <>
      <ToolBarPadding />
      <AppBar>
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
