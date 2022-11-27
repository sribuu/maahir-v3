import * as React from "react";
import clsx from "clsx";
import SupplierLayout from "@/src/core/ui/layouts/supplier/Supplier.layout";
import ManagementCardProduct from "../../fragments/management_card/ManagementCard.product";

export interface IManagementProductContainerProps {}

export default function ManagementProductContainer(
  props: IManagementProductContainerProps
) {
  const header = {
    name: "Kelola Produk",
    description: "Tambah atau kelola produk kamu disini",
  };
  return (
    <SupplierLayout header={header}>
      <ManagementCardProduct />
    </SupplierLayout>
  );
}
