import { useDirayRepository } from "@data/repository/diaryRepository";
import { css } from "@emotion/react";

import { ContentPadding } from "@presentation/common/atomics/Padding";
import { BottonNavigationBar } from "@presentation/common/components/BottomNavigationBar";
import {
  DiaryThumnailsSkeleton,
  DiaryThumnail,
} from "@presentation/diaryPage/components/DiaryThumnail";

import { mq } from "@presentation/common/theme/mediaQuery";
import { useQuery } from "@tanstack/react-query";
import { type ReactElement } from "react";
import { DiaryUserInfo } from "./components/DiaryUserInfo";

export function DiaryPage(): ReactElement {
  const { getDiaries } = useDirayRepository();

  const { data: diaries, isLoading } = useQuery(["getDiaries"], getDiaries, {
    onError: (err) => {
      console.warn(err);
    },
  });

  return (
    <>
      <DiaryUserInfo />
      <ContentPadding>
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
  grid-template-columns: repeat(2, 1fr);
  row-gap: 10px;
  column-gap: 10px;
  ${mq.sm} {
    grid-template-columns: repeat(3, 1fr);
    row-gap: 15px;
    column-gap: 15px;
  }
  ${mq.md} {
    grid-template-columns: repeat(4, 1fr);
    row-gap: 20px;
    column-gap: 20px;
  }
`;
