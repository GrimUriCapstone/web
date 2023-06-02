import { useUserStore } from "@data/stores/userStore";
import { css } from "@emotion/react";
import { Avatar, IconButton, Skeleton, Typography } from "@mui/material";
import { Img } from "@presentation/common/atomics/Image";
import { type ReactElement } from "react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Link } from "react-router-dom";
import {
  DIARY_PAGE_PATH,
  DIARY_STATISTICS_PAGE_PATH,
} from "@domain/constants/paths";
export function DiaryUserInfo(): ReactElement {
  const { user } = useUserStore();
  if (user === null) return <DiaryUserInfoSkeleton />;
  return (
    <div css={diaryUserInfoContainerStyles}>
      <Avatar
        css={css`
          width: 50px;
          height: 50px;
          box-shadow: 0px 1px 1px 0px gray;
        `}
      >
        <Img
          src={user.profileImage}
          css={css`
            width: 50px;
            height: 50px;
          `}
        />
      </Avatar>
      <Typography
        variant="h5"
        css={css`
          font-weight: 700;
        `}
      >
        {user.nickname}의 일기
      </Typography>
      <div
        css={css`
          flex: 1;
        `}
      />
      <Link to={`${DIARY_PAGE_PATH}${DIARY_STATISTICS_PAGE_PATH}`}>
        <IconButton>
          <CalendarMonthIcon />
        </IconButton>
      </Link>
    </div>
  );
}

function DiaryUserInfoSkeleton(): ReactElement {
  return (
    <div css={diaryUserInfoContainerStyles}>
      <Skeleton
        variant="circular"
        css={css`
          width: 50px;
          height: 50px;
        `}
      />
      <Skeleton
        css={css`
          width: 200px;
          height: 30px;
        `}
      />
    </div>
  );
}

const diaryUserInfoContainerStyles = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
  justify-content: start;
  gap: 10px;
  padding-top: 20px;
  padding-bottom: 20px;
`;
