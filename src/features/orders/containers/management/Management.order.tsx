import * as React from "react";
import SupplierLayout from "@/src/core/ui/layouts/supplier/Supplier.layout";
import ManagementCardOrder from "../../fragments/management_card/ManagementCard.order";

export interface IManagementOrderContainerProps {}

export default function ManagementOrderContainer(
  props: IManagementOrderContainerProps
) {
  const header = {
    name: "Kelola Pesanan",
    description: "Cek semua pesanan kamu",
  };
  return (
    <SupplierLayout header={header}>
      <ManagementCardOrder />
    </SupplierLayout>
  );
}
