import React, { useContext } from "react";
import clsx from "clsx";
import ProductImageListProduct from "../product_image_list/ProductImageList.product";
import ZoomImageProduct from "../zoom_image/ZoomImage.product";
import { ProductContext } from "../../contexts/product/Product.context";
import { useProductGetProductItem } from "../../hooks/useProductItem";
import { ProductActionEnum } from "../../contexts/product/Product.types";
// import { Types } from "../../contexts/product/Product.reducers";
export interface IItemImageCardProductProps {}

ItemImageCardProduct.defaultProps = {};

export default function ItemImageCardProduct(
  props: IItemImageCardProductProps
) {
  const { isLoading: isLoadingGetProductItem } = useProductGetProductItem();
  const { state, dispatch } = useContext(ProductContext);
 

  if (isLoadingGetProductItem) {
    return <div></div>;
  }

  const handleSelectImage = (data: string) => {
    dispatch({ type: ProductActionEnum.ChangeZoomImage, payload: data });
  };

  console.log(state.images, "ini apa");
  return (
    <div
      className={clsx(
        "flex flex-col items-start justify-start",
        "min-w-[276px] gap-y-[1rem]"
      )}
    >
      <ZoomImageProduct coverImage={state.images.large} />

      <ProductImageListProduct
        imageList={state.images.list}
        onSelect={handleSelectImage}
      />
    </div>
  );
}
