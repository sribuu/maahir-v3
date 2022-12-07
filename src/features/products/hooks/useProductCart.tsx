import { ReactQueryKey } from "@/src/core/lib/constants";
import { ICart, IProducts } from "@/src/core/lib/models";
import { fetchAddToCart } from "@/src/core/lib/storage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProductsReactQueryKey } from "../constants";

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

export const useProductsAddItemToCart = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ICart[], any, number>(
    [ProductsReactQueryKey.AddItemToCart],
    (data: number) => {
      const itemData: IProducts[] = queryClient.getQueryData(
        [ProductsReactQueryKey.GetProductItems],
        { exact: false }
      );

      const filteredItemData = itemData?.filter((item) => item.id === data)[0];
      const payload: ICart = {
        ...filteredItemData,
        note: "",
        amount: 1,
      };
      return fetchAddToCart(payload);
    },
    {
      onSuccess: (data) => {
        queryClient.setQueryData([ReactQueryKey.AddCart], data);
        queryClient.invalidateQueries([ReactQueryKey.GetCart]);
      },
    }
  );
  return mutation;
};
