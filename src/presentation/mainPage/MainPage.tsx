import { ContentPadding } from "@presentation/common/atomics/PageContent";
import { BottonNavigationBar } from "@presentation/common/components/BottomNavigationBar";
import { type ReactElement } from "react";
import { MainActionBar } from "./components/MainActionBar";
import { MainTitle } from "./components/MainTitle";
import { css } from "@emotion/react";
import { centerStyle } from "@presentation/common/styles/commonStyles";
import { useUserStore } from "@data/stores/userStore";
import { Button, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import { SETTINGS_PAGE_PATH } from "@domain/constants/paths";
import { useDirayRepository } from "@data/repository/diaryRepository";
import { useQuery } from "@tanstack/react-query";
import { Img } from "@presentation/common/atomics/Image";
import { DiaryPreview } from "@presentation/common/components/DiaryPreview";
export function MainPage(): ReactElement {
  const { user } = useUserStore();
  const { getRecentDiaries } = useDirayRepository();
  const { data, isLoading } = useQuery(
    ["diary", "getRecentDiary"],
    getRecentDiaries,
    {}
  );
  return (
    <>
      <MainActionBar />
      <ContentPadding>
        <MainTitle />
        {user == null && (
          <div
            css={css`
              ${centerStyle}
              height:100%;
            `}
          >
            <img
              src="/images/mainBanner.png"
              css={css`
                width: 100%;
              `}
            />
            <Link to={SETTINGS_PAGE_PATH}>
              <Button>로그인하기</Button>
            </Link>
          </div>
        )}
        {user != null &&
          (isLoading || data == null ? (
            <CircularProgress />
          ) : (
            <div
              css={css`
                display: flex;
                flex-direction: column;
                gap: 16px;
              `}
            >
              {data.map((diary) => (
                <DiaryPreview diary={diary} key={diary.diaryId} />
              ))}
            </div>
          ))}
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
