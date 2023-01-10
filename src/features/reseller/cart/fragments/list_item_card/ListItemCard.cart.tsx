import React, { useContext } from "react";
import clsx from "clsx";
import CheckboxComponent from "@/src/core/ui/components/checkbox/Checkbox.component";

import { ResellerMyCartContext } from "../../contexts/my_cart/MyCart.context";
import { ResellerMyCartActionsEnum } from "../../contexts/my_cart/MyCart.types";

import ItemListCart from "../item_list/ItemList.cart";
import { useMyCartAvailableItemsRemoveCart } from "../../hooks/useRemoveCartItems";
import { useMyCartSaveCartItemsQuantity } from "../../hooks/useSaveCartItemsQuantity";
import { useMyCartSaveCartItemsNote } from "../../hooks/useSaveCartItemsNote";
import InformationCircleIcon from "@/src/core/ui/icons/information_circle/InformationCircle.icon";
export interface IListItemCardCartProps {
  category?: string;
  name?: string;
  price?: string;
  productSrc?: string;
  onChangeNotes?: (e?: React.ChangeEvent<HTMLInputElement>) => void;
}
ListItemCardCart.defaultProps = {
  category: "Kecantikan",
  name: "Paket Reseller Parfum Wanita Botol Kaca",
  price: "Rp49.999",
  productSrc: "/images/sample-product.png",
};
export default function ListItemCardCart(props: IListItemCardCartProps) {
  const { state, dispatch } = useContext(ResellerMyCartContext);
  const { mutate: removeCartItem } = useMyCartAvailableItemsRemoveCart();

  const { mutate: saveCartItemQuantities } = useMyCartSaveCartItemsQuantity();
  const { mutate: saveCartNoteItems } = useMyCartSaveCartItemsNote();

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: ResellerMyCartActionsEnum.SelectAll,
    });
  };

  const handleSelectItem = (data: number) => {
    dispatch({
      type: ResellerMyCartActionsEnum.SelectItem,
      payload: data,
    });
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    removeCartItem();
  };

  const handleSaveNote = (data: { id: number; value: string }) => {
    saveCartNoteItems({ variantId: data.id, note: data.value });
  };

  const handleAdd = (data: { id: number; value: number }) => {
    saveCartItemQuantities({ variantId: data.id, quantity: data.value });
  };

  const handleSubstract = (data: { id: number; value: number }) => {
    saveCartItemQuantities({ variantId: data.id, quantity: data.value });
  };

  const noSelectedItems =
    state.cart.items.length + state.cart.unavailable_items.length <= 0;
  const unavailableItemText = "Ada barang yang tidak bisa di proses nih";
  const seeUnavailableItemText = "Lihat Barang";

  const handleSeeUnavailableItem = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch({
      type: ResellerMyCartActionsEnum.ShowUnavailableItems,
    });
  };
  return (
    <div
      className={clsx(
        "grid gap-y-[2rem] grid-cols-1 items-start content-start",
        "p-6 rounded-[1rem] border max-w-[1200px] w-full box-border",
        "bg-white shadow-1 border-bright-gray"
      )}
    >
      <div className={clsx("grid grid-cols-1", "gap-y-[1.25rem] w-full")}>
        {/* badge */}
        <div
          className={clsx(
            state.cart.is_any_unavailable_items ? "flex" : "hidden",
            "items-center justify-between",
            "w-full",
            "px-[18px] py-[14px]",
            "bg-lavender-blush",
            "border border-tart-orange",
            "rounded-[0.75rem]"
          )}
        >
          <div
            className={clsx("flex items-center justify-start gap-x-[0.625rem]")}
          >
            <InformationCircleIcon
              className={clsx("w-[1.5rem] h-[1.5rem] fill-tart-orange")}
            />
            <p
              className={clsx("text-[1rem] text-charleston-green font-medium")}
            >
              {unavailableItemText}
            </p>
          </div>

          <button
            className={clsx("text-[0.875rem] text-ocean-boat-blue font-bold")}
            onClick={handleSeeUnavailableItem}
          >
            {seeUnavailableItemText}
          </button>
        </div>
        {/* end badge */}

        <div className={clsx("flex w-full justify-between items-center")}>
          <CheckboxComponent
            name={"Pilih Semua"}
            checked={state.cart.select_all}
            onChange={handleSelectAll}
          />

          <button
            className={clsx(noSelectedItems ? "hidden" : "block")}
            onClick={handleDelete}
          >
            <p className={clsx("text-[1rem] text-ocean-boat-blue font-bold")}>
              {"Hapus"}
            </p>
          </button>
        </div>

        <hr className={clsx("border border-bright-gray")} />

        <div className={clsx("grid grid-cols-1 gap-y-[1rem]", "w-full")}>
          {state.cart.items.map((supplierItem, supplierIndex) => (
            <ItemListCart
              key={supplierIndex}
              id={supplierItem.variant_id}
              image={supplierItem.image}
              categoryName={supplierItem.category_name}
              name={supplierItem.product_name}
              variant={supplierItem.variant_name}
              note={supplierItem.note}
              quantity={supplierItem.quantity}
              price={supplierItem.formatted_price}
              checked={supplierItem.selected}
              onSelect={handleSelectItem}
              onSaveNote={handleSaveNote}
              onAdd={handleAdd}
              onSubstract={handleSubstract}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
