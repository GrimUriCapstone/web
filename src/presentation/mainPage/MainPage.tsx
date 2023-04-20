import { ContentPadding } from "@presentation/common/atomics/PageContent";
import { BottonNavigationBar } from "@presentation/common/components/BottomNavigationBar";
import { type ReactElement } from "react";
import { MainActionBar } from "./components/MainActionBar";
import { MainTitle } from "./components/MainTitle";
import { css } from "@emotion/react";
import { centerStyle } from "@presentation/common/styles/commonStyles";
export function MainPage(): ReactElement {
  return (
    <>
      <ContentPadding>
        <MainActionBar />
        <MainTitle />
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
        </div>
      </ContentPadding>
      <BottonNavigationBar activeIdx={0} />
    </>
  );
}
