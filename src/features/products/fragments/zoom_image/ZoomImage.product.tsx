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
    backgroundImage: `url(${props.coverImage})`,
    backgroundPosition: "0% 0%",
  });
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setState(
      (prevState) =>
        (prevState = { ...state, backgroundPosition: `${x}% ${y}%` })
    );
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    setState(
      (prevState) =>
        (prevState = {
          ...state,
          backgroundPosition: "0% 0%",
        })
    );
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    setState(
      (prevState) =>
        (prevState = {
          ...state,
          backgroundPosition: "0% 0%",
        })
    );
  };

  useEffect(() => {
    if (props.coverImage?.length > 0) {
      setCoverImage(props.coverImage);
      setState({ ...state, backgroundImage: `url(${props.coverImage})` });
    }
  }, [props.coverImage]);

  return (
    <figure
      className={clsx("w-[30rem] h-[30rem] rounded-[1rem]")}
      style={state}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
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
