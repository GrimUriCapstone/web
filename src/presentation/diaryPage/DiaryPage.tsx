import { useDirayRepository } from "@data/repository/diaryRepository";
import { css } from "@emotion/react";

import { ContentPadding } from "@presentation/common/atomics/PageContent";
import { BottonNavigationBar } from "@presentation/common/components/BottomNavigationBar";
import {
  DiaryThumnailsSkeleton,
  DiaryThumnail,
} from "@presentation/diaryPage/components/DiaryThumnail";

import { mq } from "@presentation/common/theme/mediaQuery";
import { useQuery } from "@tanstack/react-query";
import { type ReactElement } from "react";
import { DiaryUserInfo } from "./components/DiaryUserInfo";
import { notificationStore } from "@data/stores/notificationStore";

export function DiaryPage(): ReactElement {
  const { getDiaries } = useDirayRepository();
  const { showSnackbar } = notificationStore();
  const { data: diaries, isLoading } = useQuery(
    ["diary", "getDiaries"],
    async () => {
      const result = await getDiaries();
      return result.filter((diary) => {
        if (diary.imageSelected) {
          return true;
        }
        return false;
      });
    },
    {
      onError: () => {
        showSnackbar({
          snackbarConf: { variant: "error", message: "다이어리 가져오기 실패" },
        });
      },
    }
  );

  return (
    <>
      <ContentPadding>
        <DiaryUserInfo />
        <div css={diaryThumnailContainerStyle}>
          {isLoading ? (
            <DiaryThumnailsSkeleton />
          ) : (
            diaries?.map((diary) => (
              <DiaryThumnail diary={diary} key={diary.diaryId} />
            ))
          )}
        </div>
      </ContentPadding>
      <BottonNavigationBar activeIdx={1} />
    </>
  );
}

const diaryThumnailContainerStyle = css`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(2, 1fr);
  row-gap: 10px;
  column-gap: 10px;
  ${mq.sm} {
    grid-template-columns: repeat(3, 1fr);
    row-gap: 15px;
    column-gap: 15px;
  }
`;
