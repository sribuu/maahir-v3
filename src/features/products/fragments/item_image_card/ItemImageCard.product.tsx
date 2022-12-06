import React, { useContext } from "react";
import clsx from "clsx";
import ProductImageListProduct from "../product_image_list/ProductImageList.product";
import ZoomImageProduct from "../zoom_image/ZoomImage.product";
import { ProductContext } from "../../contexts/product/Product.context";
import { Types } from "../../contexts/product/Product.reducers";
export interface IItemImageCardProductProps {}

ItemImageCardProduct.defaultProps = {};

export default function ItemImageCardProduct(
  props: IItemImageCardProductProps
) {
  const { state, dispatch } = useContext(ProductContext);

  const handleSelectImage = (data: string) => {
    dispatch({ type: Types.SetImage, payload: data });
  };
  return (
    <div
      className={clsx(
        "flex flex-col items-start justify-start",
        "min-w-[276px] gap-y-[1rem]"
      )}
    >
      <ZoomImageProduct coverImage={state.image} />

      <ProductImageListProduct
        imageList={state.images}
        onSelect={handleSelectImage}
      />
    </div>
  );
}
