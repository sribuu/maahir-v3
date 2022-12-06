import { ReactQueryKey } from "@/src/core/lib/constants";
import { ICart } from "@/src/core/lib/models";
import { fetchAddToCart } from "@/src/core/lib/storage";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useMutateAddProductToCartQuery = () => {
  const queryClient = useQueryClient();
  return useMutation<ICart[], any, ICart>(
    [ReactQueryKey.PostChangeSupplierProductShow],
    (data: ICart) => fetchAddToCart(data),
    {
      onSuccess: (data) => {
        queryClient.setQueryData([ReactQueryKey.AddCart], data);
        queryClient.invalidateQueries([ReactQueryKey.GetCart]);
      },
    }
  );
};
