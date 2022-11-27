import * as React from "react";
import SupplierLayout from "@/src/core/ui/layouts/supplier/Supplier.layout";

export interface IManagementProfileContainerProps {}

export default function ManagementProfileContainer(
  props: IManagementProfileContainerProps
) {
  const header = {
    name: "Kelola Profil",
    description: "Atur profil tokomu",
  };
  return (
    <SupplierLayout header={header}>
      <div></div>
    </SupplierLayout>
  );
}
