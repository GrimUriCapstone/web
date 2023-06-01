import { ContentPadding } from "@presentation/common/atomics/PageContent";
import { BottonNavigationBar } from "@presentation/common/components/BottomNavigationBar";
import { type ReactElement } from "react";
import { MainActionBar } from "./components/MainActionBar";
import { MainTitle } from "./components/MainTitle";
import { css } from "@emotion/react";
import { useDirayRepository } from "@data/repository/diaryRepository";
import { useInfiniteQuery } from "@tanstack/react-query";
import { DiaryPreview } from "@presentation/common/components/DiaryPreview";
import { DiaryPreviewSkeleton } from "@presentation/common/components/DiaryPreview.skeleton";
import { BottomScrollListener } from "react-bottom-scroll-listener";
import { useUserStore } from "@data/stores/userStore";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { SETTINGS_PAGE_PATH } from "@domain/constants/paths";
export function MainPage(): ReactElement {
  const { getRecentDiaries } = useDirayRepository();
  const { user } = useUserStore();
  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["diary", "getRecentDiary"],
      queryFn: async ({ pageParam = 0 }) => {
        return await getRecentDiaries({ page: pageParam });
      },
      getNextPageParam: (lastPage, allPage) => {
        if (lastPage.last) return undefined;
        return allPage.length + 1;
      },
    });
  return (
    <>
      <MainActionBar />
      <ContentPadding>
        <MainTitle />
        <BottomScrollListener
          onBottom={() => {
            if (
              hasNextPage === false ||
              hasNextPage === undefined ||
              user == null
            )
              return;
            fetchNextPage();
          }}
        >
          <div
            css={css`
              display: flex;
              flex-direction: column;
              gap: 16px;
              width: 100%;
              justify-content: center;
              align-items: center;
            `}
          >
            {user == null && (
              <Link to={SETTINGS_PAGE_PATH}>
                <Button variant="contained">로그인해주세요</Button>
              </Link>
            )}
            {user != null && (
              <>
                {isLoading || data == null
                  ? [1, 2, 3].map((_) => <DiaryPreviewSkeleton key={_} />)
                  : data.pages
                      .map((page) => page.content)
                      .flat()
                      .map((diary) => (
                        <DiaryPreview diary={diary} key={diary.diaryId} />
                      ))}

                {isFetchingNextPage &&
                  [1, 2, 3].map((_) => <DiaryPreviewSkeleton key={_} />)}
              </>
            )}
          </div>
        </BottomScrollListener>
        <div
          css={css`
            height: 70px;
          `}
        />
      </ContentPadding>
      <BottonNavigationBar activeIdx={0} />
    </>
  );
}
