import React, { useContext } from "react";
import clsx from "clsx";
import CheckboxComponent from "@/src/core/ui/components/checkbox/Checkbox.component";

import { ResellerMyCartContext } from "../../contexts/my_cart/MyCart.context";
import { ResellerMyCartActionsEnum } from "../../contexts/my_cart/MyCart.types";

import ItemListCart from "../item_list/ItemList.cart";
import { useMyCartAvailableItemsRemoveCart } from "../../hooks/useRemoveCart.cart";
import { useMyCartSaveCartItemsQuantity } from "../../hooks/useSaveCartItemsQuantity";
import { useMyCartSaveCartItemsNote } from "../../hooks/useSaveCartItemsNote";
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

  return (
    <div
      className={clsx(
        "grid gap-y-[2rem] grid-cols-1 items-start content-start",
        "p-6 rounded-[1rem] border max-w-[1200px] w-full box-border",
        "bg-white shadow-1 border-bright-gray"
      )}
    >
      <div className={clsx("grid grid-cols-1", "gap-y-[1.25rem] w-full")}>
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
