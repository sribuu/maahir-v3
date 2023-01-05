import { useState, useEffect, useRef, useContext } from "react";
import clsx from "clsx";
import BackdropComponent from "@/src/core/ui/components/backdrop/Backdrop.component";
import useOnClickOutside from "@/src/core/hooks/ui/useOnClickOutside";
import FilterIcon from "@/src/core/ui/icons/filter/Filter.icon";
import { useProductsGetCategoryList } from "../../hooks/useProductCategory";
import { ProductsActionEnum } from "../../contexts/products/Products.types";
import { ProductsContext } from "../../contexts/products/Products.context";
import CloseIcon from "@/src/core/ui/icons/close/Close.icon";
import CheckboxComponent from "@/src/core/ui/components/checkbox/Checkbox.component";
import { resellerPriceCategory } from "@/src/data/reseller/static";

export interface IFilterDrawerProductProps {
  variant?: string;
  menu?: { name: string; link: string }[];
  onClose?: () => void;
  open?: boolean;
}

FilterDrawerProduct.defaultProps = {
  variant: "",
  menu: [],
  open: false,
};

export default function FilterDrawerProduct(props: IFilterDrawerProductProps) {
  const { isLoading: isLoadingCategoryFilterList } =
    useProductsGetCategoryList();
  const { state, dispatch } = useContext(ProductsContext);

  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => {
    if (props.onClose) {
      props.onClose();
    }
    setOpen(false);
  });

  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);

  useEffect(() => {
    dispatch({
      type: ProductsActionEnum.SetPriceFilterList,
      payload: resellerPriceCategory.map((item) => item.name),
    });
  }, []);

  if (isLoadingCategoryFilterList) {
    return <div></div>;
  }

  const handleClickOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(true);
  };

  const handleClickBack = (e: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(false);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

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
    <>
      <button
        className={clsx(
          "w-[2rem] h-[2rem]",
          "border border-bright-gray",
          "rounded-[0.5rem]",
          "border-box",
          "flex items-center justify-center"
        )}
        onClick={handleClickOpen}
      >
        <FilterIcon
          className={clsx("w-[1.25rem] h-[1.25rem]", "fill-charleston-green")}
        />
      </button>
      <div className={clsx(open ? "block" : "hidden")}>
        <BackdropComponent onClick={handleClickClose}>
          <div
            ref={ref}
            className={clsx(
              "bg-white",
              "w-[276px] min-h-[100vh] p-[1.5rem]",
              "fixed right-0 top-0 bottom-0",
              "grid grid-cols-1 place-content-start place-items-start gap-y-[1.25rem]"
            )}
          >
            <div
              className={clsx(
                " w-full",
                "pb-[1.25rem]",
                "border-b border-b-bright-gray",
                "box-border",
                "flex items-center justify-between"
              )}
            >
              <div
                className={clsx(
                  "flex items-center justify-start gap-x-[0.5rem]"
                )}
              >
                <button onClick={handleClickBack}>
                  <CloseIcon
                    className={clsx(
                      "w-[1.5rem] h-[1.5rem]",
                      "fill-charleston-green"
                    )}
                  />
                </button>

                <h1
                  className={clsx(
                    "text-charleston-green text-[1rem] font-bold"
                  )}
                >
                  {"Filter"}
                </h1>
              </div>

              {/* delete filter */}
              {(state.filters.price.selected.length > 0 ||
                state.filters.category.selected.length > 0) && (
                <button onClick={handleDeleteFilter}>
                  <p
                    className={clsx(
                      "text-[0.875rem] text-tart-orange font-bold"
                    )}
                  >
                    {"Reset Filter"}
                  </p>
                </button>
              )}
            </div>

            <div
              className={clsx("grid gap-y-[1.25rem] items-start content-start")}
            >
              {/* price */}

              <div
                className={clsx(
                  "grid gap-y-[1.25rem] items-start content-start"
                )}
              >
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
              <div
                className={clsx(
                  "grid gap-y-[1.25rem] items-start content-start"
                )}
              >
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
            </div>
          </div>
        </BackdropComponent>
      </div>
    </>
  );
}
