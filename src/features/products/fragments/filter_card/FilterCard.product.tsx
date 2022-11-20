import { useState } from "react";
import clsx from "clsx";
import { useQuery } from "@tanstack/react-query";
import { IPriceCategory, IProductCategory } from "@/src/core/lib/models";
import { ReactQueryKey } from "@/src/core/lib/constants";
import {
  fetchMaahirPriceCategory,
  fetchMaahirProductCategory,
} from "@/src/core/lib/api";
import CheckboxComponent from "@/src/core/ui/components/checkbox/Checkbox.component";

export interface IFilterCardProductProps {}

export default function FilterCardProduct(props: IFilterCardProductProps) {
  const [activeProductCategory, setActiveProductCategory] = useState("");
  const [activePriceCategory, setActivePriceCategory] = useState("");
  const { data: productCategoryData, isSuccess: isSuccessProductCategoryData } =
    useQuery<IProductCategory[]>({
      queryKey: [ReactQueryKey.GetProductCategory],
      queryFn: fetchMaahirProductCategory,
    });

  const { data: priceCategoryData, isSuccess: isSuccessPriceCategoryData } =
    useQuery<IPriceCategory[]>({
      queryKey: [ReactQueryKey.GetPriceCategory],
      queryFn: fetchMaahirPriceCategory,
    });

  const handleChangeProductCategory = (
    e?: React.ChangeEvent<HTMLInputElement>
  ) => {
    setActiveProductCategory(e.currentTarget.id);
  };

  const handleChangePriceCategory = (
    e?: React.MouseEvent<HTMLButtonElement>
  ) => {
    setActivePriceCategory(e.currentTarget.id);
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
                id={String(index)}
                key={index}
                name={item.name}
                checked={String(index) === activeProductCategory}
                onChange={handleChangeProductCategory}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
