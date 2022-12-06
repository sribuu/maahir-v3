import { IProducts } from "@/src/core/lib/models";
import { useQuery } from "@tanstack/react-query";
import { ResellerHomeReactQueryKey } from "../constants";
import { fetchHighlightProducts } from "../services";

import { ReactQueryKey } from "@/src/core/lib/constants";
import { ICart } from "@/src/core/lib/models";
import { fetchAddToCart } from "@/src/core/lib/storage";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useHomeGetHighlightProductsQuery = () =>
  useQuery<IProducts[]>(
    [ResellerHomeReactQueryKey.GetHighlightProducts],
    fetchHighlightProducts,
    {
      retry: false,
    }
  );

export const useMutateAddHighlightProductToCartQuery = () => {
  const queryClient = useQueryClient();
  return useMutation<ICart[], any, ICart>(
    [ResellerHomeReactQueryKey.SaveHighlightProductToCart],
    (data: ICart) => fetchAddToCart(data),
    {
      onSuccess: (data) => {
        queryClient.setQueryData([ReactQueryKey.AddCart], data);
        queryClient.invalidateQueries([ReactQueryKey.GetCart]);
      },
    }
  );
};
