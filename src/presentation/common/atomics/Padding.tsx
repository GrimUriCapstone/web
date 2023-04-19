import { css } from "@emotion/react";
import { mq } from "@presentation/theme/mediaQuery";
import { type ReactNode, type ReactElement } from "react";

interface ContentPaddingProps {
  children: ReactNode;
}
export function ContentPadding({
  children,
}: ContentPaddingProps): ReactElement {
  return (
    <div
      css={css`
        height: 100%;
        width: 100%;
        overflow: hidden;
        padding: 20px 10px 20px 10px;
        ${mq.sm} {
          padding: 20px 20px 20px 20px;
        }
        ${mq.md} {
          padding: 20px 30px 20px 30px;
        }
      `}
    >
      {children}
      <ToolBarPadding />
    </div>
  );
}

export function ToolBarPadding(): ReactElement {
  return (
    <div
      css={css`
        width: 100%;
        height: 56px;
      `}
    />
  );
}
