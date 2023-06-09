import { useDirayRepository } from "@data/repository/diaryRepository";
import { parseNumber } from "@data/utils/parseNumber";
import { DIARY_PAGE_PATH } from "@domain/constants/paths";
import { UnKnown } from "@domain/errors/UnKnown";
import { Avatar, IconButton, Skeleton, Typography, css } from "@mui/material";
import { Img } from "@presentation/common/atomics/Image";
import { ContentPadding } from "@presentation/common/atomics/PageContent";
import { useQuery } from "@tanstack/react-query";
import { useEffect, type ReactElement, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { DiaryModal } from "./components/DiaryModal";
import { notificationStore } from "@data/stores/notificationStore";
import { AbsoluteTobBar } from "@presentation/common/components/TopBar";
import { DiaryTags } from "@presentation/common/components/DiaryTags";
import { type ServerError } from "@domain/models/error";
import { DiaryDetailTabBar } from "./components/DiaryDetailTabBar";
export function DiaryDetailPage(): ReactElement {
  const { diaryId } = useParams();
  const { getDiary } = useDirayRepository();
  const { showSnackbar } = notificationStore();
  const {
    data: diary,
    isLoading,
    isError,
  } = useQuery(
    ["diary", "getDiary", diaryId],
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
      retry: (_, error) => {
        if ((error as ServerError).response.status === 429) {
          return false;
        }
        return true;
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
  if (isLoading) {
    return (
      <>
        <AbsoluteTobBar to={DIARY_PAGE_PATH} />
        <Skeleton
          css={css`
            width: 100%;
            aspect-ratio: 1;
            height: 100%;
          `}
          variant="rounded"
        />
        <ContentPadding>
          <Skeleton
            variant="rounded"
            css={css`
              height: 40px;
              width: 150px;
            `}
          />
          <Skeleton
            variant="rounded"
            css={css`
              height: 30px;
              width: 150px;
            `}
          />
          <Skeleton
            variant="rounded"
            css={css`
              height: 300px;
              width: 100%;
            `}
          />
        </ContentPadding>
      </>
    );
  }
  if (diary == null || isError) {
    return (
      <>
        <AbsoluteTobBar to={DIARY_PAGE_PATH} />
        <ContentPadding>에러 발생</ContentPadding>
      </>
    );
  }
  return (
    <>
      <DiaryDetailTabBar diary={diary} />
      <div
        id="diary-content"
        css={css`
          background-color: #eeeeee;
        `}
      >
        <Img src={diary.mainImageUrl.imageUrl} css={diaryImageStyle} />
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
              justify-content: center;
              position: relative;
            `}
          >
            <Typography variant="h4">{diary?.title}</Typography>

            <IconButton
              onClick={openModal}
              css={css`
                position: absolute;
                right: 0;
              `}
            >
              <ExpandLessIcon />
            </IconButton>
          </div>
          <div
            css={css`
              display: flex;
              align-items: center;
              gap: 16px;
            `}
          >
            <div
              css={css`
                display: flex;
                align-items: center;
                gap: 8px;
              `}
            >
              <Avatar
                src={diary?.profileImage}
                css={css`
                  width: 32px;
                  height: 32px;
                `}
              />
              <Typography variant="h6">{diary?.username}</Typography>
            </div>
            <div
              css={css`
                width: 1px;
                height: 16px;
                background-color: gray;
              `}
            />
            <Typography variant="h6" color={"gray"}>
              {diary != null &&
                new Date(Date.parse(diary.createdAt)).toLocaleDateString()}
            </Typography>
          </div>
          <DiaryTags diary={diary} />

          <pre
            css={css`
              width: 100%;
              white-space: pre-wrap;
              line-break: anywhere;
              text-indent: 10px;
              line-height: 150%;
              overflow-y: hidden;
            `}
          >
            {diary?.originalContent}
          </pre>
        </ContentPadding>
        {expand && (
          <DiaryModal
            content={diary?.originalContent}
            title={diary?.title}
            onClick={closeModal}
          />
        )}
      </div>
    </>
  );
}

const diaryImageStyle = css`
  margin: 0 auto;
  width: 100%;
  aspect-ratio: 1;
`;
