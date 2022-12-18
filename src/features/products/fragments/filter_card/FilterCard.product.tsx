import React, { useContext, useState } from "react";
import clsx from "clsx";
import CheckboxComponent from "@/src/core/ui/components/checkbox/Checkbox.component";
import SkeletonFilterCardProduct from "../skeleton_filter_card/SkeletonFilterCard.product";
import { useProductsGetCategoryList } from "../../hooks/useProductCategory";
import { useProductsGetPriceList } from "../../hooks/usePriceCategory";
import { ProductsContext } from "../../contexts/products/Products.context";
import { ProductsActionEnum } from "../../contexts/products/Products.types";

export interface IFilterCardProductProps {}

export default function FilterCardProduct(props: IFilterCardProductProps) {
  const { isLoading: isLoadingCategoryFilterList } =
    useProductsGetCategoryList();
  const { isLoading: isLoadingPriceFilterList } = useProductsGetPriceList();
  const { state, dispatch } = useContext(ProductsContext);

  if (isLoadingCategoryFilterList || isLoadingPriceFilterList) {
    return <SkeletonFilterCardProduct />;
  }

  const handleChangePriceCategory = (
    e?: React.MouseEvent<HTMLButtonElement>
  ) => {
    dispatch({
      type: ProductsActionEnum.FilterProductsByPrice,
      payload: e.currentTarget.value,
    });
  };

  const handleChangeProductCategory = (
    e?: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch({
      type: ProductsActionEnum.FilterProductsByCategory,
      payload: e.currentTarget.value,
    });
  };

  const handleDeleteFilter = () => {
    dispatch({
      type: ProductsActionEnum.FilterProductsByPrice,
      payload: "",
    });

    dispatch({
      type: ProductsActionEnum.FilterProductsByCategory,
      payload: "",
    });
  };

  return (
    <div
      className={clsx(
        "hidden sm:grid",
        "gap-y-5",
        "p-6 rounded-[1rem] border min-w-[276px]",
        "bg-white shadow-1 border-bright-gray"
      )}
    >
      <div className={clsx("grid gap-y-[1.25rem] items-start content-start")}>
        <p className={clsx("text-[1.25rem] text-charleston-green font-bold")}>
          {"Filter Berdasarkan"}
        </p>

        <hr className={clsx("border border-bright-gray")} />

        {/* price */}

        <div className={clsx("grid gap-y-[1.25rem] items-start content-start")}>
          <p
            className={clsx(
              "text-[1rem] sm:text-[1.25rem] text-charleston-green font-bold"
            )}
          >
            {"Harga"}
          </p>

          {state.filters.price.list.map((item, index) => (
            <button
              id={item}
              key={index}
              type={"button"}
              className={clsx(
                "flex items-start justify-start",
                "p-[0.75rem] w-full border rounded-[0.5rem]",
                "hover:border-ocean-boat-blue",
                "hover:bg-ocean-boat-blue-4",
                item === state.filters.price.selected
                  ? "border-ocean-boat-blue"
                  : " border-gainsboro",
                item === state.filters.price.selected
                  ? "bg-ocean-boat-blue-4"
                  : "bg-white"
              )}
              value={item}
              onClick={handleChangePriceCategory}
            >
              <p
                className={clsx(
                  "text-[0.875rem] sm:text-[1rem] font-regular",
                  "hover:text-ocean-boat-blue",
                  item === state.filters.price.selected
                    ? "text-ocean-boat-blue"
                    : "text-taupe-gray"
                )}
              >
                {item}
              </p>
            </button>
          ))}
        </div>

        {/* product  */}
        <div className={clsx("grid gap-y-[1.25rem] items-start content-start")}>
          <p
            className={clsx(
              "text-[1rem] sm:text-[1.25rem] text-charleston-green font-bold"
            )}
          >
            {"Kategori"}
          </p>

          {state.filters.category.list.map((item, index) => (
            <CheckboxComponent
              id={item}
              key={index}
              name={item}
              value={item}
              checked={item === state.filters.category.selected}
              onChange={handleChangeProductCategory}
            />
          ))}
        </div>

        {/* hapus semua filter */}

        {(state.filters.price.selected.length > 0 ||
          state.filters.category.selected.length > 0) && (
          <button onClick={handleDeleteFilter}>
            <p className={clsx("text-[0.875rem] text-tart-orange font-bold")}>
              {"Hapus Filter"}
            </p>
          </button>
        )}
      </div>
    </div>
  );
}
