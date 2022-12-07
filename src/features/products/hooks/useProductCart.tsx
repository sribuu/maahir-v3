import { ReactQueryKey } from "@/src/core/lib/constants";
import { ICart, IProducts } from "@/src/core/lib/models";
import { fetchAddToCart } from "@/src/core/lib/storage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { ProductReactQueryKey, ProductsReactQueryKey } from "../constants";
import { ProductContext } from "../contexts/product/Product.context";

// new
// PRODUCTS
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

// PRODUCT
export const useProductAddItemToCart = () => {
  const queryClient = useQueryClient();
  const { state } = useContext(ProductContext);
  return useMutation<ICart[], any>(
    [ProductReactQueryKey.AddItemToCart],
    () => {
      const itemData: IProducts = queryClient.getQueryData(
        [ProductReactQueryKey.GetProductById],
        {
          exact: false,
        }
      );
      const payload: ICart = {
        ...itemData,
        amount: state.detail.quantity,
        // TODO: change whenever be is updated
        variant: state.detail.variant.selected,
        note: "",
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
};
