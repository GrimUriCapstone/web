import { type Photo } from "@domain/models/diary";
import { css } from "@emotion/react";
import { type ReactElement, useState, useEffect } from "react";

interface FadeImagesProps {
  candidateImageUrls: Photo[];
}
export function FadeImages({
  candidateImageUrls,
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
    return <div></div>;
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
