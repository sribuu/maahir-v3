import {
  ErrorMessage,
  ReactQueryKey,
  RouterPathName,
} from "@/src/core/lib/constants";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import {
  ISupplierStatisticErrorResponse,
  ISupplierStatisticSuccessResponse,
} from "../models";
import { fetchSupplierStatistic } from "../services";

export const useGetSupplierStatisticQuery = () =>
  useQuery<ISupplierStatisticSuccessResponse, ISupplierStatisticErrorResponse>(
    [ReactQueryKey.GetSupplierStatistic],
    fetchSupplierStatistic,
    {
      retry: false,
    }
  );

export const useUnauthorizedGetSupplierStatisticQuery = () => {
  const { error } = useGetSupplierStatisticQuery();
  const router = useRouter();

  if (error?.error_code === ErrorMessage.Unauthorized) {
    router.push(RouterPathName.Login);
  }
};
