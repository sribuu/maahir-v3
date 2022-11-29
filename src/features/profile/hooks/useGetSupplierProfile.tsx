import { ReactQueryKey } from "@/src/core/lib/constants";
import { useQuery } from "@tanstack/react-query";
import {
  IGetSupplierProfileErrorResponse,
  IGetSupplierProfileSuccessResponse,
} from "../models";
import { fetchGetSupplierProfile } from "../services";

export const useGetSupplierProfileQuery = () =>
  useQuery<
    IGetSupplierProfileSuccessResponse,
    IGetSupplierProfileErrorResponse
  >([ReactQueryKey.GetSupplierProfile], fetchGetSupplierProfile);

export const useCheckBankAccountIsLocked = () =>
  !useGetSupplierProfileQuery()?.data?.detail?.is_lock_bank;

