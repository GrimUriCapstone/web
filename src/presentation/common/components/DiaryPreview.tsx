import { type Diary } from "@domain/models/diary";
import { type ReactElement } from "react";
import { Img } from "../atomics/Image";
import { css } from "@emotion/react";
import { Typography } from "@mui/material";

export const DiaryPreview = ({ diary }: { diary: Diary }): ReactElement => {
  const date = new Date(diary.modifiedAt);
  return (
    <div css={css``}>
      <Img
        src={diary.mainImageUrl.imageUrl}
        key={diary.diaryId}
        css={css`
          width: 100%;
          object-fit: fill;
          border-radius: 16px 16px 0px 0px;
        `}
      />
      <div
        css={css`
          border: 2px solid #11111155;
          border-top: 0px;
          padding: 16px;
          border-radius: 0px 0px 16px 16px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin: 0px;
        `}
      >
        <div
          css={css`
            display: flex;
            justify-content: space-between;
          `}
        >
          <span> {diary.writerNickname}</span>
          <span> {date.toLocaleDateString("ko-kr")}</span>
        </div>
        <Typography variant="h4">{diary.title}</Typography>
      </div>
    </div>
  );
};
