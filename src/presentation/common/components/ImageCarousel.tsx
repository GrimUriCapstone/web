import { type Photo } from "@domain/models/diary";
import { css } from "@emotion/react";
import { type ReactElement } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
interface ImageCarouselProps {
  onChange: (index: number) => void;
  images: Photo[];
}

export function ImageCarousel({
  onChange,
  images,
}: ImageCarouselProps): ReactElement {
  return (
    <Carousel
      showStatus={false}
      onChange={onChange}
      swipeable={true}
      css={css`
        div button {
          top: 40% !important;
          margin-left: 10px;
          margin-right: 10px;
          height: 20%;
        }
        .carousel .thumbs-wrapper {
          display: none;
        }
      `}
    >
      {images.map((image) => {
        return (
          <img
            key={image.imageId}
            src={image.imageUrl}
            css={css`
              width: 100%;
              aspect-ratio: 1;
              object-fit: cover;
              user-select: none;
            `}
          />
        );
      })}
    </Carousel>
  );
}
