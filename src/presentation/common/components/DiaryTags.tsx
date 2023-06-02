import { type Diary } from "@domain/models/diary";
import { Chip, css } from "@mui/material";
import { type ReactElement } from "react";
interface DiaryTagsProps {
  diary: Diary;
}
export const DiaryTags = ({ diary }: DiaryTagsProps): ReactElement => {
  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        gap: 4px;
      `}
    >
      {diary?.tags.map((tag) => (
        <Chip label={tag.korTag} key={tag.korTag} />
      ))}
    </div>
  );
};
