import { type ReactElement, useState } from "react";

interface ImageProps {
  src: string;
  className?: string;
}
export function Image({ src, className }: ImageProps): ReactElement {
  const [source, setSource] = useState(src);
  const handleError = (): void => {
    setSource("/images/alt.png");
  };
  return <img src={source} onError={handleError} className={className} />;
}
