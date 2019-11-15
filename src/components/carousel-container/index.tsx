import "./style.css";

import React, {
  Children,
  cloneElement,
  useEffect,
  useRef,
  useState
} from "react";

import DefaultThumbnailCell from "./default-thumbnail-cell";

function CarouselContainer({
  showThumbnails = false,
  showNavigation = true,
  thumbnailElement = DefaultThumbnailCell,
  children: childs
}) {
  const ThumbCell = thumbnailElement;

  const [slideWidth, setSlideWidth] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleOnScroll = e => {
    sRef && sRef.current && setScrollLeft(sRef.current.scrollLeft);
  };

  const sRef = useRef<HTMLInputElement>(null);

  const scroll = (negative = false) => {
    const scrollBy = scrollLeft + (negative ? -slideWidth : slideWidth);
    if (sRef && sRef.current) {
      sRef.current.scrollTo(scrollBy, 0);
    }
  };

  const scrollPrev = () => {
    scroll(true);
  };

  const scrollNext = () => {
    scroll();
  };

  useEffect(() => {
    sRef &&
      sRef.current &&
      setSlideWidth(sRef.current.getBoundingClientRect().width);
  }, [sRef]);

  return (
    <div className="rss--carousel-container">
      <div
        className="rss--slides-container hide-native-scrollbar"
        onScroll={handleOnScroll}
        ref={sRef}
      >
        {Children.map(childs, (element, slideId) => (
          <div className="rss--slide" key={slideId}>
            {cloneElement(element)}
          </div>
        ))}
      </div>
      {showThumbnails && (
        <div className="rss--slides-thumbnails">
          <ThumbCell />
        </div>
      )}
      {showNavigation && (
        <>
          <button
            className="rss--slides-nav rss--slides-nav-prev"
            onClick={scrollPrev}
          >
            &larr;
          </button>
          <button
            className="rss--slides-nav rss--slides-nav-next"
            onClick={scrollNext}
          >
            &rarr;
          </button>
        </>
      )}
    </div>
  );
}

export default CarouselContainer;
