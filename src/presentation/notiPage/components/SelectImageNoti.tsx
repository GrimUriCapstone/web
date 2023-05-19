import { type Diary } from "@domain/models/diary";
import { css } from "@emotion/react";
import { mq } from "@presentation/common/theme/mediaQuery";
import { type ReactElement } from "react";
import { FadeImages, FadeImagesSkeleton } from "./FadeImage";
import { ListItemButton, Skeleton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { SELECT_PAGE_PATH } from "@domain/constants/paths";

interface SelectImageNotiProps {
  diary: Diary;
}
export function SelectImageNoti({ diary }: SelectImageNotiProps): ReactElement {
  const navigate = useNavigate();
  const isGenerated = diary.candidateImageUrls.length > 0;
  return (
    <ListItemButton
      onClick={
        isGenerated
          ? () => {
              navigate(`${SELECT_PAGE_PATH}/${diary.diaryId}`);
            }
          : undefined
      }
      css={selectImageNotiContainerStyles}
    >
      {isGenerated ? (
        <FadeImages images={diary.candidateImageUrls} />
      ) : (
        <FadeImagesSkeleton />
      )}

      <div css={selectImageNotiDetailStyles}>
        <p
          css={css`
            color: gray;
          `}
        >
          그림 생성 {isGenerated ? "완료" : "중"}
        </p>
        <p
          css={css`
            font-weight: 700;
          `}
        >
          사진을 골라주세요:
        </p>
        <p
          css={css`
            width: 100%;
            font-size: 20px;
            text-overflow: ellipsis;
          `}
        >
          {diary.title}
        </p>
      </div>
    </ListItemButton>
  );
}

export function SelectImageNotiSkelton(): ReactElement {
  return (
    <div css={selectImageNotiContainerStyles}>
      <Skeleton
        variant="rounded"
        css={css`
          height: 100%;
          aspect-ratio: 1;
        `}
      />
      <div css={selectImageNotiDetailStyles}>
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </div>
    </div>
  );
}

const selectImageNotiContainerStyles = css`
  width: 100%;
  position: relative;
  display: grid;
  text-decoration: none;
  color: black;
  grid-template-columns: 2fr 8fr;
  gap: 10px;
  padding: 10px 20px;
  align-items: center;
  ${mq.sm} {
    padding: 15px 20px;
  }
  border-bottom: solid 1px lightgray;
`;
const selectImageNotiDetailStyles = css`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  gap: 8px;
`;
