import { useDirayRepository } from "@data/repository/diaryRepository";
import { notificationStore } from "@data/stores/notificationStore";
import { parseNumber } from "@data/utils/parseNumber";
import { DIARY_PAGE_PATH, NOTI_PAGE_PATH } from "@domain/constants/paths";
import { UnKnown } from "@domain/errors/UnKnown";
import { Button } from "@mui/material";
import { ContentPadding } from "@presentation/common/atomics/PageContent";
import { TopBar } from "@presentation/common/components/TopBar";
import { useQuery } from "@tanstack/react-query";
import { useEffect, type ReactElement } from "react";
import { useParams, useNavigate } from "react-router-dom";

export function SelectPage(): ReactElement {
  const { diaryId } = useParams();
  const { getDiary } = useDirayRepository();

  const { showSnackbar } = notificationStore();
  const { data: diary, isLoading } = useQuery(
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
  if (isLoading) {
    return <div></div>;
  }
  return (
    <>
      <TopBar to={NOTI_PAGE_PATH} />
      <ContentPadding>
        <div>{diary!.toString()}</div>
        <Button variant="contained">선택하기</Button>
      </ContentPadding>
    </>
  );
}
