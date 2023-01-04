import { useState, useEffect, useRef } from "react";
import clsx from "clsx";

export interface IImagesSwipeableComponentProps {
  images?: string[];
  onSwipe?: (data: number) => void;
}

ImagesSwipeableComponent.defaultProps = {
  images: [],
};

export default function ImagesSwipeableComponent(
  props: IImagesSwipeableComponentProps
) {
  const [active, setActive] = useState(0);
  const [translate, setTranslate] = useState(0);
  const [startX, setStartX] = useState(0);
  const [lastX, setLastX] = useState(0);
  const [boundaries, setBoundaries] = useState(0);
  const [images, setImages] = useState<string[]>([]);
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (ref.current !== null) {
      setBoundaries(ref.current.clientWidth / 2);
    }
  }, [ref.current]);

  useEffect(() => {
    if (props.images) {
      setImages(props.images);
    }
  }, [props.images]);

  useEffect(() => {
    if (props.onSwipe) {
      props.onSwipe(active);
    }
  }, [active]);

  const handleTouchStart = (e: React.TouchEvent<HTMLImageElement>) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLImageElement>) => {
    const changeX = e.touches[0].clientX;
    const final = -(ref.current.clientWidth * active) + (changeX - startX);

    setTranslate(final);
    setLastX(changeX);
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLImageElement>) => {
    const finalActive =
      startX > lastX &&
      startX - lastX > boundaries &&
      active < images.length - 1
        ? active + 1
        : lastX > startX && lastX - startX > boundaries && active > 0
        ? active - 1
        : active;
    const finalTranslate = finalActive * -ref.current.clientWidth;

    setTranslate(finalTranslate);
    setActive(finalActive);
  };

  return (
    <div className={clsx("flex items-start justify-start", "overflow-hidden")}>
      {images.map((item, index) => (
        <img
          key={index}
          ref={ref}
          src={item}
          className={clsx("min-w-[100vw] h-[270px]", "object-cover")}
          style={{ transform: `translate3d(${translate}px, 0px, 0px)` }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        />
      ))}
    </div>
  );
}
