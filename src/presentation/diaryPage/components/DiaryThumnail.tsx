import { DIARY_PAGE_PATH, HOME_PAGE_PATH } from "@domain/constants/paths";
import { type Diary } from "@domain/models/diary";
import { css } from "@emotion/react";
import { CircularProgress, Skeleton } from "@mui/material";
import { type ReactElement } from "react";
import { Link } from "react-router-dom";
import { Img } from "@presentation/common/atomics/Image";
import {
  centerStyle,
  hoverActiveStyle,
} from "@presentation/common/styles/commonStyles";
export interface DiaryThumnailProps {
  diary: Diary;
}
export function DiaryThumnail({ diary }: DiaryThumnailProps): ReactElement {
  // TODO : REPLACE

  return (
    <Link to={`${DIARY_PAGE_PATH}/${diary.diaryId}`} css={hoverActiveStyle}>
      <Img
        css={css`
          object-fit: contain;
          border-radius: 16px;
          width: 100%;
        `}
        src={diary.mainImageUrl.imageUrl}
      />
    </Link>
  );
}

export function DiaryThumnailsSkeleton(): ReactElement {
  return (
    <>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((_, index) => (
        <DiaryThumnailSkeleton key={index} />
      ))}
    </>
  );
}
export function DiaryThumnailSkeleton(): ReactElement {
  return (
    <Skeleton
      variant="rounded"
      css={css`
        aspect-ratio: 1;
        width: 100%;
        border-radius: 16px;
        max-width: 100%;
        ${centerStyle}
      `}
    >
      <CircularProgress
        css={css`
          visibility: visible !important;
        `}
      />
    </Skeleton>
  );
}
