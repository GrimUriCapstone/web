import { css } from "@emotion/react";
import { Button } from "@mui/material";
import { ContentPadding } from "@presentation/atomics/Padding";
import {
  centerColStyle,
  centerStyle,
  sectionGapStyle,
} from "@presentation/atomics/styles/commonStyles";
import { PaperTextArea } from "@presentation/components/PaperTextArea";
import { TopBar } from "@presentation/components/TopBar";
import { useState, type ReactElement } from "react";

export function WritePage(): ReactElement {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  return (
    <>
      <TopBar title={"일기 쓰기"} />
      <ContentPadding>
        <div
          css={css`
            ${centerColStyle}
            ${sectionGapStyle}
          `}
        >
          <PaperTextArea
            setContent={setContent}
            content={content}
            title={title}
            setTitle={setTitle}
          />
          <div
            css={css`
              ${centerStyle}
              gap: 10px;
            `}
          >
            <div>{content.length}/1000자</div>
            <Button
              variant="contained"
              css={css`
                width: 100px;
              `}
            >
              작성 완료
            </Button>
          </div>
        </div>
      </ContentPadding>
    </>
  );
}
