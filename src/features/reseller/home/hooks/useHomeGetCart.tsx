import { IResellerCart } from "@/src/core/lib/models/reseller/cart";
import { getCart } from "@/src/storage/reseller/cart";
import { useQuery } from "@tanstack/react-query";
import { ResellerHomeReactQueryKey } from "../constants";

export const useResellerHomeGetCart = () => {
  const query = useQuery<IResellerCart[]>(
    [ResellerHomeReactQueryKey.GetCart],
    () => {
      return getCart();
    }
  );
  return query;
};
