import { IconButton, Typography, css } from "@mui/material";
import { ContentPadding, Page } from "@presentation/common/atomics/PageContent";
import { type ReactElement } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
interface DiaryModalProps {
  title: string;
  content: string;
  onClick: () => void;
}

export function DiaryModal({
  title,
  content,
  onClick,
}: DiaryModalProps): ReactElement {
  return (
    <Page
      css={css`
        z-index: 2;
        position: absolute;
        top: 0px;
        padding-top: 40px;
        background-color: #000000a3;
      `}
    >
      <ContentPadding
        css={css`
          box-shadow: 0px -6px 5px 0px black;
          background-color: white;
          border-radius: 30px 30px 0px 0px;
        `}
      >
        <IconButton
          onClick={onClick}
          css={css`
            position: absolute;
            right: 20px;
          `}
        >
          <ExpandMoreIcon />{" "}
        </IconButton>
        <Typography variant="h4">{title}</Typography>
        <pre
          css={css`
            width: 100%;
            white-space: pre-wrap;
            line-break: anywhere;
            text-indent: 10px;
            overflow-y: scroll;
          `}
        >
          {content}
        </pre>
      </ContentPadding>
    </Page>
  );
}
