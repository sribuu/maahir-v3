import { useEffect } from "react";
import { ReactQueryKey } from "@/src/core/lib/constants";
import { ICart } from "@/src/core/lib/models";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { CartReactQueryKey } from "../constants";
import { CartContext } from "../contexts/cart/Cart.context";
import { fetchSaveItemInCart } from "../services";

export const useHomeCartRemoveCartItemById = () => {
  const { state } = useContext(CartContext);
  const queryClient = useQueryClient();
  const mutation = useMutation<ICart[], any>(
    [CartReactQueryKey.RemoveCartItems],
    () => {
      const cartItems: ICart[] = queryClient.getQueryData([
        CartReactQueryKey.GetCartItems,
      ]);

      const filterData = cartItems.filter(
        (item) => !state.cart.selected_items.includes(item.id)
      );

      return fetchSaveItemInCart(filterData);
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries([ReactQueryKey.GetCart]);
        queryClient.invalidateQueries([CartReactQueryKey.GetCartItems]);
      },
    }
  );
  return mutation;
};