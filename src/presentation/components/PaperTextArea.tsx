import { css } from "@emotion/react";
import { centerStyle } from "@presentation/common/styles/commonStyles";
import { type ReactElement } from "react";

interface PaperTextAreaProps {
  content: string;
  setContent: (value: string) => void;
  title: string;
  setTitle: (value: string) => void;
}
// 출처 : https://codepen.io/MarcMalignan/pen/QbaXGg
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
          margin: 45px 0px 45px 0px;
        `}
      >
        <input
          css={diaryTitleStyles}
          placeholder="제목을 입력해 주세요."
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </div>
      <div css={diaryContentContainerStyles}>
        <textarea
          onChange={(e) => {
            setContent(e.target.value);
          }}
          value={content}
          maxLength={1000}
          placeholder="당신의 생각을 글로 표현해 주세요."
          autoFocus
          css={diaryContentStyles}
        />
      </div>
    </div>
  );
}

const paperStyles = css`
  position: relative;
  width: 100%;
  min-width: 400px;
  height: 80vh;
  background: #fafafa;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  &::before {
    height: 5000px;
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 45px;
    background: radial-gradient(#575450 6px, transparent 7px) repeat-y;
    background-size: 30px 30px;
    border-right: 3px solid #d44147;
  }
  padding-left: 45px;
`;

const diaryTitleStyles = css`
  max-width: 400px;
  width: 100%;
  min-width: 200px;
  border-bottom: #91d1d3 3px solid;
  background-color: transparent;
  outline: none;
  line-height: 30px;
  font-weight: bold;
  font-size: 20px;
`;

const diaryContentStyles = css`
  text-indent: 18px;
  width: 100%;
  height: 100%;
  line-height: 30px;
  padding: 0 10px;
  border: 0;
  outline: 0;
  background: transparent;
  font-weight: bold;
  font-size: 18px;
  z-index: 1;
  resize: none;
`;

const diaryContentContainerStyles = css`
  height: 100%;
  margin: 30px 0px 30px 0px;
  background: linear-gradient(transparent, transparent 28px, #91d1d3 28px);
  background-size: 30px 30px;
`;
