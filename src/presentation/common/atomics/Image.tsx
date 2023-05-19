import { type ReactElement, useState, type HTMLProps } from "react";

interface ImageProps extends HTMLProps<HTMLImageElement> {
  src: string;
  className?: string;
}
export function Img({ src, className, ...props }: ImageProps): ReactElement {
  const [source, setSource] = useState(src);
  const handleError = (): void => {
    setSource("/images/alt.png");
  };
  return (
    <img {...props} src={source} onError={handleError} className={className} />
  );
}
