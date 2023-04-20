import { useDirayRepository } from "@data/repository/diaryRepository";
import { parseNumber } from "@data/utils/parseNumber";
import { DIARY_PAGE_PATH } from "@domain/constants/paths";
import { UnKnown } from "@domain/errors/UnKnown";
import { IconButton, Typography, css } from "@mui/material";
import { Img } from "@presentation/common/atomics/Image";
import { ContentPadding, Page } from "@presentation/common/atomics/PageContent";
import { LoadingModal } from "@presentation/common/components/LoadingModal";
import { useQuery } from "@tanstack/react-query";
import { useEffect, type ReactElement, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { DiaryModal } from "./components/DiaryModal";
import { mq } from "@presentation/common/theme/mediaQuery";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { notificationStore } from "@data/stores/notificationStore";
export function DiaryDetailPage(): ReactElement {
  const { diaryId } = useParams();
  const { getDiary } = useDirayRepository();

  const { showSnackbar } = notificationStore();
  const { data, isLoading } = useQuery(
    ["getDiary"],
    async () => {
      const id = parseNumber(diaryId);
      if (id === undefined) {
        throw new UnKnown("no number");
      }
      return await getDiary(id);
    },
    {
      onError: () => {
        showSnackbar({
          snackbarConf: { variant: "error", message: "다이어리 가져오기 실패" },
        });
      },
    }
  );
  const navigate = useNavigate();
  useEffect(() => {
    if (diaryId === undefined) {
      navigate(DIARY_PAGE_PATH);
    }
  }, []);
  const [expand, setExpand] = useState(false);
  const closeModal = (): void => {
    setExpand(false);
  };
  const openModal = (): void => {
    setExpand(true);
  };
  return (
    <>
      {isLoading && <LoadingModal />}
      <div>
        <Img src={""} css={diaryImageStyle} />
      </div>
      <ContentPadding
        css={css`
          position: relative;
        `}
      >
        <div
          css={css`
            display: flex;
            flex-direction: row;
            width: 100%;
            align-items: center;
            justify-content: space-between;
          `}
        >
          <IconButton
            onClick={() => {
              navigate(DIARY_PAGE_PATH);
            }}
          >
            <ArrowBackIosIcon />
          </IconButton>
          <Typography variant="h5">{data?.title}</Typography>
          <IconButton onClick={openModal}>
            <ExpandLessIcon />
          </IconButton>
        </div>
        <pre
          css={css`
            width: 100%;
            white-space: pre-wrap;
            line-break: anywhere;
            text-indent: 10px;
            overflow-y: scroll;
          `}
        >
          {data!.originalContent}
        </pre>
        {/** data!.originalContent */}
      </ContentPadding>
      {expand && (
        <DiaryModal
          content={data!.originalContent}
          title={data!.title}
          onClick={closeModal}
        />
      )}
    </>
  );
}

const diaryImageStyle = css`
  margin: 0 auto;
  width: 100%;
  aspect-ratio: 1;
  max-width: 360px;
  ${mq.sm} {
    width: 360px;
    max-width: 360px;
  }
`;
