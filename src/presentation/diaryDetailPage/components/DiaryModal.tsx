import { Backdrop, IconButton, Typography, css } from "@mui/material";
import { ContentPadding, Page } from "@presentation/common/atomics/PageContent";
import { type ReactElement } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
interface DiaryModalProps {
  title?: string;
  content?: string;
  onClick: () => void;
}

export function DiaryModal({
  title = "",
  content = "",
  onClick,
}: DiaryModalProps): ReactElement {
  return (
    <Backdrop
      open={true}
      css={css`
        z-index: 2;
        border: 0px;
        padding-top: 100px;
      `}
    >
      <ContentPadding
        css={css`
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
        <Typography variant="h5">{title}</Typography>
        <Typography
          css={css`
            width: 100%;
            white-space: pre-wrap;
            text-indent: 10px;
            height: 110%;
            overflow-y: scroll;
          `}
        >
          {content}
        </Typography>
      </ContentPadding>
    </Backdrop>
  );
}
