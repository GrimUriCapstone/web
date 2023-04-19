import { css } from "@emotion/react";
import { mq } from "@presentation/theme/mediaQuery";

export const centerStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const centerColStyle = css`
  ${centerStyle}
  flex-direction: column;
`;

export const sectionGapStyle = css`
  gap: 20px;
  ${mq.md} {
    gap: 30px;
  }
  ${mq.lg} {
    gap: 40px;
  }
`;

export const linkStyle = css`
  height: min-content;
  align-self: center;
  justify-self: center;
`;
