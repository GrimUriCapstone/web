import { css } from "@emotion/react";
import { TextField } from "@mui/material";
import { centerStyle } from "@presentation/common/styles/commonStyles";
import { type ReactElement } from "react";

interface PaperTextAreaProps {
  content: string;
  setContent: (value: string) => void;
  title: string;
  setTitle: (value: string) => void;
}
export function PaperTextArea({
  content,
  setContent,
  title,
  setTitle,
}: PaperTextAreaProps): ReactElement {
  return (
    <div css={paperStyles}>
      <div
        css={css`
          ${centerStyle}
        `}
      >
        <TextField
          css={diaryTitleStyles}
          label={"일기 제목"}
          value={title}
          autoFocus
          variant="standard"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </div>
      <TextField
        onChange={(e) => {
          setContent(e.target.value);
        }}
        value={content}
        label="당신의 생각을 글로 표현해 주세요"
        multiline={true}
        css={diaryContentStyles}
        inputProps={{ maxLength: 300 }}
      />
    </div>
  );
}

interface PaperAreaProps {
  content: string;
  title: string;
}
export function PaperArea({ content, title }: PaperAreaProps): ReactElement {
  return (
    <div css={paperStyles}>
      <div
        css={css`
          ${centerStyle}
        `}
      >
        <p css={diaryTitleStyles}>{title}</p>
      </div>
      <pre css={diaryContentStyles}>{content}</pre>
    </div>
  );
}

const paperStyles = css`
  display: flex;
  flex-direction: column;
  gap: 36px;
  width: 100%;
  flex: 1;
  height: 100%;
`;

const diaryTitleStyles = css`
  text-align: center;
  width: 100%;
  font-size: 100px;
`;

const diaryContentStyles = css`
  width: 100%;
  textarea {
    min-height: 250px;
  }
  /* background: linear-gradient(transparent, transparent 19px, #91d1d3 19px);
  background-size: 20px 20px; */
`;
