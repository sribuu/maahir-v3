import { useGetSupplierProfileQuery } from "../../profile/hooks/useGetSupplierProfile";

export const useCheckAccountNumber = () =>
  useGetSupplierProfileQuery()?.data?.detail?.is_lock_bank;
