import * as React from "react";
import SupplierLayout from "@/src/core/ui/layouts/supplier/Supplier.layout";
import EditProfileCardProfile from "../../components/edit_profile_card/EditProfileCard.profile";

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
      <EditProfileCardProfile />
    </SupplierLayout>
  );
}
