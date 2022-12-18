import { ReactQueryKey } from "@/src/core/lib/constants";
import { ICart } from "@/src/core/lib/models";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { CartReactQueryKey } from "../constants";
import { CartContext } from "../contexts/cart/Cart.context";
import { fetchSaveItemInCart } from "../services";

export const useHomeCartSaveCartItemNoteById = () => {
  const { state } = useContext(CartContext);
  const queryClient = useQueryClient();
  const mutation = useMutation<ICart[], any, { id: number; value: string }>(
    [CartReactQueryKey.SaveCartNoteItems],
    (data: { id: number; value: string }) => {
      const result = state.cart.items.map((item) => {
        return {
          ...item,
          note: item.id === data.id ? data.value : item.note,
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
