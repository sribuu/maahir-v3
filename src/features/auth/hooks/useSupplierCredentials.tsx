import { useMutation } from "@tanstack/react-query";
import { fetchSetSupplierCredentials } from "@/src/features/auth/services";
import { ReactQueryKey } from "@/src/core/lib/constants";
import { IToken } from "../models/token";

export const useMutateSupplierCredentialQuery = () =>
  useMutation<IToken, any, IToken>(
    [ReactQueryKey.SaveSupplierCredentials],
    (data: IToken) => fetchSetSupplierCredentials(data)
  );
