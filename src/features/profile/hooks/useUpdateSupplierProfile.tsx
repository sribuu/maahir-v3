import { useContext, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  IUpdateSupplierProfileRequest,
  IUpdateSupplierProfileSuccessResponse,
  IUpdateSupplierProfileErrorResponse,
} from "../models";
import { fetchUpdateSupplierProfile } from "../services";
import { ProfileUpdateContext } from "../contexts/update/ProfileUpdate.context";
import { ProfileUpdateReactQueryKey } from "../constants";
import { IOptions } from "@/src/core/lib/models";
import { ProfileUpdateActionEnum } from "../contexts/update/ProfileUpdate.types";

export const useProfileUpdateSupplierProfile = () => {
  const { state, dispatch } = useContext(ProfileUpdateContext);
  const queryClient = useQueryClient();
  const mutation = useMutation<
    IUpdateSupplierProfileSuccessResponse,
    IUpdateSupplierProfileErrorResponse
  >([ProfileUpdateReactQueryKey.UpdateSupplierProfile], () => {
    const bankList: IOptions[] = queryClient.getQueryData([
      ProfileUpdateReactQueryKey.GetBankList,
    ]);

    const bankId = bankList.filter(
      (item) => item.option_name === state.form.bank.value
    )[0].id;

    const addressList: IOptions[] = queryClient.getQueryData([
      ProfileUpdateReactQueryKey.GetAddressList,
    ]);

    const addressId = addressList.filter(
      (item) => item.option_name === state.form.address.value
    )[0].id;

    const payload: IUpdateSupplierProfileRequest = {
      name: state.form.shop_name.value,
      address_id: addressId,
      detail_address: state.form.detail_address.value,
      bank_account: state.form.account_number.value,
      bank_id: bankId,
      bank_name_holder: state.form.account_number_holder.value,
    };
    return fetchUpdateSupplierProfile(payload);
  });

  useEffect(() => {
    if (mutation.isSuccess) {
      dispatch({
        type: ProfileUpdateActionEnum.SetNotification,
        payload: {
          open: true,
          success: true,
          message: "Profil berhasil diperbarui",
        },
      });
    }
  }, [mutation.isSuccess]);

  useEffect(() => {
    if (mutation.isError) {
      dispatch({
        type: ProfileUpdateActionEnum.SetNotification,
        payload: {
          open: true,
          success: false,
          message: "Profil gagal diperbarui",
        },
      });
    }
  }, [mutation.isError]);
  return mutation;
};
