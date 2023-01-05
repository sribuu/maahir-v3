import React, { useContext } from "react";
import clsx from "clsx";
import TextfieldComponent from "@/src/core/ui/components/textfield/Textfield.component";
import HideIcon from "@/src/core/ui/icons/hide/Hide.icon";
import ShowIcon from "@/src/core/ui/icons/show/Show.icon";
import { EditSupplierProductContext } from "../../contexts/edit/EditSupplierProduct.context";
import { EditSupplierProductActionEnum } from "../../contexts/edit/EditSupplierProduct.types";

export interface IEditVariantFormManageProductProps {}

export default function EditVariantFormManageProduct(
  props: IEditVariantFormManageProductProps
) {
  const { state, dispatch } = useContext(EditSupplierProductContext);
  const header = ["SKU", "Varian", "Harga", "Stok", "Pilihan Aksi"];

  const handleChangeSKU = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: EditSupplierProductActionEnum.SetVariantSKU,
      payload: { id: e.currentTarget.id, value: e.currentTarget.value },
    });
  };
  const handleChangeVariant = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: EditSupplierProductActionEnum.SetVariantName,
      payload: { id: e.currentTarget.id, value: e.currentTarget.value },
    });
  };
  const handleChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: EditSupplierProductActionEnum.SetVariantPrice,
      payload: { id: e.currentTarget.id, value: e.currentTarget.value },
    });
  };
  const handleChangeStock = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: EditSupplierProductActionEnum.SetVariantStock,
      payload: { id: e.currentTarget.id, value: e.currentTarget.value },
    });
  };

  const handleAddVariant = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch({
      type: EditSupplierProductActionEnum.AddVariant,
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
            "grid grid-cols-[1fr_1fr_1fr_1fr_92px] gap-x-[1.5rem]",
            "w-full p-[0.5rem]",
            "border-b border-b-bright-gray "
          )}
        >
          {header.map((item, index) => (
            <p
              key={`header-${index}`}
              className={clsx("text-[1rem] text-charleston-green font-medium")}
            >
              {item}
            </p>
          ))}
        </div>

        {state.variant.map((item, index) => (
          <div
            key={`table-${index}`}
            id={String(index)}
            className={clsx(
              "grid grid-cols-[1fr_1fr_1fr_1fr_92px] gap-x-[1.5rem] gap-y-[1rem]",
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
            <button
              id={String(index)}
              className={clsx(
                "grid grid-cols-1 place-content-center place-items-center"
              )}
            >
              {item.action.value === "hide" && (
                <HideIcon className={clsx("w-[1.5rem] h-[1.5rem]")} />
              )}

              {item.action.value === "show" && (
                <ShowIcon className={clsx("w-[1.5rem] h-[1.5rem]")} />
              )}

              <p
                className={clsx("text-[0.75rem] text-taupe-gray font-regular")}
              >
                {item.action.value === "hide" ? "Perlihatkan" : "Sembunyikan"}
              </p>
            </button>
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
