import { css } from "@emotion/react";

export const diaryPreviewImageStyles = css`
  width: 100%;
  object-fit: fill;
  height: 100%;
  aspect-ratio: 1;
  border-radius: 16px 16px 0px 0px;
`;
export const diaryContentContainerStyles = css`
  border: 2px solid #11111155;
  border-top: 0px;
  padding: 16px;
  border-radius: 0px 0px 16px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 0px;
`;
export const diaryPreviewUserInfoContainerStyles = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;

export const diaryPreviewUserInfoTextStyles = css``;

export const diaryPreviewUserInfoImageStyles = css`
  border-radius: 50%;
  width: 16px;
  height: 16px;
`;
