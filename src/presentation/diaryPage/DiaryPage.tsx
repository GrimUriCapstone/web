import { useDirayRepository } from "@data/repository/diaryRepository";
import { useUserStore } from "@data/utils/useUser";
import { css } from "@emotion/react";
import { AppBar, Avatar, Typography } from "@mui/material";
import { Img } from "@presentation/common/atomics/Image";

import { ContentPadding } from "@presentation/common/atomics/Padding";
import { BottonNavigationBar } from "@presentation/components/BottomNavigationBar";
import {
  DiaryThumnailsSkeleton,
  DiaryThumnail,
} from "@presentation/diaryPage/components/DiaryThumnail";
import { TopBar } from "@presentation/components/TopBar";
import { mq } from "@presentation/theme/mediaQuery";
import { useQuery } from "@tanstack/react-query";
import { type ReactElement } from "react";

export function DiaryPage(): ReactElement {
  const { user } = useUserStore();
  const { getDiaries } = useDirayRepository();

  const { data: diaries, isLoading } = useQuery(["getDiaries"], getDiaries, {
    onError: (err) => {
      console.warn(err);
    },
  });
  const nickname = user == null ? "" : user.nickname;
  return (
    <>
      <div
        css={css`
          display: flex;
          flex-direction: row;
        `}
      >
        <Typography variant="h6">{nickname}</Typography>
        <Avatar>
          <Img src="" />
        </Avatar>
      </div>
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
