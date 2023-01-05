import { useState } from "react";
import clsx from "clsx";
import HideIcon from "@/src/core/ui/icons/hide/Hide.icon";
import ChevronIcon from "@/src/core/ui/icons/chevron/Chevron.icon";
export interface IVariantShowcaseAccordionManageProductProps {
  variantItem?: {
    name?: string;
    price?: string;
    stock?: number;
    sku?: string;
  }[];
  total?: string;
}
VariantShowcaseAccordionManageProduct.defaultProps = {
  variantItem: [],
  total: 0,
};

export default function VariantShowcaseAccordionManageProduct(
  props: IVariantShowcaseAccordionManageProductProps
) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <div className={clsx("border border-gainsboro", "rounded-[0.5rem]")}>
      <button
        className={clsx(
          "flex justify-between items-center",
          "w-full px-[0.625rem] py-[0.5rem] rounded-tr-[0.5rem] rounded-tl-[0.5rem]",
          "bg-bright-gray"
        )}
        onClick={handleOpen}
      >
        <p
          className={clsx("text-[0.875rem] text-charleston-green font-regular")}
        >
          {props.total}
        </p>

        <div className={clsx("flex items-center justify-end gap-x-[0.25rem]")}>
          <p
            className={clsx(
              "text-[0.875rem] text-charleston-green font-regular"
            )}
          >
            {"Lihat varian"}
          </p>
          <ChevronIcon
            className={clsx(
              "w-[1.5rem] h-[1.5rem]",
              "fill-charleston-green",
              open ? "rotate-270" : "rotate-90"
            )}
          />
        </div>
      </button>

      {/* ACCORDION BODY */}
      {props.variantItem.map((item, index) => (
        <div
          key={index}
          className={clsx(
            "grid grid-cols-[1fr_1fr_1fr_3rem] items-center content-center",
            "w-full p-[1rem] rounded-br-[0.5rem] rounded-bl-[0.5rem]",
            "bg-bright-gray",
            "border-t border-t-gainsboro",
            "box-border",
            open ? "block" : "hidden"
          )}
        >
          <div className={clsx("grid grid-cols-1 gap-y-[0.25rem]", "w-full")}>
            <p
              className={clsx(
                "text-[0.875rem] text-charleston-green font-bold"
              )}
            >
              {item.name}
            </p>
            <p
              className={clsx("text-[0.75rem] text-independence font-regular")}
            >
              {item.sku}
            </p>
          </div>

          <div className={clsx("grid grid-cols-1 gap-y-[0.25rem]", "w-full")}>
            <p
              className={clsx("text-[0.75rem] text-independence font-regular")}
            >
              {"Harga"}
            </p>
            <p
              className={clsx(
                "text-[0.875rem] text-charleston-green font-bold"
              )}
            >
              {item.price}
            </p>
          </div>

          <div>
            <p
              className={clsx(
                "text-[0.875rem] text-charleston-green font-regular"
              )}
            >
              {item.stock}
            </p>
          </div>

          <HideIcon
            className={clsx(
              "w-[1.5rem] h-[1.5rem]",
              "fill-charleston-green hover:fill-ocean-boat-blue"
            )}
          />
        </div>
      ))}
    </div>
  );
}
