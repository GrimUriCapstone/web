import { type ReactElement } from "react";
import { css } from "@emotion/react";
import { Skeleton } from "@mui/material";
import {
  diaryContentContainerStyles,
  diaryPreviewImageStyles,
  diaryPreviewUserInfoContainerStyles,
  diaryPreviewUserInfoImageStyles,
} from "./DiaryPreview.styles";

export const DiaryPreviewSkeleton = (): ReactElement => {
  return (
    <div
      css={css`
        width: 100%;
      `}
    >
      <Skeleton variant="rectangular" css={diaryPreviewImageStyles} />
      <div css={diaryContentContainerStyles}>
        <div
          css={css`
            display: flex;
            justify-content: space-between;
          `}
        >
          <div css={diaryPreviewUserInfoContainerStyles}>
            <Skeleton
              variant="circular"
              css={diaryPreviewUserInfoImageStyles}
            />
            <Skeleton
              css={css`
                width: 100px;
                height: 24px;
              `}
            />
          </div>
          <Skeleton
            css={css`
              width: 100px;
              height: 24px;
            `}
          />
        </div>
        <Skeleton
          css={css`
            height: 64px;
          `}
        />
      </div>
    </div>
  );
};
