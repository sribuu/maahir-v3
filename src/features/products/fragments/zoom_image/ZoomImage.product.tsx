import { useState, useEffect } from "react";
import clsx from "clsx";

export interface IZoomImageProductProps {
  coverImage?: string;
}

ZoomImageProduct.defaultProps = {
  coverImage: "",
};

export default function ZoomImageProduct(props: IZoomImageProductProps) {
  const [coverImage, setCoverImage] = useState("");
  const [state, setState] = useState({
    backgroundImage: ``,
    backgroundPosition: "0% 0%",
  });
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setState(
      (prevState) =>
        (prevState = {
          ...state,
          backgroundPosition: `${x}% ${y}%`,
          backgroundImage: `url(${coverImage})`,
        })
    );
  };
  const handleMouseLeave = () => {
    setState({
      ...state,
      backgroundImage: "",
      backgroundPosition: `0% 0%`,
    });
  };
  const handleMouseEnter = () => {
    setState({
      ...state,
      backgroundImage: `url(${coverImage})`,
    });
  };

  useEffect(() => {
    if (props.coverImage?.length > 0 && props.coverImage !== coverImage) {
      setCoverImage(props.coverImage);
    }
  }, [props.coverImage]);

  return (
    <figure
      className={clsx("w-[30rem] h-[30rem] rounded-[1rem] bg-no-repeat")}
      style={state}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src={coverImage}
        className={clsx(
          "w-[30rem] h-[30rem] rounded-[1rem] hover:opacity-0 object-cover"
        )}
      />
    </figure>
  );
}
