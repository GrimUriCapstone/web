import { DIARY_PAGE_PATH } from "@domain/constants/paths";
import { TopBar } from "@presentation/common/components/TopBar";
import { type ReactElement } from "react";

export function DiaryDetailPage(): ReactElement {
  return (
    <>
      <TopBar title={"diary"} to={DIARY_PAGE_PATH} />
    </>
  );
}
