import { useDirayRepository } from "@data/repository/diaryRepository";
import { notificationStore } from "@data/stores/notificationStore";
import { HOME_PAGE_PATH } from "@domain/constants/paths";
import { css } from "@emotion/react";
import { Button } from "@mui/material";
import { ContentPadding } from "@presentation/common/atomics/PageContent";
import { LoadingModal } from "@presentation/common/components/LoadingModal";
import { PaperTextArea } from "@presentation/common/components/PaperTextArea";
import { TopBar } from "@presentation/common/components/TopBar";
import { centerStyle } from "@presentation/common/styles/commonStyles";

import { useMutation } from "@tanstack/react-query";
import { useState, type ReactElement } from "react";
import { useNavigate } from "react-router-dom";

export function WritePage(): ReactElement {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const { postDiary } = useDirayRepository();
  const { showSnackbar } = notificationStore();
  const { mutate, isLoading } = useMutation(postDiary, {
    onSuccess: () => {
      navigate(HOME_PAGE_PATH);
      showSnackbar({
        snackbarConf: { variant: "success", message: "작성 성공" },
      });
    },
    onError: () => {
      showSnackbar({
        snackbarConf: { variant: "error", message: "작성 실패" },
      });
    },
  });
  const handlePost = (): void => {
    if (content.length > 1000 || content.length === 0) {
      showSnackbar({
        snackbarConf: { variant: "info", message: "내용을 채워주세요" },
      });
      return;
    }
    mutate({ content, title });
  };
  return (
    <>
      {isLoading && <LoadingModal />}
      <TopBar title={"일기 쓰기"} />
      <ContentPadding>
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
            onClick={handlePost}
          >
            작성 완료
          </Button>
        </div>
      </ContentPadding>
    </>
  );
}
