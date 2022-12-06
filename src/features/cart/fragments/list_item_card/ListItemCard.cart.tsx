import React, { useContext, useEffect } from "react";
import clsx from "clsx";
import CheckboxComponent from "@/src/core/ui/components/checkbox/Checkbox.component";
import CounterComponent from "@/src/core/ui/components/counter/Counter.component";

import { thousandSeparator } from "@/src/core/utils/formatters";

import { CartContext } from "../../contexts/cart/Cart.context";
import { CartActionsTypes } from "../../contexts/cart/Cart.reducers";
import {
  useCartRemoveCartItemByIdQuery,
  useCartSaveCartItemByIdQuery,
  useCartSaveCartItemNoteByIdQuery,
  useCartSaveCartItemQuantityByIdQuery,
} from "../../hooks/useCartItems";
import NotesComponent from "@/src/core/ui/components/notes/Notes.component";
import NotesInputComponent from "@/src/core/ui/components/notes_input/NotesInput.component";
import ItemListCart from "../item_list/ItemList.cart";
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
  const { state, dispatch } = useContext(CartContext);
  const {
    data: removeCartItemData,
    mutate: removeCartItem,
    isSuccess: isSuccessRemoveCartItem,
  } = useCartRemoveCartItemByIdQuery();

  const { mutate: saveCartNoteItems } = useCartSaveCartItemNoteByIdQuery();

  const { mutate: saveCartQuantityItems } =
    useCartSaveCartItemQuantityByIdQuery();

  const handleSelectItem = (data: number) => {
    dispatch({
      type: CartActionsTypes.SelectItem,
      payload: data,
    });
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: CartActionsTypes.SelectAllItems,
    });
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    removeCartItem();
  };

  const handleSaveNote = (data: { id: number; value: string }) => {
    saveCartNoteItems(data);
  };

  const handleAdd = (data: { id: number; value: number }) => {
    saveCartQuantityItems(data);
  };

  const handleSubstract = (data: { id: number; value: number }) => {
    saveCartQuantityItems(data);
  };

  useEffect(() => {
    if (isSuccessRemoveCartItem) {
      dispatch({
        type: CartActionsTypes.ClearSelectedItem,
      });
    }
  }, [removeCartItemData]);

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
            checked={
              state.cart.selected_items.length === state.cart.items?.length
            }
            onChange={handleSelectAll}
          />

          <button onClick={handleDelete}>
            <p
              className={clsx(
                "text-[0.875rem] text-ocean-boat-blue font-regular"
              )}
            >
              {"Hapus"}
            </p>
          </button>
        </div>

        <hr className={clsx("border border-bright-gray")} />

        {state.cart.items.map((item, index) => (
          <ItemListCart
            key={index}
            id={String(item.id)}
            item={item}
            checked={state.cart.selected_items.includes(item.id)}
            onSelect={handleSelectItem}
            onSaveNote={handleSaveNote}
            onAdd={handleAdd}
            onSubstract={handleSubstract}
          />
        ))}
      </div>
    </div>
  );
}
