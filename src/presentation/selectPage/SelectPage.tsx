import { useDirayRepository } from "@data/repository/diaryRepository";
import { notificationStore } from "@data/stores/notificationStore";
import { parseNumber } from "@data/utils/parseNumber";
import { DIARY_PAGE_PATH, NOTI_PAGE_PATH } from "@domain/constants/paths";
import { UnKnown } from "@domain/errors/UnKnown";
import { Button, css } from "@mui/material";
import { ContentPadding } from "@presentation/common/atomics/PageContent";
import { AbsoluteTobBar, TopBar } from "@presentation/common/components/TopBar";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, type ReactElement, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { ImageCarousel } from "@presentation/common/components/ImageCarousel";
import { LoadingModal } from "@presentation/common/components/LoadingModal";
import { DiaryTags } from "@presentation/common/components/DiaryTags";

export function SelectPage(): ReactElement {
  const { diaryId } = useParams();
  const { getDiary, postMainImage } = useDirayRepository();
  const { showSnackbar } = notificationStore();
  const queryClient = useQueryClient();
  const { data: diary, isLoading } = useQuery(
    ["diary", "getDiary"],
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
  const { mutate, isLoading: isLoading2 } = useMutation(
    ["postMainImage"],
    async () => {
      await postMainImage(
        diary!.diaryId,
        diary!.candidateImageUrls[currentIdx].imageId
      );
      return true;
    },
    {
      onError: () => {
        showSnackbar({
          snackbarConf: { variant: "error", message: "선택 실패" },
        });
      },
      onSuccess: async () => {
        showSnackbar({
          snackbarConf: { variant: "success", message: "선택 성공" },
        });

        await queryClient.invalidateQueries({ queryKey: ["diary"] });
        navigate(`${DIARY_PAGE_PATH}/${diary!.diaryId}`);
      },
    }
  );
  const navigate = useNavigate();
  useEffect(() => {
    if (diaryId === undefined) {
      navigate(DIARY_PAGE_PATH);
    }
    if (diary?.imageSelected === true) {
      navigate(`${DIARY_PAGE_PATH}/${diaryId!}`);
    }
  }, [diary]);
  const [currentIdx, setCurrentIdx] = useState(0);
  if (isLoading) {
    return <div></div>;
  }

  return (
    <>
      {isLoading2 && <LoadingModal />}
      <AbsoluteTobBar to={NOTI_PAGE_PATH} />
      <ImageCarousel
        onChange={(index) => {
          setCurrentIdx(index);
        }}
        images={diary!.candidateImageUrls}
      />
      <ContentPadding>
        <Button
          variant="contained"
          css={css`
            width: 100%;
          `}
          onClick={() => {
            mutate();
          }}
        >
          대표 이미지로 선택하기
        </Button>
        <DiaryTags diary={diary!} />
        <p
          css={css`
            font-weight: 700;
            font-size: 1.5rem;
          `}
        >
          {diary!.title}
        </p>
        <p>{diary!.originalContent}</p>
      </ContentPadding>
    </>
  );
}
