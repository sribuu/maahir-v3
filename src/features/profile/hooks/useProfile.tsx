import { useEffect, useState } from "react";
import { useGetSupplierProfileQuery } from "./useGetSupplierProfile";

export interface IUpdateProfileFormState {
  shop: string;
  bankName: string;
  accountNumber: string;
  name: string;
}

export const useDefaultValueUpdateProfileForm: () => IUpdateProfileFormState =
  () => {
    const data = useGetSupplierProfileQuery()?.data;
    return {
      shop: data?.name,
      accountNumber: data?.detail.bank_account,
      name: data?.name,
      bankName: data?.detail.bank_name,
    };
  };

export const useUpdateProfileFormState = (data?: IUpdateProfileFormState) => {
  const [formState, setFormState] = useState<IUpdateProfileFormState>({
    shop: "",
    bankName: "",
    accountNumber: "",
    name: "",
  });

  useEffect(() => {
    if (data !== undefined) {
      setFormState(data);
    }
  }, [data]);

  return {
    formState,
    setFormState,
  };
};
