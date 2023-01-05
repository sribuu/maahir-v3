import { IResellerCheckout } from "@/src/core/lib/models/reseller";
import { useQuery } from "@tanstack/react-query";
import { ResellerHomeReactQueryKey } from "../constants";
import { fetchGetViralProductFromCheckout } from "../services";

export const useResellerHomeGetCheckout = () => {
  const query = useQuery<IResellerCheckout>(
    [ResellerHomeReactQueryKey.GetViralProductFromCheckout],
    () => {
      return fetchGetViralProductFromCheckout();
    }
  );
  return query;
};
