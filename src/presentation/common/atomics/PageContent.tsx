import { css } from "@emotion/react";
import { mq } from "@presentation/common/theme/mediaQuery";
import { type ReactNode, type ReactElement } from "react";
import { centerColStyle } from "../styles/commonStyles";

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

export function Page({ children }: ContentPaddingProps): ReactElement {
  return (
    <div
      css={css`
        background-color: white;
        margin: 0 auto;
        height: 100%;
        width: 100%;
        ${mq.sm} {
          width: 600px;
        }
        ${mq.lg} {
          width: 900px;
        }
      `}
    >
      {children}
      <ToolBarPadding />
    </div>
  );
}
export const contentPaddingXStyle = css`
  padding: 0px 10px 0px 10px;
  ${mq.sm} {
    padding: 0px 20px 0px 20px;
  }
  ${mq.md} {
    padding: 0px 30px 0px 30px;
  }
`;
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
