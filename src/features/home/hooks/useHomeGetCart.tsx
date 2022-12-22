import { IResellerCart } from "@/src/core/lib/models/reseller/cart";
import { useQuery } from "@tanstack/react-query";
import { ResellerHomeReactQueryKey } from "../constants";
import { fetchGetCart } from "../services";

export const useResellerHomeGetCart = () => {
  const query = useQuery<IResellerCart[]>(
    [ResellerHomeReactQueryKey.GetCart],
    () => {
      return fetchGetCart();
    }
  );
  return query;
};
