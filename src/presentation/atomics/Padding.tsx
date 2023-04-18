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
        margin-top: 56px;
        padding: 20px 10px;
        ${mq.md} {
          padding: 20px 20px;
        }
        ${mq.lg} {
          padding: 20px 40px;
        }
      `}
    >
      {children}
    </div>
  );
}
