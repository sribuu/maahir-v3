import * as React from "react";
import clsx from "clsx";
import CounterComponent from "@/src/core/ui/components/counter/Counter.component";
import { useGlobalCartSaveCartItemsQuantity } from "../../hooks/useSaveCartItemsQuantity";

export interface IDropdownItemCartProps {
  image?: string;
  categoryName?: string;
  productName?: string;
  price?: string;
  id?: string;
  quantity?: number;
}
DropdownItemCart.defaultProps = {
  image: "",
  categoryName: "",
  productName: "",
  price: "",
  quantity: 0,
};

export default function DropdownItemCart(props: IDropdownItemCartProps) {
  const { mutate } = useGlobalCartSaveCartItemsQuantity();
  const handleAddItem = (data: number) => {
    mutate({
      variantId: parseInt(String(props.id)),
      quantity: data,
    });
  };
  const handleSubstractItem = (data: number) => {
    mutate({
      variantId: parseInt(String(props.id)),
      quantity: data,
    });
  };
  return (
    <div
      id={props.id}
      className={clsx(
        "flex gap-x-[1.5rem] items-center content-start",
        "w-full"
      )}
    >
      <img
        src={props.image}
        className={clsx("object-cover", "w-[5rem] h-[5rem] rounded-[0.5rem]")}
      />

      {/* description */}
      <div className={clsx("grid grid-cols-1", "w-full gap-y-[0.5rem]")}>
        <div className={clsx("grid grid-cols-1", "w-full")}>
          <p className={clsx("text-[0.75rem] text-taupe-gray font-regular")}>
            {props.categoryName}
          </p>

          {/* TODO: techdebt ellipsis */}
          <div className={clsx("h-[1.5rem] overflow-hidden text-ellipsis")}>
            <p
              className={clsx(
                "text-[0.875rem] text-dark-charcoal font-regular text-ellipsis"
              )}
            >
              {props.productName}
            </p>
          </div>
        </div>

        <div className={clsx("flex justify-between items-center", "w-full")}>
          <p className={clsx("text-[1rem] text-charleston-green font-bold")}>
            {props.price}
          </p>
          <CounterComponent
            quantity={props.quantity}
            onSummation={handleAddItem}
            onSubstract={handleSubstractItem}
          />
        </div>
      </div>
      {/* end description */}
    </div>
  );
}
