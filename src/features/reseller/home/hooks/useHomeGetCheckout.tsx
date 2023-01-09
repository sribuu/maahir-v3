import { IResellerCheckout } from "@/src/core/lib/models/reseller";
import { getCheckout } from "@/src/storage/reseller/checkout";
import { useQuery } from "@tanstack/react-query";
import { ResellerHomeReactQueryKey } from "../constants";

export const useResellerHomeGetCheckout = () => {
  const query = useQuery<IResellerCheckout>(
    [ResellerHomeReactQueryKey.GetViralProductFromCheckout],
    () => {
      return getCheckout();
    }
  );
  return query;
};
