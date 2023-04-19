import { css } from "@emotion/react";
import { mq } from "@presentation/common/theme/mediaQuery";
import { type ReactNode, type ReactElement } from "react";
import { centerColStyle } from "../styles/commonStyles";

interface ContentPaddingProps {
  children: ReactNode;
  className?: string;
}
export function ContentPadding({
  children,
  className,
}: ContentPaddingProps): ReactElement {
  return (
    <div
      className={className}
      css={css`
        height: 100%;
        width: 100%;
        overflow: hidden;
        padding: 20px 10px 20px 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        ${mq.sm} {
          padding: 20px 20px 20px 20px;
          gap: 15px;
        }
        ${mq.md} {
          padding: 20px 30px 20px 30px;
          gap: 20px;
        }
      `}
    >
      {children}
    </div>
  );
}

export function Page({
  children,
  className,
}: ContentPaddingProps): ReactElement {
  return (
    <div
      className={className}
      css={css`
        background-color: white;
        margin: 0 auto;
        height: 100%;
        width: 100%;
        ${mq.sm} {
          width: 600px;
        }
        ${mq.md} {
          width: 900px;
        }
      `}
    >
      {children}
      <ToolBarPadding />
    </div>
  );
}

export const pageWidthStyle = css`
  width: 100%;
  ${mq.sm} {
    width: 600px;
  }
  ${mq.lg} {
    width: 900px;
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

export function BotBarPadding(): ReactElement {
  return (
    <div
      css={css`
        width: 100%;
        height: 70px;
      `}
    />
  );
}
