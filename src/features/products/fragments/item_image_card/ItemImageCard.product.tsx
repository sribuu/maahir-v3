import React, { useContext } from "react";
import clsx from "clsx";
import ProductImageListProduct from "../product_image_list/ProductImageList.product";
import ZoomImageProduct from "../zoom_image/ZoomImage.product";
import { ProductContext } from "../../contexts/product/Product.context";
import { useProductGetProductById } from "../../hooks/useGetProductById";
import { ProductActionEnum } from "../../contexts/product/Product.types";
export interface IItemImageCardProductProps {}

ItemImageCardProduct.defaultProps = {};

export default function ItemImageCardProduct(
  props: IItemImageCardProductProps
) {
  const { isLoading: isLoadingGetProductItem } = useProductGetProductById();
  const { state, dispatch } = useContext(ProductContext);

  if (isLoadingGetProductItem) {
    const itemCount = Array.from({ length: 5 }, (_, i) => i + 1);
    return (
      <div
        className={clsx(
          "flex flex-col items-start justify-start",
          "min-w-[276px] gap-y-[1rem]"
        )}
      >
        <div
          className={clsx(
            "animate-pulse",
            "bg-bright-gray",
            "w-[30rem] h-[30rem] rounded-[1rem]"
          )}
        />

        <div
          className={clsx(
            "relative overflow-hidden",
            "max-w-[30rem]",
            "gap-x-[0.75rem]"
          )}
        >
          {itemCount.map((item) => (
            <div
              key={item}
              className={clsx(
                "animate-pulse",
                "bg-bright-gray",
                "w-[86.4px] h-[86.4px] rounded-[0.5rem]"
              )}
            />
          ))}
        </div>
      </div>
    );
  }

  const handleSelectImage = (data: string) => {
    dispatch({ type: ProductActionEnum.ChangeZoomImage, payload: data });
  };

  return (
    <div
      className={clsx(
        "flex flex-col items-start justify-start",
        "min-w-[276px] gap-y-[1rem]"
      )}
    >
      <ZoomImageProduct coverImage={state.images.large} />

      <ProductImageListProduct
        active={state.images.large}
        imageList={state.images.list}
        onSelect={handleSelectImage}
      />
    </div>
  );
}
