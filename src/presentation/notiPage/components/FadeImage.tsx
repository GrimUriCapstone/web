import { type Photo } from "@domain/models/diary";
import { css } from "@emotion/react";
import { CircularProgress, Skeleton } from "@mui/material";
import { centerStyle } from "@presentation/common/styles/commonStyles";
import { type ReactElement, useState, useEffect } from "react";

interface FadeImagesProps {
  images: Photo[];
}
export function FadeImages({
  images: candidateImageUrls,
}: FadeImagesProps): ReactElement {
  const [currentIdx, setCurrentIdx] = useState(0);
  useEffect(() => {
    if (candidateImageUrls.length === 0) {
      return;
    }
    const unusb = setInterval(() => {
      setCurrentIdx(
        (currentIdx) => (currentIdx + 1) % candidateImageUrls.length
      );
    }, 3000);
    return () => {
      clearInterval(unusb);
    };
  }, []);
  if (candidateImageUrls.length === 0) {
    return (
      <Skeleton
        css={css`
          aspect-ratio: 1;
          border-radius: 10px;
          width: 100%;
          max-width: 100px;
          ${centerStyle}
        `}
        variant="rounded"
      >
        <CircularProgress
          css={css`
            visibility: visible;
          `}
        />
      </Skeleton>
    );
  }
  return (
    <img
      key={candidateImageUrls[currentIdx].imageId}
      src={candidateImageUrls[currentIdx].imageUrl}
      css={css`
        aspect-ratio: 1;
        border-radius: 10px;
        width: 100%;
        max-width: 100px;
      `}
    />
  );
}
