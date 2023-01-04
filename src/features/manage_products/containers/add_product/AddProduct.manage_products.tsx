import * as React from "react";
import clsx from "clsx";
import SupplierLayout from "@/src/core/ui/layouts/supplier/Supplier.layout";
import CardComponent from "@/src/core/ui/components/card/Card.component";
import AddProductFormManageProduct from "../../components/add_product_form/AddProductForm.manage_product";

export interface IAddProductManageProductsContainerProps {}

export default function AddProductManageProductsContainer(
  props: IAddProductManageProductsContainerProps
) {
  const header = {
    name: "Kelola Produk",
    description: "Tambah atau kelola produk kamu disini",
  };

  return (
    <SupplierLayout header={header}>
      <CardComponent className={clsx("p-[1.5rem]")}>
        <div
          className={clsx(
            "grid grid-cols-1 gap-y-[1.5rem] place-content-start place-items-start",
            "w-full"
          )}
        >
          {/* header */}
          <div
            className={clsx(
              "flex items-start justify-between gap-x-[2rem]",
              "w-full"
            )}
          >
            <h1
              className={clsx("text-[1.25rem] text-charleston-green font-bold")}
            >
              {"Tambah Produk"}
            </h1>
          </div>

          {/* form */}

          <AddProductFormManageProduct />
        </div>
      </CardComponent>
    </SupplierLayout>
  );
}
