import { ReactQueryKey } from "@/src/core/lib/constants";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { ProfileUpdateReactQueryKey } from "../constants";
import { ProfileUpdateContext } from "../contexts/update/ProfileUpdate.context";
import { ProfileUpdateActionEnum } from "../contexts/update/ProfileUpdate.types";
import {
  IGetSupplierProfileErrorResponse,
  IGetSupplierProfileSuccessResponse,
} from "../models";
import { fetchGetSupplierProfile } from "../services";

// export const useGetSupplierProfileQuery = () =>
//   useQuery<
//     IGetSupplierProfileSuccessResponse,
//     IGetSupplierProfileErrorResponse
//   >([ReactQueryKey.GetSupplierProfile], fetchGetSupplierProfile);

// export const useCheckBankAccountIsLocked = () =>
//   !useGetSupplierProfileQuery()?.data?.detail?.is_lock_bank;

export const useProfileUpdateGetSupplierData = () => {
  const { dispatch } = useContext(ProfileUpdateContext);
  const query = useQuery<
    IGetSupplierProfileSuccessResponse,
    IGetSupplierProfileErrorResponse
  >([ProfileUpdateReactQueryKey.GetSupplierProfile], () => {
    return fetchGetSupplierProfile();
  });

  useEffect(() => {
    if (query.isSuccess) {
      dispatch({
        type: ProfileUpdateActionEnum.SetIsLockedBank,
        payload: query.data.detail.is_lock_bank,
      });
    }
  }, [query.isSuccess]);

  useEffect(() => {
    if (query.isSuccess) {
      dispatch({
        type: ProfileUpdateActionEnum.SetShopName,
        payload: query.data.name,
      });
      // TODO: must change when be is ready for address and detail address
      dispatch({
        type: ProfileUpdateActionEnum.SetAddress,
        payload: query.data.detail.bank_name,
      });
      dispatch({
        type: ProfileUpdateActionEnum.SetDetailAddress,
        payload: query.data.name,
      });
      dispatch({
        type: ProfileUpdateActionEnum.SetBank,
        payload: query.data.detail.bank_name,
      });
      dispatch({
        type: ProfileUpdateActionEnum.SetAccountNumber,
        payload: query.data.detail.bank_account,
      });
      dispatch({
        type: ProfileUpdateActionEnum.SetAccountNumberHolder,
        payload: query.data.name,
      });
    }
  }, [query.isSuccess]);
  return query;
};
