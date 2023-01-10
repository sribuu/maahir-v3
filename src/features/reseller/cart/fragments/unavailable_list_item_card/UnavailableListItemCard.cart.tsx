import React, { useContext } from "react";
import clsx from "clsx";
import UnavailableItemListCart from "../unavailable_item_list/UnavailableItemList.cart";
import { ResellerMyCartContext } from "../../contexts/my_cart/MyCart.context";

export interface IUnavailableListItemCardCartProps {}

export default function UnavailableListItemCardCart(
  props: IUnavailableListItemCardCartProps
) {
  const { state } = useContext(ResellerMyCartContext);
  const totalQuantity = 1;
  const title = `Barang tidak bisa di proses (${totalQuantity})`;
  const deleteText = "Hapus";

  const handleClickDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    // TODO: dispatch delete unavailable items
  };
  return (
    <div
      className={clsx(
        state.cart.show_unavailable_items ? "grid" : "hidden",
        "gap-y-[20px] grid-cols-1 items-start content-start",
        "p-6 rounded-[1rem] border max-w-[1200px] w-full box-border",
        "bg-white shadow-1 border-bright-gray"
      )}
    >
      <div className={clsx("flex items-center justify-between", "w-full")}>
        <h3 className={clsx("text-[1rem] text-charleston-green font-regular")}>
          {title}
        </h3>

        <button
          className={clsx("text-[0.875rem] text-ocean-boat-blue font-bold")}
          onClick={handleClickDelete}
        >
          {deleteText}
        </button>
      </div>

      {/* divider */}
      <div className={clsx("w-full h-[1px]", "bg-bright-gray")} />

      {state.cart.unavailable_items.map((item, index) => (
        <UnavailableItemListCart
          key={index}
          image={item.image}
          categoryName={item.category_name}
          name={item.product_name}
          variant={item.variant_name}
          price={item.formatted_price}
        />
      ))}
    </div>
  );
}
