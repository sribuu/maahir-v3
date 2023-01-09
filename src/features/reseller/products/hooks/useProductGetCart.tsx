import { IResellerCart } from "@/src/core/lib/models/reseller/cart";
import { getCart } from "@/src/storage/reseller/cart";
import { useQuery } from "@tanstack/react-query";
import { ProductReactQueryKey, ProductsReactQueryKey } from "../constants";

export const useResellerProductsGetCart = () => {
  const query = useQuery<IResellerCart[]>(
    [ProductsReactQueryKey.GetCartItem],
    () => {
      return getCart();
    }
  );
  return query;
};

export const useResellerProductGetCart = () => {
  const query = useQuery<IResellerCart[]>(
    [ProductReactQueryKey.GetCartItem],
    () => {
      return getCart();
    }
  );
  return query;
};
