import { useEffect, useState } from "react";
import clsx from "clsx";

export interface IProductImageListProductProps {
  imageList?: string[];
  active?: string;
  onSelect?: (data: string) => void;
}

ProductImageListProduct.defaultProps = {
  imageList: [],
  active: "",
};

export default function ProductImageListProduct(
  props: IProductImageListProductProps
) {
  const [active, setActive] = useState("");
  //   const handleMouseEnterImageList = (e: React.MouseEvent<HTMLImageElement>) => {
  //     setActive(e.currentTarget.id);
  //   };

  const handleClickImageList = (e: React.MouseEvent<HTMLImageElement>) => {
    setActive(e.currentTarget.id);
  };

  useEffect(() => {
    if (props.onSelect) {
      props.onSelect(active);
    }
  }, [active]);
  return (
    <div className={clsx("relative", "max-w-[30rem]")}>
      <div
        className={clsx(
          "relative overflow-hidden",
          "flex max-w-[30rem]",
          "gap-x-[0.75rem]"
        )}
      >
        {props.imageList?.map((item, index) => (
          <img
            id={String(item)}
            key={index}
            src={item}
            className={clsx(
              "cursor-pointer",
              "w-[86.4px] h-[86.4px] rounded-[0.5rem] object-cover",
              item === active && "border-[0.125rem] border-ocean-boat-blue"
            )}
            onClick={handleClickImageList}
            // onMouseEnter={handleMouseEnterImageList}
          />
        ))}
      </div>

      <img
        src={"/icons/circle-arrow.svg"}
        className={clsx(
          "absolute top-[50%] right-[-0.75rem] translate-y-[-50%]",
          "z-20",
          props.imageList.length > 5 ? "block" : "hidden"
        )}
      />
    </div>
  );
}
