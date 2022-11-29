import * as React from "react";
import clsx from "clsx";
import CardComponent from "@/src/core/ui/components/card/Card.component";
import EditProfileFormProfile from "../edit_profile_form/EditProfileForm.profile";
import { useBankListQuery } from "../../hooks/useBankList";
export interface IEditProfileCardProfileProps {}

export default function EditProfileCardProfile(
  props: IEditProfileCardProfileProps
) {
  const { isLoading: isLoadingBankList } = useBankListQuery();

  if (isLoadingBankList) {
    return <div />;
  }

  return (
    <CardComponent className={clsx("p-[1.5rem]")}>
      <div
        className={clsx(
          "grid grid-cols-1 justify-start gap-y-[1rem]",
          "w-full"
        )}
      >
        <p className={clsx("text-[1.25rem] text-dark-charcoal font-bold")}>
          {"Atur Profil"}
        </p>

        <EditProfileFormProfile />
      </div>
    </CardComponent>
  );
}
