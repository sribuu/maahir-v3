import { useQuery } from "@tanstack/react-query";
import { IPaymentMethodItems } from "@/src/core/lib/models/payment_method";
import { ReactQueryKey } from "@/src/core/lib/constants";
import { fetchPaymentMethod } from "@/src/core/lib/api/dynamic";

export const usePaymentMethodQuery = () =>
  useQuery<IPaymentMethodItems>(
    [ReactQueryKey.GetPaymentMethod],
    fetchPaymentMethod
  );

export const usePaymentMethodData = () =>
  usePaymentMethodQuery()
    ?.data?.items.filter((item) => item?.status === "ACTIVE")
    .map((item) => {
      return {
        id: item.id,
        name: item.provider_name,
        logo: item.pic,
      };
    });
