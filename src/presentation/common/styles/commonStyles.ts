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

export const transitionStyle = css`
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
`;
export const hoverActiveStyle = css`
  ${transitionStyle}
  transition-property: transform;
  &:hover {
    transform: rotate(1deg);
  }
  &:active {
    transform: scale(110%);
  }
`;
