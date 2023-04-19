import { ContentPadding } from "@presentation/common/atomics/PageContent";
import { BottonNavigationBar } from "@presentation/common/components/BottomNavigationBar";
import { type ReactElement } from "react";
import { Typography, css } from "@mui/material";
import { MainActionBar } from "./components/MainActionBar";
import { MainTitle } from "./components/MainTitle";
export function MainPage(): ReactElement {
  return (
    <>
      <ContentPadding>
        <MainActionBar />
        <MainTitle />
      </ContentPadding>
      <BottonNavigationBar activeIdx={0} />
    </>
  );
}
