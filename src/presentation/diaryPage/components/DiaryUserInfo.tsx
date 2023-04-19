import { useUserStore } from "@data/utils/useUser";
import { type User } from "@domain/models/user";
import { css } from "@emotion/react";
import { Avatar, Typography } from "@mui/material";
import { Img } from "@presentation/common/atomics/Image";
import { contentPaddingXStyle } from "@presentation/common/atomics/PageContent";
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
        ${contentPaddingXStyle}
        padding-top: 10px;
        padding-bottom: 10px;
        justify-content: center;
        gap: 10px;
      `}
    >
      <Avatar
        css={css`
          box-shadow: 0px 1px 1px 0px gray;
        `}
      >
        <Img src="" />
      </Avatar>
      <Typography
        variant="h6"
        css={css`
          font-weight: 700;
        `}
      >
        {nickname}
      </Typography>
    </div>
  );
}
