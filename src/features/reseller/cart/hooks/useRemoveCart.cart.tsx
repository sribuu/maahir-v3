import { IResellerCart } from "@/src/core/lib/models/reseller/cart";
import { setCart } from "@/src/storage/reseller/cart";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { CartReactQueryKey, MyCartReactQueryKey } from "../constants";
import { ResellerMyCartContext } from "../contexts/my_cart/MyCart.context";
import { ResellerMyCartActionsEnum } from "../contexts/my_cart/MyCart.types";

// MyCart
// Available Items
export const useMyCartAvailableItemsRemoveCart = () => {
  const { state, dispatch } = useContext(ResellerMyCartContext);
  const queryClient = useQueryClient();

  const mutation = useMutation<IResellerCart[], any>(
    [CartReactQueryKey.RemoveAvailableItemsCart],
    () => {
      const initialCart: IResellerCart[] = queryClient.getQueryData([
        CartReactQueryKey.GetCartItems,
      ]);
      const filteredId = state.cart.items
        .filter((item) => item.selected)
        .map((item) => parseInt(item.variant_id));
      const filteredCart = initialCart.map((item) => {
        return {
          ...item,
          supplier: {
            ...item.supplier,
            data: item.supplier.data.filter(
              (supplierItem) => !filteredId.includes(supplierItem.variant_id)
            ),
          },
        };
      });
      // TODO: replace this when integrated
      console.log(filteredId, "ini filter id");
      console.log(filteredCart, "ini filter cart");
      console.log(initialCart, "ini initial cart");
      // sementara
      const payload = initialCart;
      return setCart(payload);
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

// Unavailable Items
export const useMyCartUnavailableItemsRemoveCart = () => {
  const { state, dispatch } = useContext(ResellerMyCartContext);
  const queryClient = useQueryClient();

  const mutation = useMutation<IResellerCart[], any>(
    [CartReactQueryKey.RemoveUnavailableItemsCart],
    () => {
      const initialCart: IResellerCart[] = queryClient.getQueryData([
        CartReactQueryKey.GetCartItems,
      ]);
      const filteredId = state.cart.unavailable_items.map((item) =>
        parseInt(item.variant_id)
      );
      const filteredCart = initialCart.map((item) => {
        return {
          ...item,
          supplier: {
            ...item.supplier,
            data: item.supplier.data.filter(
              (supplierItem) => !filteredId.includes(supplierItem.variant_id)
            ),
          },
        };
      });
      console.log(filteredId, "ini filter id");
      console.log(filteredCart, "ini filter cart");
      console.log(initialCart, "ini initial cart");
      // TODO: replace this when integrated
      const payload = initialCart;
      return setCart(payload);
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
