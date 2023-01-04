import { IResellerCart } from "@/src/core/lib/models/reseller/cart";
import { useQuery } from "@tanstack/react-query";
import { ProductReactQueryKey, ProductsReactQueryKey } from "../constants";
import { fetchStorageGetCart } from "../services";

export const useResellerProductsGetCart = () => {
  const query = useQuery<IResellerCart[]>(
    [ProductsReactQueryKey.GetCartItem],
    () => {
      return fetchStorageGetCart();
    }
  );
  return query;
};

export const useResellerProductGetCart = () => {
  const query = useQuery<IResellerCart[]>(
    [ProductReactQueryKey.GetCartItem],
    () => {
      return fetchStorageGetCart();
    }
  );
  return query;
};
