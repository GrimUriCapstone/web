import {
  DIARY_PAGE_PATH,
  HOME_PAGE_PATH,
  WRITE_PAGE_PATH,
} from "@domain/constants/paths";
import {
  BottomNavigation,
  BottomNavigationAction,
  Fab,
  css,
} from "@mui/material";
import { type ReactElement } from "react";
import HomeIcon from "@mui/icons-material/Home";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CreateIcon from "@mui/icons-material/Create";
import { Link, useNavigate } from "react-router-dom";
import { linkStyle } from "@presentation/common/styles/commonStyles";
import { mq } from "../theme/mediaQuery";
interface BottonNavigationBarProps {
  activeIdx: number;
}

const WriteButton = ({ showLabel }: { showLabel?: boolean }): ReactElement => {
  return (
    <Link to={WRITE_PAGE_PATH} css={linkStyle}>
      <Fab
        color="primary"
        aria-label="add"
        css={css`
          border-radius: 100%;
          height: 64px;
          width: 64px;
        `}
      >
        <CreateIcon />
      </Fab>
    </Link>
  );
};

export function BottonNavigationBar({
  activeIdx,
}: BottonNavigationBarProps): ReactElement {
  const navigate = useNavigate();
  return (
    <>
      <BottomNavigation
        css={css`
          width: calc(100% - 20px);
          ${mq.sm} {
            width: calc(480px - 30px);
            margin: 0px 15px;
          }
          position: fixed;
          bottom: 10px;
          z-index: 20;
          background-color: white;
          border-radius: 20px;
          box-shadow: 0px 0px 20px 10px #80808021;
          margin: 0px 10px;
          height: 70px;
        `}
        value={activeIdx}
        showLabels={false}
      >
        <BottomNavigationAction
          label="Home"
          icon={<HomeIcon />}
          value={0}
          css={bottomActionStyle}
          onClick={() => {
            navigate(HOME_PAGE_PATH);
          }}
        />
        <WriteButton />
        <BottomNavigationAction
          value={1}
          label="Diary"
          icon={<MenuBookIcon />}
          css={bottomActionStyle}
          onClick={() => {
            navigate(DIARY_PAGE_PATH);
          }}
        />
      </BottomNavigation>
    </>
  );
}

const bottomActionStyle = css`
  flex: 1;
  width: 100%;
  max-width: 100%;
`;
