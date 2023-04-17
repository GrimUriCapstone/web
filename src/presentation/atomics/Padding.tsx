import { type ReactNode, type ReactElement } from "react";

interface ContentPaddingProps {
  children: ReactNode;
}
export function ContentPadding({
  children,
}: ContentPaddingProps): ReactElement {
  return <div className="h-full w-full p-10">{children}</div>;
}
