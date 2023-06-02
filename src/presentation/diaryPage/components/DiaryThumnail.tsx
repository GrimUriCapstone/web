import { DIARY_PAGE_PATH, HOME_PAGE_PATH } from "@domain/constants/paths";
import { type Diary } from "@domain/models/diary";
import { css } from "@emotion/react";
import { CircularProgress, IconButton, Skeleton } from "@mui/material";
import { useState, type ReactElement } from "react";
import { Link } from "react-router-dom";
import { Img } from "@presentation/common/atomics/Image";
import {
  centerStyle,
  hoverActiveStyle,
} from "@presentation/common/styles/commonStyles";
import { useLongPress } from "use-long-press";
import OutsideClickHandler from "react-outside-click-handler";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { useDirayRepository } from "@data/repository/diaryRepository";
export interface DiaryThumnailProps {
  diary: Diary;
  refetch?: () => void;
}
export function DiaryThumnail({
  diary,
  refetch,
}: DiaryThumnailProps): ReactElement {
  // TODO : REPLACE
  const [removeMode, setRemoveMode] = useState(false);
  const { removeDiary } = useDirayRepository();
  const bind = useLongPress(() => {
    setRemoveMode(true);
  });

  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        setRemoveMode(false);
      }}
    >
      {removeMode ? (
        <div
          css={css`
            position: relative;
          `}
        >
          <IconButton
            css={css`
              position: absolute;
              right: 0px;
              top: 0px;
              background-color: #000000e0;
            `}
            onClick={() => {
              removeDiary(diary.diaryId);
              refetch?.();
            }}
          >
            <RemoveCircleIcon
              css={css`
                color: white;
              `}
            />
          </IconButton>
          <Img
            css={css`
              object-fit: contain;
              border-radius: 16px;
              width: 100%;
            `}
            draggable={false}
            src={diary.mainImageUrl.imageUrl}
          />
        </div>
      ) : (
        <Link
          to={`${DIARY_PAGE_PATH}/${diary.diaryId}`}
          css={hoverActiveStyle}
          {...bind()}
        >
          <Img
            css={css`
              object-fit: contain;
              border-radius: 16px;
              width: 100%;
            `}
            src={diary.mainImageUrl.imageUrl}
            draggable={false}
          />
        </Link>
      )}
    </OutsideClickHandler>
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
