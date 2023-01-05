import { IResellerCart } from "@/src/core/lib/models/reseller/cart";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { CartReactQueryKey, MyCartReactQueryKey } from "../constants";
import { ResellerMyCartContext } from "../contexts/my_cart/MyCart.context";
import { ResellerMyCartActionsEnum } from "../contexts/my_cart/MyCart.types";
import { fetchSaveCart } from "../services";

// MyCart
export const useMyCartRemoveCartItems = () => {
  const { state, dispatch } = useContext(ResellerMyCartContext);
  const queryClient = useQueryClient();

  const mutation = useMutation<IResellerCart[], any>(
    [CartReactQueryKey.RemoveCartItems],
    () => {
      const payload = state.cart.items
        .filter((item) => !item.supplier.selected)
        .map((item) => {
          return {
            ...item,
            supplier: {
              ...item.supplier,
              data: item.supplier.data.filter(
                (supplierItem) => !supplierItem.selected
              ),
            },
          };
        });

      return fetchSaveCart(payload);
    },
    {
      onSuccess: (data) => {
        queryClient.setQueryData([MyCartReactQueryKey.GetCartItems], data);
        queryClient.invalidateQueries([CartReactQueryKey.GetCartItems]);
      },
    }
  );

  useEffect(() => {
    if (mutation.isSuccess) {
      dispatch({
        type: ResellerMyCartActionsEnum.CheckItemIsEmpty,
        payload: !mutation.data.length,
      });
    }
  }, [mutation.isSuccess]);
  return mutation;
};
