import * as React from "react";
import SupplierLayout from "@/src/core/ui/layouts/supplier/Supplier.layout";
import ManagementCardOrder from "../../components/management_card/ManagementCard.order";

export interface IManagementOrderContainerProps {}

export default function ManagementOrderContainer(
  props: IManagementOrderContainerProps
) {
  const header = {
    name: "Kelola Saldo",
    description: "Cek dan tarik saldo kamu",
  };
  return (
    <SupplierLayout header={header}>
      <ManagementCardOrder />
    </SupplierLayout>
  );
}
