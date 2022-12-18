import { ReactQueryKey } from "@/src/core/lib/constants";
import { ICart } from "@/src/core/lib/models";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { CartReactQueryKey } from "../constants";
import { CartContext } from "../contexts/cart/Cart.context";
import { fetchSaveItemInCart } from "../services";

export const useHomeCartSaveCartItemQuantityById = () => {
  const { state } = useContext(CartContext);
  const queryClient = useQueryClient();
  const mutation = useMutation<ICart[], any, { id: number; value: number }>(
    [CartReactQueryKey.SaveCartQuantityItems],
    (data: { id: number; value: number }) => {
      const result = state.cart.items.map((item) => {
        return {
          ...item,
          amount: item.id === data.id ? data.value : item.amount,
        };
      });

      return fetchSaveItemInCart(result);
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
