import { DIARY_PAGE_PATH, HOME_PAGE_PATH } from "@domain/constants/paths";
import { type Diary } from "@domain/models/diary";
import { css } from "@emotion/react";
import { Skeleton } from "@mui/material";
import { type ReactElement } from "react";
import { Link } from "react-router-dom";
import { Img } from "@presentation/common/atomics/Image";
export interface DiaryThumnailProps {
  diary: Diary;
}
export function DiaryThumnail({ diary }: DiaryThumnailProps): ReactElement {
  // TODO : REPLACE

  return (
    <Link to={`${DIARY_PAGE_PATH}/${diary.diaryId}`} css={css``}>
      <Img
        css={css`
          object-fit: contain;
          border-radius: 16px;
        `}
        src={""}
      />
    </Link>
  );
}

export function DiaryThumnailsSkeleton(): ReactElement {
  return (
    <>
      {[1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
        <Skeleton
          variant="rounded"
          css={css`
            aspect-ratio: 1;
            width: 100%;
            height: 100%;
          `}
          key={index}
        />
      ))}
    </>
  );
}
