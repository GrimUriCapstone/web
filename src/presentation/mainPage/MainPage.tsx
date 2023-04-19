import { ContentPadding } from "@presentation/common/atomics/PageContent";
import { BottonNavigationBar } from "@presentation/common/components/BottomNavigationBar";
import { MainTopBar } from "@presentation/common/components/TopBar";
import { type ReactElement } from "react";
import { Link } from "react-router-dom";

export function MainPage(): ReactElement {
  return (
    <>
      <MainTopBar />
      <ContentPadding>s</ContentPadding>
      <BottonNavigationBar activeIdx={0} />
    </>
  );
}
