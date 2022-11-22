import React, { useState } from "react";
import clsx from "clsx";
import CheckboxComponent from "@/src/core/ui/components/checkbox/Checkbox.component";

import { useProductCategoryQuery } from "../../hooks/useProductCategory";
import { usePriceCategoryQuery } from "../../hooks/usePriceCategory";

export interface IFilterCardProductProps {
  onChangeProductCategory?: (e?: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePriceCategory?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function FilterCardProduct(props: IFilterCardProductProps) {
  const [activeProductCategory, setActiveProductCategory] = useState("");
  const [activePriceCategory, setActivePriceCategory] = useState("");

  const { data: productCategoryData, isSuccess: isSuccessProductCategoryData } =
    useProductCategoryQuery();

  const { data: priceCategoryData, isSuccess: isSuccessPriceCategoryData } =
    usePriceCategoryQuery();

  const handleChangeProductCategory = (
    e?: React.ChangeEvent<HTMLInputElement>
  ) => {
    const result =
      activeProductCategory === e.currentTarget.id ? "" : e.currentTarget.id;
    setActiveProductCategory(result);
    if (props.onChangeProductCategory) {
      props.onChangeProductCategory(e);
    }
  };

  const handleChangePriceCategory = (
    e?: React.MouseEvent<HTMLButtonElement>
  ) => {
    const result =
      activePriceCategory === e.currentTarget.id ? "" : e.currentTarget.id;
    setActivePriceCategory(result);
    if (props.onChangePriceCategory) {
      props.onChangePriceCategory(e);
    }
  };
  return (
    <div
      className={clsx(
        "grid gap-y-5",
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
          <p className={clsx("text-[1.25rem] text-charleston-green font-bold")}>
            {"Harga"}
          </p>

          {isSuccessPriceCategoryData &&
            priceCategoryData.map((item, index) => (
              <button
                id={String(index)}
                key={index}
                type={"button"}
                className={clsx(
                  "flex items-start justify-start",
                  "p-[0.75rem] w-full border rounded-[0.5rem]",
                  "hover:border-ocean-boat-blue",
                  "hover:bg-ocean-boat-blue-4",
                  String(index) === activePriceCategory
                    ? "border-ocean-boat-blue"
                    : " border-gainsboro",
                  String(index) === activePriceCategory
                    ? "bg-ocean-boat-blue-4"
                    : "bg-white"
                )}
                onClick={handleChangePriceCategory}
              >
                <p
                  className={clsx(
                    "text-[1rem] font-regular",
                    "hover:text-ocean-boat-blue",
                    String(index) === activePriceCategory
                      ? "text-ocean-boat-blue"
                      : "text-taupe-gray"
                  )}
                >
                  {item.name}
                </p>
              </button>
            ))}
        </div>

        {/* product  */}
        <div className={clsx("grid gap-y-[1.25rem] items-start content-start")}>
          <p className={clsx("text-[1.25rem] text-charleston-green font-bold")}>
            {"Kategori"}
          </p>

          {isSuccessProductCategoryData &&
            productCategoryData.map((item, index) => (
              <CheckboxComponent
                id={String(item.id)}
                key={index}
                name={item.option_name}
                checked={String(item.id) === activeProductCategory}
                onChange={handleChangeProductCategory}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
