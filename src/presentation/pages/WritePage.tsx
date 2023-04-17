import { ContentPadding } from "@presentation/atomics/Padding";
import { TopBar } from "@presentation/components/TopBar";
import { type ReactElement } from "react";

export function WritePage(): ReactElement {
  return (
    <div className="flex h-screen w-full flex-col">
      <TopBar title={"일기 쓰기"} />
      <ContentPadding>
        <textarea
          className="textarea textarea-bordered h-full w-full"
          placeholder="Bio"
        />
      </ContentPadding>
    </div>
  );
}
