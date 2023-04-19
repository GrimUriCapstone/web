import { css } from "@emotion/react";
import { mq } from "@presentation/common/theme/mediaQuery";

export const centerStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const centerColStyle = css`
  ${centerStyle}
  flex-direction: column;
`;

export const linkStyle = css`
  height: min-content;
  align-self: center;
  justify-self: center;
`;
