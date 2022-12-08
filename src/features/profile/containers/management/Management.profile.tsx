import { useContext } from "react";
import SupplierLayout from "@/src/core/ui/layouts/supplier/Supplier.layout";
import EditProfileCardProfile from "../../components/edit_profile_card/EditProfileCard.profile";
import ToastComponent from "@/src/core/ui/components/toast/Toast.component";
import { ProfileUpdateContext } from "../../contexts/update/ProfileUpdate.context";
import { ProfileUpdateActionEnum } from "../../contexts/update/ProfileUpdate.types";

export interface IManagementProfileContainerProps {}

export default function ManagementProfileContainer(
  props: IManagementProfileContainerProps
) {
  const { state, dispatch } = useContext(ProfileUpdateContext);

  const header = {
    name: "Kelola Profil",
    description: "Atur profil tokomu",
  };

  const handleCloseToast = () => {
    dispatch({
      type: ProfileUpdateActionEnum.CloseNotification,
    });
  };

  return (
    <SupplierLayout header={header}>
      <EditProfileCardProfile />
      <ToastComponent
        open={state.notification.open}
        message={state.notification.message}
        error={!state.notification.success}
        onClose={handleCloseToast}
      />
    </SupplierLayout>
  );
}
