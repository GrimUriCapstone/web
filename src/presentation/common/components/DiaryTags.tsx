import { type Diary } from "@domain/models/diary";
import { Chip } from "@mui/material";
import { type ReactElement } from "react";
interface DiaryTagsProps {
  diary: Diary;
}
export const DiaryTags = ({ diary }: DiaryTagsProps): ReactElement => {
  return (
    <div>
      {diary?.tags.map((tag) => (
        <Chip label={tag.korTag} key={tag.korTag} />
      ))}
    </div>
  );
};
