import React, { useContext, useEffect } from "react";
import clsx from "clsx";
import CheckboxComponent from "@/src/core/ui/components/checkbox/Checkbox.component";
import AvatarComponent from "@/src/core/ui/components/avatar/Avatar.component";

import { ResellerMyCartContext } from "../../contexts/my_cart/MyCart.context";
import { ResellerMyCartActionsEnum } from "../../contexts/my_cart/MyCart.types";

import ItemListCart from "../item_list/ItemList.cart";
import { useMyCartRemoveCartItems } from "../../hooks/useRemoveCartItems";
import { useMyCartSaveCartItemsQuantity } from "../../hooks/useSaveCartItemsQuantity";
import { useMyCartSaveCartItemsNote } from "../../hooks/useSaveCartItemsNote";
import { thousandSeparator } from "@/src/core/utils/formatters";
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
  const { mutate: removeCartItem } = useMyCartRemoveCartItems();

  const { mutate: saveCartItemQuantities } = useMyCartSaveCartItemsQuantity();
  const { mutate: saveCartNoteItems } = useMyCartSaveCartItemsNote();

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: ResellerMyCartActionsEnum.SelectAll,
    });
  };

  const handleSelectSupplier = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: ResellerMyCartActionsEnum.SelectSupplier,
      payload: parseInt(String(e.currentTarget.value)),
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

  const totalSelectedQuantity: number = state.cart.items?.reduce(
    (acc, item) => {
      const supplierItemTotal = item?.supplier?.data.reduce(
        (accSupplierItem, supplierItem) => {
          accSupplierItem = supplierItem.selected
            ? supplierItem.quantity + accSupplierItem
            : accSupplierItem;
          return accSupplierItem;
        },
        0
      );
      return acc + supplierItemTotal;
    },
    0
  );

  const noSelectedItems = totalSelectedQuantity <= 0
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

        {state.cart.items.map((item, index) => (
          <div
            key={index}
            className={clsx("grid grid-cols-1 gap-y-[1rem]", "w-full")}
          >
            <div
              className={clsx("flex items-center justify-start gap-x-[1rem]")}
            >
              <CheckboxComponent
                value={String(item.supplier.id)}
                checked={item.supplier.selected}
                onChange={handleSelectSupplier}
              />
              <AvatarComponent text={item.supplier.name_initial} />
              <div
                className={clsx(
                  "grid grid-cols-1 justify-start justify-items-start gap-y-[0.125rem]"
                )}
              >
                <p
                  className={clsx(
                    "text-[1rem] font-bold text-charleston-green text-start"
                  )}
                >
                  {item.supplier.name}
                </p>
                <p
                  className={clsx(
                    "text-[0.75rem] font-regular text-charleston-green text-start"
                  )}
                >
                  {item.supplier.address.administrative_division_level_2_name}
                </p>
              </div>
            </div>

            {item.supplier.data.map((supplierItem, supplierIndex) => (
              <ItemListCart
                key={supplierIndex}
                id={String(supplierItem.variant_id)}
                image={supplierItem.image}
                categoryName={supplierItem.category_name}
                name={supplierItem.product_name}
                variant={supplierItem.variant_name}
                note={supplierItem.note}
                price={thousandSeparator(supplierItem.price)}
                checked={supplierItem.selected}
                onSelect={handleSelectItem}
                onSaveNote={handleSaveNote}
                onAdd={handleAdd}
                onSubstract={handleSubstract}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
