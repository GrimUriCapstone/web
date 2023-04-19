import { useUserStore } from "@data/utils/useUser";
import { type User } from "@domain/models/user";
import { css } from "@emotion/react";
import { Avatar, Typography } from "@mui/material";
import { Img } from "@presentation/common/atomics/Image";
import { type ReactElement } from "react";

export function DiaryUserInfo(): ReactElement {
  const { user } = useUserStore();
  const nickname = user == null ? "bluejoy" : user.nickname;
  return (
    <div
      css={css`
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
      `}
    >
      <Avatar
        css={css`
          width: 50px;
          height: 50px;
          box-shadow: 0px 1px 1px 0px gray;
        `}
      >
        <Img src="" />
      </Avatar>
      <Typography
        variant="h5"
        css={css`
          font-weight: 700;
        `}
      >
        {nickname}의 일기
      </Typography>
    </div>
  );
}
