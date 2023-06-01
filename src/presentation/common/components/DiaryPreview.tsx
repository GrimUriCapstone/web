import { type Diary } from "@domain/models/diary";
import { type ReactElement } from "react";
import { Img } from "../atomics/Image";
import { css } from "@emotion/react";
import { Typography } from "@mui/material";
import {
  diaryContentContainerStyles,
  diaryPreviewImageStyles,
  diaryPreviewUserInfoContainerStyles,
  diaryPreviewUserInfoImageStyles,
} from "./DiaryPreview.styles";
import { Link } from "react-router-dom";
import { DIARY_PAGE_PATH } from "@domain/constants/paths";

export const DiaryPreview = ({ diary }: { diary: Diary }): ReactElement => {
  const date = new Date(diary.modifiedAt);
  return (
    <Link
      to={`${DIARY_PAGE_PATH}/${diary.diaryId}`}
      css={css`
        text-decoration: none;
        appearance: none;
        color: black;
      `}
    >
      <Img
        src={diary.mainImageUrl.imageUrl}
        key={diary.diaryId}
        css={diaryPreviewImageStyles}
      />
      <div css={diaryContentContainerStyles}>
        <div
          css={css`
            display: flex;
            justify-content: space-between;
          `}
        >
          <div css={diaryPreviewUserInfoContainerStyles}>
            <img
              src={diary.profileImage}
              css={diaryPreviewUserInfoImageStyles}
            />
            <span> {diary.writerNickname}</span>
          </div>
          <span> {date.toLocaleDateString("ko-kr")}</span>
        </div>
        <Typography variant="h4">{diary.title}</Typography>
      </div>
    </Link>
  );
};
