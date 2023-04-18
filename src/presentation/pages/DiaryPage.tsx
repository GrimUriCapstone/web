import { useUserStore } from "@data/utils/useUser";
import { ContentPadding } from "@presentation/atomics/Padding";
import { BottonNavigationBar } from "@presentation/components/BottomNavigationBar";
import { TopBar } from "@presentation/components/TopBar";
import { type ReactElement } from "react";

export function DiaryPage(): ReactElement {
  const { user } = useUserStore();
  return (
    <>
      <TopBar title={user == null ? "" : user.nickname} />
      <ContentPadding>s</ContentPadding>
      <BottonNavigationBar activeIdx={1} />
    </>
  );
}
