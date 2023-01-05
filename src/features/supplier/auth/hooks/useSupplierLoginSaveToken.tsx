import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import moment from "moment";
import { fetchSetSupplierCredentials } from "@/src/features/supplier/auth/services";
import { IToken } from "../models/token";
import { SupplierLoginReactQueryKey } from "../constants";
import { ILoginSuccessResponse } from "../models";
import { useEffect } from "react";
import { RouterPathName } from "@/src/core/lib/constants";

export const useSupplierLoginSaveToken = () => {
  const router = useRouter();
  const mutation = useMutation<IToken, any, ILoginSuccessResponse>(
    [SupplierLoginReactQueryKey.SaveToken],
    (data: ILoginSuccessResponse) => {
      const payload: IToken = {
        token: data.token,
        refresh_token: data.refresh_token,
        expires_in: parseInt(data.expires_in),
        expired_date: moment()
          .add(parseInt(data.expires_in), "seconds")
          .format("YYYY-MM-DD hh:mm:ss"),
      };
      return fetchSetSupplierCredentials(payload);
    }
  );

  useEffect(() => {
    if (mutation.isSuccess) {
      router.push(RouterPathName.HomeSupplier);
    }
  }, [mutation.isSuccess]);
  return mutation;
};
