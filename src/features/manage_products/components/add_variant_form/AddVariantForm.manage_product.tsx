import React, { useContext } from "react";
import clsx from "clsx";
import TextfieldComponent from "@/src/core/ui/components/textfield/Textfield.component";
import { AddSupplierProductContext } from "../../contexts/add/AddSupplierProduct.context";
import { AddSupplierProductActionEnum } from "../../contexts/add/AddSupplierProduct.types";
import HideIcon from "@/src/core/ui/icons/hide/Hide.icon";
import ShowIcon from "@/src/core/ui/icons/show/Show.icon";
import TrashIcon from "@/src/core/ui/icons/trash/Trash.icon";

export interface IAddVariantFormManageProductProps {}

export default function AddVariantFormManageProduct(
  props: IAddVariantFormManageProductProps
) {
  const { state, dispatch } = useContext(AddSupplierProductContext);
  const header = ["SKU", "Varian", "Harga", "Stok", "Pilihan Aksi"];

  const handleChangeSKU = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: AddSupplierProductActionEnum.SetVariantSKU,
      payload: { id: e.currentTarget.id, value: e.currentTarget.value },
    });
  };
  const handleChangeVariant = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: AddSupplierProductActionEnum.SetVariantName,
      payload: { id: e.currentTarget.id, value: e.currentTarget.value },
    });
  };
  const handleChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: AddSupplierProductActionEnum.SetVariantPrice,
      payload: { id: e.currentTarget.id, value: e.currentTarget.value },
    });
  };
  const handleChangeStock = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: AddSupplierProductActionEnum.SetVariantStock,
      payload: { id: e.currentTarget.id, value: e.currentTarget.value },
    });
  };

  const handleAddVariant = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch({
      type: AddSupplierProductActionEnum.AddVariant,
    });
  };

  const handleChangeSupplierProductShow = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    dispatch({
      type: AddSupplierProductActionEnum.SetVariantAvailability,
      payload: e.currentTarget.id,
    });
  };

  return (
    <div
      className={clsx(
        "grid grid-cols-1 gap-y-[1rem] place-content-start place-items-start",
        "w-full"
      )}
    >
      <h1 className={clsx("text-[1rem] text-charleston-green font-bold")}>
        {"Varian Produk"}
      </h1>
      <div
        className={clsx(
          "grid grid-cols-1 gap-y-[0.5rem] place-content-start place-items-start ",
          "w-full"
        )}
      >
        <div
          className={clsx(
            "grid grid-cols-[1fr_1fr_1fr_1fr_auto] gap-x-[1.5rem]",
            "w-full p-[0.5rem]",
            "border-b border-b-bright-gray "
          )}
        >
          {header.map((item, index) => (
            <p
              key={index}
              className={clsx("text-[1rem] text-charleston-green font-medium")}
            >
              {item}
            </p>
          ))}
        </div>
        {/* <DividerComponent /> */}
        {state.variant.map((item, index) => (
          <div
            key={index}
            id={String(index)}
            className={clsx(
              "grid grid-cols-[1fr_1fr_1fr_1fr_auto] gap-x-[1.5rem] gap-y-[1rem]",
              "w-full p-[0.5rem]"
            )}
          >
            <TextfieldComponent
              id={String(index)}
              value={item.sku.value}
              variant={"small"}
              placeholder={"SKU"}
              onChange={handleChangeSKU}
            />
            <TextfieldComponent
              id={String(index)}
              value={item.variant.value}
              variant={"small"}
              placeholder={"Varian"}
              onChange={handleChangeVariant}
            />
            <TextfieldComponent
              id={String(index)}
              variant={"small"}
              value={item.price.value}
              placeholder={"Harga"}
              onChange={handleChangePrice}
            />
            <TextfieldComponent
              id={String(index)}
              value={item.stock.value}
              variant={"small"}
              placeholder={"Stok"}
              onChange={handleChangeStock}
            />

            <div
              className={clsx(
                "flex items-center justify-center gap-x-[0.5rem]"
                // "w-full"
              )}
            >
              <button
                id={String(index)}
                className={clsx(
                  "grid grid-cols-1 place-content-center place-items-center",
                  "w-[92px]"
                )}
                onClick={handleChangeSupplierProductShow}
              >
                {item.action.value === "hide" && (
                  <HideIcon className={clsx("w-[1.5rem] h-[1.5rem]")} />
                )}

                {item.action.value === "show" && (
                  <ShowIcon className={clsx("w-[1.5rem] h-[1.5rem]")} />
                )}

                <p
                  className={clsx(
                    "text-[0.75rem] text-taupe-gray font-regular"
                  )}
                >
                  {item.action.value === "hide" ? "Perlihatkan" : "Sembunyikan"}
                </p>
              </button>
            </div>
          </div>
        ))}
      </div>

      <button onClick={handleAddVariant}>
        <p className={clsx("text-ocean-boat-blue text-[0.875rem] font-bold")}>
          {"Tambah Varian"}
        </p>
      </button>
    </div>
  );
}
